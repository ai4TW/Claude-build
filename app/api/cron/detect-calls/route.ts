/**
 * GET /api/cron/detect-calls
 * Runs every hour via Vercel cron.
 * Polls Trillet call history for each Pro + Agency client.
 * For each new call not already queued, uses Claude to decide
 * whether to follow up and generates personalized messages.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { pushLeadToGHL } from "@/lib/ghl";

const TRILLET = "https://api.trillet.ai";
const ANTHROPIC = "https://api.anthropic.com/v1/messages";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

interface CallRecord {
  _id?: string;
  callId?: string;
  startTime?: string;
  duration?: number;
  callerNumber?: string;
  callerName?: string;
  summary?: string;
}

interface ClientRow {
  id: string;
  name: string;
  email: string;
  plan: string;
  trillet_agent_id: string | null;
  calendly_url: string | null;
}

interface FollowUpDecision {
  should_follow_up: boolean;
  skip_touch_1: boolean;
  touch_1: string | null;
  touch_2: string | null;
  touch_3: string;
}

const DEMO_URL = "https://allthecalls.ai/just-happened";

function getDemoFollowUp(callerName: string): FollowUpDecision {
  const name = callerName ? ` ${callerName}` : "";
  return {
    should_follow_up: true,
    skip_touch_1: false,
    touch_1: `Hey${name} — that was an AI you just spoke with. Here's what happened on that call: ${DEMO_URL}`,
    touch_2: `Brayden here — what did you think of the demo? Happy to build one just like it for your business.`,
    touch_3: `Every missed call is a missed client. This is what it looks like when you never miss one: ${DEMO_URL}`,
  };
}

async function getFollowUpDecision(
  call: CallRecord,
  clientName: string,
  calendlyUrl: string | null
): Promise<FollowUpDecision> {
  const bookingLink = calendlyUrl || "https://allthecalls.ai";
  const summary = call.summary || "";
  const callerName = call.callerName || "";

  // Demo accounts use the just-happened page — send demo-specific texts
  if (calendlyUrl === DEMO_URL) {
    return getDemoFollowUp(callerName);
  }

  const prompt = `You are analyzing a phone call to decide on a follow-up SMS sequence.

Business owner: ${clientName}
Caller name: ${callerName || "unknown"}
Call duration: ${call.duration ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s` : "unknown"}
Call summary: ${summary || "No summary available"}
Booking link: ${bookingLink}

Decide on a 3-touch SMS follow-up sequence. Rules:
- If the caller already booked an appointment or explicitly said they would, set skip_touch_1 to true
- If the call was very short (<30 seconds) or a wrong number, set should_follow_up to false
- Touch 1 (sent 1hr after call): Personal, warm, references something from the actual call. Include the booking link only if they didn't already get it.
- Touch 2 (sent 24hr after call): Brief check-in. No pressure. No booking link repeat.
- Touch 3 (sent 48hr after call): Pure value — a useful insight, tip, or resource relevant to their situation. NO follow-up language. NO "last chance". NO mention of booking.

Keep all messages under 160 characters. Sound human, not automated.

Respond with ONLY valid JSON in this exact format:
{
  "should_follow_up": true,
  "skip_touch_1": false,
  "touch_1": "SMS text here",
  "touch_2": "SMS text here",
  "touch_3": "SMS text here"
}`;

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    // Fallback to generic messages if Claude unavailable
    return {
      should_follow_up: true,
      skip_touch_1: false,
      touch_1: `Hi${callerName ? ` ${callerName}` : ""}, ${clientName}'s team here — thanks for calling. Happy to answer any questions. Book a time: ${bookingLink}`,
      touch_2: `Following up from ${clientName}'s office. Let us know if you need anything — we're here.`,
      touch_3: `Quick tip: the best time to lock in your plans is before the market shifts. Whenever you're ready, we're here.`,
    };
  }

  try {
    const res = await fetch(ANTHROPIC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Claude API error ${res.status}`);

    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in Claude response");

    return JSON.parse(jsonMatch[0]) as FollowUpDecision;
  } catch (err) {
    console.error("[detect-calls] Claude decision failed, using fallback:", err);
    return {
      should_follow_up: true,
      skip_touch_1: false,
      touch_1: `Hi${callerName ? ` ${callerName}` : ""}, ${clientName}'s team here — thanks for calling. Book a time: ${bookingLink}`,
      touch_2: `Following up from ${clientName}'s office. Let us know if you need anything.`,
      touch_3: `Quick tip: the best time to lock in your plans is before the market shifts. Here whenever you're ready.`,
    };
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers ? new Headers(req.headers).get("authorization") : null;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const { data: clients, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, plan, trillet_agent_id, calendly_url")
    .in("plan", ["pro", "agency"])
    .not("trillet_agent_id", "is", null);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const oneHourAgo = new Date(Date.now() - 65 * 60 * 1000).toISOString(); // 65 min window to avoid gaps
  const now = new Date();

  let queued = 0;
  let skipped = 0;

  for (const client of (clients || []) as ClientRow[]) {
    if (!client.trillet_agent_id) continue;

    let calls: CallRecord[] = [];
    try {
      const res = await fetch(
        `${TRILLET}/v1/api/call-history?agentId=${client.trillet_agent_id}&limit=20`,
        { headers: trilletHeaders() }
      );
      if (res.ok) {
        const data = await res.json();
        const all: CallRecord[] = Array.isArray(data) ? data : data.calls || [];
        calls = all.filter((c) => (c.startTime || "") >= oneHourAgo);
      }
    } catch {
      // Trillet 500s on zero calls — safe to ignore
    }

    for (const call of calls) {
      const callerId = call.callerNumber;
      if (!callerId) continue;

      // Check if we already queued follow-ups for this caller in the last 2 hours
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      const { data: existing } = await supabaseAdmin
        .from("sms_followups")
        .select("id")
        .eq("client_id", client.id)
        .eq("caller_number", callerId)
        .gte("created_at", twoHoursAgo)
        .limit(1);

      if (existing && existing.length > 0) {
        skipped++;
        continue;
      }

      // Push lead to GHL (deduplicates by phone, safe to call multiple times)
      pushLeadToGHL({
        callerNumber: callerId,
        callerName: call.callerName || undefined,
        summary: call.summary || undefined,
        duration: call.duration || undefined,
        agentName: client.name,
      }).catch(err => console.error("[detect-calls] GHL push error:", err));

      // Ask Claude whether and how to follow up
      const decision = await getFollowUpDecision(call, client.name, client.calendly_url);

      if (!decision.should_follow_up) {
        skipped++;
        continue;
      }

      const rows = [];

      if (!decision.skip_touch_1 && decision.touch_1) {
        rows.push({
          client_id: client.id,
          caller_number: callerId,
          caller_name: call.callerName || null,
          call_summary: call.summary || null,
          touch_number: 1,
          message_override: decision.touch_1,
          send_at: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(),
          sent: false,
        });
      }

      if (decision.touch_2) {
        rows.push({
          client_id: client.id,
          caller_number: callerId,
          caller_name: call.callerName || null,
          call_summary: call.summary || null,
          touch_number: 2,
          message_override: decision.touch_2,
          send_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          sent: false,
        });
      }

      rows.push({
        client_id: client.id,
        caller_number: callerId,
        caller_name: call.callerName || null,
        call_summary: call.summary || null,
        touch_number: 3,
        message_override: decision.touch_3,
        send_at: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
        sent: false,
      });

      if (rows.length > 0) {
        const { error: insertErr } = await supabaseAdmin.from("sms_followups").insert(rows);
        if (insertErr) {
          console.error("[detect-calls] insert error:", insertErr.message);
        } else {
          queued += rows.length;
        }
      }
    }
  }

  return NextResponse.json({ ok: true, queued, skipped });
}
