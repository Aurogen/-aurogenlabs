-- GLP3-RT / GLP2-TZ names and label photos, and the shipping method on orders (Nov 2026).
-- Safe to run more than once.

-- 1) Product names, descriptions and vial photos with the new label
UPDATE products SET
  name             = 'GLP3-RT',
  description      = replace(description, 'GLP-3', 'GLP3-RT'),
  long_description = replace(long_description, 'GLP-3', 'GLP3-RT'),
  image            = '/products/vials/' || slug || '-v5.webp',
  updated_at       = NOW()
WHERE slug LIKE 'retatrutide-%';

UPDATE products SET
  name             = 'GLP2-TZ',
  description      = replace(description, 'GLP-2', 'GLP2-TZ'),
  long_description = replace(long_description, 'GLP-2', 'GLP2-TZ'),
  image            = '/products/vials/' || slug || '-v5.webp',
  updated_at       = NOW()
WHERE slug LIKE 'tirzepatide-%';

-- 2) Orders remember the shipping method the customer chose ('standard' | 'overnight')
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_method TEXT NOT NULL DEFAULT 'standard';

-- Check
SELECT slug, name, image FROM products WHERE slug LIKE 'retatrutide-%' OR slug LIKE 'tirzepatide-%' ORDER BY slug;
