import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, brokerage, plan, trillet_agent_id, trillet_agent_name, phone_number, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clients: data ?? [] });
}
