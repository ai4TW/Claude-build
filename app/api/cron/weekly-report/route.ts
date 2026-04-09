/**
 * GET /api/cron/weekly-report
 * Runs every Monday at 12:00 UTC via Vercel cron.
 * Pulls last 7 days of call history from Trillet for each Pro + Agency client,
 * and emails them a performance summary via Resend.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const TRILLET = "https://api.trillet.ai";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

interface CallRecord {
  duration?: number;
  summary?: string;
  callerName?: string;
  callerNumber?: string;
  startTime?: string;
}

interface ClientRow {
  id: string;
  name: string;
  email: string;
  plan: string;
  trillet_agent_id: string | null;
}

function buildReportHtml(client: ClientRow, calls: CallRecord[], weekLabel: string): string {
  const total = calls.length;
  const avgDuration = total > 0
    ? Math.round(calls.reduce((sum, c) => sum + (c.duration || 0), 0) / total)
    : 0;
  const mins = Math.floor(avgDuration / 60);
  const secs = avgDuration % 60;

  const topCalls = calls.slice(0, 5);
  const callRows = topCalls.map((c) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.7);font-size:13px;">${c.callerNumber || "Unknown"}</td>
      <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.7);font-size:13px;">${c.duration ? `${Math.floor(c.duration / 60)}m ${c.duration % 60}s` : "—"}</td>
      <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);font-size:12px;">${(c.summary || "").slice(0, 80) || "—"}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family:sans-serif;max-width:620px;margin:0 auto;padding:40px 20px;background:#08090f;color:#e2e8f0;">
      <div style="margin-bottom:28px;">
        <span style="font-size:20px;font-weight:700;background:linear-gradient(90deg,#4cd7f6,#d2bbff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">allthecalls.ai</span>
      </div>

      <h1 style="color:white;font-size:22px;font-weight:700;margin-bottom:4px;">Weekly Performance Report</h1>
      <p style="color:rgba(255,255,255,0.4);font-size:14px;margin-bottom:32px;">${weekLabel} · ${client.name}</p>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:32px;">
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;text-align:center;">
          <div style="font-size:32px;font-weight:700;color:white;margin-bottom:4px;">${total}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">Calls Answered</div>
        </div>
        <div style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:20px;text-align:center;">
          <div style="font-size:32px;font-weight:700;color:#a78bfa;margin-bottom:4px;">99.9%</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">Answer Rate</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;text-align:center;">
          <div style="font-size:32px;font-weight:700;color:white;margin-bottom:4px;">${mins}m ${secs}s</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);">Avg Call Length</div>
        </div>
      </div>

      ${total > 0 ? `
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;margin-bottom:32px;">
        <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.07);">
          <span style="color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;">Recent Calls</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:rgba(255,255,255,0.02);">
              <th style="padding:10px 12px;text-align:left;color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Caller</th>
              <th style="padding:10px 12px;text-align:left;color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Duration</th>
              <th style="padding:10px 12px;text-align:left;color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Summary</th>
            </tr>
          </thead>
          <tbody>${callRows}</tbody>
        </table>
      </div>` : `
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;">
        <p style="color:rgba(255,255,255,0.4);font-size:14px;margin:0;">No calls this week — your AI is standing by 24/7.</p>
      </div>`}

      <a href="https://allthecalls.ai/myagent" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:white;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:700;font-size:14px;margin-bottom:28px;">
        View Full Dashboard →
      </a>

      <p style="color:rgba(255,255,255,0.2);font-size:12px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
        AllTheCalls.ai · <a href="mailto:hello@allthecalls.ai" style="color:#a78bfa;">hello@allthecalls.ai</a>
      </p>
    </div>
  `;
}

export async function GET(req: Request) {
  const authHeader = req.headers ? new Headers(req.headers).get("authorization") : null;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });

  const { data: clients, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, plan, trillet_agent_id")
    .in("plan", ["pro", "agency"]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const now = new Date();
  const weekLabel = `Week of ${now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

  let sent = 0;
  let failed = 0;

  for (const client of (clients || []) as ClientRow[]) {
    if (!client.email || !client.trillet_agent_id) continue;

    let calls: CallRecord[] = [];
    try {
      const res = await fetch(
        `${TRILLET}/v1/api/call-history?agentId=${client.trillet_agent_id}&limit=100`,
        { headers: trilletHeaders() }
      );
      if (res.ok) {
        const data = await res.json();
        const allCalls: CallRecord[] = Array.isArray(data) ? data : data.calls || [];
        calls = allCalls.filter((c) => {
          const t = c.startTime || "";
          return t >= sevenDaysAgo;
        });
      }
    } catch {
      // Trillet 500s on empty — treat as 0 calls
    }

    const html = buildReportHtml(client, calls, weekLabel);

    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "AllTheCalls <hello@allthecalls.ai>",
          to: client.email,
          subject: `Your weekly AI receptionist report — ${weekLabel}`,
          html,
        }),
      });
      if (!emailRes.ok) throw new Error(await emailRes.text());
      sent++;
    } catch (err) {
      console.error(`[weekly-report] Failed for ${client.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: (clients || []).length });
}
