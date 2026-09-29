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
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233032_77c503c9-ddb0-43c7-b461-6f30d95634d1.png',
 true, 10),

(2, 'retatrutide-15mg', 'Retatrutide', 'LY3437943', '15mg', '1 Vial',
 120, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233032_394613be-a0fa-408e-9223-e57e7a3fb603.png',
 true, 20),

(3, 'retatrutide-20mg', 'Retatrutide', 'LY3437943', '20mg', '1 Vial',
 150, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_c8ca8226-37d8-4c31-bd24-88a6f44fa223.png',
 true, 30),

(4, 'retatrutide-30mg', 'Retatrutide', 'LY3437943', '30mg', '1 Vial',
 200, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_e493f2fb-369c-4b7e-bdcd-faa9d390c147.png',
 true, 40),

(5, 'retatrutide-60mg', 'Retatrutide', 'LY3437943', '60mg', '1 Vial',
 300, NULL, ARRAY['Incretin Analogs'],
 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.',
 true, 100, false, '99.2%', '4731.4 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_72e59d5e-12c9-4190-9613-d982371b2940.png',
 true, 50),

-- ── Tirzepatide ───────────────────────────────────────────────
(6, 'tirzepatide-10mg', 'Tirzepatide', 'LY3298176', '10mg', '1 Vial',
 90, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, true, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'POPULAR',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_98d9545f-2501-4286-ac39-0912b9411f6b.png',
 true, 60),

(7, 'tirzepatide-15mg', 'Tirzepatide', 'LY3298176', '15mg', '1 Vial',
 110, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_c8105c1d-0db6-4f8a-a1b8-818f7b1f310b.png',
 true, 70),

(8, 'tirzepatide-20mg', 'Tirzepatide', 'LY3298176', '20mg', '1 Vial',
 150, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_efbdcf20-6c8b-4690-bc0e-4c12c1324edf.png',
 true, 80),

(9, 'tirzepatide-30mg', 'Tirzepatide', 'LY3298176', '30mg', '1 Vial',
 190, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_98531e34-3d36-49e4-a731-5a122eba7fa6.png',
 true, 90),

(10, 'tirzepatide-60mg', 'Tirzepatide', 'LY3298176', '60mg', '1 Vial',
 250, NULL, ARRAY['Incretin Analogs'],
 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.',
 true, 100, false, '99.3%', '4813.47 g/mol', '2-8°C · Protect from light', 'BULK',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_1a30c21f-720a-44dc-b219-7642a5db2a0d.png',
 true, 100),

