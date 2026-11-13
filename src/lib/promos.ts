// Store-wide promotions. Pure module: safe on client and server.
// Only one discount applies per order: one of these promos, a store code or an affiliate coupon.

/** 10% off the first paid order of an email address. */
export const FIRST_ORDER_CODE = "WELCOME10";
export const FIRST_ORDER_PCT = 10;

/** Default discount an affiliate coupon gives the customer. */
export const AFFILIATE_DEFAULT_PCT = 15;

/** Default commission the code owner earns: % of the merchandise total after the discount, shipping excluded. */
export const AFFILIATE_COMMISSION_PCT = 10;

export const PROMO_CODES = [FIRST_ORDER_CODE] as const;
