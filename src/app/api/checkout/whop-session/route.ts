import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { whopCreateProduct, whopCreatePlan, whopCheckoutUrl } from "@/lib/whop";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurogenlabs.com";

export async function POST(req: Request) {
  const { orderId, items: productIds, total } = await req.json();

  if (!orderId || !total) {
    return NextResponse.json({ error: "Missing orderId or total" }, { status: 400 });
  }

  if (!process.env.WHOP_API_KEY) {
    // No Whop configured — fall back gracefully
    return NextResponse.json({ checkout_url: null });
  }

  const supabase = getServiceClient();
  const redirectUrl = `${BASE_URL}/order-success?order_id=${orderId}`;

  // If single product and it has a Whop checkout URL, use it directly
  if (Array.isArray(productIds) && productIds.length === 1) {
    const { data: product } = await supabase
      .from("products")
      .select("whop_product_id, whop_checkout_url")
      .eq("id", productIds[0])
      .single();

    if (product?.whop_product_id) {
      const url = whopCheckoutUrl(product.whop_product_id, redirectUrl);
      return NextResponse.json({ checkout_url: url });
    }
  }

  // Multi-product cart or product not yet synced:
  // Create a one-time Whop product for this order total
  try {
    const whopProduct = await whopCreateProduct({
      name: `Aurogen Labs Order ${orderId}`,
      headline: "Research peptides order",
    });

    await whopCreatePlan({
      product_id: whopProduct.id,
      price_cents: Math.round(Number(total) * 100),
    });

    const url = whopCheckoutUrl(whopProduct.id, redirectUrl);
    return NextResponse.json({ checkout_url: url });
  } catch (err) {
    console.error("Whop session error:", err);
    // If Whop fails, fall back to success page (admin fulfills manually)
    return NextResponse.json({ checkout_url: null });
  }
}
