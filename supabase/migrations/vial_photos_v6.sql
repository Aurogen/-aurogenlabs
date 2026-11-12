-- Rounder, more realistic vial photos for every product (Nov 2026). Safe to run more than once.
UPDATE products SET image = '/products/vials/' || slug || '-v6.webp', updated_at = NOW()
WHERE slug IN (
  'bacteriostatic-water-3ml', 'bacteriostatic-water-10ml', 'ghk-cu-100mg', 'ipamorelin-cjc-1295-combo',
  'klow-blend-80mg', 'mots-c-10mg', 'mots-c-40mg', 'nad-plus-500mg',
  'retatrutide-10mg', 'retatrutide-20mg', 'retatrutide-30mg', 'retatrutide-60mg',
  'tirzepatide-10mg', 'tirzepatide-15mg', 'tirzepatide-20mg', 'tirzepatide-30mg', 'tirzepatide-60mg',
  'tb-500-bpc-157-combo', 'tesamorelin-10mg'
);

-- Check: every visible product and its photo
SELECT slug, image FROM products WHERE visible ORDER BY sort_order;
