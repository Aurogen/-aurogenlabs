import { NextRequest, NextResponse } from "next/server";
import { evaluateDiscount, priceOrder } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const { code, order_total, items, email } = await req.json();
  if (!code || typeof code !== "string") {
    return NextResponse.json({ valid: false, error: "No code provided" });
  }

  // Preview only: the order endpoint re-prices the cart and re-checks the code on its own.
  // With the cart lines, price it exactly as the order will be (promos depend on the items and email).
  if (Array.isArray(items) && items.length) {
    const priced = await priceOrder(items, code, typeof email === "string" ? email : null);
    if (!priced.ok) {
      return NextResponse.json({ valid: false, error: priced.error.replace(/^Discount code: /, "") });
    }
    return NextResponse.json(priced.discount ?? { valid: false, error: "Invalid or expired code" });
  }

  const result = await evaluateDiscount(code, Math.max(0, Number(order_total) || 0), {
    email: typeof email === "string" ? email : null,
  });
  return NextResponse.json(result);
}
