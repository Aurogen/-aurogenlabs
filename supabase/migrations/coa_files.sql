-- Link each product to its Certificate of Analysis (PDFs served from /coa/<slug>.pdf).
-- TB-500 + BPC-157 is left out on purpose: its COA reports 10 mg / 10 mg while the product is 5 mg + 5 mg.
-- NAD+ 500 mg has no COA yet. Safe to run more than once.
UPDATE products AS p
   SET coa_url = '/coa/' || p.slug || '.pdf',
       updated_at = NOW()
 WHERE p.slug IN (
   'retatrutide-10mg', 'retatrutide-20mg', 'retatrutide-30mg', 'retatrutide-60mg',
   'tirzepatide-10mg', 'tirzepatide-15mg', 'tirzepatide-20mg', 'tirzepatide-30mg', 'tirzepatide-60mg',
   'ghk-cu-100mg', 'tesamorelin-10mg', 'mots-c-40mg', 'mots-c-10mg',
   'ipamorelin-cjc-1295-combo', 'klow-blend-80mg',
   'bacteriostatic-water-3ml', 'bacteriostatic-water-10ml'
 );

-- Check: 17 rows with a COA
SELECT slug, coa_url FROM products WHERE coa_url LIKE '/coa/%' ORDER BY sort_order;
