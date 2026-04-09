/**
 * POST /api/webhooks/email-to-ghl
 * Receives Resend webhook when Trillet sends a call summary email to calls@allthecalls.ai.
 * Parses the caller's phone number and summary, then creates/updates a GHL contact.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  console.log("[email-to-ghl] Received webhook payload");

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(body);
  } catch {
    console.error("[email-to-ghl] Invalid JSON");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[email-to-ghl] Event type:", event.type);

  // Resend sends different event types — we want email.received
  // But also handle the raw email data format
  const data = (event.data as Record<string, unknown>) || event;
  const subject = (data.subject as string) || "";
  const textBody = (data.text as string) || (data.body as string) || (data.html as string) || "";
  const from = (data.from as string) || "";

  console.log("[email-to-ghl] Subject:", subject, "From:", from);
  console.log("[email-to-ghl] Body preview:", textBody.slice(0, 300));

  // Only process Trillet call summary emails
  if (!subject.toLowerCase().includes("call summary") && !textBody.toLowerCase().includes("call summary")) {
    console.log("[email-to-ghl] Not a call summary email, skipping");
    return NextResponse.json({ ok: true, skipped: "not a call summary" });
  }

  // Parse phone number from email body
  // Looking for patterns like "From +13166165063" or "+1XXXXXXXXXX"
  const phoneMatch = textBody.match(/(?:From|from|Caller)[:\s]*(\+?1?\d{10,11})/);
  const phone = phoneMatch ? phoneMatch[1] : null;

  // Normalize phone to E.164
  let normalizedPhone = phone;
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    normalizedPhone = digits.length === 10 ? `+1${digits}` : digits.length === 11 ? `+${digits}` : `+${digits}`;
  }

  // Parse call summary
  const summaryMatch = textBody.match(/Call Summary[:\s]*\n?([\s\S]*?)(?=\n\s*(?:Captured|Call Recording|Listen|$))/i);
  const summary = summaryMatch ? summaryMatch[1].trim() : null;

  // Parse recording link
  const recordingMatch = textBody.match(/(?:Listen To Recording|Recording)[:\s]*(https?:\/\/\S+)/i);
  const recordingUrl = recordingMatch ? recordingMatch[1] : null;

  console.log("[email-to-ghl] Parsed — phone:", normalizedPhone, "summary:", summary?.slice(0, 100));

  if (!normalizedPhone) {
    console.log("[email-to-ghl] No phone number found in email");
    return NextResponse.json({ ok: true, skipped: "no phone number found" });
  }

  // Push to GHL
  const ghlKey = process.env.GHL_API_KEY?.trim();
  const ghlLocationId = (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim();
  const ghlPipelineId = process.env.GHL_PIPELINE_ID?.trim();

  if (!ghlKey) {
    console.log("[email-to-ghl] GHL_API_KEY not set");
    return NextResponse.json({ ok: true, skipped: "no GHL key" });
  }

  const ghlHeaders = {
    Authorization: `Bearer ${ghlKey}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };

  try {
    // Step 1: Create or find existing contact
    const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        locationId: ghlLocationId,
        phone: normalizedPhone,
        name: "Inbound Caller",
        source: "AllTheCalls AI — Gia",
        tags: ["inbound-call", "demo-line", "trillet"],
      }),
    });
    const createData = await createRes.json();

    let contactId: string | null = null;
    let isNewContact = false;

    if (createRes.ok && createData.contact?.id) {
      contactId = createData.contact.id;
      isNewContact = true;
      console.log(`[email-to-ghl] NEW contact: ${contactId}`);
    } else if (createRes.status === 400 && createData.meta?.contactId) {
      contactId = createData.meta.contactId;
      console.log(`[email-to-ghl] RETURNING caller: ${contactId}`);
    } else {
      console.error("[email-to-ghl] GHL contact creation failed:", createRes.status, JSON.stringify(createData));
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
        console.log(`[email-to-ghl] Added to pipeline`);
      }

      // Step 3: Add call note
      const noteLines = [
        `📞 Call — ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" })}`,
        `Agent: Gia`,
        `Phone: ${normalizedPhone}`,
        summary ? `\n--- Summary ---\n${summary}` : null,
        recordingUrl ? `\n🔊 Recording: ${recordingUrl}` : null,
      ].filter(Boolean).join("\n");

      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({ body: noteLines }),
      });
      console.log(`[email-to-ghl] Call note added`);
    }

    return NextResponse.json({ ok: true, contactId, isNewContact });
  } catch (err) {
    console.error("[email-to-ghl] Error:", err);
    return NextResponse.json({ error: "GHL push failed" }, { status: 500 });
  }
}
