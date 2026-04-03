/**
 * Claude API — AI Persona Generator
 * Generates custom AI receptionist scripts for each real estate agent client.
 */

const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

/**
 * Generate a custom AI receptionist persona + script for a real estate agent.
 * @param {object} agent - { name, brokerage, specialty, markets, personality }
 * @returns {object} { greeting, qualificationScript, objectionHandling, voicemailScript }
 */
async function generatePersona(agent) {
  const prompt = `You are creating a custom AI receptionist script for a real estate agent.

Agent Details:
- Name: ${agent.name}
- Brokerage: ${agent.brokerage}
- Specialty: ${agent.specialty || "residential real estate"}
- Markets served: ${agent.markets || "local area"}
- Desired personality: ${agent.personality || "professional and friendly"}

Generate the following 4 scripts. Return as JSON.

1. greeting: The opening line when answering a call (1-2 sentences, warm but professional)
2. qualificationScript: 5 questions to ask every caller to qualify them as a buyer or seller lead
3. objectionHandling: Responses to the 3 most common objections ("I'll call back later", "Just browsing", "I already have an agent")
4. voicemailScript: What to say if the call can't be handled and needs to leave a message

Format:
{
  "greeting": "...",
  "qualificationScript": ["Q1: ...", "Q2: ...", ...],
  "objectionHandling": {
    "call_back_later": "...",
    "just_browsing": "...",
    "have_agent": "..."
  },
  "voicemailScript": "..."
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude did not return valid JSON for persona");

  return JSON.parse(jsonMatch[0]);
}

/**
 * Generate a personalized follow-up SMS after a call.
 * @param {object} call - { agentName, callerName, callerInterest, callSummary }
 */
async function generateFollowUpSMS(call) {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Write a brief, friendly follow-up SMS from ${call.agentName} (real estate agent) to ${call.callerName}.

Caller's interest: ${call.callerInterest}
Call summary: ${call.callSummary}

Keep it under 160 characters. Warm, personal, not spammy. Include a clear next step.`,
      },
    ],
  });
  return message.content[0].text.trim();
}

module.exports = { generatePersona, generateFollowUpSMS };
