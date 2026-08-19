import { NextResponse } from "next/server";

export async function GET() {
  const pub = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "NOT SET";
  const sec = process.env.CLERK_SECRET_KEY ?? "NOT SET";
  return NextResponse.json({
    publishableKeyPrefix: pub.slice(0, 12),
    secretKeyPrefix: sec.slice(0, 10),
  });
}
