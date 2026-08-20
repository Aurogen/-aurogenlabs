-- Run this in your Supabase SQL Editor

-- 1. Create affiliate_codes table
CREATE TABLE IF NOT EXISTS affiliate_codes (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id  UUID REFERENCES affiliate_applications(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  code            TEXT UNIQUE NOT NULL,
  commission_rate NUMERIC(5,2) DEFAULT 20.00,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add affiliate columns to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS affiliate_code    TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS commission_amount NUMERIC(10,2);

-- 3. Index for fast referral lookups
CREATE INDEX IF NOT EXISTS idx_orders_affiliate_code ON orders(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_codes_code  ON affiliate_codes(code);
