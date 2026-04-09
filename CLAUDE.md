# CLAUDE.md — AllTheCalls.ai Master Context
> This file is the single source of truth for Claude Code working on this project.
> Read this ENTIRE file before touching any code. Do not skip sections.

---

## What This Product Is

**AllTheCalls.ai** is a white-label AI receptionist service for real estate agents.
- Agents sign up, pay via Stripe, and get a dedicated AI receptionist that answers calls in their name
- The AI is powered by **Trillet AI** (voice AI platform) under the hood — agents never see Trillet branding
- AllTheCalls owns one Trillet workspace; each client gets their own **agent** inside that workspace
- Clients only ever interact with the AllTheCalls dashboard, never with Trillet directly

---

## Live URLs

| Environment | URL |
|-------------|-----|
| Production | https://allthecalls.ai |
| Vercel project | https://vercel.com/allthecallsai/allthecalls-ai ← ALWAYS use this, never push to any other project |
| GitHub repo | https://github.com/ai4TW/Claude-build |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v4 + custom design system in `app/globals.css` |
| Payments | Stripe (embedded checkout, 3 tiers) |
| Voice AI | Trillet AI (`integrations/trillet.js`) |
| Database | Supabase (not yet wired — see TASKS.md) |
| Email | Resend (`hello@allthecalls.com`) |
| Auth | Custom session cookie (`lib/session.ts`) |
| Deployment | Vercel (auto-deploys on push to `main`) |

---

## Design System — CRITICAL, DO NOT BREAK

The site uses a **Dark Premium Tech** design called "Midnight Intelligence":
- Background: `#08090f` (near-black)
- Primary gradient: `linear-gradient(135deg, #7c3aed, #06b6d4)` (violet → cyan)
- Typography: **Space Grotesk** (headings) + **DM Sans** (body)
- Cards: glassmorphism — `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `backdrop-filter: blur(20px)`
- CSS classes defined in `app/globals.css`: `.gradient-text`, `.glass-card`, `.btn-glow`, `.btn-ghost`, `.wave-bar`, `.fade-in`, `.pricing-popular`, `.icon-glow`

**ALL new pages and components MUST use this design system.**
**NEVER use white backgrounds, light themes, or the old brand colors on any page.**
The `/demo`, `/checkout`, and `/welcome` pages currently use the old white design — they need to be updated to match.

---

## Environment Variables (Vercel)

These are already set in Vercel. Reference them with `process.env.*`:

```
TRILLET_API_KEY=<rotate-immediately — stored in Vercel only>
TRILLET_WORKSPACE_ID=<stored in Vercel only>
STRIPE_SECRET_KEY=<set in Vercel — sk_live_... or sk_test_...>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<set in Vercel — pk_...>
STRIPE_WEBHOOK_SECRET=<set in Vercel — whsec_...>
NEXT_PUBLIC_APP_URL=https://allthecalls.ai
ANTHROPIC_API_KEY=<set in Vercel>
SESSION_SECRET=<set in Vercel>
SUPABASE_URL=<set in Vercel when Supabase is added>
SUPABASE_ANON_KEY=<set in Vercel when Supabase is added>
RESEND_API_KEY=<set in Vercel>
```

---

## Stripe Plans

```typescript
// lib/stripe.ts
export const PLANS = {
  starter: {
    name: "Solo",
    priceId: "price_1TIiDH42X4XVjhD9PWXt8WgM",
    displayPrice: "$199",
    monthlyAmount: 199,
  },
  pro: {
    name: "Pro",
    priceId: "price_1TIiDH42X4XVjhD91fGNwpWH",
    displayPrice: "$349",
    monthlyAmount: 349,
  },
  agency: {
    name: "Agency",
    priceId: "price_1TIiDH42X4XVjhD94HvjsprJ",
    displayPrice: "$599",
    monthlyAmount: 599,
  },
};
// All plans: 7-day free trial. Stripe is in LIVE mode.
```

---

## Trillet API — Confirmed Working Endpoints

**Base URL:** `https://api.trillet.ai`

**Required headers on every request:**
```
x-api-key: $TRILLET_API_KEY  ← from Vercel env
x-workspace-id: $TRILLET_WORKSPACE_ID  ← from Vercel env
Content-Type: application/json
```

**Endpoints:**
```
GET    /v1/api/agents              — list all agents
GET    /v1/api/agents/:id          — get single agent
POST   /v1/api/agents              — create agent (see schema below)
PUT    /v1/api/agents/:id          — update agent
DELETE /v1/api/agents/:id          — delete agent
GET    /v1/api/call-history        — workspace call history
GET    /v1/api/call-history?agentId=:id  — calls for one agent
```

**Known Trillet bugs/limitations:**
- `GET /v1/api/call-history` returns HTTP 500 when there are zero calls — catch this and return `[]`
- Phone number provisioning is **dashboard-only** — there is no API endpoint for it (`/v1/api/phone-numbers` returns 404)
- No sub-accounts or client isolation — all agents share one workspace
- All routes use `/v1/api/call-history` (correct)

