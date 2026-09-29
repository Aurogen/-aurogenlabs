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
 100, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, true, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', 'BEST SELLER',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 10),

(2, 'retatrutide-15mg', 'Retatrutide', 'LY3437943', '15mg', '1 Vial',
 120, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 20),

(3, 'retatrutide-20mg', 'Retatrutide', 'LY3437943', '20mg', '1 Vial',
 150, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 30),

(4, 'retatrutide-30mg', 'Retatrutide', 'LY3437943', '30mg', '1 Vial',
 200, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 40),

(5, 'retatrutide-60mg', 'Retatrutide', 'LY3437943', '60mg', '1 Vial',
 300, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175600_5f980e7c-9f25-4669-b2fe-804995810942.png',
 true, 50),

-- ── Tirzepatide ───────────────────────────────────────────────
(6, 'tirzepatide-10mg', 'Tirzepatide', 'LY3298176', '10mg', '1 Vial',
 90, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, true, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'POPULAR',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 60),

(7, 'tirzepatide-15mg', 'Tirzepatide', 'LY3298176', '15mg', '1 Vial',
 110, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 70),

(8, 'tirzepatide-20mg', 'Tirzepatide', 'LY3298176', '20mg', '1 Vial',
 150, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 80),

(9, 'tirzepatide-30mg', 'Tirzepatide', 'LY3298176', '30mg', '1 Vial',
 190, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 90),

(10, 'tirzepatide-60mg', 'Tirzepatide', 'LY3298176', '60mg', '1 Vial',
 250, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175603_9f89e6f4-e3df-4382-a7ee-6fea2c90eb48.png',
 true, 100),

-- ── GHK-Cu ────────────────────────────────────────────────────
(11, 'ghk-cu-100mg', 'GHK-Cu', 'Copper Peptide GHK-Cu', '100mg', '1 Vial',
 130, NULL, ARRAY['Copper Peptides'],
 'Glycyl-L-histidyl-L-lysine copper(II) complex. Lyophilized research reagent.',
 'GHK-Cu is the tripeptide Gly-His-Lys complexed with copper(II). Supplied as a lyophilized powder for in-vitro studies of copper-binding peptides, metal-ion coordination chemistry and cell culture assays. For laboratory research use only.',
 true, 100, true, '99.0%', '340.38 g/mol', '2-8°C · Protect from light', 'PREMIUM',
 '/products/ghk-cu.png', true, 110),

-- ── Tesamorelin ───────────────────────────────────────────────
(12, 'tesamorelin-10mg', 'Tesamorelin', 'TH9507', '10mg', '1 Vial',
 90, NULL, ARRAY['GHRH Analogs'],
 'Synthetic GHRH(1-44) analog with an N-terminal trans-3-hexenoyl group.',
 'Tesamorelin (TH9507) is a 44-amino-acid synthetic analog of growth hormone-releasing hormone (GHRH) carrying a trans-3-hexenoic acid group at the N-terminus. Supplied as a lyophilized powder for in-vitro GHRH receptor binding and peptide stability studies. For laboratory research use only.',
 true, 100, false, '99.0%', '5135.5 g/mol', '2-8°C · Protect from light', NULL,
 '/products/tesamorelin.png', true, 120),

-- ── TB-500 ────────────────────────────────────────────────────
(13, 'tb-500-10mg', 'TB-500', 'Thymosin Beta-4 fragment', '10mg', '1 Vial',
 90, NULL, ARRAY['Peptide Fragments'],
 'Synthetic peptide based on Thymosin Beta-4. Lyophilized research reagent.',
 'TB-500 is a synthetic peptide based on the actin-binding region of Thymosin Beta-4. Supplied as a lyophilized powder for in-vitro studies of actin polymerization and cell migration assays. For laboratory research use only.',
 true, 100, false, '99.0%', '2888.14 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_202208_1cd9e6c4-858f-4765-8e3c-f6f962241c6e.png',
 true, 130),

-- ── BPC-157 ───────────────────────────────────────────────────
(14, 'bpc-157-10mg', 'BPC-157', 'Pentadecapeptide BPC 157', '10mg', '1 Vial',
 90, NULL, ARRAY['Peptide Fragments'],
 'Synthetic 15-amino-acid peptide. Lyophilized research reagent.',
 'BPC-157 is a synthetic pentadecapeptide (GEPPPGKPADDAGLV) whose sequence is derived from a protein fragment originally isolated from gastric juice. Supplied as a lyophilized powder for in-vitro and analytical research. For laboratory research use only.',
 true, 100, true, '99.1%', '1419.55 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175602_ecc32a9f-7c2b-45d9-9d0f-62cbd62625da.png',
 true, 140),

-- ── TB-500 + BPC-157 Combo ────────────────────────────────────
(15, 'tb-500-bpc-157-combo', 'TB-500 + BPC-157', 'Thymosin Beta-4 fragment + Pentadecapeptide BPC 157', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['Peptide Fragments'],
 'TB-500 and BPC-157 supplied as two separately lyophilized vials.',
 'Kit containing one vial of TB-500 (5mg) and one vial of BPC-157 (5mg). Each vial is independently lyophilized for stability and ships with its own batch COA. Intended for in-vitro comparative studies. For laboratory research use only.',
 true, 100, false, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 '/products/tb500-bpc157.png', true, 150),

