-- Affiliates: the code owner earns 10% commission, the customer using the coupon gets 15% off.
-- Updates every existing affiliate and the defaults for new ones. Safe to run more than once.
-- Orders placed before this keep the commission they were created with.

BEGIN;

ALTER TABLE affiliate_codes ALTER COLUMN commission_rate SET DEFAULT 10;
ALTER TABLE affiliate_codes ALTER COLUMN customer_discount_pct SET DEFAULT 15;

UPDATE affiliate_codes SET commission_rate = 10 WHERE commission_rate <> 10;
UPDATE affiliate_codes SET customer_discount_pct = 15 WHERE customer_discount_pct <> 15;

COMMIT;

-- Check: every affiliate with its rates
SELECT name, code, coupon_code, commission_rate, customer_discount_pct, active
FROM affiliate_codes ORDER BY created_at DESC;
