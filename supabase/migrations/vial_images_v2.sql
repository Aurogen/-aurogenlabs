-- Point products at the redrawn vial photos. The files carry a -v2 suffix so browsers and the
-- image CDN fetch them instead of serving the cached first version. Safe to run more than once.
UPDATE products
   SET image = regexp_replace(image, '^/products/vials/([a-z0-9-]+?)(-v2)?\.webp$', '/products/vials/\1-v2.webp'),
       updated_at = NOW()
 WHERE image LIKE '/products/vials/%';

-- Check
SELECT slug, image FROM products WHERE image LIKE '/products/vials/%' ORDER BY sort_order;
