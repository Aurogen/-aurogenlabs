-- Affiliate program, partner form, discount codes and restock waitlist in one go.
-- For databases where these tables were never created. Safe to run more than once:
-- it only creates what is missing and never deletes data. Run in Supabase > SQL Editor.

BEGIN;

-- Partner applications
CREATE TABLE IF NOT EXISTS affiliate_applications (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  website    TEXT,
  audience   TEXT,
  message    TEXT,
  status     TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS answers     JSONB NOT NULL DEFAULT '[]';
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_email  ON affiliate_applications(email);
CREATE INDEX IF NOT EXISTS idx_affiliate_applications_status ON affiliate_applications(status);

-- Affiliates (link code + influencer coupon). Coupons give the customer 15%.
CREATE TABLE IF NOT EXISTS affiliate_codes (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id  UUID REFERENCES affiliate_applications(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  code            TEXT UNIQUE NOT NULL,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS active                BOOLEAN      NOT NULL DEFAULT true;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS coupon_code           TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS customer_discount_pct NUMERIC(5,2) NOT NULL DEFAULT 15;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS user_id               TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS payout_method         TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS payout_details        TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS notes                 TEXT;
ALTER TABLE affiliate_codes ALTER COLUMN customer_discount_pct SET DEFAULT 15;
UPDATE affiliate_codes SET customer_discount_pct = 15 WHERE customer_discount_pct <> 15;
CREATE INDEX        IF NOT EXISTS idx_affiliate_codes_code   ON affiliate_codes(code);
CREATE INDEX        IF NOT EXISTS idx_affiliate_codes_email  ON affiliate_codes(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_affiliate_codes_coupon ON affiliate_codes (upper(coupon_code));
CREATE INDEX        IF NOT EXISTS idx_affiliate_codes_user   ON affiliate_codes(user_id);

-- Link clicks
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id            BIGSERIAL PRIMARY KEY,
  code          TEXT        NOT NULL,
  landing_path  TEXT,
  referrer      TEXT,
  visitor_hash  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_code_date ON affiliate_clicks (code, created_at DESC);

-- Payouts recorded by the admin
CREATE TABLE IF NOT EXISTS affiliate_payouts (
  id              UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_code  TEXT          NOT NULL,
  amount          NUMERIC(10,2) NOT NULL,
  order_count     INTEGER       NOT NULL DEFAULT 0,
  method          TEXT,
  reference       TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_affiliate_payouts_code ON affiliate_payouts (affiliate_code, created_at DESC);

-- Orders: who referred the sale and where its commission stands
ALTER TABLE orders ADD COLUMN IF NOT EXISTS affiliate_code       TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_amount    NUMERIC(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS attribution_source   TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_status    TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_payout_id UUID REFERENCES affiliate_payouts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_orders_affiliate_code    ON orders(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_orders_commission_status ON orders (affiliate_code, commission_status);

-- Settings edited from the admin panel (partner form)
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT        PRIMARY KEY,
  value      JSONB       NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Store discount codes (admin panel)
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

-- "Notify me when back in stock"
CREATE TABLE IF NOT EXISTS waitlist (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email        TEXT NOT NULL,
  product_name TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (email, product_name)
);
CREATE INDEX IF NOT EXISTS idx_waitlist_product_name ON waitlist(product_name);

-- Only the server (service role) reads and writes these tables
ALTER TABLE affiliate_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_codes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist               ENABLE ROW LEVEL SECURITY;

COMMIT;

-- Check: every table should be listed
SELECT table_name FROM information_schema.tables
 WHERE table_schema = 'public'
   AND table_name IN ('affiliate_applications','affiliate_codes','affiliate_clicks','affiliate_payouts',
                      'site_settings','discount_codes','waitlist')
 ORDER BY table_name;