-- ── NAD+ ──────────────────────────────────────────────────────
(16, 'nad-plus-500mg', 'NAD+', 'Nicotinamide Adenine Dinucleotide', '500mg', '1 Vial',
 110, NULL, ARRAY['Mitochondrial & Coenzymes'],
 'Nicotinamide adenine dinucleotide (oxidized form). Research-grade reagent.',
 'NAD+ is a dinucleotide coenzyme that acts as an electron carrier in redox reactions and as a substrate for sirtuin and PARP enzymes. Supplied as a lyophilized powder for in-vitro enzymatic assays and biochemical research. For laboratory research use only.',
 true, 100, true, '99.5%', '663.43 g/mol', '-20°C · Lyophilized', 'PREMIUM',
 '/products/nad-plus.png', true, 160),

-- ── MOTS-C ────────────────────────────────────────────────────
(17, 'mots-c-40mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '40mg', '1 Vial',
 170, NULL, ARRAY['Mitochondrial & Coenzymes'],
 '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175604_c7657ce3-c73c-4d3f-93be-67fc4de8f34d.png',
 true, 170),

(18, 'mots-c-10mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '10mg', '1 Vial',
 95, NULL, ARRAY['Mitochondrial & Coenzymes'],
 '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', 'NEW',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175604_c7657ce3-c73c-4d3f-93be-67fc4de8f34d.png',
 true, 180),

-- ── Ipamorelin ────────────────────────────────────────────────
(19, 'ipamorelin-10mg', 'Ipamorelin', 'NNC 26-0161', '10mg', '1 Vial',
 90, NULL, ARRAY['GH Secretagogues'],
 'Synthetic pentapeptide agonist of the ghrelin receptor (GHS-R1a).',
 'Ipamorelin (Aib-His-D-2-Nal-D-Phe-Lys-NH2) is a synthetic pentapeptide with agonist activity at the growth hormone secretagogue receptor (GHS-R1a). Supplied as a lyophilized powder for in-vitro receptor binding and signaling studies. For laboratory research use only.',
 true, 100, false, '99.0%', '711.85 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_175602_b21856a5-a07d-4c6c-ad2d-e2da3189c51c.png',
 true, 190),

-- ── Ipamorelin + CJC-1295 Combo ──────────────────────────────
(20, 'ipamorelin-cjc-1295-combo', 'Ipamorelin + CJC-1295', 'NNC 26-0161 + GRF 1-29', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['GH Secretagogues','GHRH Analogs'],
 'Ipamorelin and CJC-1295 supplied as two separately lyophilized vials.',
 'Kit containing one vial of Ipamorelin (5mg), a GHS-R1a agonist, and one vial of CJC-1295 (5mg), a modified GRF(1-29) analog. Each vial is independently lyophilized and ships with its own batch COA. Intended for in-vitro comparative receptor studies. For laboratory research use only.',
 true, 100, true, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_202208_f9c2b75e-2a44-473b-bd2c-d3e5cd5d49b9.png',
 true, 200),

-- ── Sermorelin ────────────────────────────────────────────────
(21, 'sermorelin-10mg', 'Sermorelin', 'GRF 1-29 NH2', '10mg', '1 Vial',
 90, NULL, ARRAY['GHRH Analogs'],
 'Synthetic GHRH(1-29) amide. Lyophilized research reagent.',
 'Sermorelin (GRF 1-29 NH2) is a synthetic peptide corresponding to the first 29 amino acids of human growth hormone-releasing hormone (GHRH). Supplied as a lyophilized powder for in-vitro GHRH receptor studies. For laboratory research use only.',
 true, 100, false, '99.1%', '3357.93 g/mol', '2-8°C · Protect from light', NULL,
 '/products/sermorelin.png', true, 210),

-- ── KLOW Blend ────────────────────────────────────────────────
(22, 'klow-blend-80mg', 'KLOW Blend', 'Proprietary Peptide Blend', '80mg', '1 Vial',
 200, NULL, ARRAY['Peptide Blends'],
 'Proprietary multi-peptide formulation in a single lyophilized vial.',
 'KLOW Blend is a proprietary lyophilized formulation containing multiple research peptides in a single vial. Contact support for composition details. For laboratory research use only.',
 true, 100, false, '99.0%', NULL, '-20°C · Lyophilized', 'EXCLUSIVE',
 '/products/klow-blend.png', true, 220),

-- ── Bacteriostatic Water ──────────────────────────────────────
(23, 'bacteriostatic-water-10ml', 'Bacteriostatic Water', '0.9% Benzyl Alcohol in Sterile Water', '10mL', '1 Vial',
 12, NULL, ARRAY['Reagents']::TEXT[],
 'Sterile water with 0.9% benzyl alcohol for reconstituting lyophilized reagents.',
 'Bacteriostatic water is USP-grade sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. Used in the laboratory to reconstitute lyophilized peptides for in-vitro research. Not for human or veterinary use.',
 true, 500, false, 'USP Grade', NULL, 'Room temperature · Keep sealed', NULL,
 '/products/bac-water.png', true, 230)

ON CONFLICT (slug) DO NOTHING;

-- Reset the serial sequence so the next auto-generated id starts at 24
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
