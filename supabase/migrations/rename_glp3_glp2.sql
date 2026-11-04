-- Client request: show Retatrutide as GLP-3 and Tirzepatide as GLP-2 (same names as on the lab COAs).
-- Slugs (URLs), photos and COA files keep their current paths. Safe to run more than once.
UPDATE products
   SET name             = 'GLP-3',
       description      = replace(description, 'Retatrutide', 'GLP-3'),
       long_description = replace(long_description, 'Retatrutide', 'GLP-3'),
       updated_at       = NOW()
 WHERE slug LIKE 'retatrutide-%';

UPDATE products
   SET name             = 'GLP-2',
       description      = replace(description, 'Tirzepatide', 'GLP-2'),
       long_description = replace(long_description, 'Tirzepatide', 'GLP-2'),
       updated_at       = NOW()
 WHERE slug LIKE 'tirzepatide-%';

-- Client request: no internal compound codes in the product text (the code line is no longer shown either).
UPDATE products
   SET description      = replace(replace(replace(description, ' (LY3437943)', ''), ' (LY3298176)', ''), ' (TH9507)', ''),
       long_description = replace(replace(replace(long_description, ' (LY3437943)', ''), ' (LY3298176)', ''), ' (TH9507)', ''),
       updated_at       = NOW()
 WHERE description LIKE '%(LY%' OR long_description LIKE '%(LY%' OR long_description LIKE '%(TH9507)%';

-- Check: 9 rows, names GLP-3 / GLP-2
SELECT slug, name, concentration FROM products WHERE slug LIKE 'retatrutide-%' OR slug LIKE 'tirzepatide-%' ORDER BY sort_order;
