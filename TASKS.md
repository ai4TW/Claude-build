# TASKS.md — AllTheCalls.ai Implementation Backlog
> Ordered by priority. Complete tasks in sequence within each group.
> Each task is atomic — one file or one endpoint at a time.
> Check off tasks as you complete them. Push to main after each group.

---

## GROUP 1 — Mobile Responsiveness (Highest Priority)
> Real estate agents browse on phones. This directly impacts conversion.

- [ ] **1.1 — Fix nav for mobile**
  - File: `app/page.tsx` (Nav section, ~line 100–130)
  - Add a `useState` hamburger menu toggle
  - Hide nav links on mobile (`hidden md:flex`), show hamburger icon (`md:hidden`)
  - Hamburger opens a full-width dropdown with all nav links
  - Keep the dark glass style: `background: rgba(8,9,15,0.95)`, `backdrop-filter: blur(20px)`

- [ ] **1.2 — Fix stats bar grid**
  - File: `app/page.tsx` (Stats section)
  - Change `gridTemplateColumns: "repeat(4, 1fr)"` to Tailwind: `grid grid-cols-2 md:grid-cols-4`
  - Add `gap-6 md:gap-8` and `py-10 px-4`

- [ ] **1.3 — Fix hero section mobile layout**
  - File: `app/page.tsx` (Hero section)
  - Replace inline `maxWidth: "640px"` with `max-w-xl w-full`
  - Replace `padding: "6rem 1rem"` with `pt-24 pb-16 px-4 md:pt-32 md:pb-24`
  - Make CTA buttons full-width on mobile: `flex flex-col sm:flex-row gap-4`
  - Each button: `w-full sm:w-auto`
  - Hero heading: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

- [ ] **1.4 — Fix pricing cards mobile layout**
  - File: `components/PricingSection.tsx`
  - Change pricing grid to `grid grid-cols-1 md:grid-cols-3 gap-6`
  - Each card: full width on mobile, fixed width on desktop
  - Ensure "MOST POPULAR" badge doesn't overflow on small screens

- [ ] **1.5 — Fix footer mobile layout**
  - File: `app/page.tsx` (Footer section)
  - Change `gridTemplateColumns: "2fr 1fr 1fr"` to `grid grid-cols-1 md:grid-cols-3 gap-8`
  - Stack footer links vertically on mobile

