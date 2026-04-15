-- Lead capture: pricing page video gate
create extension if not exists "pgcrypto";

create table if not exists public.video_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  email text not null,
  phone text,
  business_type text,
  source text default 'pricing-vsl',
  user_agent text,
  referrer text,
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists video_leads_email_idx
  on public.video_leads (lower(email));

create index if not exists video_leads_created_idx
  on public.video_leads (created_at desc);

alter table public.video_leads enable row level security;
