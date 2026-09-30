import { NextRequest, NextResponse } from "next/server";
import { evaluateDiscount } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const { code, order_total } = await req.json();
  if (!code || typeof code !== "string") {
    return NextResponse.json({ valid: false, error: "No code provided" });
  }

  // Preview only: the order endpoint re-prices the cart and re-checks the code on its own.
  const result = await evaluateDiscount(code, Math.max(0, Number(order_total) || 0));
  return NextResponse.json(result);
}
