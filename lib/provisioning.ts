import { supabaseAdmin } from "@/lib/supabase";

export type Tier = "starter" | "growth" | "pro";
export type JobStatus = "pending_intake" | "queued" | "provisioning" | "needs_attention" | "live";

export interface BusinessFacts {
  businessName: string;
  phone: string;
  serviceArea: string[];
  services: string[];
}

export interface ProvisioningJob {
  id: string;
  stripe_session_id: string;
  tier: Tier;
  vertical: string;
  owner_email: string;
  business_facts: Partial<BusinessFacts>;
  status: JobStatus;
  created_at: string;
  updated_at: string;
}

export interface VerifiedSession {
  sessionId: string;
  tier: Tier;
  ownerEmail: string;
  vertical: string;
}

/**
 * TEST-ONLY synthetic session, used so the intake wizard can be built and
 * verified end to end before real Stripe checkout is wired (per the build
 * plan — Stripe wiring is an explicitly separate, later step).
 *
 * Safe by construction today: a real Stripe checkout session id is always
 * `cs_test_...` or `cs_live_...`, so a `test_` prefix can never collide with
 * a real one. The only effect of "verifying" one is writing a row to
 * `provisioning_jobs` with status `queued` — there is no orchestrator yet
 * that consumes that row, so this cannot provision real infrastructure.
 *
 * MUST be revisited once the pipeline orchestrator (build-plan step 3) is
 * wired: at that point a `test_` session would let someone provision a real
 * client stack with no payment. Lock this behind an internal-only flag (or
 * remove it) before that lands.
 */
function verifyTestSession(sessionId: string): VerifiedSession | null {
  if (!sessionId.startsWith("test_")) return null;
  return {
    sessionId,
    tier: "growth",
    ownerEmail: "qa+provisioning-test@allthecalls.ai",
    vertical: "plumbing",
  };
}

/**
 * Verifies a Stripe Checkout session actually completed a real payment
 * before any intake submission is accepted. Real path for production;
 * `verifyTestSession` above is the only bypass, and only for synthetic ids.
 */
export async function verifySession(sessionId: string): Promise<VerifiedSession | null> {
  const testSession = verifyTestSession(sessionId);
  if (testSession) return testSession;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");

  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return null;

  const session = await res.json();
  if (session.payment_status !== "paid" && session.status !== "complete") return null;

  const tier = (session.metadata?.tier as Tier) || "growth";
  const ownerEmail = session.customer_details?.email || session.customer_email;
  if (!ownerEmail) return null;

  return {
    sessionId,
    tier,
    ownerEmail,
    vertical: session.metadata?.vertical || "plumbing",
  };
}

/**
 * Looks up an existing job for this session (idempotent re-entry — a client
 * reloading the setup page, or a retried request, must not create a second
 * row for one payment).
 */
export async function getJobBySession(sessionId: string): Promise<ProvisioningJob | null> {
  if (!supabaseAdmin) throw new Error("Supabase admin client is not configured");
  const { data, error } = await supabaseAdmin
    .from("provisioning_jobs")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (error) throw error;
  return data as ProvisioningJob | null;
}

/**
 * Creates (or, on retry, returns) the job for a verified session, and
 * records the collected business facts.
 */
export async function submitIntake(
  verified: VerifiedSession,
  facts: BusinessFacts
): Promise<ProvisioningJob> {
  if (!supabaseAdmin) throw new Error("Supabase admin client is not configured");

  const existing = await getJobBySession(verified.sessionId);
  if (existing) return existing;

  const { data, error } = await supabaseAdmin
    .from("provisioning_jobs")
    .insert({
      stripe_session_id: verified.sessionId,
      tier: verified.tier,
      vertical: verified.vertical,
      owner_email: verified.ownerEmail,
      business_facts: facts,
      status: "queued",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as ProvisioningJob;
}
