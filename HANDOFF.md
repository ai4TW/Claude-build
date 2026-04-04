# AllTheCalls.ai — Complete Project Handoff
> **For any AI agent, developer, or team member loading this project for the first time.**
> Read this document in full before touching any code, making any API calls, or asking the owner questions.
> Last updated: April 3, 2026

---

## 1. What This Business Is

**AllTheCalls.ai** is a 24/7 AI phone receptionist service built exclusively for real estate agents in the United States. When a client's phone rings and they can't answer, the AI picks up in the agent's name, qualifies the lead, books showings, and sends an SMS follow-up — all automatically.

**The core value proposition:** Real estate agents miss 62% of calls. Every missed call is a potential $10,000–$50,000 commission. AllTheCalls.ai answers every call, every time, for $97–$297/month.

**The technology:** The voice AI is powered by **Trillet AI** (trillet.ai) under a white-label agency agreement. AllTheCalls.ai is the branded product; Trillet is the infrastructure. Clients never see the Trillet brand.

**Business model:** Monthly SaaS subscription with a 14-day free trial. Three plans:
- **Starter** — $97/month — 1 agent, 100 calls/month
- **Pro** — $197/month — 1 agent, unlimited calls (most popular)
- **Team** — $297/month — up to 3 agents, unlimited calls

**Target customer:** Licensed real estate agents at major brokerages (Keller Williams, Compass, RE/MAX, Coldwell Banker, eXp). Solo agents and small teams of 2–3 agents. Primary acquisition channel: Facebook real estate agent groups, cold email, and referrals.

---

## 2. Current State (as of April 3, 2026)

### What Is Built and Working

| Component | Status | Notes |
|-----------|--------|-------|
| Marketing website | ✅ Live | allthecalls.ai — dark premium design |
| Stripe checkout | ✅ Live | 3 plans, 14-day trial, live keys |
| Stripe webhook | ✅ Live | Fires on `checkout.session.completed` |
| `/api/onboard` route | ✅ Built | Creates Trillet agent on payment |
| `/api/webhooks/stripe` | ✅ Built | Triggers onboarding automatically |
| Supabase database | ✅ Live | `clients` and `call_logs` tables exist |
| Trillet API integration | ✅ Working | Can create agents, get call logs |
| Domain (allthecalls.ai) | ✅ Live | GoDaddy DNS → Vercel |
| SSL certificate | ✅ Active | Auto-managed by Vercel |

### What Is NOT Yet Working

| Component | Status | Blocker |
|-----------|--------|---------|
| Client login/dashboard | ❌ Broken | Login uses `CLIENT_REGISTRY` env var — not connected to Stripe or Supabase |
| Phone number assignment | ❌ Manual only | Trillet API has no endpoint for this — must be done in Trillet dashboard |
| Welcome email after signup | ❌ Not sending | `RESEND_API_KEY` not set in Vercel |
| Mobile responsiveness | ❌ Broken | Homepage uses inline `style={{}}` props — no Tailwind breakpoints |
| Inner pages dark theme | ❌ Inconsistent | Demo, checkout, login, contact pages still use old white design |
| Dashboard (client portal) | ⚠️ Partial | Exists but login is disconnected from real client data |

### The Login Problem (Important)

When a client pays and lands on `/login`, they **cannot log in** because:
1. The login system uses a `CLIENT_REGISTRY` environment variable (a JSON object mapping email → password)
2. This is NOT connected to Stripe or Supabase — it's a manual list
3. No `CLIENT_REGISTRY` is set in Vercel, so only the demo account works: `demo@allthecalls.com` / `demo1234`

**Fix required:** Either (a) connect login to Supabase Auth so clients create a real account, or (b) add the `CLIENT_REGISTRY` env var to Vercel with the client's email and a generated password, and email them that password after payment.

---

## 3. Technical Architecture

### Repository
- **GitHub:** `github.com/ai4TW/Claude-build` (private)
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Hosting:** Vercel (project: `allthecalls-ai`)
- **Database:** Supabase (project ID: `amvaplgwteeoxyutcegk`)
- **Payments:** Stripe (live mode, account: `acct_1TIGs7IgJN5lMiut`)
- **Voice AI:** Trillet AI (white-label agency account)

