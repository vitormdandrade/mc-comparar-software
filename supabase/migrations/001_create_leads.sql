-- Supabase Migration: Create leads table for Match SaaS
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT,
  company_size TEXT,
  budget TEXT,
  pain_points TEXT[],
  matched_tools TEXT[],
  source TEXT DEFAULT 'match-saas',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE leads IS 'Leads capturados pelo Match SaaS wizard';
