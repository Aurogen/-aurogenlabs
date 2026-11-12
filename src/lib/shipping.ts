// Shipping rules shared by the cart, checkout, server pricing and Stripe. All orders ship by UPS.
// Change these numbers to change shipping site-wide.
export const FREE_SHIPPING_MIN = 300;
/** Standard UPS shipping; free on orders of FREE_SHIPPING_MIN or more. */
export const FLAT_SHIPPING = 15;
/** UPS overnight (next business day). Always charged, also on free-shipping orders. */
export const OVERNIGHT_SHIPPING = 65;
export const DELIVERY_DAYS = { min: 2, max: 5 };
/** Orders placed before this local hour (Eastern Time) ship the same business day. */
export const SAME_DAY_CUTOFF = "12:00 PM ET";

export type ShippingMethod = "standard" | "overnight";
export const SHIPPING_METHODS: ShippingMethod[] = ["standard", "overnight"];

export function isShippingMethod(v: unknown): v is ShippingMethod {
  return v === "standard" || v === "overnight";
}

/** Shipping for a merchandise total (after discounts) and the chosen method. */
export function shippingFor(goodsTotal: number, method: ShippingMethod = "standard") {
  if (goodsTotal <= 0) return 0;
  if (method === "overnight") return OVERNIGHT_SHIPPING;
  return goodsTotal >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;
}
