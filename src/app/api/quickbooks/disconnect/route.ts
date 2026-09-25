import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getStoredTokens, deleteTokens, createOAuthClient } from "@/lib/quickbooks";

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tokens = await getStoredTokens();
  if (!tokens) {
    return NextResponse.json({ success: true });
  }

  try {
    const oauthClient = createOAuthClient();
    oauthClient.setToken({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_type: tokens.token_type,
      realmId: tokens.realm_id,
    });
    await (oauthClient as unknown as { revoke: (p: Record<string, string>) => Promise<void> }).revoke({ access_token: tokens.access_token });
  } catch {
    // best-effort revoke
  }

  await deleteTokens(tokens.realm_id);
  return NextResponse.json({ success: true });
}
