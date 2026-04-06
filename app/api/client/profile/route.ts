/**
 * PATCH /api/client/profile
 * Saves client profile fields (calendly_url, crm_webhook_url) to Supabase.
 * Auth: session cookie required.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const allowed = ["calendly_url", "crm_webhook_url"] as const;
  const updates: Partial<Record<(typeof allowed)[number], string | null>> = {};

  for (const key of allowed) {
    if (key in body) {
      const val = body[key]?.trim() || null;
      updates[key] = val;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("clients")
    .update(updates)
    .eq("email", session.email.toLowerCase().trim());

  if (error) {
    console.error("[client/profile] DB update error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
