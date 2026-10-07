import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Investor preview: the storefront is browsable end to end, but nothing reads or writes
// production data. Orders, forms, accounts and admin are switched off.
const DEMO_MESSAGE = "This is a preview store. Checkout and forms are disabled in this demo.";
// Only the shopping journey is part of the demo; every other page sends visitors home.
const DEMO_PAGES = /^\/($|shop(\/|$)|product\/|cart(\/|$)|checkout(\/|$)|order-success(\/|$)|sign-in|sign-up|robots\.txt)/;

export default clerkMiddleware(
  async (_auth, req) => {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: DEMO_MESSAGE }, { status: 403 });
    }
    if (!DEMO_PAGES.test(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  },
  { signInUrl: "/sign-in", signUpUrl: "/sign-up" },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
