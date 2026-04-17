/**
 * GoHighLevel API integration — AllTheCalls.ai
 *
 * Smart contact management for call events:
 *   - Inbound, known contact (via `existingContactId`) → add note, update stats
 *   - Inbound, unknown number → create / find contact, add to pipeline, note, stats
 *   - Outbound (from our /api/outbound bridge) → same flow, but tagged outbound
 *
 * Call recordings, transcripts, and summaries become notes on the contact.
 * Last-call timestamp and summary land on contact custom fields so the
 * investor can sort / filter their CRM by freshness at a glance.
 *
 * Required env vars:
 *   GHL_API_KEY        — Sub-account Private Integration key
 *   GHL_LOCATION_ID    — Sub-account location ID (default: PeMkLPdDHTeQ4OWJXrGC)
 * Optional:
 *   GHL_PIPELINE_ID    — Sales pipeline for new leads
 */

const GHL_BASE = "https://services.leadconnectorhq.com";

// Custom field IDs from the master doc.
// If these get rotated, update here — the route doesn't touch them directly.
const FIELD_LAST_CALL_DATE = "xVD0x9dNRSGt9Cu2CF2F";
const FIELD_TOTAL_CALLS = "IzO9kKceKDd7HJGnw3bE";
const FIELD_LAST_CALL_SUMMARY_DEFAULT = "Pp5uXJK5XHtgNP0fh3eO"; // reuse "greeting_style" slot? NO — leave undefined unless a dedicated field exists

function getHeaders() {
  const key = process.env.GHL_API_KEY?.trim();
  if (!key) return null;
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

function getLocationId() {
  return (process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC").trim();
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
  source?: string,
  extraTags: string[] = [],
): Promise<ContactResult | null> {
  const headers = getHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId: getLocationId(),
        phone,
        name: name || undefined,
        source: source || "AllTheCalls AI — Inbound Call",
        tags: Array.from(new Set(["allthecalls", "trillet", ...extraTags])),
      }),
    });

    const data = await res.json();

    console.log(`[ghl] Contact API response: status=${res.status}`);

    if (res.ok && data.contact?.id) {
      console.log(`[ghl] NEW contact: ${data.contact.id} (${phone})`);
      return { id: data.contact.id, isNew: true };
    }

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

/**
 * Append tags to an existing contact (non-destructive — GHL merges).
 */
async function addTags(contactId: string, tags: string[]): Promise<void> {
  const headers = getHeaders();
  if (!headers || tags.length === 0) return;

  try {
    await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags }),
    });
  } catch (err) {
    console.error("[ghl] addTags error:", err);
  }
}

// ── Notes (call history on contact profile) ─────────────────────────────

