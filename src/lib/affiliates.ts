import { createHash } from "crypto";
import { getServiceClient } from "@/lib/supabase-server";

export const REF_COOKIE = "aurogen_ref";
export const REF_WINDOW_DAYS = 30;

export const refCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: REF_WINDOW_DAYS * 24 * 60 * 60,
};

export interface AffiliateRecord {
  id: string;
  name: string;
  email: string;
  code: string;
  coupon_code: string | null;
  commission_rate: number;
  customer_discount_pct: number;
  active: boolean;
  user_id: string | null;
}

const AFFILIATE_FIELDS =
  "id, name, email, code, coupon_code, commission_rate, customer_discount_pct, active, user_id";

export function normalizeCode(raw: string) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
}

export function normalizeCoupon(raw: string) {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
}

export async function findAffiliateByCode(raw: string): Promise<AffiliateRecord | null> {
  const code = normalizeCode(raw);
  if (!code) return null;
  const { data } = await getServiceClient()
    .from("affiliate_codes")
    .select(AFFILIATE_FIELDS)
    .eq("code", code)
    .eq("active", true)
    .maybeSingle();
  return (data as AffiliateRecord | null) ?? null;
}

export async function findAffiliateByCoupon(raw: string): Promise<AffiliateRecord | null> {
  const coupon = normalizeCoupon(raw);
  if (!coupon) return null;
  const { data } = await getServiceClient()
    .from("affiliate_codes")
    .select(AFFILIATE_FIELDS)
    .ilike("coupon_code", coupon)
    .eq("active", true)
    .maybeSingle();
  return (data as AffiliateRecord | null) ?? null;
}

export async function recordClick(code: string, opts: { path?: string | null; referrer?: string | null; ip?: string | null; userAgent?: string | null }) {
  const day = new Date().toISOString().slice(0, 10);
  // A daily, salted hash lets us count unique visitors without storing IPs.
  const visitorHash = createHash("sha256")
    .update(`${opts.ip ?? ""}|${opts.userAgent ?? ""}|${day}|${process.env.CLERK_SECRET_KEY ?? "aurogen"}`)
    .digest("hex")
    .slice(0, 32);

  const { error } = await getServiceClient().from("affiliate_clicks").insert({
    code,
    landing_path: opts.path?.slice(0, 300) ?? null,
    referrer: opts.referrer?.slice(0, 300) ?? null,
    visitor_hash: visitorHash,
  });
  if (error) console.error("Affiliate click insert error:", error.message);
}

export function safeRedirectPath(to: string | null | undefined) {
  if (!to || !to.startsWith("/") || to.startsWith("//") || to.startsWith("/\\")) return "/";
  return to.slice(0, 300);
}

/**
 * Decides which affiliate (if any) earns a sale. An explicit influencer coupon wins over
 * a link cookie, and affiliates never earn on their own purchases.
 */
export async function resolveAttribution(opts: {
  couponCode?: string | null;
  refCookie?: string | null;
  buyerUserId?: string | null;
  buyerEmails?: string[];
}): Promise<{ affiliate: AffiliateRecord; source: "coupon" | "link" } | null> {
  let match: { affiliate: AffiliateRecord; source: "coupon" | "link" } | null = null;

  if (opts.couponCode) {
    const byCoupon = await findAffiliateByCoupon(opts.couponCode);
    if (byCoupon) match = { affiliate: byCoupon, source: "coupon" };
  }
  if (!match && opts.refCookie) {
    const byLink = await findAffiliateByCode(opts.refCookie);
    if (byLink) match = { affiliate: byLink, source: "link" };
  }
  if (!match) return null;

  const emails = (opts.buyerEmails ?? []).map((e) => e.toLowerCase());
  const isSelf =
    (opts.buyerUserId && match.affiliate.user_id === opts.buyerUserId) ||
    emails.includes(match.affiliate.email.toLowerCase());
  return isSelf ? null : match;
}

function randomSuffix(len = 4) {
  return Math.random().toString(36).slice(2, 2 + len);
}

/** Link code like "maria-lopez-x7k2", unique in affiliate_codes. */
export async function generateUniqueCode(name: string, preferred?: string | null) {
  const supabase = getServiceClient();
  const wanted = preferred ? normalizeCode(preferred) : "";
  if (wanted) {
    const { data } = await supabase.from("affiliate_codes").select("id").eq("code", wanted).maybeSingle();
    if (data) throw new Error(`Link code "${wanted}" is already taken`);
    return wanted;
  }
  const base = normalizeCode(name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/^-+|-+$/g, "").slice(0, 20) || "partner";
  for (let i = 0; i < 6; i++) {
    const code = `${base}-${randomSuffix()}`;
    const { data } = await supabase.from("affiliate_codes").select("id").eq("code", code).maybeSingle();
    if (!data) return code;
  }
  return `${base}-${randomSuffix(8)}`;
}

/** Coupon like "MARIA10", unique (case-insensitive) across affiliates and store discount codes. */
export async function generateUniqueCoupon(name: string, discountPct: number, preferred?: string | null) {
  const supabase = getServiceClient();
  const isTaken = async (c: string) => {
    const [{ data: a }, { data: d }] = await Promise.all([
      supabase.from("affiliate_codes").select("id").ilike("coupon_code", c).maybeSingle(),
      supabase.from("discount_codes").select("id").ilike("code", c).maybeSingle(),
    ]);
    return Boolean(a || d);
  };

  const wanted = preferred ? normalizeCoupon(preferred) : "";
  if (wanted) {
    if (await isTaken(wanted)) throw new Error(`Coupon "${wanted}" is already taken`);
    return wanted;
  }
  const first = normalizeCoupon(name.split(/\s+/)[0] ?? "").slice(0, 12) || "PARTNER";
  const pct = Math.round(discountPct);
  const candidates = [`${first}${pct}`, `${first}${pct}${randomSuffix(2).toUpperCase()}`];
  for (const c of candidates) if (!(await isTaken(c))) return c;
  return `${first}${randomSuffix(5).toUpperCase()}`;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com").replace(/\/$/, "");
}
