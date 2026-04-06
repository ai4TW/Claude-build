-- Migration 003 — Add message_override to sms_followups
-- Run in Supabase SQL Editor

ALTER TABLE sms_followups
  ADD COLUMN IF NOT EXISTS message_override text;
