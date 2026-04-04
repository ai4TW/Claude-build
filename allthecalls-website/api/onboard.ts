import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://api.trillet.ai";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

function supabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { userId, name, brokerage, phone, aiName, voiceId, intro, hours } = req.body as {
    userId: string;
    name: string;
    brokerage?: string;
    phone?: string;
    aiName: string;
    voiceId: string;
    intro: string;
    hours: string;
  };

  if (!userId || !name || !aiName) {
    return res.status(400).json({ error: "userId, name, and aiName are required" });
  }

  try {
    // 1. Create Trillet agent
    const agentRes = await fetch(`${BASE_URL}/v1/api/agents`, {
      method: "POST",
      headers: trilletHeaders(),
      body: JSON.stringify({
        name: `${aiName} — ${name}${brokerage ? ` (${brokerage})` : ""} [AllTheCalls]`,
        llmModel: "gemini-2.5-flash",
        ttsModel: {
          provider: "rime",
          voiceId: voiceId || "arcana_celeste",
          language: "en",
        },
        settings: { model: "arcana", speed: 1.05 },
        type: "voice",
        systemPrompt: `You are ${aiName}, the AI receptionist for ${name}${brokerage ? ` with ${brokerage}` : ""}.

Your intro: "${intro}"

Your job:
- Answer every call warmly and professionally in ${name}'s name
- Qualify leads: ask about their timeline, budget, if they're pre-approved, and what they're looking for
- Book appointments when the lead is serious — ask for their preferred day and time
- Send a follow-up SMS after every call confirming next steps
- Never pretend to be a human if asked directly — you're an AI receptionist

Operating hours: ${hours === "always" ? "24/7" : hours === "after_hours" ? "evenings (6pm-8am) and weekends" : "as configured"}

Always be helpful, never pushy. Your goal is to capture the lead and get ${name} the information they need to follow up effectively.`,
      }),
    });

    if (!agentRes.ok) {
      const errText = await agentRes.text();
      console.error("Trillet agent creation failed:", errText);
      return res.status(500).json({ error: `Failed to create AI agent: ${errText.slice(0, 200)}` });
    }

    const agent = await agentRes.json();
    const agentId = agent.id || agent._id || agent.agentId;

    if (!agentId) {
      return res.status(500).json({ error: "Agent created but no ID returned" });
    }

    // 2. Update Supabase client record
    const supabase = supabaseAdmin();
    const { error: dbError } = await supabase
      .from("clients")
      .update({
        name,
        brokerage: brokerage || null,
        phone: phone || null,
        ai_name: aiName,
        ai_intro: intro,
        trillet_agent_id: agentId,
        onboarding_completed: true,
      })
      .eq("user_id", userId);

    if (dbError) {
      console.error("Supabase update error:", dbError.message);
      // Don't fail — agent was created successfully
    }

    // 3. Send welcome email (fire and forget)
    const email = req.body.email as string | undefined;
    if (email && process.env.RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "All The Calls <hello@allthecalls.ai>",
          to: [email],
          subject: `${aiName} is live — here's your number`,
          html: `
            <h2>Your AI receptionist is ready! 🎉</h2>
            <p>Hi ${name},</p>
            <p>${aiName} is configured and ready to take calls in your name.</p>
            <p><strong>Next step:</strong> We're assigning your dedicated phone number and will email you within 24 hours with forwarding instructions.</p>
            <p>In the meantime, <a href="https://allthecalls.ai/dashboard">visit your dashboard</a> to see call summaries as they come in.</p>
            <p>— The All The Calls team</p>
          `,
        }),
      }).catch(() => {}); // fire and forget
    }

    return res.status(200).json({ success: true, agentId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Onboard error:", msg);
    return res.status(500).json({ error: msg });
  }
}
