-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Creates the email_queue table for automated email sequences

CREATE TABLE IF NOT EXISTS email_queue (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email text NOT NULL,
  recipient_name text,
  sequence_name text NOT NULL,       -- e.g. 'demo_followup', 'trial_onboarding', 'churn_prevention', 'payment_failed'
  step_number integer NOT NULL,      -- which email in the sequence (1, 2, 3...)
  subject text NOT NULL,
  body_text text NOT NULL,
  send_at timestamptz NOT NULL,
  sent boolean DEFAULT false,
  sent_at timestamptz,
  cancelled boolean DEFAULT false,   -- set true if user converts/upgrades mid-sequence
  client_id uuid REFERENCES clients(id),
  metadata jsonb DEFAULT '{}',       -- extra data (plan name, call summary, etc.)
  created_at timestamptz DEFAULT now(),

  UNIQUE(recipient_email, sequence_name, step_number)  -- prevent duplicate emails
);

-- Index for the send cron to efficiently find pending emails
CREATE INDEX IF NOT EXISTS idx_email_queue_pending
  ON email_queue(send_at)
  WHERE sent = false AND cancelled = false;

-- Index for cancelling sequences
CREATE INDEX IF NOT EXISTS idx_email_queue_cancel
  ON email_queue(recipient_email, sequence_name)
  WHERE sent = false AND cancelled = false;