### File Structure (Key Files)
```
app/
  page.tsx                    ← Homepage (dark premium design)
  layout.tsx                  ← Root layout, metadata, fonts
  globals.css                 ← Design system (dark theme, brand colors)
  api/
    checkout/route.ts         ← Creates Stripe checkout session
    onboard/route.ts          ← Creates Trillet agent + saves to Supabase
    webhooks/stripe/route.ts  ← Receives Stripe events, triggers onboarding
    auth/login/route.ts       ← Client portal login (CLIENT_REGISTRY based)
    calls/route.ts            ← Fetches call logs from Trillet
  checkout/page.tsx           ← Checkout page (light theme — needs dark update)
  welcome/page.tsx            ← Post-payment welcome page
  login/page.tsx              ← Client portal login page
  dashboard/page.tsx          ← Client dashboard (shows call logs)
  demo/page.tsx               ← Book a demo page
lib/
  stripe.ts                   ← Stripe plan definitions + price IDs
  session.ts                  ← JWT session management
  generateSystemPrompt.ts     ← Generates AI receptionist personality
integrations/
  trillet.js                  ← Trillet API wrapper (legacy — use route.ts instead)
components/
  PricingSection.tsx          ← Pricing cards component
supabase/
  schema.sql                  ← Database schema (run once in Supabase SQL editor)
CLAUDE.md                     ← Master context for Claude Code sessions
TASKS.md                      ← Ordered task list with checkboxes
HANDOFF.md                    ← This file
```

### Environment Variables (All in Vercel Production)
```
STRIPE_SECRET_KEY             sk_live_51TIGs7...  (live)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  pk_live_51TIGs7...  (live)
STRIPE_WEBHOOK_SECRET         whsec_KkuQjh5...
SUPABASE_URL                  https://amvaplgwteeoxyutcegk.supabase.co
SUPABASE_ANON_KEY             sb_publishable_6tdAwhEf...
SUPABASE_SERVICE_ROLE_KEY     sb_secret_14rxneC...
INTERNAL_SECRET               2e01f715...  (64-char hex, protects /api/onboard)
NEXT_PUBLIC_APP_URL           https://allthecalls.ai  (NOT YET SET — add this)
```

**Missing variables that need to be added:**
```
NEXT_PUBLIC_APP_URL=https://allthecalls.ai
RESEND_API_KEY=<get from resend.com — needed for welcome emails>
TRILLET_API_KEY=<current key from app.trillet.ai/settings>
TRILLET_WORKSPACE_ID=69cf4b468d2a8a6a8e39b684
```

---

## 4. Trillet AI Integration Details

### Account
- **Dashboard:** app.trillet.ai
- **Account email:** brayden@allthecalls.com
- **Plan:** Agency Plus (monthly)
- **Workspace ID:** `69cf4b468d2a8a6a8e39b684`
- **API base URL:** `https://api.trillet.ai/v1/api`

### Working API Endpoints (confirmed April 2026)
```
GET  /v1/api/agent                    → List all agents
POST /v1/api/agent                    → Create new agent
GET  /v1/api/agent/{id}               → Get agent details
PUT  /v1/api/agent/{id}               → Update agent
GET  /v1/api/call-history             → Get call logs (use /v1/ NOT /v2/)
```

### Known Trillet Limitations
1. **No phone number provisioning API** — phone numbers must be assigned manually in the Trillet dashboard. This is the only manual step in the entire client onboarding flow.
2. **`/v2/api/call-history` returns 500** — always use `/v1/api/call-history`
3. **Empty call history returns 500** — handle this gracefully (treat as empty array)
4. **Agent creation does not auto-assign a phone number** — you must go to app.trillet.ai → Agents → [Agent] → Phone Numbers → Assign

### Creating a Client Agent (What `/api/onboard` Does)
```typescript
// 1. Create the agent
POST /v1/api/agent
{
  name: "Sarah — [AgentName] at [Brokerage]",
  systemPrompt: <generated by lib/generateSystemPrompt.ts>,
  voice: "alloy",
  language: "en-US"
}

// 2. Save to Supabase clients table
// 3. Send welcome email via Resend
// 4. Return agent ID — owner manually assigns phone number
```

---

## 5. Stripe Integration Details

