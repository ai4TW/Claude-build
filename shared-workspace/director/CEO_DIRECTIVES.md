---
issued: 2026-04-05
review: 2026-04-06 (Thursday mid-week pulse)
---

# Director Directives — April 5, 2026 (Sunday Pre-Pulse)

## Situation Read

The product is further along than previously reported. `allthecalls.ai` is live, Stripe is live with 3 plans, Supabase is live, and Trillet is working. The 500-agent prospect list is built and outreach sequences are ready. **We are not waiting on infrastructure — we are waiting on bug fixes and execution.**

**The #1 blocker to first revenue:** Paying customers cannot log in. The login system uses a hardcoded `CLIENT_REGISTRY` env var not connected to Stripe or Supabase. This means if we ran outreach today and someone paid, they would hit a broken login and immediately lose trust. Fix this first.

**The #2 blocker:** Sales outreach has not started. The list is ready. The sequences are ready. No one has opened Instantly.ai and loaded the campaign. This is a pure execution gap — no owner action needed.

---

## Priority Stack (in order)

1. Fix login → Supabase connection (P0 — blocks all revenue)
2. Set `NEXT_PUBLIC_APP_URL` in Vercel (P0 — may break checkout)
3. Start Instantly.ai cold email campaign (Sales — no blocker, do it now)
4. Fix mobile layout (P1 — conversion blocker for phone traffic)
5. Set `RESEND_API_KEY` in Vercel (P2 — welcome emails)

---

## Engineering — 3 Tasks (URGENT)

### Task 1: Fix the login bug (P0 — MUST COMPLETE BEFORE OUTREACH GOES LIVE)

**Problem:** `/app/api/auth/login/route.ts` authenticates against `CLIENT_REGISTRY` env var — a JSON object mapping email → password. This isn't connected to Stripe or Supabase. When a client pays, no `CLIENT_REGISTRY` entry is created for them, so they can't log in.

**Fix (choose one):**

**Option A (Fastest):** Connect login to Supabase Auth.
- Replace the `CLIENT_REGISTRY` check in `app/api/auth/login/route.ts` with a `supabase.auth.signInWithPassword()` call
- In `/api/onboard`, after saving the client to the `clients` table, also call `supabase.auth.admin.createUser({ email, password: generatedPassword })` and store the generated password in the welcome email
- This is the correct long-term solution

**Option B (Temporary, 10 minutes):** After every new Stripe payment, manually add the client to `CLIENT_REGISTRY` in Vercel env vars and redeploy. This is a stopgap only — use it if Option A is blocked.

**Output:** `app/api/auth/login/route.ts` updated. `/api/onboard` creates Supabase Auth user. Tested with a dummy login.

### Task 2: Set `NEXT_PUBLIC_APP_URL` in Vercel (P0 — 5 minutes)

Run:
```bash
echo "https://allthecalls.ai" | vercel env add NEXT_PUBLIC_APP_URL production
vercel --prod --yes
```

This prevents checkout sessions from redirecting to `undefined` instead of `https://allthecalls.ai/welcome`.

### Task 3: Fix mobile layout (P1 — after P0s are done)

TASKS.md Group 1 (tasks 1.1–1.8) has the complete spec. File is `app/page.tsx` and `components/PricingSection.tsx`. Convert all inline `style={{}}` grid and flex values to Tailwind breakpoint classes. Test at 375px, 390px, 414px viewports.

---

## Sales Agent — 1 Task (START IMMEDIATELY)

### Task: Launch cold email campaign on Instantly.ai

The 500-agent list is built at `shared-workspace/sales/prospects/2026-04-03-500-agent-list.md`. The 5-email sequence is at `shared-workspace/sales/content/outreach-sequence.md`.

**What to do:**
1. Create a free account at instantly.ai
2. Import the Tier 1 prospects from the list (12 confirmed contacts with direct email/phone)
3. Set up the campaign with the outreach-sequence.md copy
4. Configure: 50 emails/day, 20-minute delays, Monday–Friday only
5. Launch the campaign
6. Log campaign URL and launch confirmation in `shared-workspace/sales/pipeline.md`

**FB group posts:** Still blocked on owner Facebook access. Do not retry.

**Success criteria:** Campaign live, at least 12 Tier 1 contacts loaded, sending confirmed. Update `pipeline.md` with stage = "Contacted" for each name.

---

## Content Agent — Hold Pattern

Both active tasks remain blocked on owner credentials:
- ALLAA-10 (blog/Hashnode): blocked on owner creating Hashnode account
- ALLAA-11 (LinkedIn/Buffer): blocked on owner providing Buffer API token + LinkedIn profile ID

Do not re-post the same blocked status. **New task:** While waiting, write 5 additional LinkedIn posts specifically targeting the "missed call = missed commission" angle and the objections in `shared-workspace/sales/content/objection-handling-scripts.md`. Save to `shared-workspace/content/linkedin/new-batch-objection-handling.md`.

---

## Client Success Agent — Standby

Pilot outreach is blocked on human DMs. You are not blocked — when a pilot says yes, you are ready to run `create-client.js`. Review the Trillet confirmed endpoints in HANDOFF.md (Section 4) and make sure the onboarding runbook reflects the correct API paths (`https://api.trillet.ai/v1/api/agent`).

No new action needed unless a pilot client comes in.

---

## Owner Escalation

Creating one inbox message today. The following require owner action — agents cannot unblock these:

| Item | Blocker | Days Waiting |
|------|---------|-------------|
| Facebook group posts | Need owner's Facebook account | 2 |
| Blog publish (Hashnode) | Need owner to create brand account | 2 |
| LinkedIn scheduling | Need Buffer API token + LinkedIn profile ID | 2 |
| Pilot DMs | Need owner to send Instagram/Facebook DMs | 2 |
| RESEND_API_KEY | Need owner to create resend.com account + add key | 2 |

---

## Revenue Path (Updated)

```
Fix login bug (Engineering)               ← THIS WEEK — URGENT
       ↓
Set NEXT_PUBLIC_APP_URL (Engineering)     ← THIS WEEK — URGENT
       ↓
Launch cold email campaign (Sales)        ← STARTS NOW — no blocker
       ↓
Replies come in → move to pipeline        ← within 3–5 business days
       ↓
Pilot client says yes → onboard           ← within 1 week
       ↓
First revenue                             ← target: 2026-04-12
```

Cold email can run in parallel with the login fix. Don't wait. Load the campaign and let it run while Engineering patches the auth.
