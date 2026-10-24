-- Aurogen becomes a supplement store: hide every peptide product and add the supplement line.
-- Safe to run more than once. Run in Supabase > SQL Editor.

BEGIN;

-- Supplement-specific product fields
ALTER TABLE products ADD COLUMN IF NOT EXISTS benefits   TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS directions TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS facts      JSONB  NOT NULL DEFAULT '[]';

-- Take every existing (peptide) product off the store. Rows are kept for order history.
UPDATE products SET visible = false, featured = false;

-- The supplement line (re-running updates the same rows by slug)
INSERT INTO products (
  slug, name, compound, concentration, size, price, original_price, goals, description, long_description,
  in_stock, stock_count, featured, purity, storage, badge, image,
  visible, sort_order, benefits, directions, facts
) VALUES
  ('whey-protein-isolate', 'Whey Protein Isolate', 'French Vanilla', '5 lb', '68 servings', 89.99, 99.99, ARRAY['Protein']::TEXT[], '25 g of fast-absorbing whey isolate per scoop to support muscle recovery.', 'Aurogen Whey Protein Isolate delivers 25 g of high-quality protein per scoop with 5.5 g of naturally occurring BCAAs and minimal sugar and fat. Whey isolate is filtered to remove most lactose, so it mixes smoothly and is easy on digestion. Use it after training to support muscle recovery, or any time of day to help reach your daily protein target.', true, 100, true, '90% protein', 'Cool, dry place', 'Best seller', 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_a4848681-2b49-4613-af9d-0dbe3a663ecc.png', true, 1, ARRAY['25 g protein and 5.5 g BCAAs per serving', 'Supports muscle recovery and growth*', 'Low sugar, low fat, mixes in seconds', 'Third-party tested for label accuracy']::TEXT[], 'Mix 1 scoop (32 g) with 8–10 oz of water or milk. Enjoy after training or between meals.', '[["Serving size","1 scoop (32 g)"],["Servings per container","68"],["Calories","120"],["Protein","25 g"],["Carbohydrates","2 g"],["Sugar","1 g"],["Fat","1 g"]]'::jsonb),
  ('creatine-monohydrate', 'Creatine Monohydrate', 'Unflavored · Micronized', '500 g', '100 servings', 49.99, NULL, ARRAY['Performance']::TEXT[], '5 g of pure micronized creatine per serving for strength and power.', 'Creatine monohydrate is one of the most studied sports supplements. It increases the muscles'' phosphocreatine stores, which helps regenerate energy (ATP) during short, high-intensity efforts like lifting and sprinting. Aurogen Creatine is a single-ingredient, micronized powder: no fillers, no flavors, dissolves easily in any drink.', true, 100, true, 'Single ingredient', 'Cool, dry place', 'Most popular', 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_4cee545f-9d45-47a7-936f-0f1d6815f3c6.png', true, 2, ARRAY['Supports strength and power output*', 'Helps performance in high-intensity training*', 'Micronized for easy mixing', 'Unflavored: add it to water, juice or your shake']::TEXT[], 'Mix 1 scoop (5 g) into 8 oz of any beverage once daily. Take consistently, on training and rest days.', '[["Serving size","1 scoop (5 g)"],["Servings per container","100"],["Creatine monohydrate","5 g"],["Other ingredients","None"]]'::jsonb),
  ('ignite-pre-workout', 'Ignite Pre-Workout', 'Blue Raspberry', '30 servings', '1 tub', 54.99, NULL, ARRAY['Performance']::TEXT[], 'Energy, focus and pump with 200 mg of caffeine per scoop.', 'Ignite is a pre-workout formula built for energy, focus and endurance. Each scoop combines 200 mg of caffeine with L-citrulline, beta-alanine and L-tyrosine to help you start strong and stay locked in through your session. Clear label, clinically studied ingredients, no proprietary blends.', true, 100, true, 'No proprietary blends', 'Cool, dry place', NULL, 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204113_bffcf2aa-f92b-4143-afb0-522a945601f9.png', true, 3, ARRAY['200 mg caffeine for energy and alertness*', '6 g L-citrulline to support blood flow*', '3.2 g beta-alanine to support endurance*', 'Fully disclosed label']::TEXT[], 'Mix 1 scoop with 10–12 oz of cold water 20–30 minutes before training. Do not exceed 1 scoop per day.', '[["Serving size","1 scoop (14 g)"],["Caffeine","200 mg"],["L-Citrulline","6 g"],["Beta-Alanine","3.2 g"],["L-Tyrosine","1 g"]]'::jsonb),
  ('hydrate-electrolyte-mix', 'Hydrate Electrolyte Mix', 'Lemon Lime · Zero Sugar', '30 servings', '1 pouch', 44.99, NULL, ARRAY['Hydration']::TEXT[], 'Sodium, potassium and magnesium to replace what you lose in sweat.', 'Hydrate is a zero-sugar electrolyte drink mix with a balanced blend of sodium, potassium and magnesium. Use it during long or hot training sessions, after heavy sweating, or any day you need better hydration. Light, refreshing lemon-lime flavor.', true, 100, true, 'Zero sugar', 'Cool, dry place', 'New', 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_6c034781-767f-409c-813e-9374c5a4523c.png', true, 4, ARRAY['Replaces electrolytes lost in sweat*', 'Supports hydration and muscle function*', 'Zero sugar, 10 calories', 'Light lemon-lime flavor']::TEXT[], 'Mix 1 scoop with 16 oz of water. Drink during or after exercise, or as needed throughout the day.', '[["Serving size","1 scoop (6 g)"],["Sodium","1,000 mg"],["Potassium","200 mg"],["Magnesium","60 mg"],["Sugar","0 g"]]'::jsonb),
  ('collagen-type-1-3', 'Collagen Type I & III', 'Unflavored · + Vitamin C', '300 g', '30 servings', 59.99, NULL, ARRAY['Wellness']::TEXT[], '10 g of hydrolyzed collagen with vitamin C for skin, hair and joints.', 'Aurogen Collagen provides 10 g of hydrolyzed bovine collagen (types I & III) per serving, plus vitamin C, which the body uses to form collagen, and hyaluronic acid. Unflavored and fully soluble: stir it into coffee, smoothies or water.', true, 100, true, 'Hydrolyzed', 'Cool, dry place', NULL, 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_6f22f418-fd87-487f-900a-562589153a10.png', true, 5, ARRAY['Supports healthy skin, hair and nails*', 'Supports joint and connective tissue health*', 'Vitamin C to support natural collagen formation*', 'Dissolves in hot or cold drinks']::TEXT[], 'Stir 1 scoop (11 g) into 8 oz of any hot or cold beverage once daily.', '[["Serving size","1 scoop (11 g)"],["Hydrolyzed collagen (types I & III)","10 g"],["Vitamin C","90 mg"],["Hyaluronic acid","50 mg"]]'::jsonb),
  ('magnesium-glycinate', 'Magnesium Glycinate', 'High absorption', '200 mg', '120 capsules', 42.99, NULL, ARRAY['Wellness']::TEXT[], 'Gentle, highly absorbable magnesium for recovery, relaxation and sleep.', 'Magnesium takes part in hundreds of processes in the body, including muscle function, energy production and the nervous system. Glycinate is a chelated form that is well absorbed and gentle on the stomach, making it a good choice for evening use as part of your recovery routine.', true, 100, true, 'Chelated form', 'Cool, dry place', NULL, 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_619d1f55-bf45-4c79-8e06-8402fc5c2b8f.png', true, 6, ARRAY['Supports muscle function and recovery*', 'Supports relaxation and restful sleep*', 'Chelated form, gentle on the stomach', 'Vegan capsules']::TEXT[], 'Take 2 capsules daily with water, preferably in the evening.', '[["Serving size","2 capsules"],["Servings per container","60"],["Magnesium (as glycinate)","200 mg"]]'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, compound = EXCLUDED.compound, concentration = EXCLUDED.concentration,
  size = EXCLUDED.size, price = EXCLUDED.price, original_price = EXCLUDED.original_price,
  goals = EXCLUDED.goals, description = EXCLUDED.description, long_description = EXCLUDED.long_description,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured, purity = EXCLUDED.purity,
  storage = EXCLUDED.storage, badge = EXCLUDED.badge, image = EXCLUDED.image,
  visible = EXCLUDED.visible, sort_order = EXCLUDED.sort_order, benefits = EXCLUDED.benefits,
  directions = EXCLUDED.directions, facts = EXCLUDED.facts, updated_at = NOW();

COMMIT;

-- Partner application form: if an admin already saved the form, swap the old research-only
-- agreement and audience example for the supplement versions (only exact, unedited text is replaced).
UPDATE site_settings
   SET value = replace(replace(value::text,
         'I understand all products are for laboratory research use only, and I will not make health, dosing or human-use claims when promoting them.',
         'I will promote Aurogen products honestly: no claims that they diagnose, treat, cure or prevent any disease, and I will clearly disclose my partnership in my content.'),
         'e.g. researchers, lab professionals, science educators',
         'e.g. lifters, runners, CrossFit athletes, busy professionals')::jsonb,
       updated_at = NOW()
 WHERE key = 'partner_form';
