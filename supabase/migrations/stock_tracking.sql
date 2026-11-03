-- Automatic stock: paid orders subtract units, and a product goes out of stock when it reaches 0.
-- Run in Supabase > SQL Editor. Safe to run more than once.

-- Subtracts the quantities of one order in a single statement (no lost updates when two orders
-- are paid at the same moment). Returns the products that are now sold out or running low.
CREATE OR REPLACE FUNCTION decrement_stock(p_items JSONB)
RETURNS TABLE (slug TEXT, name TEXT, concentration TEXT, stock_count INTEGER, in_stock BOOLEAN)
LANGUAGE sql
AS $$
  WITH wanted AS (
    SELECT i->>'slug' AS slug, SUM(GREATEST((i->>'quantity')::INT, 0)) AS qty
      FROM jsonb_array_elements(p_items) AS i
     WHERE i ? 'slug'
     GROUP BY 1
  )
  UPDATE products AS p
     SET stock_count = GREATEST(p.stock_count - w.qty, 0),
         in_stock    = p.in_stock AND p.stock_count - w.qty > 0,
         updated_at  = NOW()
    FROM wanted AS w
   WHERE p.slug = w.slug
  RETURNING p.slug, p.name, p.concentration, p.stock_count, p.in_stock;
$$;

-- Only the server (service role) may call it.
REVOKE ALL ON FUNCTION decrement_stock(JSONB) FROM PUBLIC;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    EXECUTE 'REVOKE ALL ON FUNCTION decrement_stock(JSONB) FROM anon, authenticated';
  END IF;
END $$;

-- Check: current stock of the products on the store. Set the real units in Admin > Products.
SELECT slug, stock_count, in_stock FROM products WHERE visible ORDER BY sort_order;
