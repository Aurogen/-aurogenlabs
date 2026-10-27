import Stripe from "stripe";

let client: Stripe | null = null;

/** Stripe client, or null while the store still takes payment manually (no key configured). */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

export const toCents = (amount: number) => Math.round(amount * 100);
