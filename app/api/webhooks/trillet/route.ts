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
  // Capture raw body for debugging what Trillet sends
  const rawBody = await req.text();
  console.log("[trillet webhook] RAW PAYLOAD:", rawBody);

  let event: TrilletCallEvent & Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON", rawBody: rawBody.slice(0, 500) }, { status: 400 });
  }

  // Log all keys Trillet sends so we know the field names
  console.log("[trillet webhook] KEYS:", Object.keys(event));

  const { agentId, callId, callerNumber, callerName, summary, transcript, recordingUrl, duration } = event;

  // Also check alternative field names Trillet might use
  const phone = callerNumber || (event.caller_number as string) || (event.from as string) || (event.phone as string) || (event.phoneNumber as string);
  const name = callerName || (event.caller_name as string) || (event.name as string) || (event.contactName as string);
  const sum = summary || (event.call_summary as string) || (event.analysis as string);
  const trans = transcript || (event.call_transcript as string);
  const rec = recordingUrl || (event.recording_url as string) || (event.recording as string);
  const dur = duration || (event.call_duration as number);
  const agent = agentId || (event.agent_id as string) || (event.pathwayId as string);

  if (!agent && !phone) {
    return NextResponse.json({ ok: true, skipped: "no agent or phone", keys: Object.keys(event), raw: rawBody.slice(0, 500) });
  }

  // Use the resolved values going forward
  const resolvedCallerNumber = phone;
  const resolvedCallerName = name;
  const resolvedSummary = sum;
  const resolvedTranscript = trans;
  const resolvedRecordingUrl = rec;
  const resolvedDuration = dur;
  const resolvedAgentId = agent;

  if (!resolvedAgentId || !resolvedCallerNumber) {
    return NextResponse.json({ ok: true, skipped: "missing agentId or callerNumber after resolve", keys: Object.keys(event) });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  // Look up client by their Trillet agent/flow ID
  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("id, plan, crm_webhook_url, name, email")
    .or(`trillet_agent_id.eq.${resolvedAgentId}`)
    .single();

  if (!client) {
    return NextResponse.json({ ok: true, skipped: "no client for agentId" });
  }

  const isPro = ["pro", "agency"].includes(client.plan);
  const isAgency = client.plan === "agency";
  const now = new Date();

  // ── Push lead to GHL (new callers → create contact, returning → add note) ─
  const ghlKey = process.env.GHL_API_KEY?.trim();
  const ghlLocationId = (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim();
  const ghlPipelineId = process.env.GHL_PIPELINE_ID?.trim();
  if (ghlKey && resolvedCallerNumber) {
    try {
      const ghlHeaders = {
        Authorization: `Bearer ${ghlKey}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      };

      // Step 1: Create or find existing contact
      const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({
          locationId: ghlLocationId,
          phone: resolvedCallerNumber,
          name: resolvedCallerName || "Unknown Caller",
          source: `AllTheCalls AI — ${client.name}`,
          tags: ["inbound-call", "demo-line", "trillet"],
        }),
      });
      const createData = await createRes.json();

      let contactId: string | null = null;
      let isNewContact = false;

      if (createRes.ok && createData.contact?.id) {
        contactId = createData.contact.id;
        isNewContact = true;
        console.log(`[ghl] NEW contact: ${contactId}`);
      } else if (createRes.status === 400 && createData.meta?.contactId) {
        contactId = createData.meta.contactId;
        console.log(`[ghl] RETURNING caller: ${contactId}`);
      } else {
        console.error("[ghl] Contact creation failed:", createRes.status, JSON.stringify(createData));
      }

      if (contactId) {
        // Step 2: Add to pipeline (new callers only)
        if (isNewContact && ghlPipelineId) {
          await fetch("https://services.leadconnectorhq.com/opportunities/", {
            method: "POST",
            headers: ghlHeaders,
            body: JSON.stringify({
              pipelineId: ghlPipelineId,
              locationId: ghlLocationId,
              contactId,
              name: "Inbound Call Lead",
              status: "open",
              source: "AllTheCalls AI",
            }),
          });
          console.log(`[ghl] Added to pipeline`);
        }

        // Step 3: Add call note with summary, transcript, recording
        const durStr = resolvedDuration ? `${Math.floor(Number(resolvedDuration) / 60)}m ${Number(resolvedDuration) % 60}s` : "unknown";
        const noteLines = [
          `📞 Call — ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" })} — Duration: ${durStr}`,
          `Agent: ${client.name}`,
          resolvedCallerName ? `Caller: ${resolvedCallerName}` : null,
          resolvedSummary ? `\n--- Summary ---\n${resolvedSummary}` : null,
          resolvedTranscript ? `\n--- Transcript ---\n${resolvedTranscript.length > 3000 ? resolvedTranscript.slice(0, 3000) + "\n[truncated]" : resolvedTranscript}` : null,
          resolvedRecordingUrl ? `\n🔊 Recording: ${resolvedRecordingUrl}` : null,
        ].filter(Boolean).join("\n");

        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
          method: "POST",
          headers: ghlHeaders,
          body: JSON.stringify({ body: noteLines }),
        });
        console.log(`[ghl] Call note added`);
      }
    } catch (err) {
      console.error("[trillet webhook] GHL error:", err);
    }
  }

  // ── 3-touch follow-up queue (Pro + Agency) ─────────────────────────────────
  if (isPro && resolvedCallerNumber) {
    const touches = [
      { touch_number: 1, send_at: new Date(now.getTime() + 1 * 60 * 60 * 1000) },   // +1h
      { touch_number: 2, send_at: new Date(now.getTime() + 24 * 60 * 60 * 1000) },  // +24h
      { touch_number: 3, send_at: new Date(now.getTime() + 48 * 60 * 60 * 1000) },  // +48h
    ];

    const rows = touches.map((t) => ({
      client_id: client.id,
      caller_number: resolvedCallerNumber,
      caller_name: resolvedCallerName || null,
      call_summary: resolvedSummary || null,
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
          callId: callId || null,
          agentId: resolvedAgentId,
          callerNumber: resolvedCallerNumber,
          callerName: resolvedCallerName || null,
          summary: resolvedSummary || null,
          transcript: resolvedTranscript || null,
          durationSeconds: resolvedDuration || null,
          calledAt: now.toISOString(),
        }),
      });
    } catch (err) {
      console.error("[trillet webhook] CRM webhook error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
