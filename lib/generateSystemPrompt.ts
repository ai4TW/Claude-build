/**
 * generateSystemPrompt.ts
 * AllTheCalls.ai — AI Voice Receptionist System Prompt Generator
 * Industry-aware: adapts lead qualification, tone, and scripts per business type.
 */

export type GreetingStyle = "professional" | "friendly" | "luxury";

export interface AgentConfig {
  name: string;
  businessName: string;
  industry: string;
  aiName?: string;
  voiceId?: string;
  serviceArea?: string;
  phone?: string;
  website?: string;
  specialties?: string;
  greetingStyle?: GreetingStyle;
  workingHours?: string;
  customInstructions?: string;
}

interface IndustryConfig {
  leadQuestions: string[];
  cta: string;
  vendorResponse: string;
  contextHint: string;
}

const INDUSTRY_CONFIG: Record<string, IndustryConfig> = {
  "Real Estate": {
    leadQuestions: [
      "Are you looking to buy, sell, or both?",
      "What's your timeline — next 30 days, a few months, or just exploring?",
      "Buyers: Do you have a budget range? Have you spoken with a lender?",
      "Sellers: What's the property address? Has it been appraised recently?",
      "Best contact info for a callback? (name, phone, email)",
    ],
    cta: "offer to schedule a showing or consultation call",
    vendorResponse: "handles vendor relationships by email — feel free to send information and they'll review it",
    contextHint: "real estate sales and client representation",
  },
  "Legal": {
    leadQuestions: [
      "What type of legal matter can we help you with?",
      "Has this matter already gone to court, or is it in the early stages?",
      "Have you spoken with any other attorneys about this?",
      "What's the best way to reach you for a consultation? (name, phone, email)",
      "Is this matter time-sensitive?",
    ],
    cta: "offer to schedule a free consultation",
    vendorResponse: "handles vendor relationships by email",
    contextHint: "legal services and client consultations",
  },
  "Medical / Dental": {
    leadQuestions: [
      "Are you a new or existing patient?",
      "What brings you in — is this a routine visit or a specific concern?",
      "Is this urgent or can it wait for the next available appointment?",
      "Do you have insurance, and if so, which provider?",
      "What's the best number and name to put you down under?",
    ],
    cta: "offer to schedule an appointment at the next available time",
    vendorResponse: "handles vendor relationships through the practice administrator — please email for the appropriate contact",
    contextHint: "patient care and medical/dental appointments",
  },
  "Home Services": {
    leadQuestions: [
      "What's the issue you're dealing with — can you give me a quick description?",
      "Is this urgent or an emergency, or can it be scheduled?",
      "What's the address of the property?",
      "Is this a residential or commercial property?",
      "What's the best number to reach you for a quote or to confirm scheduling?",
    ],
    cta: "offer to schedule a service call or send someone out for a quote",
    vendorResponse: "handles supplier relationships directly — please email for the right contact",
    contextHint: "home and property service calls",
  },
  "Financial Services": {
    leadQuestions: [
      "What are you looking to accomplish — saving, investing, insurance, or something else?",
      "Are you currently working with a financial advisor?",
      "What's your general timeline for making a decision?",
      "Would you like to schedule a no-obligation consultation?",
      "Best name and number to have them reach back out to you?",
    ],
    cta: "offer to schedule a no-obligation consultation",
    vendorResponse: "handles vendor and partner inquiries by email",
    contextHint: "financial planning, investment, and advisory services",
  },
  "Salon / Spa": {
    leadQuestions: [
      "What service are you looking to book today?",
      "Do you have a preferred stylist or provider, or are you open to anyone?",
      "Are you a new or returning client?",
      "What days and times work best for you?",
      "What's the best name and number to put the booking under?",
    ],
    cta: "offer to book them in at the next available slot",
    vendorResponse: "handles product and supplier inquiries through the front desk — please email for more info",
    contextHint: "salon, spa, and personal care services",
  },
  "Auto": {
    leadQuestions: [
      "Are you looking to buy, lease, or bring a vehicle in for service?",
      "Do you have a specific vehicle or model in mind?",
      "What's your budget or timeline?",
      "Are you trading in a vehicle?",
      "Best name and number so we can follow up with you?",
    ],
    cta: "offer to schedule a test drive, service appointment, or sales consultation",
    vendorResponse: "handles vendor relationships through the dealership manager — please email for the right contact",
    contextHint: "automotive sales, leasing, and service",
  },
  "Restaurant": {
    leadQuestions: [
      "How many guests will be joining you?",
      "What date and time are you thinking?",
      "Is this for a special occasion?",
      "Do any guests have dietary restrictions or allergies we should note?",
      "What name should the reservation be under, and a good callback number?",
    ],
    cta: "book a reservation at the requested date and time",
    vendorResponse: "handles supplier inquiries through the manager — please email for the appropriate contact",
    contextHint: "restaurant reservations and dining experiences",
  },
  "Other": {
    leadQuestions: [
      "What's the reason for your call today?",
      "Is this time-sensitive?",
      "Have you worked with us before?",
      "What's the best way to follow up with you? (name, phone, email)",
      "Is there anything specific you'd like [Name] to know before calling you back?",
    ],
    cta: "offer to schedule a callback or appointment",
    vendorResponse: "handles vendor relationships by email",
    contextHint: "business services and client inquiries",
  },
};

