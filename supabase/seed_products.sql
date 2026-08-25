-- ============================================================
-- Aurogen Labs — Product Seed
-- Run in Supabase > SQL Editor AFTER running schema.sql
-- ============================================================

INSERT INTO products (
  id, slug, name, compound, concentration, size,
  price, original_price, goals, description, long_description,
  in_stock, stock_count, featured, purity, molecular_weight,
  storage, badge, image, visible, sort_order
) VALUES

-- ── Retatrutide ──────────────────────────────────────────────
(1, 'retatrutide-10mg', 'Retatrutide', 'LY3437943', '10mg', '1 Vial',
 100, NULL, ARRAY['Fat Loss','Performance'],
 'Triple GIP/GLP-1/Glucagon receptor agonist for advanced metabolic research.',
 'Retatrutide (LY3437943) is a triple hormone receptor agonist targeting GIP, GLP-1, and glucagon receptors. Research applications include obesity modeling, metabolic syndrome studies, and cardiometabolic research protocols.',
 true, 100, true, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', 'BEST SELLER',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 10),

(2, 'retatrutide-15mg', 'Retatrutide', 'LY3437943', '15mg', '1 Vial',
 120, NULL, ARRAY['Fat Loss','Performance'],
 'Triple GIP/GLP-1/Glucagon receptor agonist for advanced metabolic research.',
 'Retatrutide (LY3437943) is a triple hormone receptor agonist targeting GIP, GLP-1, and glucagon receptors. Research applications include obesity modeling, metabolic syndrome studies, and cardiometabolic research protocols.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 20),

(3, 'retatrutide-20mg', 'Retatrutide', 'LY3437943', '20mg', '1 Vial',
 150, NULL, ARRAY['Fat Loss','Performance'],
 'Triple GIP/GLP-1/Glucagon receptor agonist for advanced metabolic research.',
 'Retatrutide (LY3437943) is a triple hormone receptor agonist targeting GIP, GLP-1, and glucagon receptors. Research applications include obesity modeling, metabolic syndrome studies, and cardiometabolic research protocols.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 30),

(4, 'retatrutide-30mg', 'Retatrutide', 'LY3437943', '30mg', '1 Vial',
 200, NULL, ARRAY['Fat Loss','Performance'],
 'Triple GIP/GLP-1/Glucagon receptor agonist for advanced metabolic research.',
 'Retatrutide (LY3437943) is a triple hormone receptor agonist targeting GIP, GLP-1, and glucagon receptors. Research applications include obesity modeling, metabolic syndrome studies, and cardiometabolic research protocols.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 40),

(5, 'retatrutide-60mg', 'Retatrutide', 'LY3437943', '60mg', '1 Vial',
 300, NULL, ARRAY['Fat Loss','Performance'],
 'Triple GIP/GLP-1/Glucagon receptor agonist for advanced metabolic research.',
 'Retatrutide (LY3437943) is a triple hormone receptor agonist targeting GIP, GLP-1, and glucagon receptors. Research applications include obesity modeling, metabolic syndrome studies, and cardiometabolic research protocols.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 50),

-- ── Tirzepatide ───────────────────────────────────────────────
(6, 'tirzepatide-10mg', 'Tirzepatide', 'LY3298176', '10mg', '1 Vial',
 90, NULL, ARRAY['Fat Loss'],
 'Dual GIP/GLP-1 receptor agonist for next-gen metabolic research.',
 'Tirzepatide (LY3298176) is a dual GIP and GLP-1 receptor agonist. Research applications focus on glycemic control modeling, body weight regulation, and lipid metabolism studies.',
 true, 100, true, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'POPULAR',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 60),

(7, 'tirzepatide-15mg', 'Tirzepatide', 'LY3298176', '15mg', '1 Vial',
 110, NULL, ARRAY['Fat Loss'],
 'Dual GIP/GLP-1 receptor agonist for next-gen metabolic research.',
 'Tirzepatide (LY3298176) is a dual GIP and GLP-1 receptor agonist. Research applications focus on glycemic control modeling, body weight regulation, and lipid metabolism studies.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 70),

(8, 'tirzepatide-20mg', 'Tirzepatide', 'LY3298176', '20mg', '1 Vial',
 150, NULL, ARRAY['Fat Loss'],
 'Dual GIP/GLP-1 receptor agonist for next-gen metabolic research.',
 'Tirzepatide (LY3298176) is a dual GIP and GLP-1 receptor agonist. Research applications focus on glycemic control modeling, body weight regulation, and lipid metabolism studies.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 80),

(9, 'tirzepatide-30mg', 'Tirzepatide', 'LY3298176', '30mg', '1 Vial',
 190, NULL, ARRAY['Fat Loss'],
 'Dual GIP/GLP-1 receptor agonist for next-gen metabolic research.',
 'Tirzepatide (LY3298176) is a dual GIP and GLP-1 receptor agonist. Research applications focus on glycemic control modeling, body weight regulation, and lipid metabolism studies.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 90),

(10, 'tirzepatide-60mg', 'Tirzepatide', 'LY3298176', '60mg', '1 Vial',
 250, NULL, ARRAY['Fat Loss'],
 'Dual GIP/GLP-1 receptor agonist for next-gen metabolic research.',
 'Tirzepatide (LY3298176) is a dual GIP and GLP-1 receptor agonist. Research applications focus on glycemic control modeling, body weight regulation, and lipid metabolism studies.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 100),

-- ── GHK-Cu ────────────────────────────────────────────────────
(11, 'ghk-cu-100mg', 'GHK-Cu', 'Copper Peptide GHK-Cu', '100mg', '1 Vial',
 130, NULL, ARRAY['Anti-Aging','Skin & Hair'],
 'Copper tripeptide with potent regenerative and anti-aging research applications.',
 'GHK-Cu (Glycyl-L-histidyl-L-lysine copper) is a naturally occurring copper complex with demonstrated roles in wound healing, collagen synthesis, and skin remodeling. Research applications include dermal regeneration models, follicle stimulation studies, and anti-fibrotic protocols.',
 true, 100, true, '99.0%', '340.38 g/mol', '2-8°C · Protect from light', 'PREMIUM',
 '/products/ghk-cu.png', true, 110),

-- ── Tesamorelin ───────────────────────────────────────────────
(12, 'tesamorelin-10mg', 'Tesamorelin', 'TH9507', '10mg', '1 Vial',
 90, NULL, ARRAY['Fat Loss','Anti-Aging'],
 'Stabilized GHRH analog for visceral adiposity and GH axis research.',
 'Tesamorelin (TH9507) is a synthetic analogue of growth hormone-releasing hormone (GHRH) with a trans-3-hexenoic acid modification that stabilizes the molecule. Research applications include visceral fat reduction models, GH axis modulation, and lipodystrophy studies.',
 true, 100, false, '99.0%', '5135.5 g/mol', '2-8°C · Protect from light', NULL,
 '/products/tesamorelin.png', true, 120),

-- ── TB-500 ────────────────────────────────────────────────────
(13, 'tb-500-10mg', 'TB-500', 'Thymosin Beta-4 fragment', '10mg', '1 Vial',
 90, NULL, ARRAY['Recovery','Muscle Growth'],
 'Thymosin Beta-4 synthetic analog for wound healing and repair research.',
 'TB-500 is a synthetic peptide based on the active domain of Thymosin Beta-4. Research applications include wound healing models, angiogenesis studies, and musculoskeletal repair protocols.',
 true, 100, false, '99.0%', '2888.14 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_202208_1cd9e6c4-858f-4765-8e3c-f6f962241c6e.png',
 true, 130),

-- ── BPC-157 ───────────────────────────────────────────────────
(14, 'bpc-157-10mg', 'BPC-157', 'Body Protection Compound', '10mg', '1 Vial',
 90, NULL, ARRAY['Recovery','Skin & Hair'],
 'Gastric pentadecapeptide with extensive tissue repair research applications.',
 'BPC-157 is a synthetic pentadecapeptide derived from human gastric juice. Research indicates roles in angiogenesis, tendon healing, muscle repair, and gut integrity models.',
 true, 100, true, '99.1%', '1419.55 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175602_ecc32a9f-7c2b-45d9-9d0f-62cbd62625da.png',
 true, 140),

-- ── TB-500 + BPC-157 Combo ────────────────────────────────────
(15, 'tb-500-bpc-157-combo', 'TB-500 + BPC-157', 'Thymosin Beta-4 fragment + Body Protection Compound', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['Recovery'],
 'Synergistic peptide stack for comprehensive tissue repair research protocols.',
 'This combination kit pairs TB-500 (Thymosin Beta-4 fragment) and BPC-157 (Body Protection Compound) for research protocols studying synergistic tissue repair mechanisms. Each vial is independently lyophilized for maximum stability.',
 true, 100, false, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 '/products/tb500-bpc157.png', true, 150),

-- ── NAD+ ──────────────────────────────────────────────────────
(16, 'nad-plus-500mg', 'NAD+', 'Nicotinamide Adenine Dinucleotide', '500mg', '1 Vial',
 110, NULL, ARRAY['Anti-Aging','Performance','Brain Health'],
 'Essential coenzyme for cellular energy metabolism and longevity research.',
 'NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme involved in cellular respiration, DNA repair, and sirtuin activation. Research applications include mitochondrial function studies, aging biomarker modulation, and neuroprotection models.',
 true, 100, true, '99.5%', '663.43 g/mol', '-20°C · Lyophilized', 'PREMIUM',
 '/products/nad-plus.png', true, 160),

-- ── MOTS-C ────────────────────────────────────────────────────
(17, 'mots-c-40mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '40mg', '1 Vial',
 170, NULL, ARRAY['Anti-Aging','Performance'],
 'Mitochondria-derived peptide targeting AMPK for longevity research.',
 'MOTS-c is an endogenous mitochondria-derived peptide that activates AMPK and regulates metabolic homeostasis. Research applications include longevity models, exercise adaptation, and insulin sensitivity studies.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175604_c7657ce3-c73c-4d3f-93be-67fc4de8f34d.png',
 true, 170),

(18, 'mots-c-10mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '10mg', '1 Vial',
 95, NULL, ARRAY['Anti-Aging','Performance'],
 'Mitochondria-derived peptide targeting AMPK for longevity research.',
 'MOTS-c is an endogenous mitochondria-derived peptide that activates AMPK and regulates metabolic homeostasis. Research applications include longevity models, exercise adaptation, and insulin sensitivity studies.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', 'NEW',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175604_c7657ce3-c73c-4d3f-93be-67fc4de8f34d.png',
 true, 180),

-- ── Ipamorelin ────────────────────────────────────────────────
(19, 'ipamorelin-10mg', 'Ipamorelin', 'NNC 26-0161', '10mg', '1 Vial',
 90, NULL, ARRAY['Muscle Growth','Anti-Aging'],
 'Selective growth hormone secretagogue for GH pulse research.',
 'Ipamorelin is a pentapeptide GH secretagogue and ghrelin receptor agonist. It selectively stimulates growth hormone release without significant cortisol, prolactin, or ACTH elevation in research models.',
 true, 100, false, '99.0%', '711.85 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175602_b21856a5-a07d-4c6c-ad2d-e2da3189c51c.png',
 true, 190),

-- ── Ipamorelin + CJC-1295 Combo ──────────────────────────────
(20, 'ipamorelin-cjc-1295-combo', 'Ipamorelin + CJC-1295', 'NNC 26-0161 + GRF 1-29', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['Muscle Growth','Anti-Aging'],
 'Synergistic GH secretagogue stack for amplified GH pulse research.',
 'This combination kit pairs Ipamorelin (GH secretagogue) with CJC-1295 (GHRH analog) for research protocols studying synergistic growth hormone release. The combination is used in GH axis studies, IGF-1 secretion modeling, and body composition research.',
 true, 100, true, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_202208_f9c2b75e-2a44-473b-bd2c-d3e5cd5d49b9.png',
 true, 200),

-- ── Sermorelin ────────────────────────────────────────────────
(21, 'sermorelin-10mg', 'Sermorelin', 'GRF 1-29 NH2', '10mg', '1 Vial',
 90, NULL, ARRAY['Muscle Growth','Anti-Aging'],
 'GHRH 1-29 analog for growth hormone secretion research.',
 'Sermorelin (GRF 1-29 NH2) is a synthetic analogue of the first 29 amino acids of endogenous growth hormone-releasing hormone (GHRH). Research applications include pituitary function studies, GH deficiency models, and age-related GH decline protocols.',
 true, 100, false, '99.1%', '3357.93 g/mol', '2-8°C · Protect from light', NULL,
 '/products/sermorelin.png', true, 210),

-- ── KLOW Blend ────────────────────────────────────────────────
(22, 'klow-blend-80mg', 'KLOW Blend', 'Proprietary Peptide Blend', '80mg', '1 Vial',
 200, NULL, ARRAY['Fat Loss','Performance'],
 'Advanced proprietary peptide blend for comprehensive metabolic and performance research.',
 'KLOW Blend is Aurogen Labs'' proprietary research formulation combining synergistic peptides for multi-pathway metabolic and performance research. Designed for advanced research protocols requiring broad-spectrum peptide activity.',
 true, 100, false, '99.0%', NULL, '-20°C · Lyophilized', 'EXCLUSIVE',
 '/products/klow-blend.png', true, 220),

-- ── Bacteriostatic Water ──────────────────────────────────────
(23, 'bacteriostatic-water-10ml', 'Bacteriostatic Water', '0.9% Benzyl Alcohol in Water for Injection', '10mL', '1 Vial',
 12, NULL, ARRAY[]::TEXT[],
 'USP-grade bacteriostatic water for peptide reconstitution.',
 'Bacteriostatic water contains 0.9% benzyl alcohol as a preservative, making it suitable for multi-dose peptide reconstitution. USP-grade sterile water for injection, compatible with all lyophilized peptides in the Aurogen Labs catalog.',
 true, 500, false, 'USP Grade', NULL, 'Room temperature · Keep sealed', NULL,
 '/products/bac-water.png', true, 230)

ON CONFLICT (slug) DO NOTHING;

-- Reset the serial sequence so the next auto-generated id starts at 24
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
