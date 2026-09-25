-- QuickBooks OAuth tokens (one row per connected company)
CREATE TABLE IF NOT EXISTS quickbooks_tokens (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  realm_id        TEXT NOT NULL UNIQUE,          -- QuickBooks company ID
  access_token    TEXT NOT NULL,
  refresh_token   TEXT NOT NULL,
  token_type      TEXT NOT NULL DEFAULT 'bearer',
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qb_tokens_realm_id ON quickbooks_tokens(realm_id);
