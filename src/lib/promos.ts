// Store-wide promotions. Pure module: safe on client and server.
// Only one discount applies per order: one of these promos, a store code or an affiliate coupon.

/** 10% off the first paid order of an email address. */
export const FIRST_ORDER_CODE = "WELCOME10";
export const FIRST_ORDER_PCT = 10;

/** 20% off the peptides when the order has at least 4 peptide vials. Reagents (BAC water) don't count. */
export const BUNDLE_CODE = "BUNDLE4";
export const BUNDLE_PCT = 20;
export const BUNDLE_MIN_UNITS = 4;

/** Default discount an affiliate coupon gives the customer. */
export const AFFILIATE_DEFAULT_PCT = 15;

export const PROMO_CODES = [FIRST_ORDER_CODE, BUNDLE_CODE] as const;

/** Bacteriostatic water and other reagents are not peptides. */
export function isReagent(p: { slug: string; goals?: string[] | null }) {
  if (p.goals && p.goals.length) return p.goals.includes("Reagents");
  return p.slug.startsWith("bacteriostatic-water");
}

export function peptideUnits(lines: { slug: string; goals?: string[] | null; quantity: number }[]) {
  return lines.reduce((n, l) => (isReagent(l) ? n : n + l.quantity), 0);
}

export function peptideSubtotal(lines: { slug: string; goals?: string[] | null; quantity: number; price: number }[]) {
  return lines.reduce((s, l) => (isReagent(l) ? s : s + l.price * l.quantity), 0);
}