- [ ] **1.6 — Fix features grid mobile layout**
  - File: `app/page.tsx` (Features section)
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`

- [ ] **1.7 — Fix how-it-works and testimonials**
  - File: `app/page.tsx`
  - How it works: `grid grid-cols-1 md:grid-cols-3 gap-6`
  - Testimonials: `grid grid-cols-1 md:grid-cols-3 gap-6`

- [ ] **1.8 — Test on mobile viewport**
  - Open Chrome DevTools → toggle device toolbar → test at 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone Plus)
  - Verify: no horizontal scroll, all text readable, buttons tappable (min 44px height)

---

## GROUP 2 — Dark Theme All Inner Pages
> The homepage is dark. Every other page must match. Inconsistency kills trust.

- [ ] **2.1 — Dark theme the demo page**
  - File: `app/demo/page.tsx`
  - Replace `bg-white text-gray-900` with `bg-[#08090f] text-white`
  - Replace white nav with dark glass nav (copy from `app/page.tsx` nav section)
  - Replace `bg-gray-50 border-gray-200` card with `.glass-card` class
  - Replace `text-gray-600` with `text-white/60`
  - Replace `text-brand-500` checkmarks with gradient-colored spans
  - Fix `canonical` URL: change `realty-receptionist.vercel.app` to `allthecalls.ai`
  - The Calendly embed (if present) or demo form should sit on a dark card

- [ ] **2.2 — Dark theme the checkout page**
  - File: `app/checkout/page.tsx` and `app/checkout/CheckoutForm.tsx`
  - Wrap in dark background: `min-h-screen bg-[#08090f]`
  - Add dark nav (same as homepage)
  - The Stripe embedded checkout renders in an iframe — you cannot style it, but wrap it in a `.glass-card` container
  - Add plan summary above the checkout form showing plan name, price, and trial info

- [ ] **2.3 — Dark theme the welcome page**
  - File: `app/welcome/page.tsx`
  - Replace `bg-gradient-to-br from-brand-600 to-brand-900` with `bg-[#08090f]`
  - Use `.gradient-text` for the success heading
  - Add a checklist of what happens next (dark card style):
    1. ✓ Payment confirmed
    2. ✓ AI agent being configured (show agent name if available)
    3. ⏳ Phone number assignment (manual — 1–2 hours)
    4. ⏳ Welcome call from our team
  - Add a "Go to Dashboard" button using `.btn-glow` class

- [ ] **2.4 — Dark theme the login page**
  - File: `app/login/page.tsx`
  - Same pattern: `bg-[#08090f]`, `.glass-card` for the form container, `.btn-glow` for submit

---

## GROUP 3 — Fix Critical Bugs
> These are silent failures that break the product right now.

- [ ] **3.1 — Fix Trillet API version in calls route**
  - File: `app/api/calls/route.ts`
  - Line ~60: Change `/v2/api/call-history` to `/v1/api/call-history`
  - Also add `?agentId=${session.agentId}` to filter calls per client (once Supabase is wired)

- [ ] **3.2 — Fix hardcoded app URL in checkout route**
  - File: `app/api/checkout/route.ts`
  - Line ~40: Change `"https://realty-receptionist.vercel.app"` fallback to `"https://allthecalls.ai"`
  - The full line should be: `const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.ai";`

- [ ] **3.3 — Fix demo page canonical URL**
  - File: `app/demo/page.tsx`
  - Change `alternates: { canonical: "https://realty-receptionist.vercel.app/demo" }`
  - To: `alternates: { canonical: "https://allthecalls.ai/demo" }`

- [ ] **3.4 — Fix sitemap and robots**
  - File: `app/sitemap.ts` — update base URL to `https://allthecalls.ai`
  - File: `app/robots.ts` — update sitemap URL to `https://allthecalls.ai/sitemap.xml`

---

## GROUP 4 — Trillet Auto-Provisioning (The Core Integration)
> This is what makes the product actually work without manual intervention.

- [ ] **4.1 — Create the agent system prompt generator**
  - File: `lib/generateSystemPrompt.ts` (new file)
  - Function signature: `generateSystemPrompt(name: string, brokerage: string, serviceArea?: string): string`
  - Returns a complete real estate AI receptionist system prompt
  - Include: greeting script, lead qualification questions, appointment booking instructions, SMS follow-up trigger, how to handle objections, how to handle "I want to speak to a real person"
  - Use a template string (no API call needed — the prompt is deterministic)
  - Example greeting: `"Hi! You've reached [name] with [brokerage]. I'm their AI assistant — I can help you with listings, schedule a showing, or connect you with [name] directly. What can I help you with today?"`

- [ ] **4.2 — Create the /api/onboard route**
  - File: `app/api/onboard/route.ts` (new file)
  - Method: `POST`
  - Auth: require valid session OR internal secret header (`x-internal-secret: process.env.INTERNAL_SECRET`)
  - Input body: `{ name, brokerage, email, plan, stripeCustomerId, stripeSubscriptionId }`
  - Steps:
    1. Validate all required fields
    2. Call `generateSystemPrompt(name, brokerage)` from step 4.1
    3. `POST https://api.trillet.ai/v1/api/agents` with name, voice, and systemPrompt
    4. Save to Supabase `clients` table (skip if Supabase not configured — log warning)
    5. Send welcome email via Resend (skip if RESEND_API_KEY not set — log warning)
    6. Return `{ agentId, agentName, status, note: "Assign phone number at app.trillet.ai" }`
  - Error handling: if Trillet fails, return 500 with the Trillet error message; do NOT silently fail

- [ ] **4.3 — Create the Stripe webhook route**
  - File: `app/api/webhooks/stripe/route.ts` (new file)
  - Method: `POST`
  - CRITICAL: verify webhook signature with `stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)`
  - Handle event: `checkout.session.completed`
  - Extract from session: `customer_email`, `customer`, `subscription`, `metadata.plan`, `metadata.name`, `metadata.brokerage`
  - Call `/api/onboard` internally (or import and call the handler function directly)
  - Return `{ received: true }` with status 200 — Stripe retries if you return non-200
  - Add `export const config = { api: { bodyParser: false } }` — Stripe needs the raw body for signature verification
  - Note: you must pass `name` and `brokerage` via Stripe metadata — update the checkout session creation to include these

- [ ] **4.4 — Update checkout to pass metadata**
  - File: `app/api/checkout/route.ts`
  - Update input body type to include `name` and `brokerage` (optional for now)
  - Pass them as `metadata` in the Stripe session: `"metadata[name]": name || "", "metadata[brokerage]": brokerage || ""`
  - Update `app/checkout/page.tsx` to collect name and brokerage before the Stripe form (a simple 2-field pre-checkout form)

- [ ] **4.5 — Update welcome page to show agent status**
  - File: `app/welcome/page.tsx`
  - Fetch `/api/onboard/status?sessionId={CHECKOUT_SESSION_ID}` (or read from Supabase)
  - Show the agent name that was created: "Your AI receptionist '[Name] — [Brokerage]' is being configured"
  - Show the Trillet agent ID so you can easily find it in the dashboard

---

## GROUP 5 — Supabase Client Database
> Required for multi-client management, call log routing, and churn monitoring.

- [ ] **5.1 — Create Supabase clients table**
  - Run this SQL in Supabase dashboard:
  ```sql
  create table clients (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text unique not null,
    brokerage text,
    plan text not null,
    stripe_customer_id text unique,
    stripe_subscription_id text unique,
    trillet_agent_id text unique,
    trillet_agent_name text,
    phone_number text,
    status text default 'pending',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );
  ```

- [ ] **5.2 — Create Supabase client in lib/**
  - File: `lib/supabase.ts` (new file)
  - Use `@supabase/supabase-js` package
  - Export `supabase` client using `SUPABASE_URL` and `SUPABASE_ANON_KEY` env vars
  - Export typed `Client` interface matching the table schema above

- [ ] **5.3 — Wire Supabase into /api/onboard**
  - After Trillet agent is created, insert a row into `clients` table
  - Set `status: 'pending_phone'` (phone number not yet assigned)
  - On error: log but don't fail the whole onboarding — Trillet agent creation is the critical step

- [ ] **5.4 — Wire Supabase into /api/calls**
  - Look up the session user's `trillet_agent_id` from Supabase
  - Pass it as `?agentId=` to the Trillet call history endpoint
  - This ensures each client only sees their own calls

---

## GROUP 6 — Admin Dashboard Enhancements
> So you can manage clients without touching the database directly.

- [ ] **6.1 — Add clients list to admin dashboard**
  - File: `app/dashboard/page.tsx` (or new `app/dashboard/clients/page.tsx`)
  - Fetch all clients from Supabase
  - Show: name, brokerage, plan, status, agent ID, phone number, created date
  - Add a "Copy Agent ID" button for each client (for easy Trillet dashboard lookup)
  - Add a "Mark Phone Assigned" button that updates `status` to `active` and records the phone number

- [ ] **6.2 — Add manual onboard trigger to admin**
  - Add a form in the admin dashboard: name, email, brokerage, plan
  - On submit: POST to `/api/onboard` with `x-internal-secret` header
  - Show the result (agent ID, status, any errors)
  - This lets you onboard pilot clients without them going through Stripe

---

## Deployment Checklist (After Each Group)

After completing each group, verify:
- [ ] `pnpm build` passes with no TypeScript errors
- [ ] Push to `main` and check Vercel deployment succeeds
- [ ] Test the changed pages at https://allthecalls.ai
- [ ] Test on mobile (375px viewport in Chrome DevTools)
- [ ] Update `shared-workspace/COMPANY_STATUS.md` with what was completed

---

## Environment Variables to Add in Vercel

After completing Group 4, add these in Vercel dashboard → Settings → Environment Variables:

```
STRIPE_WEBHOOK_SECRET=whsec_...   (get from Stripe Dashboard → Webhooks → your endpoint)
INTERNAL_SECRET=<random 32-char string>
RESEND_API_KEY=re_...             (get from resend.com)
```

After completing Group 5:
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

Register the Stripe webhook endpoint in Stripe Dashboard:
- URL: `https://allthecalls.ai/api/webhooks/stripe`
- Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
