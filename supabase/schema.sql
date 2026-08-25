-- ============================================================
-- Aurogen Labs — Base Schema
-- Run this ONCE in Supabase > SQL Editor on a fresh project.
-- After running this, also run the files in supabase/migrations/
-- in this order:
--   1. whop_checkout_urls.sql  (after inserting your products)
--   2. product_images.sql      (after inserting your products)
-- ============================================================


-- ── products ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                SERIAL PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  compound          TEXT NOT NULL,
  concentration     TEXT NOT NULL,
  size              TEXT NOT NULL,
  price             NUMERIC(10,2) NOT NULL,
  original_price    NUMERIC(10,2),
  goals             TEXT[] DEFAULT '{}',
  description       TEXT NOT NULL DEFAULT '',
  long_description  TEXT NOT NULL DEFAULT '',
  in_stock          BOOLEAN NOT NULL DEFAULT true,
  stock_count       INTEGER NOT NULL DEFAULT 0,
  featured          BOOLEAN NOT NULL DEFAULT false,
  purity            TEXT NOT NULL DEFAULT '99%+',
  sequence          TEXT,
  molecular_weight  TEXT,
  storage           TEXT NOT NULL DEFAULT 'Store at -20°C',
  badge             TEXT,
  image             TEXT,
  coa_url           TEXT,
  visible           BOOLEAN NOT NULL DEFAULT true,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  whop_product_id   TEXT,
  whop_checkout_url TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug     ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_visible  ON products(visible);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_whop_product_id ON products(whop_product_id);


-- ── orders ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               TEXT PRIMARY KEY,          -- e.g. "ORD-ABC123"
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  address          TEXT NOT NULL,
  items            JSONB NOT NULL DEFAULT '[]',
  total            NUMERIC(10,2) NOT NULL,
  status           TEXT NOT NULL DEFAULT 'pending_payment',
  payment_status   TEXT NOT NULL DEFAULT 'pending',
  user_id          TEXT,                       -- Clerk user ID (optional)
  affiliate_code   TEXT,
  commission_amount NUMERIC(10,2),
  whop_order_id    TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_email          ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status         ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_affiliate_code ON orders(affiliate_code);


-- ── newsletter ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ── affiliate_applications ───────────────────────────────────
CREATE TABLE IF NOT EXISTS affiliate_applications (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  website    TEXT,
  audience   TEXT,
  message    TEXT,
  status     TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_applications_email  ON affiliate_applications(email);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_status ON affiliate_applications(status);


-- ── affiliate_codes ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS affiliate_codes (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id  UUID REFERENCES affiliate_applications(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  code            TEXT UNIQUE NOT NULL,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_codes_code  ON affiliate_codes(code);
CREATE INDEX IF NOT EXISTS idx_affiliate_codes_email ON affiliate_codes(email);


-- ── discount_codes ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discount_codes (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code       TEXT UNIQUE NOT NULL,
  type       TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value      NUMERIC(10,2) NOT NULL,
  min_order  NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_uses   INTEGER,
  uses       INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ,
  active     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discount_codes_code   ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_active ON discount_codes(active);


-- ── waitlist ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email        TEXT NOT NULL,
  product_name TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (email, product_name)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_product_name ON waitlist(product_name);


-- ── updated_at trigger (keeps products.updated_at current) ───
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ── Storage bucket for COAs ───────────────────────────────────
-- Run this separately in Supabase Dashboard > Storage if the bucket
-- doesn't exist yet (SQL Editor doesn't create buckets):
--
--   Bucket name: coa
--   Public: true
--
-- Or via the Supabase dashboard UI: Storage → New bucket → "coa" → Public ✓
