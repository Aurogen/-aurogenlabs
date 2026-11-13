-- Bluer powder in the GHK-Cu and KLOW vial photos (Nov 2026). Safe to run more than once.
UPDATE products SET image = '/products/vials/' || slug || '-v8.webp', updated_at = NOW()
WHERE slug IN ('ghk-cu-100mg', 'klow-blend-80mg');

SELECT slug, image FROM products WHERE slug IN ('ghk-cu-100mg', 'klow-blend-80mg');
