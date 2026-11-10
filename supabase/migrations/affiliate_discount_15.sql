-- Affiliate coupons give the customer 15% (client decision, Nov 2026). Safe to run more than once.
ALTER TABLE affiliate_codes ALTER COLUMN customer_discount_pct SET DEFAULT 15;
UPDATE affiliate_codes SET customer_discount_pct = 15 WHERE customer_discount_pct <> 15;

-- Check
SELECT name, coupon_code, customer_discount_pct FROM affiliate_codes ORDER BY name;
