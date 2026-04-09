/**
 * GET /api/debug/webhook-log — shows last 10 webhook payloads received
 * POST /api/debug/webhook-log — saves a payload (called by trillet webhook)
 *
 * Temporary debug endpoint. Remove after Trillet integration is confirmed working.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const { data } = await supabaseAdmin
    .from("webhook_debug_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({ logs: data || [] });
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const raw = await req.text();

  await supabaseAdmin.from("webhook_debug_log").insert({
    source: "trillet",
    payload: raw,
  });

  return NextResponse.json({ ok: true });
}
