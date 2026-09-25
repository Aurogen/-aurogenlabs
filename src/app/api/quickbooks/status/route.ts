import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getStoredTokens } from "@/lib/quickbooks";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tokens = await getStoredTokens();
  if (!tokens) {
    return NextResponse.json({ connected: false });
  }

  const expired = new Date(tokens.expires_at).getTime() < Date.now();
  return NextResponse.json({
    connected: true,
    realm_id: tokens.realm_id,
    expires_at: tokens.expires_at,
    token_expired: expired,
  });
}
