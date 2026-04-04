import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Client = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  brokerage: string | null;
  phone: string | null;
  trillet_agent_id: string | null;
  trillet_phone_number: string | null;
  plan: string;
  onboarding_completed: boolean;
  ai_name: string;
  ai_intro: string | null;
  created_at: string;
};
