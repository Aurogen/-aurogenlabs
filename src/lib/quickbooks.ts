import OAuthClient from "intuit-oauth";
import QuickBooks from "node-quickbooks";
import { getServiceClient } from "./supabase-server";

const CLIENT_ID = process.env.QUICKBOOKS_CLIENT_ID!;
const CLIENT_SECRET = process.env.QUICKBOOKS_CLIENT_SECRET!;
const REDIRECT_URI =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com") +
  "/api/quickbooks/callback";
const SANDBOX = process.env.QUICKBOOKS_SANDBOX === "true";

export function createOAuthClient() {
  return new OAuthClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    environment: SANDBOX ? "sandbox" : "production",
    redirectUri: REDIRECT_URI,
  });
}

// ── Token storage ─────────────────────────────────────────────────────────

interface QBTokenRow {
  realm_id: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
}

export async function saveTokens(
  realmId: string,
  tokenResponse: Record<string, unknown>
) {
  const supabase = getServiceClient();
  const expiresIn = (tokenResponse.expires_in as number) ?? 3600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

  await supabase.from("quickbooks_tokens").upsert(
    {
      realm_id: realmId,
      access_token: tokenResponse.access_token as string,
      refresh_token: tokenResponse.refresh_token as string,
      token_type: (tokenResponse.token_type as string) ?? "bearer",
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "realm_id" }
  );
}

export async function getStoredTokens(): Promise<QBTokenRow | null> {
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("quickbooks_tokens")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

export async function deleteTokens(realmId: string) {
  const supabase = getServiceClient();
  await supabase.from("quickbooks_tokens").delete().eq("realm_id", realmId);
}

// ── Refresh token if needed ───────────────────────────────────────────────

async function getFreshTokens(): Promise<QBTokenRow | null> {
  const stored = await getStoredTokens();
  if (!stored) return null;

  const expired = new Date(stored.expires_at).getTime() < Date.now() + 60_000;
  if (!expired) return stored;

  const oauthClient = createOAuthClient();
  oauthClient.setToken({
    access_token: stored.access_token,
    refresh_token: stored.refresh_token,
    token_type: stored.token_type,
    realmId: stored.realm_id,
  });

  try {
    const refreshed = await oauthClient.refreshUsingToken(stored.refresh_token);
    const body = refreshed.getJson();
    await saveTokens(stored.realm_id, body);
    return { ...stored, access_token: body.access_token as string, expires_at: new Date(Date.now() + ((body.expires_in as number) ?? 3600) * 1000).toISOString() };
  } catch (err) {
    console.error("QB token refresh failed:", err);
    return null;
  }
}

// ── QB client factory ─────────────────────────────────────────────────────

export async function getQBClient(): Promise<QuickBooks | null> {
  const tokens = await getFreshTokens();
  if (!tokens) return null;

  return new QuickBooks(
    CLIENT_ID,
    CLIENT_SECRET,
    tokens.access_token,
    false,
    tokens.realm_id,
    SANDBOX,
    false,
    null,
    "2.0",
    tokens.refresh_token
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function promisify<T>(fn: (cb: any) => void): Promise<T> {
  return new Promise((resolve, reject) =>
    fn((err: unknown, data: T) => (err ? reject(err) : resolve(data)))
  );
}

// ── Customer: find or create by email ────────────────────────────────────

export async function findOrCreateCustomer(
  qb: QuickBooks,
  name: string,
  email: string
): Promise<string> {
  try {
    const result = await promisify<{ QueryResponse: { Customer?: Array<{ Id: string }> } }>((cb) =>
        qb.findCustomers([{ field: "PrimaryEmailAddr", value: email, operator: "=" }], cb)
    );
    const existing = result?.QueryResponse?.Customer?.[0];
    if (existing) return existing.Id;
  } catch {
    // not found — create below
  }

  const created = await promisify<{ Id: string }>((cb) =>
    qb.createCustomer(
      { DisplayName: `${name} (${email})`, PrimaryEmailAddr: { Address: email } },
      cb
    )
  );
  return created.Id;
}

// ── Order → SalesReceipt ──────────────────────────────────────────────────

export interface OrderSyncPayload {
  id: string;
  name: string;
  email: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}

export async function syncOrderToQuickBooks(order: OrderSyncPayload): Promise<void> {
  const qb = await getQBClient();
  if (!qb) {
    console.warn("QB not connected — skipping order sync for", order.id);
    return;
  }

  const customerId = await findOrCreateCustomer(qb, order.name, order.email);

  const lines = order.items.map((item, i) => ({
    Id: String(i + 1),
    LineNum: i + 1,
    Amount: item.price * item.quantity,
    DetailType: "SalesItemLineDetail",
    SalesItemLineDetail: {
      Qty: item.quantity,
      UnitPrice: item.price,
      ItemRef: { name: item.name },
    },
  }));

  await promisify((cb) =>
    qb.createSalesReceipt(
      {
        DocNumber: order.id,
        CustomerRef: { value: customerId },
        Line: lines,
        TotalAmt: order.total,
        PrivateNote: `Order ${order.id} — synced from Aurogen Labs`,
      },
      cb
    )
  );

  console.log(`QB: SalesReceipt created for order ${order.id}`);
}

// ── Inventory sync: QB Items → Supabase products ─────────────────────────

export async function syncInventoryFromQuickBooks(): Promise<{
  updated: number;
  errors: string[];
}> {
  const qb = await getQBClient();
  if (!qb) throw new Error("QuickBooks not connected");

  const result = await promisify<{
    QueryResponse: { Item?: Array<{ Name: string; QtyOnHand?: number; Active: boolean }> };
  }>((cb) =>
    qb.findItems([{ field: "Type", value: "Inventory", operator: "=" }], cb)
  );

  const items = result?.QueryResponse?.Item ?? [];
  const supabase = getServiceClient();
  let updated = 0;
  const errors: string[] = [];

  for (const item of items) {
    if (!item.Active || item.QtyOnHand == null) continue;
    const { error } = await supabase
      .from("products")
      .update({
        stock_count: Math.max(0, Math.floor(item.QtyOnHand)),
        in_stock: item.QtyOnHand > 0,
      })
      .ilike("name", item.Name);

    if (error) {
      errors.push(`"${item.Name}": ${error.message}`);
    } else {
      updated++;
    }
  }

  return { updated, errors };
}