-- ── GHK-Cu ────────────────────────────────────────────────────
(11, 'ghk-cu-100mg', 'GHK-Cu', 'Copper Peptide GHK-Cu', '100mg', '1 Vial',
 130, NULL, ARRAY['Copper Peptides'],
 'Glycyl-L-histidyl-L-lysine copper(II) complex. Lyophilized research reagent.',
 'GHK-Cu is the tripeptide Gly-His-Lys complexed with copper(II). Supplied as a lyophilized powder for in-vitro studies of copper-binding peptides, metal-ion coordination chemistry and cell culture assays. For laboratory research use only.',
 true, 100, true, '99.0%', '340.38 g/mol', '2-8°C · Protect from light', 'PREMIUM',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_4c007785-2760-44e3-b786-e8d623ef7662.png', true, 110),

-- ── Tesamorelin ───────────────────────────────────────────────
(12, 'tesamorelin-10mg', 'Tesamorelin', 'TH9507', '10mg', '1 Vial',
 90, NULL, ARRAY['GHRH Analogs'],
 'Synthetic GHRH(1-44) analog with an N-terminal trans-3-hexenoyl group.',
 'Tesamorelin (TH9507) is a 44-amino-acid synthetic analog of growth hormone-releasing hormone (GHRH) carrying a trans-3-hexenoic acid group at the N-terminus. Supplied as a lyophilized powder for in-vitro GHRH receptor binding and peptide stability studies. For laboratory research use only.',
 true, 100, false, '99.0%', '5135.5 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233033_5484cf95-d023-4ce0-8c75-f5ec5dc66d2c.png', true, 120),

-- ── TB-500 ────────────────────────────────────────────────────
(13, 'tb-500-10mg', 'TB-500', 'Thymosin Beta-4 fragment', '10mg', '1 Vial',
 90, NULL, ARRAY['Peptide Fragments'],
 'Synthetic peptide based on Thymosin Beta-4. Lyophilized research reagent.',
 'TB-500 is a synthetic peptide based on the actin-binding region of Thymosin Beta-4. Supplied as a lyophilized powder for in-vitro studies of actin polymerization and cell migration assays. For laboratory research use only.',
 true, 100, false, '99.0%', '2888.14 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_b0751c60-388f-4f62-a2b4-a75423795a6d.png',
 true, 130),

-- ── BPC-157 ───────────────────────────────────────────────────
(14, 'bpc-157-10mg', 'BPC-157', 'Pentadecapeptide BPC 157', '10mg', '1 Vial',
 90, NULL, ARRAY['Peptide Fragments'],
 'Synthetic 15-amino-acid peptide. Lyophilized research reagent.',
 'BPC-157 is a synthetic pentadecapeptide (GEPPPGKPADDAGLV) whose sequence is derived from a protein fragment originally isolated from gastric juice. Supplied as a lyophilized powder for in-vitro and analytical research. For laboratory research use only.',
 true, 100, true, '99.1%', '1419.55 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_62b9b7f0-78a9-48d7-a258-e48132fe6b17.png',
 true, 140),

-- ── TB-500 + BPC-157 Combo ────────────────────────────────────
(15, 'tb-500-bpc-157-combo', 'TB-500 + BPC-157', 'Thymosin Beta-4 fragment + Pentadecapeptide BPC 157', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['Peptide Fragments'],
 'TB-500 and BPC-157 supplied as two separately lyophilized vials.',
 'Kit containing one vial of TB-500 (5mg) and one vial of BPC-157 (5mg). Each vial is independently lyophilized for stability and ships with its own batch COA. Intended for in-vitro comparative studies. For laboratory research use only.',
 true, 100, false, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_021bc7bf-bee6-4792-ae41-aa4d97da47df.png', true, 150),

-- ── NAD+ ──────────────────────────────────────────────────────
(16, 'nad-plus-500mg', 'NAD+', 'Nicotinamide Adenine Dinucleotide', '500mg', '1 Vial',
 110, NULL, ARRAY['Mitochondrial & Coenzymes'],
 'Nicotinamide adenine dinucleotide (oxidized form). Research-grade reagent.',
 'NAD+ is a dinucleotide coenzyme that acts as an electron carrier in redox reactions and as a substrate for sirtuin and PARP enzymes. Supplied as a lyophilized powder for in-vitro enzymatic assays and biochemical research. For laboratory research use only.',
 true, 100, true, '99.5%', '663.43 g/mol', '-20°C · Lyophilized', 'PREMIUM',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_49c9ae22-4314-40d9-8d92-77dccfbaef17.png', true, 160),

-- ── MOTS-C ────────────────────────────────────────────────────
(17, 'mots-c-40mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '40mg', '1 Vial',
 170, NULL, ARRAY['Mitochondrial & Coenzymes'],
 '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_9ca0d0a1-2329-4302-af5d-0b24dacd842d.png',
 true, 170),

(18, 'mots-c-10mg', 'MOTS-c', 'Mitochondrial ORF of 12S rRNA type-c', '10mg', '1 Vial',
 95, NULL, ARRAY['Mitochondrial & Coenzymes'],
 '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.',
 true, 100, false, '98.9%', '2174.5 g/mol', '-20°C · Lyophilized', 'NEW',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_7d8956e5-ee3e-42ad-98ef-370991fb1a98.png',
 true, 180),

-- ── Ipamorelin ────────────────────────────────────────────────
(19, 'ipamorelin-10mg', 'Ipamorelin', 'NNC 26-0161', '10mg', '1 Vial',
 90, NULL, ARRAY['GH Secretagogues'],
 'Synthetic pentapeptide agonist of the ghrelin receptor (GHS-R1a).',
 'Ipamorelin (Aib-His-D-2-Nal-D-Phe-Lys-NH2) is a synthetic pentapeptide with agonist activity at the growth hormone secretagogue receptor (GHS-R1a). Supplied as a lyophilized powder for in-vitro receptor binding and signaling studies. For laboratory research use only.',
 true, 100, false, '99.0%', '711.85 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_19ebb7bc-479b-4e78-8929-b69efd6c31e2.png',
 true, 190),

-- ── Ipamorelin + CJC-1295 Combo ──────────────────────────────
(20, 'ipamorelin-cjc-1295-combo', 'Ipamorelin + CJC-1295', 'NNC 26-0161 + GRF 1-29', '5mg + 5mg', '2 Vials',
 90, NULL, ARRAY['GH Secretagogues','GHRH Analogs'],
 'Ipamorelin and CJC-1295 supplied as two separately lyophilized vials.',
 'Kit containing one vial of Ipamorelin (5mg), a GHS-R1a agonist, and one vial of CJC-1295 (5mg), a modified GRF(1-29) analog. Each vial is independently lyophilized and ships with its own batch COA. Intended for in-vitro comparative receptor studies. For laboratory research use only.',
 true, 100, true, '99.0%', NULL, '2-8°C · Protect from light', 'COMBO',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_28162e88-1f43-4c46-9ffc-0fce2f3abd0e.png',
 true, 200),

-- ── Sermorelin ────────────────────────────────────────────────
(21, 'sermorelin-10mg', 'Sermorelin', 'GRF 1-29 NH2', '10mg', '1 Vial',
 90, NULL, ARRAY['GHRH Analogs'],
 'Synthetic GHRH(1-29) amide. Lyophilized research reagent.',
 'Sermorelin (GRF 1-29 NH2) is a synthetic peptide corresponding to the first 29 amino acids of human growth hormone-releasing hormone (GHRH). Supplied as a lyophilized powder for in-vitro GHRH receptor studies. For laboratory research use only.',
 true, 100, false, '99.1%', '3357.93 g/mol', '2-8°C · Protect from light', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_f253dab4-f7f7-4cd2-8e3b-e3fbfab2d89f.png', true, 210),

-- ── KLOW Blend ────────────────────────────────────────────────
(22, 'klow-blend-80mg', 'KLOW Blend', 'Proprietary Peptide Blend', '80mg', '1 Vial',
 200, NULL, ARRAY['Peptide Blends'],
 'Proprietary multi-peptide formulation in a single lyophilized vial.',
 'KLOW Blend is a proprietary lyophilized formulation containing multiple research peptides in a single vial. Contact support for composition details. For laboratory research use only.',
 true, 100, false, '99.0%', NULL, '-20°C · Lyophilized', 'EXCLUSIVE',
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_235409_e5fcbece-b4d7-4c7a-a618-87d390712a99.png', true, 220),

-- ── Bacteriostatic Water ──────────────────────────────────────
(23, 'bacteriostatic-water-10ml', 'Bacteriostatic Water', '0.9% Benzyl Alcohol in Sterile Water', '10mL', '1 Vial',
 12, NULL, ARRAY['Reagents']::TEXT[],
 'Sterile water with 0.9% benzyl alcohol for reconstituting lyophilized reagents.',
 'Bacteriostatic water is USP-grade sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. Used in the laboratory to reconstitute lyophilized peptides for in-vitro research. Not for human or veterinary use.',
 true, 500, false, 'USP Grade', NULL, 'Room temperature · Keep sealed', NULL,
 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_233239_f5af126b-7d02-4e17-ae9d-fd3766346edd.png', true, 230)

ON CONFLICT (slug) DO NOTHING;

-- Reset the serial sequence so the next auto-generated id starts at 24
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
