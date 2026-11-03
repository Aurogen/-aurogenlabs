-- Aurogen returns to research peptides with the new label artwork.
-- Hides the supplement line and any peptide without a new label, shows the 18 labeled products
-- with their vial photos (prices are left as they are), and adds BAC Water 3 mL hidden until it has a price.
-- Safe to run more than once. Run in Supabase > SQL Editor.

BEGIN;

-- 1. Off the store: the supplements and every other product. Rows are kept for order history.
UPDATE products SET visible = false, featured = false;

-- 2. The labeled products: back on the store with the new vial photo, label purity and storage text.
UPDATE products AS p
   SET visible    = true,
       featured   = v.featured,
       sort_order = v.sort_order,
       image      = '/products/vials/' || v.slug || '-v2.webp',
       purity     = CASE WHEN v.slug LIKE 'bacteriostatic-water-%' THEN p.purity ELSE '> 99%' END,
       storage    = CASE WHEN v.slug LIKE 'bacteriostatic-water-%'
                         THEN '2–8 °C (36–46 °F) · Protect from light · Do not freeze'
                         ELSE 'Store cold · Protect from light · Do not freeze' END,
       updated_at = NOW()
  FROM (VALUES
    ('retatrutide-10mg',           true,  10),
    ('retatrutide-20mg',           false, 20),
    ('retatrutide-30mg',           false, 30),
    ('retatrutide-60mg',           false, 40),
    ('tirzepatide-10mg',           true,  50),
    ('tirzepatide-15mg',           false, 60),
    ('tirzepatide-20mg',           false, 70),
    ('tirzepatide-30mg',           false, 80),
    ('tirzepatide-60mg',           false, 90),
    ('ghk-cu-100mg',               true,  100),
    ('tesamorelin-10mg',           false, 110),
    ('tb-500-bpc-157-combo',       false, 120),
    ('nad-plus-500mg',             true,  130),
    ('mots-c-40mg',                false, 140),
    ('mots-c-10mg',                false, 150),
    ('ipamorelin-cjc-1295-combo',  true,  160),
    ('klow-blend-80mg',            false, 170),
    ('bacteriostatic-water-10ml',  false, 180)
  ) AS v(slug, featured, sort_order)
 WHERE p.slug = v.slug;

-- 3. BAC Water 3 mL (new label). Hidden and out of stock until a price is set in Admin > Products.
INSERT INTO products (
  slug, name, compound, concentration, size, price, goals, description, long_description,
  in_stock, stock_count, featured, purity, storage, image, visible, sort_order
)
SELECT 'bacteriostatic-water-3ml', name, compound, '3mL', size, 0, goals, description, long_description,
       false, 0, false, purity, storage, '/products/vials/bacteriostatic-water-3ml-v2.webp', false, 175
  FROM products
 WHERE slug = 'bacteriostatic-water-10ml'
ON CONFLICT (slug) DO NOTHING;

-- 4. Partner application form: if an admin already saved it, swap the supplement agreement and
--    audience example back to the research-only versions (only exact, unedited text is replaced).
UPDATE site_settings
   SET value = replace(replace(value::text,
         'I will promote Aurogen products honestly: no claims that they diagnose, treat, cure or prevent any disease, and I will clearly disclose my partnership in my content.',
         'I understand all products are for laboratory research use only, and I will not make health, dosing or human-use claims when promoting them.'),
         'e.g. lifters, runners, CrossFit athletes, busy professionals',
         'e.g. researchers, lab professionals, science educators')::jsonb,
       updated_at = NOW()
 WHERE key = 'partner_form';

COMMIT;

-- Check: should list the 18 labeled products.
SELECT slug, price, featured FROM products WHERE visible ORDER BY sort_order;
