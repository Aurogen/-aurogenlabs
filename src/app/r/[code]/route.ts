import { NextRequest, NextResponse } from "next/server";
import { findAffiliateByCode, recordClick, refCookieOptions, REF_COOKIE, safeRedirectPath } from "@/lib/affiliates";

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const target = safeRedirectPath(req.nextUrl.searchParams.get("to"));
  const res = NextResponse.redirect(new URL(target, req.url));

  // A tracking hiccup must never break the visitor's landing, so failures just redirect.
  try {
    const affiliate = await findAffiliateByCode(code);
    if (!affiliate) return res;

    res.cookies.set(REF_COOKIE, affiliate.code, refCookieOptions);
    await recordClick(affiliate.code, {
      path: target,
      referrer: req.headers.get("referer"),
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: req.headers.get("user-agent"),
    });
  } catch (e) {
    console.error("Referral link error:", e);
  }
  return res;
}
