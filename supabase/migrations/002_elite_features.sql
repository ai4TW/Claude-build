-- Migration 002 — Elite plan features
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/amvaplgwteeoxyutcegk/sql

-- Add Elite/Pro bolt-on fields to clients table
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS calendly_url text,
  ADD COLUMN IF NOT EXISTS crm_webhook_url text,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text;

-- SMS follow-up queue (3-touch sequence for Pro + Elite clients)
CREATE TABLE IF NOT EXISTS sms_followups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  caller_number text NOT NULL,
  caller_name text,
  call_summary text,
  touch_number integer NOT NULL CHECK (touch_number IN (1, 2, 3)),
  send_at timestamptz NOT NULL,
  sent boolean DEFAULT false,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sms_followups_pending ON sms_followups (send_at)
  WHERE sent = false;

-- Allow service role to access sms_followups (cron runs as service role)
ALTER TABLE sms_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON sms_followups
  USING (true)
  WITH CHECK (true);
