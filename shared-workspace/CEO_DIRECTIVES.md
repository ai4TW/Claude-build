---
issued: 2026-04-02
week: 2
expires: 2026-04-09
---

# CEO Weekly Directives — Week 2

## Company Priority This Week
**Get to first revenue.** We have the product built. This week is about deployment, outreach, and pilot clients.

---

## CTO — Your 3 Tasks This Week

1. **Deploy to Vercel** — run `vercel deploy --prod` from the project root. Set env vars: `TRILLET_API_KEY`, `ANTHROPIC_API_KEY`, `SESSION_SECRET`. Record the live URL in COMPANY_STATUS.md.

2. **Add Stripe** — install `stripe` package, add `/api/stripe/checkout` route with 3 price IDs. Add a "Subscribe" button to the portal dashboard. Clients should be able to pay before you create their Trillet account.

3. **Add Supabase** — create a `clients` table (id, name, email, brokerage, trillet_sub_account_id, trillet_agent_id, stripe_customer_id, plan, created_at). Replace the `CLIENT_REGISTRY` env var hack in `app/api/auth/login/route.ts` with a real DB lookup.

**Success criteria:** Portal is live at a public URL, Stripe checkout works for all 3 tiers, 1 test client stored in Supabase.

---

## Sales — Your 3 Tasks This Week

1. **Build the 500-agent list** — pull licensed agent emails from your state's real estate commission public records (most states publish CSVs at realestate.[state].gov). Filter for: individual license, active status, licensed in last 3 years. Save to `shared-workspace/sales/agent-list.csv`.

2. **Set up cold email tool** — create a free Instantly.ai account. Import the list. Load the 5-email sequence from `shared-workspace/sales/content/outreach-sequence.md`. Set sending to 50/day with 20-min delays.

3. **Post in 3 Facebook groups** — use templates from `shared-workspace/sales/content/fb-group-posts.md`. Target groups: "Real Estate Agent Mastermind", "Realtor Marketing Tips", "Real Estate Leads & Marketing". Track replies in `shared-workspace/sales/fb-responses.md`.

**Success criteria:** 100 cold emails sent, 3 FB posts live, at least 5 replies/inquiries logged.

---

## Content — Your 3 Tasks This Week

1. **Publish the blog post** — the post at `shared-workspace/content/blog-missed-calls.md` is ready. Publish it to a free Medium or Hashnode account under the All The Calls brand. Record the live URL in COMPANY_STATUS.md.

2. **Schedule LinkedIn posts** — take the 10 posts from `shared-workspace/content/linkedin-posts.md`. Schedule 2 per day Mon-Fri using Buffer (free tier). Focus on founder personal brand, not company brand.

3. **Create a 30-second demo reel** — use Loom (free). Record: screen shows an incoming call → AI answers in agent's name → qualifies the lead → confirms the booking. No editing needed. Post to LinkedIn and reply to every comment.

**Success criteria:** Blog post live with URL, 5 LinkedIn posts scheduled, Loom demo recorded and shared.

---

## Client Success — Your 3 Tasks This Week

1. **Recruit 3 pilot clients** — DM 20 real estate agents on Instagram or Facebook who you personally know or who engage with the content. Offer: "Free for 30 days, just forward your calls, takes 5 minutes to set up." Use the pitch from `shared-workspace/client-success/upsell-script.md` (adapt for free trial intro). Log responses in `shared-workspace/client-success/pilot-outreach.md`.

2. **Onboard the first pilot** — when someone says yes, run: `node scripts/create-client.js --name "..." --brokerage "..." --email "..." --website "..."`. Send them the onboarding sequence from `shared-workspace/client-success/content/onboarding-sequence.md` (email #1 and #2).

3. **Set up churn monitoring** — build a simple script `scripts/check-clients.js` that calls `getCallLogs()` for each client in Supabase and flags any client with 0 calls in 7 days. Run it daily. Log flagged clients to `shared-workspace/client-success/churn-risk.md`.

**Success criteria:** 3 pilot clients identified, 1 fully onboarded with their AI live, churn monitoring script running.

---

## CEO Note
We are in week 2 of a 90-day sprint. Every day without a live URL and paying clients is a missed opportunity. Speed beats perfection — ship, iterate, get feedback.

Next brief issued: 2026-04-09. All agents must update COMPANY_STATUS.md with their KPI actuals before then.
