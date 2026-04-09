/**
 * POST /api/webhooks/trillet
 * Receives call-end events from Trillet.
 * For Pro + Agency clients: queues a 3-touch SMS/email follow-up sequence.
 * For Agency clients: fires CRM webhook with call data.
 *
 * Configure in Trillet dashboard: Settings → Webhooks → add this URL.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { pushLeadToGHL } from "@/lib/ghl";

interface TrilletCallEvent {
  agentId?: string;
  callId?: string;
  callerNumber?: string;
  callerName?: string;
  summary?: string;
  transcript?: string;
  recordingUrl?: string;
  duration?: number;
  status?: string;
}

export async function POST(req: NextRequest) {
  let event: TrilletCallEvent;
  try {
    event = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { agentId, callId, callerNumber, callerName, summary, transcript, recordingUrl, duration } = event;

  if (!agentId || !callerNumber) {
    return NextResponse.json({ ok: true, skipped: "missing agentId or callerNumber" });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  // Look up client by their Trillet agent/flow ID
  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("id, plan, crm_webhook_url, name, email")
    .or(`trillet_agent_id.eq.${agentId}`)
    .single();

  if (!client) {
    return NextResponse.json({ ok: true, skipped: "no client for agentId" });
  }

  const isPro = ["pro", "agency"].includes(client.plan);
  const isAgency = client.plan === "agency";
  const now = new Date();

  // ── Push lead to GHL (new callers → create contact, returning → add note) ─
  try {
    await pushLeadToGHL({
      callerNumber,
      callerName: callerName || undefined,
      summary: summary || undefined,
      transcript: transcript || undefined,
      recordingUrl: recordingUrl || undefined,
      duration: duration || undefined,
      agentName: client.name,
    });
  } catch (err) {
    console.error("[trillet webhook] GHL push error:", err);
  }

  // ── 3-touch follow-up queue (Pro + Agency) ─────────────────────────────────
  if (isPro && callerNumber) {
    const touches = [
      { touch_number: 1, send_at: new Date(now.getTime() + 1 * 60 * 60 * 1000) },   // +1h
      { touch_number: 2, send_at: new Date(now.getTime() + 24 * 60 * 60 * 1000) },  // +24h
      { touch_number: 3, send_at: new Date(now.getTime() + 48 * 60 * 60 * 1000) },  // +48h
    ];

    const rows = touches.map((t) => ({
      client_id: client.id,
      caller_number: callerNumber,
      caller_name: callerName || null,
      call_summary: summary || null,
      touch_number: t.touch_number,
      send_at: t.send_at.toISOString(),
      sent: false,
    }));

    const { error: insertErr } = await supabaseAdmin.from("sms_followups").insert(rows);
    if (insertErr) {
      console.error("[trillet webhook] followup insert error:", insertErr.message);
    }
  }

  // ── CRM webhook (Agency only) ──────────────────────────────────────────────
  if (isAgency && client.crm_webhook_url) {
    try {
      await fetch(client.crm_webhook_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "allthecalls.ai",
          clientName: client.name,
          callId,
          agentId,
          callerNumber,
          callerName: callerName || null,
          summary: summary || null,
          transcript: transcript || null,
          durationSeconds: duration || null,
          calledAt: now.toISOString(),
        }),
      });
    } catch (err) {
      console.error("[trillet webhook] CRM webhook error:", err);
    }
  }

  // Debug: inline GHL test to see exact response
  let ghlDebug: unknown = null;
  const ghlKey = process.env.GHL_API_KEY?.trim();
  if (ghlKey && callerNumber) {
    try {
      const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ghlKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID?.trim() || "PeMkLPdDHTeQ4OWJXrGC",
          phone: callerNumber,
          name: callerName || "Unknown Caller",
          source: "AllTheCalls AI — debug test",
          tags: ["debug-test"],
        }),
      });
      ghlDebug = { status: ghlRes.status, body: await ghlRes.json() };
    } catch (err) {
      ghlDebug = { error: String(err) };
    }
  }

  return NextResponse.json({ ok: true, ghlConfigured: !!ghlKey, client: client.name, ghlDebug });
}
