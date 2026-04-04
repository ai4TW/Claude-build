-- AllTheCalls — Supabase Schema
-- Run this in your Supabase SQL editor: https://app.supabase.com → SQL Editor

-- Clients table (maps Supabase auth users to their Trillet agent)
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  name text not null default '',
  email text not null default '',
  brokerage text,
  phone text,
  trillet_agent_id text,
  trillet_phone_number text,
  plan text default 'pro',
  onboarding_completed boolean default false,
  ai_name text default 'Sarah',
  ai_intro text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security — clients only see their own row
alter table clients enable row level security;

create policy "clients_select_own" on clients
  for select using (auth.uid() = user_id);

create policy "clients_insert_own" on clients
  for insert with check (auth.uid() = user_id);

create policy "clients_update_own" on clients
  for update using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at
  before update on clients
  for each row execute function update_updated_at();

-- Cached call logs (synced from Trillet, avoids repeated API calls)
create table if not exists call_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  trillet_call_id text unique,
  caller_number text,
  duration_seconds integer default 0,
  transcript text,
  summary text,
  lead_score integer check (lead_score between 1 and 10),
  appointment_booked boolean default false,
  called_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table call_logs enable row level security;

create policy "call_logs_select_own" on call_logs
  for select using (
    auth.uid() = (select user_id from clients where id = call_logs.client_id)
  );

create policy "call_logs_insert_own" on call_logs
  for insert with check (
    auth.uid() = (select user_id from clients where id = call_logs.client_id)
  );
