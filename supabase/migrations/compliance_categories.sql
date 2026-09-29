-- Compliance update: replace health-benefit goals with compound-class categories
-- and rewrite product copy in strictly technical, research-only terms.
-- Run in Supabase > SQL Editor.

BEGIN;

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3437943',
  description = 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
  long_description = 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.'
WHERE slug = 'retatrutide-10mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3437943',
  description = 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
  long_description = 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.'
WHERE slug = 'retatrutide-15mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3437943',
  description = 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
  long_description = 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.'
WHERE slug = 'retatrutide-20mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3437943',
  description = 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
  long_description = 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.'
WHERE slug = 'retatrutide-30mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3437943',
  description = 'Triple GIP/GLP-1/glucagon receptor agonist. Lyophilized research reagent.',
  long_description = 'Retatrutide (LY3437943) is a synthetic peptide with agonist activity at the GIP, GLP-1 and glucagon receptors. Supplied as a lyophilized powder for in-vitro receptor binding, signaling pathway and analytical studies. For laboratory research use only.'
WHERE slug = 'retatrutide-60mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3298176',
  description = 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
  long_description = 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.'
WHERE slug = 'tirzepatide-10mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3298176',
  description = 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
  long_description = 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.'
WHERE slug = 'tirzepatide-15mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3298176',
  description = 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
  long_description = 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.'
WHERE slug = 'tirzepatide-20mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3298176',
  description = 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
  long_description = 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.'
WHERE slug = 'tirzepatide-30mg';

UPDATE products SET goals = ARRAY['Incretin Analogs']::TEXT[], compound = 'LY3298176',
  description = 'Dual GIP/GLP-1 receptor agonist. Lyophilized research reagent.',
  long_description = 'Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide with agonist activity at the GIP and GLP-1 receptors, conjugated to a C20 fatty diacid moiety. Supplied as a lyophilized powder for in-vitro receptor pharmacology and analytical studies. For laboratory research use only.'
WHERE slug = 'tirzepatide-60mg';

UPDATE products SET goals = ARRAY['Copper Peptides']::TEXT[], compound = 'Copper Peptide GHK-Cu',
  description = 'Glycyl-L-histidyl-L-lysine copper(II) complex. Lyophilized research reagent.',
  long_description = 'GHK-Cu is the tripeptide Gly-His-Lys complexed with copper(II). Supplied as a lyophilized powder for in-vitro studies of copper-binding peptides, metal-ion coordination chemistry and cell culture assays. For laboratory research use only.'
WHERE slug = 'ghk-cu-100mg';

UPDATE products SET goals = ARRAY['GHRH Analogs']::TEXT[], compound = 'TH9507',
  description = 'Synthetic GHRH(1-44) analog with an N-terminal trans-3-hexenoyl group.',
  long_description = 'Tesamorelin (TH9507) is a 44-amino-acid synthetic analog of growth hormone-releasing hormone (GHRH) carrying a trans-3-hexenoic acid group at the N-terminus. Supplied as a lyophilized powder for in-vitro GHRH receptor binding and peptide stability studies. For laboratory research use only.'
WHERE slug = 'tesamorelin-10mg';

UPDATE products SET goals = ARRAY['Peptide Fragments']::TEXT[], compound = 'Thymosin Beta-4 fragment',
  description = 'Synthetic peptide based on Thymosin Beta-4. Lyophilized research reagent.',
  long_description = 'TB-500 is a synthetic peptide based on the actin-binding region of Thymosin Beta-4. Supplied as a lyophilized powder for in-vitro studies of actin polymerization and cell migration assays. For laboratory research use only.'
WHERE slug = 'tb-500-10mg';

UPDATE products SET goals = ARRAY['Peptide Fragments']::TEXT[], compound = 'Pentadecapeptide BPC 157',
  description = 'Synthetic 15-amino-acid peptide. Lyophilized research reagent.',
  long_description = 'BPC-157 is a synthetic pentadecapeptide (GEPPPGKPADDAGLV) whose sequence is derived from a protein fragment originally isolated from gastric juice. Supplied as a lyophilized powder for in-vitro and analytical research. For laboratory research use only.'
WHERE slug = 'bpc-157-10mg';

