/**
 * GoHighLevel API integration — AllTheCalls.ai
 *
 * Creates contacts and pushes them into the sales pipeline
 * when calls come through Trillet.
 *
 * Required env vars:
 *   GHL_API_KEY        — API key from GHL Settings → Business Profile
 *   GHL_LOCATION_ID    — Sub-account location ID (default: PeMkLPdDHTeQ4OWJXrGC)
 *   GHL_PIPELINE_ID    — Sales pipeline ID (set after first lookup)
 */

const GHL_BASE = "https://services.leadconnectorhq.com";

function getHeaders() {
  const key = process.env.GHL_API_KEY;
  if (!key) return null;
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

export interface GHLContactInput {
  phone: string;
  name?: string;
  email?: string;
  source?: string;
  tags?: string[];
  customFields?: { key: string; value: string }[];
}

/**
 * Create or update a contact in GHL.
 * GHL deduplicates by phone number — if the contact exists, it updates.
 */
export async function createContact(input: GHLContactInput): Promise<{ id: string } | null> {
  const headers = getHeaders();
  if (!headers) {
    console.log("[ghl] GHL_API_KEY not set — skipping contact creation");
    return null;
  }

  const locationId = process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC";

  const body: Record<string, unknown> = {
    locationId,
    phone: input.phone,
    name: input.name || undefined,
    email: input.email || undefined,
    source: input.source || "AllTheCalls AI — Inbound Call",
    tags: input.tags || ["inbound-call", "demo-line"],
  };

  if (input.customFields) {
    body.customFields = input.customFields;
  }

  try {
    const res = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[ghl] Contact creation failed:", data);
      return null;
    }

    const contactId = data.contact?.id;
    console.log(`[ghl] Contact created/updated: ${contactId} (${input.phone})`);
    return { id: contactId };
  } catch (err) {
    console.error("[ghl] Contact creation error:", err);
    return null;
  }
}

/**
 * Add a contact to the sales pipeline at the "New Lead" stage.
 */
export async function addToPipeline(
  contactId: string,
  pipelineId?: string
): Promise<boolean> {
  const headers = getHeaders();
  if (!headers) return false;

  const pipeline = pipelineId || process.env.GHL_PIPELINE_ID;
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
        locationId: process.env.GHL_LOCATION_ID || "PeMkLPdDHTeQ4OWJXrGC",
        contactId,
        name: "Inbound Call Lead",
        status: "open",
        source: "AllTheCalls AI",
      }),
    });

    if (!res.ok) {
      const data = await res.json();
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

/**
 * Full flow: create contact + add to pipeline in one call.
 * Used by the Trillet webhook and detect-calls cron.
 */
export async function pushLeadToGHL(call: {
  callerNumber: string;
  callerName?: string;
  summary?: string;
  duration?: number;
  agentName?: string;
}): Promise<void> {
  if (!process.env.GHL_API_KEY) return;

  const contact = await createContact({
    phone: call.callerNumber,
    name: call.callerName,
    source: `AllTheCalls AI — ${call.agentName || "Inbound Call"}`,
    tags: ["inbound-call", "demo-line", "trillet"],
    customFields: [
      ...(call.summary ? [{ key: "call_summary", value: call.summary }] : []),
      ...(call.duration ? [{ key: "call_duration", value: `${Math.floor(call.duration / 60)}m ${call.duration % 60}s` }] : []),
    ],
  });

  if (contact?.id) {
    await addToPipeline(contact.id);
  }
}
