import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { whopCreateProduct, whopCreatePlan, whopCheckoutUrl } from "@/lib/whop";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!process.env.WHOP_API_KEY) {
    return NextResponse.json(
      { error: "WHOP_API_KEY not configured in environment variables" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const supabase = getServiceClient();

  const { data: product, error: fetchErr } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchErr || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const whopProduct = await whopCreateProduct({
      name: `${product.name}${product.concentration ? ` ${product.concentration}` : ""}`,
      headline: product.description || product.name,
      image_url: product.image,
    });

    await whopCreatePlan({
      product_id: whopProduct.id,
      price_cents: Math.round(Number(product.price) * 100),
    });

    const checkoutUrl = whopCheckoutUrl(whopProduct.id);

    const { error: updateErr } = await supabase
      .from("products")
      .update({
        whop_product_id: whopProduct.id,
        whop_checkout_url: checkoutUrl,
      })
      .eq("id", id);

    if (updateErr) throw new Error(updateErr.message);

    return NextResponse.json({
      ok: true,
      whop_product_id: whopProduct.id,
      whop_checkout_url: checkoutUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Whop sync failed" },
      { status: 500 }
    );
  }
}
