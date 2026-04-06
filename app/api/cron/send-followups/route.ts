/**
 * GET /api/cron/send-followups
 * Runs every hour via Vercel cron.
 * Picks up pending SMS follow-ups from sms_followups table and sends them via Resend.
 * Add TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_FROM_NUMBER to switch to real SMS.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

interface FollowupRow {
  id: string;
  caller_number: string;
  caller_name: string | null;
  call_summary: string | null;
  touch_number: number;
  clients: {
    name: string;
    email: string;
    calendly_url: string | null;
  } | null;
}

const TOUCH_MESSAGES: Record<number, (callerName: string, agentName: string, calendlyUrl: string | null) => string> = {
  1: (callerName, agentName, calendlyUrl) =>
    `Hi${callerName ? ` ${callerName}` : ""}, ${agentName}'s AI receptionist here. Thanks for calling — we wanted to make sure we connected. Reply to this message or book a time directly: ${calendlyUrl || "https://allthecalls.ai"}`,
  2: (callerName, agentName, calendlyUrl) =>
    `Following up from ${agentName}'s office — just wanted to make sure you got what you needed. Happy to answer any questions. Book here: ${calendlyUrl || "https://allthecalls.ai"}`,
  3: (callerName, agentName, _) =>
    `Last follow-up from ${agentName}'s team — if now isn't the right time, no worries at all. We're here whenever you're ready.`,
};

async function sendViaResend(to: string, subject: string, body: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from: "AllTheCalls <hello@allthecalls.ai>",
      to,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err.slice(0, 200)}`);
  }
}

async function sendViaTwilio(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) throw new Error("Twilio not configured");

  const params = new URLSearchParams({ To: to, From: from, Body: body });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio error ${res.status}: ${err.slice(0, 200)}`);
  }
}

export async function GET(req: Request) {
  // Verify Vercel cron secret
  const authHeader = req.headers ? new Headers(req.headers).get("authorization") : null;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const now = new Date().toISOString();

  const { data: pending, error } = await supabaseAdmin
    .from("sms_followups")
    .select("id, caller_number, caller_name, call_summary, touch_number, clients(name, email, calendly_url)")
    .eq("sent", false)
    .lte("send_at", now)
    .limit(50);

  if (error) {
    console.error("[send-followups] DB error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (pending || []) as unknown as FollowupRow[];
  let sent = 0;
  let failed = 0;

  for (const row of rows) {
    const client = row.clients;
    if (!client) continue;

    const msgFn = TOUCH_MESSAGES[row.touch_number];
    if (!msgFn) continue;

    const message = msgFn(row.caller_name || "", client.name, client.calendly_url);

    try {
      const hasTwilio = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER);

      if (hasTwilio) {
        await sendViaTwilio(row.caller_number, message);
      } else {
        // Fallback: email the client with follow-up details so they can reach out manually
        await sendViaResend(
          client.email,
          `Follow-up reminder — touch ${row.touch_number} for ${row.caller_name || row.caller_number}`,
          `A caller from ${row.caller_number} (${row.caller_name || "unknown"}) needs a follow-up.\n\nSuggested message (touch ${row.touch_number}):\n\n${message}\n\nCall summary: ${row.call_summary || "N/A"}`
        );
      }

      await supabaseAdmin
        .from("sms_followups")
        .update({ sent: true, sent_at: new Date().toISOString() })
        .eq("id", row.id);

      sent++;
    } catch (err) {
      console.error(`[send-followups] Failed row ${row.id}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: rows.length });
}
