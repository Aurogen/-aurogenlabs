-- Point products at the photoreal vial photos (-v3). New file names so browsers and the image CDN
-- fetch them instead of serving a cached earlier version. Safe to run more than once.
UPDATE products
   SET image = regexp_replace(image, '^/products/vials/([a-z0-9-]+?)(-v[0-9]+)?\.webp$', '/products/vials/\1-v3.webp'),
       updated_at = NOW()
 WHERE image LIKE '/products/vials/%';

-- Check
SELECT slug, image FROM products WHERE image LIKE '/products/vials/%' ORDER BY sort_order;
