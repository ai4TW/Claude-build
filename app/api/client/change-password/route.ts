/**
 * POST /api/client/change-password
 * Updates the client's password in Supabase Auth.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.clientId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { newPassword } = body as { newPassword?: string };

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  const { data: client, error: lookupError } = await supabaseAdmin
    .from("clients")
    .select("user_id")
    .eq("id", session.clientId)
    .single();

  if (lookupError || !client?.user_id) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    client.user_id,
    { password: newPassword }
  );

  if (authError) {
    console.error("[change-password] Auth update error:", authError.message);
    return NextResponse.json({ error: "Failed to update password. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
