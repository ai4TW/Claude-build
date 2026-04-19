/**
 * POST /api/webhooks/trillet
 *
 * Call-completion webhook from Trillet. Handles BOTH:
 *   - Inbound calls (a caller dials the AI)
 *   - Outbound calls fired by /api/outbound on the webhook-bridge
 *     (metadata.ghl_contact_id threads the GHL contact through)
 *
 * For every client (single-tier as of April 17, 2026), we:
 *   1. Look up the client by Trillet agent ID
 *   2. Push a full call record to GHL — contact + pipeline + note + stats
 *   3. Queue a 3-touch SMS follow-up in Supabase
 *   4. Fire any per-client `crm_webhook_url` for external CRMs
 *
 * Configure in Trillet dashboard: Settings → Webhooks → add this URL.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { pushLeadToGHL, type Direction } from "@/lib/ghl";

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
  direction?: string;
  metadata?: Record<string, string>;
  dynamic_variables?: Record<string, string>;
}

// Read a field from a Trillet payload accepting any of several likely names.
function pick<T = string>(
  obj: Record<string, unknown>,
  keys: string[],
): T | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== "") return v as T;
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  console.log("[trillet webhook] RAW PAYLOAD:", rawBody);

  if (supabaseAdmin) {
    supabaseAdmin.from("webhook_debug_log").insert({ source: "trillet", payload: rawBody }).then();
  }

  let event: TrilletCallEvent & Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", rawBody: rawBody.slice(0, 500) },
      { status: 400 },
    );
  }

  console.log("[trillet webhook] KEYS:", Object.keys(event));

  // ── Normalize field names (Trillet has been inconsistent) ────────────
  const phone = pick<string>(event, [
    "callerNumber",
    "caller_number",
    "from",
    "phone",
    "phoneNumber",
    "to", // outbound calls: "to" is who we dialed
  ]);
  const callerName = pick<string>(event, [
    "callerName",
    "caller_name",
    "name",
    "contactName",
  ]);
  const summary = pick<string>(event, ["summary", "call_summary", "analysis"]);
  const transcript = pick<string>(event, ["transcript", "call_transcript"]);
  const recordingUrl = pick<string>(event, [
    "recordingUrl",
    "recording_url",
    "recording",
  ]);
  const duration = pick<number>(event, ["duration", "call_duration"]);
  const agentId = pick<string>(event, ["agentId", "agent_id", "pathwayId", "call_agent_id"]);
  const callId = pick<string>(event, ["callId", "call_id"]);
  const directionRaw = pick<string>(event, ["direction", "call_direction"]);
  const direction: Direction =
    directionRaw && directionRaw.toLowerCase().startsWith("out") ? "outbound" : "inbound";

  // Metadata + dynamic_variables — populated by /api/outbound when this is
  // a callback for one of our speed-to-lead calls.
  const metadata = (event.metadata || {}) as Record<string, string>;
  const dynamicVars = (event.dynamic_variables || {}) as Record<string, string>;

  const ghlContactId = metadata.ghl_contact_id || undefined;
  const leadSource = metadata.lead_source || dynamicVars.lead_source || undefined;

  // If the AI collected a nicer name during the call, prefer dynamic_variables
  const effectiveName =
    callerName ||
    [dynamicVars.first_name, dynamicVars.last_name].filter(Boolean).join(" ") ||
    undefined;

  if (!agentId && !phone && !ghlContactId) {
    return NextResponse.json({
      ok: true,
      skipped: "no agent, phone, or contact id",
      keys: Object.keys(event),
      raw: rawBody.slice(0, 500),
    });
  }

  if (!agentId) {
    return NextResponse.json({ ok: true, skipped: "missing agentId", keys: Object.keys(event) });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  // ── Look up client by Trillet agent/flow ID ───────────────────────────
  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("id, plan, crm_webhook_url, name, email")
    .or(`trillet_agent_id.eq.${agentId}`)
    .single();

  if (!client) {
    return NextResponse.json({ ok: true, skipped: "no client for agentId" });
  }

  const now = new Date();

  // ── Push to GHL (every client — single-tier now) ──────────────────────
  if (phone || ghlContactId) {
    try {
      await pushLeadToGHL(
        {
          callerNumber: phone || "",
          callerName: effectiveName,
          summary,
          transcript,
          recordingUrl,
          duration,
          agentName: client.name,
          direction,
          leadSource,
        },
        {
          existingContactId: ghlContactId,
          extraTags: [client.name ? `client-${client.name.toLowerCase().replace(/\s+/g, "-")}` : ""].filter(
            Boolean,
          ),
        },
      );
    } catch (err) {
      console.error("[trillet webhook] GHL push error:", err);
    }
  }

  // ── 3-touch SMS follow-up queue (every client) ────────────────────────
  // Skip outbound calls where we already reached the lead live — follow-ups
  // are an inbound-only mechanism (seller called us, we text back).
  if (direction === "inbound" && phone) {
    const touches = [
      { touch_number: 1, send_at: new Date(now.getTime() + 1 * 60 * 60 * 1000) }, // +1h
      { touch_number: 2, send_at: new Date(now.getTime() + 24 * 60 * 60 * 1000) }, // +24h
      { touch_number: 3, send_at: new Date(now.getTime() + 48 * 60 * 60 * 1000) }, // +48h
    ];

    const rows = touches.map((t) => ({
      client_id: client.id,
      caller_number: phone,
      caller_name: effectiveName || null,
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

  // ── Per-client CRM webhook (any client with a URL configured) ─────────
  if (client.crm_webhook_url) {
    try {
      await fetch(client.crm_webhook_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "allthecalls.ai",
          clientName: client.name,
          callId: callId || null,
          agentId,
          direction,
          callerNumber: phone || null,
          callerName: effectiveName || null,
          summary: summary || null,
          transcript: transcript || null,
          durationSeconds: duration || null,
          recordingUrl: recordingUrl || null,
          leadSource: leadSource || null,
          ghlContactId: ghlContactId || null,
          metadata,
          calledAt: now.toISOString(),
        }),
      });
    } catch (err) {
      console.error("[trillet webhook] CRM webhook error:", err);
    }
  }

  return NextResponse.json({ ok: true, direction, clientId: client.id });
}
