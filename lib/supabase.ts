import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export const supabase = getSupabaseClient();
export const supabaseAdmin = getSupabaseAdmin();

export interface Client {
  id: string;
  name: string;
  email: string;
  brokerage: string | null;
  plan: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  trillet_agent_id: string | null;
  trillet_agent_name: string | null;
  phone_number: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
