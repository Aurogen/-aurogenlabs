-- Partner application form editable from the admin panel.
-- Safe to run more than once. Run in Supabase > SQL Editor.

BEGIN;

-- Key/value settings edited from the admin panel (the partner form lives under key 'partner_form')
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT        PRIMARY KEY,
  value      JSONB       NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Applications keep a snapshot of every question and answer, plus private review notes
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS answers     JSONB NOT NULL DEFAULT '[]';
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE affiliate_applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

COMMIT;
