-- Stripe card payments: keep the Checkout session and the shipping charged on each order.
-- Safe to run more than once. Run in Supabase > SQL Editor.

ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_amount   NUMERIC(10,2) NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders (stripe_session_id);
