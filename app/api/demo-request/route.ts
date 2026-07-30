import { NextResponse } from "next/server";

/**
 * Lead capture for the ad-funnel landing page (Meta/Instagram traffic).
 * Collects: name, phone, business name, business type.
 * Sends an email notification via Resend to brayden@nextlevelacq.com.
 * No Supabase, no CRM push — email only, per scope for this funnel.
 */

const NOTIFY_EMAIL = "brayden@nextlevelacq.com";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const businessName = String(body.businessName || "").trim().slice(0, 160);
  const businessType = String(body.businessType || "").trim().slice(0, 80);

  if (!name || !phone) {
    return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[demo-request] RESEND_API_KEY missing — lead not delivered:", {
      name,
      phone,
      businessName,
      businessType,
    });
    return NextResponse.json({ error: "email not configured" }, { status: 500 });
  }

  const bodyText = [
    `New AllTheCalls ad-funnel lead`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Business: ${businessName || "—"}`,
    `Business type: ${businessType || "—"}`,
    ``,
    `Referrer: ${referrer || "—"}`,
    `IP: ${ip || "—"}`,
    `Time: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AllTheCalls Leads <hello@allthecalls.ai>",
        to: [NOTIFY_EMAIL],
        subject: `New AllTheCalls lead — ${businessName || name}`,
        text: bodyText,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[demo-request] Resend send failed:", res.status, errText);
      return NextResponse.json({ error: "failed to send notification" }, { status: 502 });
    }
  } catch (e) {
    console.error("[demo-request] Resend request error:", (e as Error).message);
    return NextResponse.json({ error: "failed to send notification" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
