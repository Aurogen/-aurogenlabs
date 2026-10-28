import Stripe from "stripe";

let client: Stripe | null = null;

/** Stripe client, or null while the store still takes payment manually (no key configured). */
export function getStripe(): Stripe | null {
  const key = stripeSecretKey();
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

/**
 * Stripe keys only contain letters, digits and underscores. Keys pasted into a hosting dashboard
 * can pick up invisible characters (spaces, newlines, zero-width marks) that make every request fail.
 */
export function stripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY?.replace(/[^A-Za-z0-9_]/g, "");
  return key || undefined;
}

export const toCents = (amount: number) => Math.round(amount * 100);
