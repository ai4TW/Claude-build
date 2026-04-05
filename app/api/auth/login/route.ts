import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE_NAME } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey || !supabaseAdmin) {
    return NextResponse.json(
      { error: "Authentication service unavailable. Please contact support." },
      { status: 503 }
    );
  }

  // Authenticate against Supabase Auth
  const authClient = createClient(url, anonKey);
  const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });

  if (authError || !authData.user) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  // Look up client record via service role to bypass RLS
  let { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, trillet_agent_id, trillet_agent_name")
    .eq("email", email.toLowerCase().trim())
    .single();

  // Dev bypass: if no client row exists but auth succeeded, auto-create a placeholder row.
  // Gated by ENABLE_DEV_BYPASS env var — never runs in production unless explicitly set.
  if ((clientError || !client) && process.env.ENABLE_DEV_BYPASS === "true") {
    const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const { data: created } = await supabaseAdmin
      .from("clients")
      .upsert(
        {
          user_id: authData.user.id,
          email: email.toLowerCase().trim(),
          name: nameFromEmail,
          brokerage: "Test Account",
          plan: "pro",
          onboarding_completed: false,
        },
        { onConflict: "email" }
      )
      .select("id, name, email, trillet_agent_id, trillet_agent_name")
      .single();
    client = created;
    clientError = null;
  }

  if (clientError || !client) {
    return NextResponse.json(
      { error: "Account setup incomplete. Please contact support at hello@allthecalls.ai" },
      { status: 403 }
    );
  }

  const token = await createSession({
    clientId: client.id,
    clientName: client.name,
    email: client.email,
    subAccountId: (client as Record<string, string>).trillet_agent_name || "",  // linked Trillet agent ID
    agentId: client.trillet_agent_id || "",
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
