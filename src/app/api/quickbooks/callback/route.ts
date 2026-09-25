import { NextRequest, NextResponse } from "next/server";
import { createOAuthClient, saveTokens } from "@/lib/quickbooks";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com";

export async function GET(req: NextRequest) {
  const url = req.url;
  const realmId = req.nextUrl.searchParams.get("realmId");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    console.error("QB OAuth error:", error);
    return NextResponse.redirect(`${BASE_URL}/admin?qb=error`);
  }

  if (!realmId) {
    return NextResponse.redirect(`${BASE_URL}/admin?qb=missing_realm`);
  }

  try {
    const oauthClient = createOAuthClient();
    const tokenResponse = await oauthClient.createToken(url);
    const tokens = tokenResponse.getJson();
    await saveTokens(realmId, tokens);
    return NextResponse.redirect(`${BASE_URL}/admin?qb=connected`);
  } catch (err) {
    console.error("QB token exchange error:", err);
    return NextResponse.redirect(`${BASE_URL}/admin?qb=error`);
  }
}
