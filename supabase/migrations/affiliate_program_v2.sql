-- Affiliate & influencer program v2: coupon codes, click tracking, commission lifecycle, payouts.
-- Safe to run more than once. Run in Supabase > SQL Editor.

BEGIN;

-- Affiliates: activation, influencer coupon, customer discount, account link, payout details
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS active                BOOLEAN      NOT NULL DEFAULT true;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS coupon_code           TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS customer_discount_pct NUMERIC(5,2) NOT NULL DEFAULT 10;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS user_id               TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS payout_method         TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS payout_details        TEXT;
ALTER TABLE affiliate_codes ADD COLUMN IF NOT EXISTS notes                 TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_affiliate_codes_coupon ON affiliate_codes (upper(coupon_code));
CREATE INDEX        IF NOT EXISTS idx_affiliate_codes_user   ON affiliate_codes (user_id);

-- Link clicks (one row per visit through /r/<code> or ?ref=<code>)
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

-- Orders: how the sale was attributed and where its commission stands
ALTER TABLE orders ADD COLUMN IF NOT EXISTS attribution_source   TEXT;  -- 'link' | 'coupon'
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_status    TEXT;  -- 'pending' | 'approved' | 'paid' | 'void'
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_payout_id UUID REFERENCES affiliate_payouts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_orders_commission_status ON orders (affiliate_code, commission_status);

-- Existing referred orders start as pending commissions
UPDATE orders
   SET commission_status = 'pending', attribution_source = COALESCE(attribution_source, 'link')
 WHERE affiliate_code IS NOT NULL AND commission_status IS NULL;

-- Tables are only accessed with the service role from the server
ALTER TABLE affiliate_clicks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts ENABLE ROW LEVEL SECURITY;

COMMIT;
