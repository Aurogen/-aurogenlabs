-- Partner applications: add every column the site uses to a table created with an older shape
-- (the form failed with PGRST204, "column not found"). Only adds what is missing; never deletes data.
-- Safe to run more than once. Run in Supabase > SQL Editor.

ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS website     TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS audience    TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS message     TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS status      TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS answers     JSONB NOT NULL DEFAULT '[]';
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_affiliate_applications_status ON affiliate_applications(status);

-- Tell the Supabase API about the new columns right away
NOTIFY pgrst, 'reload schema';

-- Check: the table's columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'affiliate_applications'
ORDER BY ordinal_position;

-- Columns that already existed may have no default: new applications start as pending.
ALTER TABLE affiliate_applications ALTER COLUMN status     SET DEFAULT 'pending';
ALTER TABLE affiliate_applications ALTER COLUMN created_at SET DEFAULT NOW();
UPDATE affiliate_applications SET status = 'pending' WHERE status IS NULL;
UPDATE affiliate_applications SET created_at = NOW() WHERE created_at IS NULL;
