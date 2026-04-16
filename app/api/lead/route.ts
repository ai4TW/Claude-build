import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Send a lead notification email via Resend.
 * Fire-and-forget — never blocks the visitor's experience.
 */
async function notifyNewLead(lead: {
  firstName: string;
  email: string;
  phone: string;
  businessType: string;
  source: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !notifyEmail) return;

  const phoneLine = lead.phone
    ? `Phone: ${lead.phone}\n`
    : "";
  const body = [
    `New lead on AllTheCalls.ai`,
    ``,
    `Name: ${lead.firstName || "—"}`,
    `Email: ${lead.email}`,
    phoneLine.trim(),
    `Business: ${lead.businessType || "—"}`,
    `Source: ${lead.source}`,
    `Time: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
    ``,
    `View all leads → https://app.allthecalls.ai/admin`,
  ].filter(Boolean).join("\n");

  const recipients = notifyEmail.split(",").map((e) => e.trim()).filter(Boolean);

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AllTheCalls Leads <hello@allthecalls.ai>",
        to: recipients,
        subject: `🔔 New lead: ${lead.firstName || lead.email} — ${lead.businessType || "unknown industry"}`,
        text: body,
      }),
    });
  } catch (e) {
    console.error("[lead-notify] email failed:", (e as Error).message);
  }
}

/**
 * Send an SMS notification via email-to-SMS gateway.
 * Set LEAD_NOTIFY_SMS to "number@gateway" (e.g. 3166165063@tmomail.net for T-Mobile).
 * Find your gateway: AT&T=@txt.att.net, T-Mobile=@tmomail.net, Verizon=@vtext.com
 */
async function notifySms(lead: {
  firstName: string;
  email: string;
  phone: string;
  businessType: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const smsGateway = process.env.LEAD_NOTIFY_SMS;
  if (!apiKey || !smsGateway) return;

  const msg = `🔔 New ATC lead: ${lead.firstName || "?"} (${lead.businessType || "?"}) — ${lead.email}${lead.phone ? " · " + lead.phone : ""}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AllTheCalls <hello@allthecalls.ai>",
        to: [smsGateway],
        subject: "New lead",
        text: msg,
      }),
    });
  } catch (e) {
    console.error("[lead-notify] sms failed:", (e as Error).message);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const firstName = String(body.firstName || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const businessType = String(body.businessType || "").trim().slice(0, 80);
  const source = String(body.source || "pricing-vsl").trim().slice(0, 80);

  if (!email || !email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const supa = getSupabase();
    const { error } = await supa.from("video_leads").insert({
      first_name: firstName || null,
      email,
      phone: phone || null,
      business_type: businessType || null,
      source,
      user_agent: userAgent.slice(0, 400),
      referrer: referrer.slice(0, 400),
      ip,
    });
    if (error) {
      console.error("[lead] insert failed:", error.message);
    }
  } catch (e) {
    console.error("[lead] supabase error:", (e as Error).message);
  }

  // Notifications — fire-and-forget, never block the response
  const lead = { firstName, email, phone, businessType, source };
  notifyNewLead(lead).catch(() => {});
  notifySms(lead).catch(() => {});

  return NextResponse.json({ ok: true });
}
