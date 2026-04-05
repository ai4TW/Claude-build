import SetupWizard from "./SetupWizard";

interface Prefill {
  name: string;
  email: string;
  businessName: string;
  phone: string;
  plan: string;
  industry?: string;
}

async function getSessionPrefill(sessionId: string): Promise<Prefill | null> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const session = await res.json();
    const meta = (session.metadata as Record<string, string>) || {};
    return {
      email: (session.customer_email as string) || meta.email || "",
      name: meta.name || "",
      businessName: meta.brokerage || "",
      phone: meta.phone || "",
      plan: meta.plan || "starter",
      industry: meta.industry || "",
    };
  } catch {
    return null;
  }
}

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || "";
  const prefill = sessionId ? await getSessionPrefill(sessionId) : null;

  return <SetupWizard prefill={prefill} sessionId={sessionId} />;
}
