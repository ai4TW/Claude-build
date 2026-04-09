/**
 * GoHighLevel API integration — AllTheCalls.ai
 *
 * Smart contact management:
 * - NEW callers → create contact + add to pipeline + add call note
 * - RETURNING callers → add call note to existing contact (no duplicate)
 *
 * Call recordings, transcripts, and summaries are added as notes
 * on the contact profile so you can see the full history.
 *
 * Required env vars:
 *   GHL_API_KEY        — Sub-account Private Integration key
 *   GHL_LOCATION_ID    — Sub-account location ID (default: PeMkLPdDHTeQ4OWJXrGC)
 *   GHL_PIPELINE_ID    — Sales pipeline ID
 */

const GHL_BASE = "https://services.leadconnectorhq.com";

function getHeaders() {
  const key = process.env.GHL_API_KEY?.trim();
  if (!key) return null;
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

// ── Contact Management ──────────────────────────────────────────────────

interface ContactResult {
  id: string;
  isNew: boolean;
}

/**
 * Create a new contact OR return the existing one if phone already exists.
 * GHL returns 400 with meta.contactId for duplicates.
 */
async function findOrCreateContact(
  phone: string,
  name?: string,
  source?: string
): Promise<ContactResult | null> {
  const headers = getHeaders();
  if (!headers) return null;

  const locationId = (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim();

  try {
    const res = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        phone,
        name: name || undefined,
        source: source || "AllTheCalls AI — Inbound Call",
        tags: ["inbound-call", "demo-line", "trillet"],
      }),
    });

    const data = await res.json();

    console.log(`[ghl] Contact API response: status=${res.status}`);

    // New contact created
    if (res.ok && data.contact?.id) {
      console.log(`[ghl] NEW contact: ${data.contact.id} (${phone})`);
      return { id: data.contact.id, isNew: true };
    }

    // Duplicate — GHL returns 400 with existing contactId
    if (res.status === 400 && data.meta?.contactId) {
      console.log(`[ghl] RETURNING caller: ${data.meta.contactId} (${phone})`);
      return { id: data.meta.contactId, isNew: false };
    }

    console.error("[ghl] Unexpected response:", res.status, JSON.stringify(data));
    return null;
  } catch (err) {
    console.error("[ghl] Contact lookup error:", err);
    return null;
  }
}

// ── Notes (call history on contact profile) ─────────────────────────────

/**
 * Add a call note to a contact's profile in GHL.
 * Includes summary, transcript, recording URL, and duration.
 */
async function addCallNote(
  contactId: string,
  call: CallData
): Promise<void> {
  const headers = getHeaders();
  if (!headers) return;

  const duration = call.duration
    ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s`
    : "unknown";

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Build the note body with all available info
  const parts: string[] = [
    `📞 Call — ${timestamp} — Duration: ${duration}`,
    `Agent: ${call.agentName || "AI Receptionist"}`,
  ];

  if (call.callerName) parts.push(`Caller: ${call.callerName}`);
  if (call.callerNumber) parts.push(`Phone: ${call.callerNumber}`);

  if (call.summary) {
    parts.push("", "--- Summary ---", call.summary);
  }

  if (call.transcript) {
    // Truncate very long transcripts to fit GHL note limits
    const maxLen = 3000;
    const truncated = call.transcript.length > maxLen
      ? call.transcript.slice(0, maxLen) + "\n\n[transcript truncated]"
      : call.transcript;
    parts.push("", "--- Transcript ---", truncated);
  }

  if (call.recordingUrl) {
    parts.push("", `🔊 Recording: ${call.recordingUrl}`);
  }

  try {
    const res = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: parts.join("\n") }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[ghl] Note creation failed:", err);
      return;
    }

    console.log(`[ghl] Call note added to contact ${contactId}`);
  } catch (err) {
    console.error("[ghl] Note error:", err);
  }
}

// ── Pipeline ────────────────────────────────────────────────────────────

async function addToPipeline(contactId: string): Promise<boolean> {
  const headers = getHeaders();
  if (!headers) return false;

  const pipeline = process.env.GHL_PIPELINE_ID?.trim();
  if (!pipeline) {
    console.log("[ghl] GHL_PIPELINE_ID not set — skipping pipeline");
    return false;
  }

  try {
    const res = await fetch(`${GHL_BASE}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        pipelineId: pipeline,
        locationId: (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim(),
        contactId,
        name: "Inbound Call Lead",
        status: "open",
        source: "AllTheCalls AI",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      // 422 = already in pipeline, which is fine for returning callers
      if (data.statusCode === 422) {
        console.log(`[ghl] Contact ${contactId} already in pipeline — OK`);
        return true;
      }
      console.error("[ghl] Pipeline add failed:", data);
      return false;
    }

    console.log(`[ghl] Contact ${contactId} added to pipeline`);
    return true;
  } catch (err) {
    console.error("[ghl] Pipeline error:", err);
    return false;
  }
}

// ── Main entry point ────────────────────────────────────────────────────

export interface CallData {
  callerNumber: string;
  callerName?: string;
  summary?: string;
  transcript?: string;
  recordingUrl?: string;
  duration?: number;
  agentName?: string;
}

/**
 * Push a call to GHL. Smart handling:
 * - First-time caller → new contact + pipeline + call note
 * - Returning caller → just adds a call note to existing profile
 */
export async function pushLeadToGHL(call: CallData): Promise<void> {
  if (!process.env.GHL_API_KEY) return;

  const contact = await findOrCreateContact(
    call.callerNumber,
    call.callerName,
    `AllTheCalls AI — ${call.agentName || "Inbound Call"}`
  );

  if (!contact) return;

  // Only add to pipeline for NEW callers
  if (contact.isNew) {
    await addToPipeline(contact.id);
  }

  // Always add the call note (new or returning)
  await addCallNote(contact.id, call);
}
