import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { createOAuthClient } from "@/lib/quickbooks";
import OAuthClient from "intuit-oauth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauthClient = createOAuthClient();
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "aurogen-qb-connect",
  });

  return NextResponse.redirect(authUri);
}
