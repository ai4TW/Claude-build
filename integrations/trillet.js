/**
 * Trillet AI API Integration
 * RealtyVoice AI — White-label reseller layer
 *
 * Docs: https://docs.trillet.ai/documentation/introduction
 *
 * NOTE: Endpoint paths below are based on available documentation.
 * Verify against your Trillet dashboard before running in production.
 * Auth uses x-api-key header (not Authorization: Bearer).
 */

const BASE_URL = "https://api.trillet.ai";

function getHeaders() {
  const key = process.env.TRILLET_API_KEY;
  if (!key) throw new Error("TRILLET_API_KEY environment variable not set");
  return {
    "Content-Type": "application/json",
    "x-api-key": key,
  };
}

async function apiRequest(method, path, body = null) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Trillet API ${method} ${path} failed (${res.status}): ${err}`);
  }
  return res.json();
}

/**
 * Create an AI receptionist (call agent) for a client.
 * @param {object} agentConfig - { name, greeting, specialty }
 */
async function createAgent(agentConfig) {
  return apiRequest("POST", "/agents/call", {
    name: agentConfig.name,
    greeting: agentConfig.greeting,
    language: "en-US",
    voice: "professional-female",
    metadata: {
      specialty: agentConfig.specialty,
      reseller: "realtyvoice-ai",
    },
  });
}

/**
 * List all call agents in this workspace.
 */
async function listAgents() {
  return apiRequest("GET", "/agents/call");
}

/**
 * Add a URL knowledge source to an agent.
 * @param {string} knowledgeBaseId
 * @param {string} websiteUrl
 */
async function trainFromWebsite(knowledgeBaseId, websiteUrl) {
  return apiRequest("POST", "/knowledge-base", {
    knowledge_base_id: knowledgeBaseId,
    source_type: "url",
    url: websiteUrl,
  });
}

/**
 * Get call history/logs.
 * @param {object} options - { limit, startDate, endDate }
 */
async function getCallLogs(options = {}) {
  const params = new URLSearchParams({
    limit: options.limit || 50,
    ...(options.startDate && { start_date: options.startDate }),
    ...(options.endDate && { end_date: options.endDate }),
  });
  return apiRequest("GET", `/calls/history?${params}`);
}

/**
 * Get workspace info (useful for verifying API key works).
 */
async function getWorkspace() {
  return apiRequest("GET", "/workspace");
}

/**
 * Full onboarding flow: create agent + train from website.
 * NOTE: Trillet uses a single workspace model (no sub-accounts).
 * Each client gets their own agent within this workspace.
 * @param {object} client - { name, brokerage, websiteUrl, specialty }
 * @returns {object} { agentId }
 */
async function onboardClient(client) {
  const greeting =
    client.greeting ||
    `Thank you for calling ${client.name} with ${client.brokerage}. ` +
      `I'm their AI assistant. How can I help you today?`;

  console.log(`[Trillet] Creating AI agent for ${client.name}...`);
  const agent = await createAgent({
    name: `${client.name}'s AI Receptionist`,
    greeting,
    specialty: client.specialty || "real estate",
  });

  if (client.websiteUrl && agent.knowledge_base_id) {
    console.log(`[Trillet] Training AI from ${client.websiteUrl}...`);
    await trainFromWebsite(agent.knowledge_base_id, client.websiteUrl);
  }

  console.log(`[Trillet] Onboarding complete for ${client.name}`);
  return {
    agentId: agent.id,
    phoneNumber: agent.phone_number,
  };
}

module.exports = {
  createAgent,
  listAgents,
  trainFromWebsite,
  getCallLogs,
  getWorkspace,
  onboardClient,
};