### Plans and Price IDs
```typescript
starter: { priceId: "price_1TIGwXIgJN5lMiut...", amount: 97,  calls: 100 }
pro:     { priceId: "price_1TIGwYIgJN5lMiut...", amount: 197, calls: "unlimited" }
team:    { priceId: "price_1TIGwZIgJN5lMiut...", amount: 297, calls: "unlimited", agents: 3 }
```
*(Get exact price IDs from `lib/stripe.ts` in the repo)*

### Payment Flow
```
User clicks "Start Free Trial" on pricing section
  → GET /checkout?plan=pro
  → POST /api/checkout { plan: "pro", email: "..." }
  → Stripe creates checkout session (14-day trial)
  → User completes payment on Stripe hosted page
  → Stripe redirects to /welcome?session_id=...
  → Stripe fires webhook to /api/webhooks/stripe
  → Webhook calls /api/onboard internally
  → Trillet agent created, Supabase record saved
  → Welcome email sent (when RESEND_API_KEY is set)
```

### Webhook
- **Endpoint:** `https://allthecalls.ai/api/webhooks/stripe`
- **Event:** `checkout.session.completed`
- **Webhook ID:** `we_1TILLpIgJN5lMiuthCDrmQbx`

---

## 6. Database Schema (Supabase)

### `clients` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Supabase auth user ID |
| `name` | text | Agent's full name |
| `email` | text | Agent's email |
| `brokerage` | text | Brokerage name |
| `phone` | text | Agent's phone number |
| `trillet_agent_id` | text | Trillet agent ID after creation |
| `trillet_phone_number` | text | Assigned phone number (set manually) |
| `plan` | text | starter / pro / team |
| `onboarding_completed` | boolean | True after phone number assigned |
| `ai_name` | text | AI receptionist name (default: Sarah) |
| `ai_intro` | text | Custom greeting script |
| `created_at` | timestamptz | Signup timestamp |

### `call_logs` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `client_id` | uuid | FK to clients.id |
| `trillet_call_id` | text | Trillet's call ID |
| `caller_number` | text | Incoming caller's number |
| `duration_seconds` | integer | Call duration |
| `transcript` | text | Full call transcript |
| `summary` | text | AI-generated lead summary |
| `lead_score` | integer | 1–10 lead quality score |
| `appointment_booked` | boolean | Whether a showing was booked |
| `called_at` | timestamptz | When the call happened |

---

## 7. Design System

### Philosophy: Dark Premium Tech — Midnight Intelligence
The site uses a near-black background with violet-to-cyan gradient accents, glassmorphism cards, and Space Grotesk typography. This positions AllTheCalls.ai as a sophisticated, high-end AI product — not a generic SaaS tool.

### Colors (CSS Variables in `globals.css`)
```css
--brand-bg: #08090f          /* Near-black background */
--brand-primary: #7c3aed     /* Violet primary */
--brand-accent: #06b6d4      /* Cyan accent */
--brand-gradient: linear-gradient(135deg, #7c3aed, #06b6d4)
--brand-glow: 0 0 40px rgba(124, 58, 237, 0.3)
```

