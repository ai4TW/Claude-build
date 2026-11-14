-- Control-plane table for the automated client-onboarding pipeline.
-- One row per paid signup. stripe_session_id is the idempotency anchor:
-- a double-fired webhook or a refresh-mashed browser must never create
-- two jobs for one payment.
create extension if not exists "pgcrypto";

create table if not exists public.provisioning_jobs (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  tier text not null check (tier in ('starter', 'growth', 'pro')),
  vertical text not null default 'plumbing',
  owner_email text not null,
  business_facts jsonb not null default '{}'::jsonb,
  status text not null default 'pending_intake'
    check (status in ('pending_intake', 'queued', 'provisioning', 'needs_attention', 'live')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists provisioning_jobs_status_idx
  on public.provisioning_jobs (status);

create index if not exists provisioning_jobs_owner_email_idx
  on public.provisioning_jobs (lower(owner_email));

alter table public.provisioning_jobs enable row level security;
-- No policies: only the service-role key (server-side, via supabaseAdmin) can read/write this table.
