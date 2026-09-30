import { getServiceClient } from "@/lib/supabase-server";
import { PRODUCTS } from "@/data/products";
import { findAffiliateByCoupon } from "@/lib/affiliates";

const round2 = (n: number) => Math.round(n * 100) / 100;
const MAX_QTY_PER_LINE = 50;

export interface DiscountResult {
  valid: true;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  discount_amount: number;
  code_id: string | null;
  referral: boolean;
}

/**
 * Checks a code against store promos first, then influencer coupons, and prices the discount
 * for the given subtotal. Shared by the checkout preview and order creation so they always agree.
 */
export async function evaluateDiscount(
  rawCode: string,
  subtotal: number
): Promise<DiscountResult | { valid: false; error: string }> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { valid: false, error: "No code provided" };

  const supabase = getServiceClient();
  const { data } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code)
    .eq("active", true)
    .maybeSingle();

  if (!data) {
    // Not a store promo — it may be an influencer's personal coupon.
    const affiliate = await findAffiliateByCoupon(code);
    if (!affiliate) return { valid: false, error: "Invalid or expired code" };
    const pct = Number(affiliate.customer_discount_pct) || 0;
    return {
      valid: true,
      code,
      type: "percentage",
      value: pct,
      discount_amount: round2((subtotal * pct) / 100),
      code_id: null,
      referral: true,
    };
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, error: "This code has expired" };
  }
  if (data.max_uses != null && data.uses >= data.max_uses) {
    return { valid: false, error: "This code has reached its usage limit" };
  }
  if (data.min_order && subtotal < Number(data.min_order)) {
    return { valid: false, error: `Minimum order of $${Number(data.min_order).toFixed(2)} required` };
  }

  const value = Number(data.value);
  const discount_amount =
    data.type === "percentage" ? (subtotal * value) / 100 : Math.min(value, subtotal);

  return {
    valid: true,
    code,
    type: data.type,
    value,
    discount_amount: round2(discount_amount),
    code_id: data.id,
    referral: false,
  };
}

export interface PricedLine {
  slug: string;
  name: string;
  concentration: string;
  quantity: number;
  price: number;
}

interface CatalogRow {
  slug: string;
  name: string;
  concentration: string;
  price: number;
  in_stock: boolean;
  visible: boolean;
}

async function loadCatalog(slugs: string[]): Promise<Map<string, CatalogRow>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Map(
      PRODUCTS.filter((p) => slugs.includes(p.slug)).map((p) => [
        p.slug,
        { slug: p.slug, name: p.name, concentration: p.concentration, price: p.price, in_stock: p.inStock, visible: true },
      ])
    );
  }
  const { data, error } = await getServiceClient()
    .from("products")
    .select("slug, name, concentration, price, in_stock, visible")
    .in("slug", slugs);
  if (error) throw new Error(`Catalog lookup failed: ${error.message}`);
  return new Map((data ?? []).map((r) => [r.slug, { ...r, price: Number(r.price) } as CatalogRow]));
}

/**
 * Prices a cart from the database. Client-sent prices and totals are never trusted.
 */
export async function priceOrder(
  rawItems: { slug?: unknown; quantity?: unknown }[],
  discountCode?: string | null
): Promise<
  | { ok: true; lines: PricedLine[]; subtotal: number; discount: DiscountResult | null; total: number }
  | { ok: false; error: string }
> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return { ok: false, error: "Your cart is empty" };

  // Merge duplicate lines and sanitize quantities.
  const qtyBySlug = new Map<string, number>();
  for (const item of rawItems) {
    const slug = typeof item.slug === "string" ? item.slug.trim() : "";
    const qty = Math.floor(Number(item.quantity));
    if (!slug || !Number.isFinite(qty) || qty < 1) return { ok: false, error: "Invalid cart item" };
    qtyBySlug.set(slug, (qtyBySlug.get(slug) ?? 0) + qty);
  }

  const catalog = await loadCatalog([...qtyBySlug.keys()]);
  const lines: PricedLine[] = [];
  for (const [slug, quantity] of qtyBySlug) {
    const p = catalog.get(slug);
    if (!p || !p.visible) return { ok: false, error: "A product in your cart is no longer available. Please remove it and try again." };
    if (!p.in_stock) return { ok: false, error: `${p.name} ${p.concentration} is out of stock. Please remove it to continue.` };
    if (quantity > MAX_QTY_PER_LINE) return { ok: false, error: `Maximum ${MAX_QTY_PER_LINE} units per product` };
    lines.push({ slug, name: p.name, concentration: p.concentration, quantity, price: p.price });
  }

  const subtotal = round2(lines.reduce((s, l) => s + l.price * l.quantity, 0));

  let discount: DiscountResult | null = null;
  if (discountCode && discountCode.trim()) {
    const result = await evaluateDiscount(discountCode, subtotal);
    if (!result.valid) return { ok: false, error: `Discount code: ${result.error}` };
    discount = result;
  }

  const total = round2(Math.max(0, subtotal - (discount?.discount_amount ?? 0)));
  if (total <= 0) return { ok: false, error: "Order total must be greater than zero" };

  return { ok: true, lines, subtotal, discount, total };
}

/** Counts one use of a store discount code (influencer coupons have no usage limit). */
export async function recordDiscountUse(codeId: string | null) {
  if (!codeId) return;
  const supabase = getServiceClient();
  const { data } = await supabase.from("discount_codes").select("uses").eq("id", codeId).maybeSingle();
  if (!data) return;
  const { error } = await supabase.from("discount_codes").update({ uses: (data.uses ?? 0) + 1 }).eq("id", codeId);
  if (error) console.error("Discount uses increment error:", error.message);
}
