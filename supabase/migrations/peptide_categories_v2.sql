-- Peptide categories as the client defined them (Nov 2026). Safe to run more than once.
-- GLP-1 Receptor Agonists · Growth Hormone Axis · Copper Peptides · Mitochondrial Peptides · Peptide Blends
-- (+ Reagents for bacteriostatic water).
UPDATE products SET goals = ARRAY['GLP-1 Receptor Agonists'], updated_at = NOW()
 WHERE slug LIKE 'retatrutide-%' OR slug LIKE 'tirzepatide-%';
UPDATE products SET goals = ARRAY['Growth Hormone Axis'], updated_at = NOW()
 WHERE slug LIKE 'tesamorelin-%';
UPDATE products SET goals = ARRAY['Growth Hormone Axis','Peptide Blends'], updated_at = NOW()
 WHERE slug LIKE 'ipamorelin-cjc-1295%';
UPDATE products SET goals = ARRAY['Copper Peptides'], updated_at = NOW()
 WHERE slug LIKE 'ghk-cu-%';
UPDATE products SET goals = ARRAY['Mitochondrial Peptides'], updated_at = NOW()
 WHERE slug LIKE 'mots-c-%' OR slug LIKE 'nad-plus-%';
UPDATE products SET goals = ARRAY['Peptide Blends'], updated_at = NOW()
 WHERE slug LIKE 'tb-500-bpc-157%' OR slug LIKE 'klow-%';
UPDATE products SET goals = ARRAY['Reagents'], updated_at = NOW()
 WHERE slug LIKE 'bacteriostatic-water-%';

-- Check: every visible product with its category
SELECT name, slug, goals FROM products WHERE visible ORDER BY sort_order;
