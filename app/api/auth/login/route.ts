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
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, trillet_agent_id")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (clientError || !client) {
    return NextResponse.json(
      { error: "Account setup incomplete. Please contact support at hello@allthecalls.com" },
      { status: 403 }
    );
  }

  const token = await createSession({
    clientId: client.id,
    clientName: client.name,
    subAccountId: client.id,
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