async function addCallNote(contactId: string, call: CallData): Promise<void> {
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

  const directionLabel = call.direction === "outbound" ? "Outbound" : "Inbound";
  const directionIcon = call.direction === "outbound" ? "\u{1F4E4}" : "\u{1F4DE}";

  const parts: string[] = [
    `${directionIcon} ${directionLabel} Call — ${timestamp} — Duration: ${duration}`,
    `Agent: ${call.agentName || "AI Receptionist"}`,
  ];

  if (call.callerName) parts.push(`Caller: ${call.callerName}`);
  if (call.callerNumber) parts.push(`Phone: ${call.callerNumber}`);
  if (call.leadSource) parts.push(`Lead Source: ${call.leadSource}`);

  if (call.summary) parts.push("", "--- Summary ---", call.summary);

  if (call.transcript) {
    const maxLen = 3000;
    const truncated =
      call.transcript.length > maxLen
        ? call.transcript.slice(0, maxLen) + "\n\n[transcript truncated]"
        : call.transcript;
    parts.push("", "--- Transcript ---", truncated);
  }

  if (call.recordingUrl) parts.push("", `\u{1F50A} Recording: ${call.recordingUrl}`);

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

async function addToPipeline(contactId: string, direction: Direction): Promise<boolean> {
  const headers = getHeaders();
  if (!headers) return false;

  const pipeline = process.env.GHL_PIPELINE_ID?.trim();
  if (!pipeline) return false;

  const opportunityName =
    direction === "outbound" ? "Outbound AI Lead Contact" : "Inbound Call Lead";

  try {
    const res = await fetch(`${GHL_BASE}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        pipelineId: pipeline,
        locationId: getLocationId(),
        contactId,
        name: opportunityName,
        status: "open",
        source: "AllTheCalls AI",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
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

// ── Custom field updates — push call stats back onto the contact ────────

/**
 * Fetch current custom field values so we can increment counters.
 * Returns the map or null if unavailable.
 */
async function getContactCustomFields(
  contactId: string,
): Promise<Record<string, unknown> | null> {
  const headers = getHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: "GET",
      headers,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const cfs = (data?.contact?.customFields || []) as Array<{
      id: string;
      value?: unknown;
    }>;
    const map: Record<string, unknown> = {};
    for (const f of cfs) if (f?.id) map[f.id] = f.value;
    return map;
  } catch (err) {
    console.error("[ghl] getContactCustomFields error:", err);
    return null;
  }
}

/**
 * Update Last Call Date + Total Calls (incremented) on a contact.
 * Silently no-ops if the custom field IDs aren't provisioned in the GHL
 * sub-account — we don't want one missing field to break the whole flow.
 */
async function updateContactCallStats(contactId: string, call: CallData): Promise<void> {
  const headers = getHeaders();
  if (!headers) return;

  try {
    const current = await getContactCustomFields(contactId);
    const currentTotal = Number(current?.[FIELD_TOTAL_CALLS] ?? 0) || 0;
    const newTotal = currentTotal + 1;

    const nowIso = new Date().toISOString();

    // GHL expects customFields as an array of {id, value} entries on PUT.
    const customFields: Array<{ id: string; value: unknown }> = [
      { id: FIELD_LAST_CALL_DATE, value: nowIso },
      { id: FIELD_TOTAL_CALLS, value: newTotal },
    ];

    const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ customFields }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error(
        `[ghl] updateContactCallStats PUT failed: ${res.status} ${errBody.slice(0, 200)}`,
      );
      return;
    }
    console.log(
      `[ghl] Contact ${contactId} call stats updated — total_calls=${newTotal}, summary=${call.summary ? "yes" : "no"}`,
    );
  } catch (err) {
    console.error("[ghl] updateContactCallStats error:", err);
  }
}

// ── Main entry point ────────────────────────────────────────────────────

export type Direction = "inbound" | "outbound";

export interface CallData {
  callerNumber: string;
  callerName?: string;
  summary?: string;
  transcript?: string;
  recordingUrl?: string;
  duration?: number;
  agentName?: string;
  direction?: Direction;
  leadSource?: string;
}

export interface PushLeadOptions {
  /**
   * If present, skip phone-based lookup and use this GHL contact ID directly.
   * Set by the outbound handler — we passed the contact ID through Trillet
   * metadata, so the callback webhook already knows who was dialed.
   */
  existingContactId?: string;

  /**
   * Extra tags to apply (e.g. lead source, client name). Merged with defaults.
   */
  extraTags?: string[];
}

/**
 * Push a call event to GHL.
 *
 * Side effects (in order):
 *   1. Resolve or create the contact
 *   2. New contacts: add to pipeline (if GHL_PIPELINE_ID is set)
 *   3. Tag with direction + any extra tags
 *   4. Add a call note (summary, transcript, recording)
 *   5. Update Last Call Date + Total Calls custom fields
 *
 * Every step swallows its own errors so one failure doesn't block the rest.
 */
export async function pushLeadToGHL(
  call: CallData,
  opts: PushLeadOptions = {},
): Promise<{ contactId: string | null; isNew: boolean }> {
  if (!process.env.GHL_API_KEY) return { contactId: null, isNew: false };

  const direction: Direction = call.direction || "inbound";
  const baseTags = [direction === "outbound" ? "outbound-call" : "inbound-call"];
  const extraTags = opts.extraTags || [];

  let contactId: string | null = null;
  let isNew = false;

  if (opts.existingContactId) {
    contactId = opts.existingContactId;
    isNew = false;
    // Still add tags so the direction shows up on the contact
    await addTags(contactId, [...baseTags, ...extraTags]);
  } else {
    const contact = await findOrCreateContact(
      call.callerNumber,
      call.callerName,
      `AllTheCalls AI — ${call.agentName || "Call"}`,
      [...baseTags, ...extraTags],
    );
    if (!contact) return { contactId: null, isNew: false };
    contactId = contact.id;
    isNew = contact.isNew;
  }

  if (isNew) {
    await addToPipeline(contactId, direction);
  }

  await addCallNote(contactId, { ...call, direction });
  await updateContactCallStats(contactId, call);

  return { contactId, isNew };
}

// Re-export field IDs for callers that need to reference them directly.
export const GHL_FIELD_IDS = {
  LAST_CALL_DATE: FIELD_LAST_CALL_DATE,
  TOTAL_CALLS: FIELD_TOTAL_CALLS,
  LAST_CALL_SUMMARY: FIELD_LAST_CALL_SUMMARY_DEFAULT,
} as const;
