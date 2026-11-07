-- GHK-Cu and KLOW Blend photos with blue powder (as the real lyophilized product looks).
-- New file names (-v4) so cached copies of the old photos are not served. Safe to run more than once.
UPDATE products SET image = '/products/vials/ghk-cu-100mg-v4.webp',    updated_at = NOW() WHERE slug = 'ghk-cu-100mg';
UPDATE products SET image = '/products/vials/klow-blend-80mg-v4.webp', updated_at = NOW() WHERE slug = 'klow-blend-80mg';

-- Check: 2 rows ending in -v4.webp
SELECT slug, image FROM products WHERE slug IN ('ghk-cu-100mg', 'klow-blend-80mg');