### Typography
- **Headings:** Space Grotesk (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Gradient text:** `background: var(--brand-gradient); -webkit-background-clip: text`

### Key CSS Classes (defined in `globals.css`)
```css
.gradient-text        /* Violet-to-cyan gradient text */
.glass-card           /* Glassmorphism card with blur + border */
.glow-button          /* CTA button with gradient + glow hover */
.icon-glow            /* Icon with colored glow effect */
.fade-in              /* Scroll-triggered fade-in animation */
.wave-bar             /* Animated audio waveform bar */
```

### Critical Design Rule
**Do NOT change the dark design.** The homepage (`app/page.tsx`) uses a carefully crafted dark aesthetic. Inner pages (login, checkout, demo, contact) still use the old white design and need to be updated to match — but the homepage design must not be reverted.

---

## 8. Known Bugs and Issues (Priority Order)

### P0 — Blocking First Revenue
1. **Login not connected to Stripe** — clients who pay cannot log in. Fix: add `CLIENT_REGISTRY` env var to Vercel for each client, or migrate to Supabase Auth.
2. **`NEXT_PUBLIC_APP_URL` not set** — checkout redirect may fail. Fix: add `NEXT_PUBLIC_APP_URL=https://allthecalls.ai` to Vercel.

### P1 — Broken User Experience
3. **Mobile layout broken** — entire homepage uses inline `style={{}}` with fixed pixel values. Fix: convert to Tailwind breakpoint classes (`sm:`, `md:`, `lg:`).
4. **Inner pages white theme** — login, checkout, demo, contact pages don't match the dark homepage. Fix: apply dark design system classes.

### P2 — Missing Features
5. **Welcome email not sending** — `RESEND_API_KEY` not set. Fix: create account at resend.com, add key to Vercel.
6. **Dashboard shows no real data** — call logs are fetched from Trillet but the session system isn't connected to real client agent IDs.

### P3 — SEO / Technical Debt
7. **Old domain in AGENTS.md files** — `/agents/*/AGENTS.md` files reference `realty-receptionist` local path. Low priority.
8. **`nP5Bg8r3Lqk5yy2kq7aLFCRhhctGnv29` mystery env var** — appears to be an accidentally named variable. Value is "trillet production link". Safe to ignore or delete.

---

## 9. How to Deploy

### Standard Deployment (push to main)
```bash
cd /path/to/Claude-build
git add -A
git commit -m "your message"
git push origin main
# Vercel auto-deploys from main branch — takes ~2 minutes
```

### Manual Deploy via CLI
```bash
vercel --prod --yes
```

### Check Deployment Status
```bash
# Via MCP
manus-mcp-cli tool call list_deployments --server vercel --input '{"projectId":"allthecalls-ai","teamId":"brayden-1155s-projects"}'
```

### Add Environment Variable
```bash
echo "VALUE" | vercel env add VARIABLE_NAME production
vercel --prod --yes  # redeploy to apply
```

---

## 10. Skills Available (in `/skills/` directory)

These are instruction files that teach AI agents how to perform specific business operations:

| Skill | File | What It Does |
|-------|------|-------------|
| `client-onboarding` | `skills/client-onboarding/SKILL.md` | Full Stripe → Trillet provisioning flow |
| `sales-outreach` | `skills/sales-outreach/SKILL.md` | Weekly realtor prospecting + cold email |
| `client-success` | `skills/client-success/SKILL.md` | Retention, churn prevention, upsell |
| `seo-optimize` | `skills/seo-optimize/SKILL.md` | SEO audit and optimization |
| `site-qa` | `skills/site-qa/SKILL.md` | Full site QA and bug registry |

**Also in:** `github.com/ai4TW/new-skills-claude-----allthecalls.ai-00almost`

---

## 11. Immediate Next Actions (In Priority Order)

1. **Add `NEXT_PUBLIC_APP_URL=https://allthecalls.ai` to Vercel** — prevents checkout redirect failures
2. **Add `TRILLET_API_KEY` to Vercel** — required for agent creation on payment
3. **Add `TRILLET_WORKSPACE_ID=69cf4b468d2a8a6a8e39b684` to Vercel** — required for Trillet API
4. **Fix mobile layout** — convert inline styles to Tailwind breakpoints (Group 1 in TASKS.md)
5. **Fix login flow** — either add CLIENT_REGISTRY or migrate to Supabase Auth
6. **Set up Resend** — create account at resend.com, add `RESEND_API_KEY` to Vercel
7. **Get first pilot client** — reach out to 5 real estate agents you know personally, offer 30-day free trial

---

## 12. Contact and Access

| Service | URL | Credentials |
|---------|-----|-------------|
| Website | https://allthecalls.ai | — |
| Vercel | https://vercel.com/brayden-1155s-projects | Owner account |
| GitHub | https://github.com/ai4TW/Claude-build | ai4TW org |
| Supabase | https://supabase.com/dashboard/project/amvaplgwteeoxyutcegk | Owner account |
| Stripe | https://dashboard.stripe.com | brayden@allthecalls.com |
| Trillet | https://app.trillet.ai | brayden@allthecalls.com |
| GoDaddy | https://dcc.godaddy.com | Owner account |

**Business email:** hello@allthecalls.com
**Owner:** Brayden Myers

---

*This document was generated by Manus AI on April 3, 2026. Update it whenever significant changes are made to the architecture, credentials, or business direction.*
