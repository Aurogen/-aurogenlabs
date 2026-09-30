import { NextRequest, NextResponse } from "next/server";
import { findAffiliateByCode, recordClick, refCookieOptions, REF_COOKIE, safeRedirectPath } from "@/lib/affiliates";

// Backs the legacy `?ref=<code>` links: validates the code, logs the click and sets the server cookie.
export async function POST(req: NextRequest) {
  const { code, path } = (await req.json().catch(() => ({}))) as { code?: string; path?: string };
  if (!code) return NextResponse.json({ ok: false }, { status: 400 });

  const affiliate = await findAffiliateByCode(code);
  if (!affiliate) return NextResponse.json({ ok: false });

  await recordClick(affiliate.code, {
    path: safeRedirectPath(path),
    referrer: req.headers.get("referer"),
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: req.headers.get("user-agent"),
  });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(REF_COOKIE, affiliate.code, refCookieOptions);
  return res;
}