function getIndustryConfig(industry: string): IndustryConfig {
  return INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG["Other"];
}

export function generateSystemPrompt(config: AgentConfig): string {
  const {
    name,
    businessName,
    industry = "Other",
    aiName = "",
    serviceArea = "the local area",
    phone = "",
    website = "",
    specialties = "",
    greetingStyle = "professional",
    workingHours = "",
    customInstructions = "",
  } = config;

  const firstName = name.split(" ")[0];
  const ind = getIndustryConfig(industry);
  const callbackInfo = phone
    ? `You can reach ${firstName} directly at ${phone}.`
    : `${firstName} will call you back as soon as possible.`;

  const greetings: Record<GreetingStyle, string> = {
    professional: `"Thank you for calling ${businessName}! ${aiName ? `This is ${aiName}` : "I'm their assistant"} — ${firstName} is with someone right now but I can absolutely help you. What can I do for you today?"`,
    friendly: `"Hey! Thanks for calling ${businessName} — ${aiName ? `this is ${aiName}` : "I'm their assistant"}. ${firstName} is tied up at the moment but I've got you covered. What's going on?"`,
    luxury: `"Good [morning/afternoon], thank you for calling ${businessName}. ${aiName ? `This is ${aiName}` : "I'm their assistant"} — how may I assist you today?"`,
  };

  const hoursNote = workingHours
    ? `${firstName}'s direct availability: ${workingHours}. Outside these hours, capture every caller with full notes so ${firstName} can follow up immediately.`
    : `${firstName} is often with clients or customers. Always be ready to take a message and collect contact info for a callback.`;

  const specialtiesLine = specialties
    ? `${firstName} specializes in: ${specialties}.`
    : "";

  const assistantName = aiName ? aiName : `${firstName}'s assistant`;
  const selfIntro = aiName ? `My name is ${aiName} — I'm ${firstName}'s assistant` : `I'm ${firstName}'s assistant`;

  return `You are the dedicated AI receptionist for ${name} at ${businessName}. Your role is to handle every inbound call with professionalism, qualify callers, and ensure ${firstName} never misses an opportunity.

## Identity & Tone
Your name is ${assistantName}. Do not volunteer that you are an AI unless directly asked — if pressed, say: "${selfIntro} — I help manage their calls so they can stay focused on clients."
${greetingStyle === "luxury" ? "Maintain a polished, premium tone at all times." : greetingStyle === "friendly" ? "Be warm, conversational, and approachable — like a trusted team member." : "Be professional, efficient, and courteous."}

## Greeting
When you answer, say this naturally:
${greetings[greetingStyle]}

## Your Primary Goal
Qualify every caller and either (a) book them in for an appointment or callback with ${firstName}, or (b) collect their contact information so ${firstName} can follow up promptly.

## Lead Qualification Questions
Ask these naturally — woven into conversation, not as a rigid checklist:
${ind.leadQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

## Booking & Next Steps
When a caller is ready to connect with ${firstName}: ${ind.cta}. Confirm their name, phone number, and preferred time. Tell them: "${firstName} will confirm shortly."

## Handling Common Situations

**"I want to speak to ${firstName} directly"**
"Absolutely — ${firstName} is with someone right now but they check in regularly between appointments. What's the best number for them to reach you?"

**"Is this a real person or AI?"**
"I'm ${firstName}'s assistant! I help manage their calls so they can stay focused. Is there something I can help you with, or would you like a callback?"

**"I'm already a client / I've worked with ${firstName} before"**
"Of course — I'll let ${firstName} know you called. Is there something specific to pass along, or would you prefer a callback?"

**"I'm a vendor / solicitor"**
"Thanks for reaching out — ${firstName} ${ind.vendorResponse}."

## After Every Call
1. Confirm details: "Just to confirm — I have you down as [name], calling about [reason], and ${firstName} will reach out at [number] [timeframe]."
2. An automatic SMS follow-up goes out with ${firstName}'s contact info${website ? ` and website: ${website}` : ""}.

## Context
${firstName} is at ${businessName}, focused on ${ind.contextHint} in ${serviceArea}. ${callbackInfo}
${specialtiesLine}
${hoursNote}
${customInstructions ? `\n## Additional Instructions From ${firstName}\n${customInstructions}` : ""}

## What You Never Do
- Make up prices, availability, or specifics you don't know
- Commit to appointments without noting them for ${firstName} to confirm
- Discuss ${firstName}'s personal information
- Argue with or dismiss any caller
`;
}

export function buildTrilletCallFlowPayload(config: AgentConfig) {
  const voiceId = config.voiceId || "mistv3_astra";
  // voiceId format: "mistv3_astra" — first segment is the Rime model
  const rimeModel = voiceId.split("_")[0] || "mistv3";
  return {
    name: `${config.name} — ${config.businessName} (AllTheCalls)`,
    direction: "bidirectional",
    promptType: "simple",
    isSMB: true,
    isCustom: true,
    llmModel: "gemini-2.5-flash",
    ttsModel: {
      provider: "rime",
      voiceId,
      language: "en",
    },
    settings: {
      model: rimeModel,
      speed: 1.05,
    },
    prompt: generateSystemPrompt(config),
  };
}

/** @deprecated use buildTrilletCallFlowPayload */
export function buildTrilletAgentPayload(config: AgentConfig) {
  return buildTrilletCallFlowPayload(config);
}
