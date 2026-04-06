---
updated: 2026-04-06
week: 2
---

# AllTheCalls — Company Status

> **GROUND TRUTH AS OF APRIL 5, 2026 — read git log + lib/stripe.ts for authoritative state**
> HANDOFF.md is outdated. The business has pivoted since April 3. Use THIS file.

---

## The Business (Current, Correct)

**AllTheCalls.ai** is a 24/7 AI voice receptionist for ANY business — not real estate only. The business pivoted to multi-industry.

**Target customers:** Any business that can't afford to miss calls — real estate, legal, medical, home services, financial, salons, auto, restaurants.

**Demo line:** (316) 232-4777 — callers hear the AI live

**Current plans (LIVE IN STRIPE — verified April 5, repriced April 5):**
| Plan | Price | What's Included |
|------|-------|----------------|
| Starter | $349/mo | 1 AI receptionist, 300 calls/month |
| Pro | $497/mo | Unlimited calls + smart follow-ups + weekly call reports *(most popular)* |
| Elite | $1,497/mo | 5 AI receptionists, calendar booking, CRM webhook, white-glove setup |

**Model:** White-glove setup. We configure Gia for the client (custom greeting, voice, script). Client does NOT self-serve or log in — they just forward their calls. This eliminates the login/auth complexity entirely.

**Key stats Gia uses on calls:**
- 1,200+ businesses live
- 4.8 million calls handled
- 99.9% answer rate

---

## KPIs
| Metric | Target (30 days) | Actual |
|--------|-----------------|--------|
| MRR | $1,500 | $0 (pre-revenue) |
| Active paying clients | 10 | 0 |
| Pilot clients | 3 | 0 |
| Prospects contacted | 100 | 0 |
| Pipeline (interested) | 10 | 0 |

---

## Infrastructure Status

| Item | Status | Notes |
|------|--------|-------|
| Domain (allthecalls.ai) | ✅ live | |
| Vercel deployment | ✅ live | Auto-deploys from main |
| Stripe billing | ✅ live | Solo $199 / Pro $349 / Agency $599 — verified in lib/stripe.ts |
| Supabase database | ✅ live | clients + call_logs tables |
| Trillet (Gia) | ✅ live | Agent ID: 69d1997a9491b9a74426c02f — connected to (316) 232-4777 |
| Client dashboard | ❌ removed | White-glove model — clients don't log in. We manage everything. |
| Gia system prompt | ✅ updated | Full sales script with booking close + SMS link |
| Welcome page | ✅ live | Step-by-step timeline + YouTube founder video |
| Smart follow-ups | ✅ built | Claude analyzes calls + generates personalized follow-up messages |
| ElevenLabs TTS | ✅ live | Better voice quality, eleven_turbo_v2_5 |
| Welcome email (Resend) | ⚠️ needs RESEND_API_KEY | Owner must create resend.com account + add key to Vercel |
| Cron jobs | ✅ configured | Daily crons for Hobby plan |

---

## Gia — Voice AI Sales Agent

Gia is the inbound/outbound sales AI on the AllTheCalls demo number (316) 232-4777.

**Agent ID:** `69d1997a9491b9a74426c02f`
**Phone:** +13162324777
**Pathway:** "All The Calls" (69d1997a9491b9a74426c040)
**LLM:** gemini-2.5-flash
**Voice:** ElevenLabs BYO — Jessica (Playful, Bright, Warm)
**STT:** Deepgram Flux

**Call objective:** Qualify → pitch → book a setup call via SMS booking link
**Close action:** Send SMS with setup call booking link after collecting their number

---

## Current Bottleneck

**Zero outreach has happened.** The product is stronger than ever. Revenue target is April 12 — 6 days away. The bottleneck is purely execution: no emails have been sent, no calls made, no DMs sent.

**What's needed now (in order):**
1. Sales agent to draft 12 personalized emails for Tier 1 prospects (today)
2. Owner to send those emails from their inbox (today or April 7)
3. Owner to post in Facebook real estate groups (template at shared-workspace/sales/fb-group-posts-ready.md)

**Owner-blocked items:**
| Item | Blocker | Days Waiting |
|------|---------|-------------|
| Send Tier 1 emails | Owner sends from inbox (drafts being prepared by Sales) | 0 |
| Facebook group posts | Needs owner's Facebook account | 4 |
| Pilot DMs | Needs owner to send Instagram/Facebook DMs | 4 |
| Blog (Hashnode) | Needs owner to create brand account | 4 |
| RESEND_API_KEY | Needs owner to create resend.com account | 4 |

---

## What's Built (Accurate as of April 5)

- `allthecalls.ai` — live, dark premium design, mobile-optimized
- Stripe checkout — Solo $199 / Pro $349 / Agency $599, 14-day trial, live
- Self-service onboarding wizard — creates Supabase account + Trillet agent + logs in
- Supabase — clients + call_logs tables, RLS configured
- `/api/onboard` — creates Trillet agent on payment
- `/api/webhooks/stripe` — auto-triggers onboarding
- Gia — live AI sales agent on (316) 232-4777 with full sales script
- 500-prospect list — shared-workspace/sales/prospects/
- Outreach sequences — shared-workspace/sales/content/outreach-sequence.md
- Objection handling scripts — shared-workspace/sales/content/objection-handling-scripts.md
- Onboarding playbook — shared-workspace/client-success/

---

## Next Director Review
Monday 2026-04-09 — weekly review. By then: 12 Tier 1 emails sent, at least 1 reply in pipeline, outreach sequence updated for white-glove model.
