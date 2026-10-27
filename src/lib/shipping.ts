// Shipping rule shared by the cart, checkout, server pricing and Stripe.
// Change these two numbers to change shipping site-wide.
export const FREE_SHIPPING_MIN = 99;
export const FLAT_SHIPPING = 7.99;
export const DELIVERY_DAYS = { min: 2, max: 5 };

/** Shipping for a merchandise total (after discounts). */
export function shippingFor(goodsTotal: number) {
  if (goodsTotal <= 0) return 0;
  return goodsTotal >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;
}
