/**
 * Trillet AI API Integration
 * RealtyVoice AI — White-label reseller layer
 *
 * Docs: https://docs.trillet.ai/documentation/introduction
 */

const BASE_URL = "https://api.trillet.ai/api/v1";

function getHeaders() {
  const key = process.env.TRILLET_API_KEY;
  if (!key) throw new Error("TRILLET_API_KEY environment variable not set");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
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
 * Create a sub-account for a new real estate agent client.
 * @param {object} client - { name, email, phone, brokerage }
 */
async function createSubAccount(client) {
  return apiRequest("POST", "/accounts/sub", {
    name: client.name,
    email: client.email,
    phone: client.phone,
    metadata: { brokerage: client.brokerage, reseller: "realtyvoice-ai" },
  });
}

/**
 * Create an AI receptionist agent for a client sub-account.
 * @param {string} subAccountId
 * @param {object} agentConfig - { name, greeting, websiteUrl, specialty }
 */
async function createAgent(subAccountId, agentConfig) {
  return apiRequest("POST", "/agents", {
    sub_account_id: subAccountId,
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
 * Train the AI agent from the client's website URL.
 * @param {string} agentId
 * @param {string} websiteUrl
 */
async function trainFromWebsite(agentId, websiteUrl) {
  return apiRequest("POST", "/knowledge", {
    agent_id: agentId,
    source_type: "url",
    url: websiteUrl,
  });
}

/**
 * Get all call logs for a sub-account.
 * @param {string} subAccountId
 * @param {object} options - { limit, offset, startDate, endDate }
 */
async function getCallLogs(subAccountId, options = {}) {
  const params = new URLSearchParams({
    sub_account_id: subAccountId,
    limit: options.limit || 50,
    offset: options.offset || 0,
    ...(options.startDate && { start_date: options.startDate }),
    ...(options.endDate && { end_date: options.endDate }),
  });
  return apiRequest("GET", `/calls?${params}`);
}

/**
 * Full onboarding flow: create sub-account + agent + train from website.
 * @param {object} client - { name, email, phone, brokerage, websiteUrl, specialty }
 * @returns {object} { subAccountId, agentId, phoneNumber }
 */
async function onboardClient(client) {
  console.log(`[Trillet] Creating sub-account for ${client.name}...`);
  const account = await createSubAccount(client);

  const greeting =
    client.greeting ||
    `Thank you for calling ${client.name} with ${client.brokerage}. ` +
      `I'm their AI assistant. How can I help you today?`;

  console.log(`[Trillet] Creating AI agent...`);
  const agent = await createAgent(account.id, {
    name: `${client.name}'s AI Receptionist`,
    greeting,
    websiteUrl: client.websiteUrl,
    specialty: client.specialty || "real estate",
  });

  if (client.websiteUrl) {
    console.log(`[Trillet] Training AI from ${client.websiteUrl}...`);
    await trainFromWebsite(agent.id, client.websiteUrl);
  }

  console.log(`[Trillet] Onboarding complete for ${client.name}`);
  return {
    subAccountId: account.id,
    agentId: agent.id,
    phoneNumber: account.phone_number || agent.phone_number,
  };
}

module.exports = {
  createSubAccount,
  createAgent,
  trainFromWebsite,
  getCallLogs,
  onboardClient,
};
