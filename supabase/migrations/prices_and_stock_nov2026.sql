-- Client price list and real units on hand (November 2026). Safe to run more than once.
-- Clears any old "was" price so no strike-through discount is shown that the client did not set.
-- BAC Water 3 mL now has a price, so it goes on sale.
UPDATE products AS p
   SET price          = v.price,
       original_price = NULL,
       stock_count    = v.units,
       in_stock       = v.units > 0,
       visible        = true,
       updated_at     = NOW()
  FROM (VALUES
    ('retatrutide-10mg',          100, 49),
    ('retatrutide-20mg',          150, 50),
    ('retatrutide-30mg',          200, 30),
    ('retatrutide-60mg',          280, 20),
    ('tirzepatide-10mg',           90, 40),
    ('tirzepatide-15mg',          105, 40),
    ('tirzepatide-20mg',          120, 20),
    ('tirzepatide-30mg',          145, 50),
    ('tirzepatide-60mg',          250, 20),
    ('ghk-cu-100mg',               90, 70),
    ('tesamorelin-10mg',           80, 20),
    ('tb-500-bpc-157-combo',       75, 30),
    ('nad-plus-500mg',             75, 25),
    ('mots-c-40mg',               120, 20),
    ('mots-c-10mg',                65, 20),
    ('ipamorelin-cjc-1295-combo',  85, 30),
    ('klow-blend-80mg',           130, 20),
    ('bacteriostatic-water-10ml',  14, 80),
    ('bacteriostatic-water-3ml',    6, 150)
  ) AS v(slug, price, units)
 WHERE p.slug = v.slug;

-- Check: 19 products on the store with their price and units
SELECT slug, price, stock_count, in_stock FROM products WHERE visible ORDER BY sort_order;