UPDATE products SET goals = ARRAY['Peptide Fragments']::TEXT[], compound = 'Thymosin Beta-4 fragment + Pentadecapeptide BPC 157',
  description = 'TB-500 and BPC-157 supplied as two separately lyophilized vials.',
  long_description = 'Kit containing one vial of TB-500 (5mg) and one vial of BPC-157 (5mg). Each vial is independently lyophilized for stability and ships with its own batch COA. Intended for in-vitro comparative studies. For laboratory research use only.'
WHERE slug = 'tb-500-bpc-157-combo';

UPDATE products SET goals = ARRAY['Mitochondrial & Coenzymes']::TEXT[], compound = 'Nicotinamide Adenine Dinucleotide',
  description = 'Nicotinamide adenine dinucleotide (oxidized form). Research-grade reagent.',
  long_description = 'NAD+ is a dinucleotide coenzyme that acts as an electron carrier in redox reactions and as a substrate for sirtuin and PARP enzymes. Supplied as a lyophilized powder for in-vitro enzymatic assays and biochemical research. For laboratory research use only.'
WHERE slug = 'nad-plus-500mg';

UPDATE products SET goals = ARRAY['Mitochondrial & Coenzymes']::TEXT[], compound = 'Mitochondrial ORF of 12S rRNA type-c',
  description = '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
  long_description = 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.'
WHERE slug = 'mots-c-40mg';

UPDATE products SET goals = ARRAY['Mitochondrial & Coenzymes']::TEXT[], compound = 'Mitochondrial ORF of 12S rRNA type-c',
  description = '16-amino-acid mitochondria-derived peptide. Lyophilized research reagent.',
  long_description = 'MOTS-c is a 16-amino-acid peptide encoded within the mitochondrial 12S rRNA gene. Supplied as a lyophilized powder for in-vitro studies of AMPK signaling and mitochondrial-nuclear communication. For laboratory research use only.'
WHERE slug = 'mots-c-10mg';

UPDATE products SET goals = ARRAY['GH Secretagogues']::TEXT[], compound = 'NNC 26-0161',
  description = 'Synthetic pentapeptide agonist of the ghrelin receptor (GHS-R1a).',
  long_description = 'Ipamorelin (Aib-His-D-2-Nal-D-Phe-Lys-NH2) is a synthetic pentapeptide with agonist activity at the growth hormone secretagogue receptor (GHS-R1a). Supplied as a lyophilized powder for in-vitro receptor binding and signaling studies. For laboratory research use only.'
WHERE slug = 'ipamorelin-10mg';

UPDATE products SET goals = ARRAY['GH Secretagogues','GHRH Analogs']::TEXT[], compound = 'NNC 26-0161 + GRF 1-29',
  description = 'Ipamorelin and CJC-1295 supplied as two separately lyophilized vials.',
  long_description = 'Kit containing one vial of Ipamorelin (5mg), a GHS-R1a agonist, and one vial of CJC-1295 (5mg), a modified GRF(1-29) analog. Each vial is independently lyophilized and ships with its own batch COA. Intended for in-vitro comparative receptor studies. For laboratory research use only.'
WHERE slug = 'ipamorelin-cjc-1295-combo';

UPDATE products SET goals = ARRAY['GHRH Analogs']::TEXT[], compound = 'GRF 1-29 NH2',
  description = 'Synthetic GHRH(1-29) amide. Lyophilized research reagent.',
  long_description = 'Sermorelin (GRF 1-29 NH2) is a synthetic peptide corresponding to the first 29 amino acids of human growth hormone-releasing hormone (GHRH). Supplied as a lyophilized powder for in-vitro GHRH receptor studies. For laboratory research use only.'
WHERE slug = 'sermorelin-10mg';

UPDATE products SET goals = ARRAY['Peptide Blends']::TEXT[], compound = 'Proprietary Peptide Blend',
  description = 'Proprietary multi-peptide formulation in a single lyophilized vial.',
  long_description = 'KLOW Blend is a proprietary lyophilized formulation containing multiple research peptides in a single vial. Contact support for composition details. For laboratory research use only.'
WHERE slug = 'klow-blend-80mg';

UPDATE products SET goals = ARRAY['Reagents']::TEXT[], compound = '0.9% Benzyl Alcohol in Sterile Water',
  description = 'Sterile water with 0.9% benzyl alcohol for reconstituting lyophilized reagents.',
  long_description = 'Bacteriostatic water is USP-grade sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. Used in the laboratory to reconstitute lyophilized peptides for in-vitro research. Not for human or veterinary use.'
WHERE slug = 'bacteriostatic-water-10ml';

COMMIT;
