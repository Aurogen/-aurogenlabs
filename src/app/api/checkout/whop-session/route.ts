import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com";

export async function POST(req: Request) {
  const { orderId, items: productIds, total } = await req.json();

  if (!orderId || !total) {
    return NextResponse.json({ error: "Missing orderId or total" }, { status: 400 });
  }

  const supabase = getServiceClient();
  const redirectUrl = `${BASE_URL}/order-success?order_id=${orderId}`;

  // Look up Whop checkout URLs for the products in the cart
  if (Array.isArray(productIds) && productIds.length > 0) {
    const { data: products } = await supabase
      .from("products")
      .select("id, whop_checkout_url")
      .in("id", productIds);

    // Use the first product's checkout URL (most common: single-product purchase)
    const withUrl = (products ?? []).find((p) => p.whop_checkout_url);
    if (withUrl?.whop_checkout_url) {
      const url = new URL(withUrl.whop_checkout_url);
      url.searchParams.set("redirect_url", redirectUrl);
      return NextResponse.json({ checkout_url: url.toString() });
    }
  }

  // No Whop URL configured yet — fall back to order success page
  return NextResponse.json({ checkout_url: null });
}
