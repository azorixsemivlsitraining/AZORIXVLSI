-- Supabase/Postgres migration: create phonepe_webhooks table
-- Run this in Supabase SQL editor or via supabase CLI

CREATE TABLE IF NOT EXISTS public.phonepe_webhooks (
  id bigserial PRIMARY KEY,
  merchant_transaction_id text NULL,
  headers jsonb NULL,
  body jsonb NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for quick lookup by merchant transaction id
CREATE INDEX IF NOT EXISTS idx_phonepe_webhooks_merchant_txn ON public.phonepe_webhooks USING btree(merchant_transaction_id);

-- Index to support recent-first queries
CREATE INDEX IF NOT EXISTS idx_phonepe_webhooks_received_at ON public.phonepe_webhooks USING btree(received_at DESC);

-- Optional: limit growth by retaining only recent N rows (uncomment to enable)
-- CREATE POLICY "allow_read_all" ON public.phonepe_webhooks FOR SELECT USING (true);

-- Grant minimal privileges to service role if needed (adjust role name as appropriate)
-- GRANT SELECT, INSERT ON public.phonepe_webhooks TO service_role;
