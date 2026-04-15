/**
 * GET /api/cron/send-emails
 * Runs every hour via Vercel cron.
 * Sends pending emails from the email_queue table via Resend.
 * Handles all automated sequences: demo followup, trial onboarding,
 * churn prevention, and payment recovery.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

interface QueueRow {
  id: string;
  recipient_email: string;
  recipient_name: string | null;
  sequence_name: string;
  step_number: number;
  subject: string;
  body_text: string;
}

async function sendEmail(to: string, subject: string, body: string): Promise<void> {
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

export async function GET(req: Request) {
  const authHeader = req.headers ? new Headers(req.headers).get("authorization") : null;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const now = new Date().toISOString();

  const { data: pending, error } = await supabaseAdmin
    .from("email_queue")
    .select("id, recipient_email, recipient_name, sequence_name, step_number, subject, body_text")
    .eq("sent", false)
    .eq("cancelled", false)
    .lte("send_at", now)
    .order("send_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("[send-emails] DB error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (pending || []) as QueueRow[];
  let sent = 0;
  let failed = 0;

  for (const row of rows) {
    try {
      await sendEmail(row.recipient_email, row.subject, row.body_text);

      await supabaseAdmin
        .from("email_queue")
        .update({ sent: true, sent_at: new Date().toISOString() })
        .eq("id", row.id);

      sent++;
      console.log(`[send-emails] Sent ${row.sequence_name} step ${row.step_number} to ${row.recipient_email}`);
    } catch (err) {
      console.error(`[send-emails] Failed ${row.id}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: rows.length });
}
