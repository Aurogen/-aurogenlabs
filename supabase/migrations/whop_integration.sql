-- Whop integration: store Whop product IDs and payment tracking

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS whop_product_id TEXT,
  ADD COLUMN IF NOT EXISTS whop_checkout_url TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

CREATE INDEX IF NOT EXISTS idx_products_whop_product_id ON products(whop_product_id);