**Agent creation schema:**
```json
{
  "name": "Sarah Johnson — Compass (AllTheCalls)",
  "llmModel": "gemini-2.5-flash",
  "ttsModel": {
    "provider": "rime",
    "voiceId": "arcana_celeste",
    "language": "en"
  },
  "settings": { "model": "arcana", "speed": 1.05 },
  "type": "voice",
  "systemPrompt": "You are Sarah Johnson, a real estate agent at Compass..."
}
```

---

## Client Onboarding Flow (Target State)

```
1. Client visits allthecalls.ai/pricing
2. Clicks "Start Free Trial" → /checkout?plan=pro
3. Stripe embedded checkout → 7-day trial starts
4. Stripe fires webhook: checkout.session.completed
5. /api/webhooks/stripe receives event
6. Calls /api/onboard internally:
   a. Generate system prompt via Claude API (claude-personas.js)
   b. POST /v1/api/agents → creates Trillet agent
   c. Save client record to Supabase (clients table)
   d. Send welcome email via Resend
7. Client receives email: "Your AI is being set up — assign your phone number at [link]"
8. You (admin) go to app.trillet.ai → assign phone number to their agent
9. Client's AI goes live
```

**Current state:** Steps 1–3 work. Steps 4–9 do not exist yet. The welcome page just says "we'll set it up in 24 hours."

---

## File Structure Reference

```
app/
  page.tsx              ← Main landing page (dark design — DO NOT revert)
  globals.css           ← Design system — source of truth for all styles
  layout.tsx            ← Root layout with Space Grotesk + DM Sans fonts
  api/
    checkout/route.ts   ← Stripe checkout session creation
    calls/route.ts      ← Trillet call history proxy (fix: use /v1/ not /v2/)
    auth/               ← Login/logout
    settings/route.ts   ← Agent settings
    webhooks/           ← DOES NOT EXIST YET — needs to be created
    onboard/            ← DOES NOT EXIST YET — needs to be created
  checkout/
    page.tsx            ← Checkout page (needs dark theme)
    CheckoutForm.tsx    ← Stripe embedded checkout component
  demo/page.tsx         ← Demo booking page (needs dark theme)
  welcome/page.tsx      ← Post-checkout welcome (needs dark theme + auto-setup)
  dashboard/            ← Client dashboard (mostly working)
  login/page.tsx        ← Login page
components/
  PricingSection.tsx    ← Pricing cards (dark design)
  NavSidebar.tsx        ← Dashboard sidebar
integrations/
  trillet.js            ← Trillet API wrapper (CommonJS)
  claude-personas.js    ← Claude API for generating agent system prompts
lib/
  stripe.ts             ← Stripe client + PLANS config
  session.ts            ← Session management
```

---

## Mobile Responsiveness Rules

The current `app/page.tsx` uses inline `style={{}}` props with hardcoded pixel values — **this is the cause of all mobile issues**. When editing any file:

1. **Use Tailwind utility classes** instead of inline styles wherever possible
2. **Always add responsive breakpoints**: start mobile-first, then `sm:`, `md:`, `lg:`
3. **Stats grid**: must be `grid-cols-2` on mobile, `grid-cols-4` on `md:`
4. **Footer grid**: must be `grid-cols-1` on mobile, `grid-cols-3` on `md:`
5. **Nav**: must have a hamburger menu on mobile (hide links, show menu button)
6. **Hero**: full-width on mobile, max-w-xl on `md:`
7. **Buttons**: full-width (`w-full`) on mobile, `w-auto` on `sm:`
8. **Pricing cards**: single column on mobile, 3-column on `lg:`
9. **Font sizes**: use `clamp()` or Tailwind responsive text classes (`text-4xl md:text-6xl`)

---

## Code Quality Rules

- **TypeScript only** — no `.js` files in `app/` or `components/` (the `integrations/` folder can stay CommonJS)
- **No `any` types** — define proper interfaces
- **Server components by default** — only add `"use client"` when you need hooks or browser APIs
- **Error handling** — every API route must return proper HTTP status codes and JSON error messages
- **Never hardcode** `realty-receptionist.vercel.app` — always use `process.env.NEXT_PUBLIC_APP_URL`
- **Stripe webhook** — always verify the signature with `stripe.webhooks.constructEvent()` before processing

---

## Deployment

Push to `main` → Vercel auto-deploys. No manual deploy needed.

To check deployment status:
```bash
vercel ls --prod
```

To add/update environment variables:
```bash
vercel env add VARIABLE_NAME production
```

---

## What NOT to Do

- Do NOT revert the dark design — the old white design is gone intentionally
- Do NOT use `realty-receptionist.vercel.app` anywhere
- Do NOT call Trillet's `/v2/api/` endpoints — use `/v1/api/`
- Do NOT try to provision phone numbers via API — it doesn't exist, flag it for manual action
- Do NOT create sub-accounts in Trillet — they don't exist
- Do NOT skip Stripe webhook signature verification
- Do NOT store API keys in code — use `process.env.*`
