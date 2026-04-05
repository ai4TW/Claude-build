/**
 * POST /api/client/change-email
 * Updates the client's email in both Supabase Auth and the clients table.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.clientId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { newEmail } = body as { newEmail?: string };

  if (!newEmail || !newEmail.includes("@")) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const normalizedEmail = newEmail.toLowerCase().trim();

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  // Look up the Supabase auth user ID from the clients table
  const { data: client, error: lookupError } = await supabaseAdmin
    .from("clients")
    .select("user_id, email")
    .eq("id", session.clientId)
    .single();

  if (lookupError || !client) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (client.email === normalizedEmail) {
    return NextResponse.json({ error: "That's already your current email." }, { status: 400 });
  }

  // Check if new email is already taken
  const { data: existing } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
  }

  // Update Supabase Auth email
  if (client.user_id) {
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      client.user_id,
      { email: normalizedEmail }
    );
    if (authError) {
      console.error("[change-email] Auth update error:", authError.message);
      return NextResponse.json({ error: "Failed to update email. Please try again." }, { status: 500 });
    }
  }

  // Update clients table
  const { error: dbError } = await supabaseAdmin
    .from("clients")
    .update({ email: normalizedEmail })
    .eq("id", session.clientId);

  if (dbError) {
    console.error("[change-email] DB update error:", dbError.message);
    return NextResponse.json({ error: "Email updated in auth but failed to sync. Contact support." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
