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
  const ghlKey = process.env.GHL_API_KEY?.trim();
  const ghlLocationId = (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim();
  const ghlPipelineId = process.env.GHL_PIPELINE_ID?.trim();
  if (ghlKey && callerNumber) {
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
          phone: callerNumber,
          name: callerName || "Unknown Caller",
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
        const dur = duration ? `${Math.floor(duration / 60)}m ${duration % 60}s` : "unknown";
        const noteLines = [
          `📞 Call — ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" })} — Duration: ${dur}`,
          `Agent: ${client.name}`,
          callerName ? `Caller: ${callerName}` : null,
          summary ? `\n--- Summary ---\n${summary}` : null,
          transcript ? `\n--- Transcript ---\n${transcript.length > 3000 ? transcript.slice(0, 3000) + "\n[truncated]" : transcript}` : null,
          recordingUrl ? `\n🔊 Recording: ${recordingUrl}` : null,
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

  return NextResponse.json({ ok: true });
}
