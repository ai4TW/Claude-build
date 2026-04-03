---
name: AllTheCalls
description: A self-sustaining AI receptionist company — sells 24/7 AI phone answering to real estate agents, powered by Trillet AI white-label, runs autonomously via Paperclip
slug: allthecalls
schema: agentcompanies/v1
version: 1.0.0
authors:
  - name: Claude (claude-sonnet-4-6)
goals:
  - Sell AI receptionist service to real estate agents at $149–$399/month
  - Provision every new client automatically via Trillet API within minutes of signup
  - Keep clients active and growing — zero churn, maximum upsell
  - Generate a steady pipeline of new realtor prospects through outreach and content
  - Reach $15,000 MRR (100 clients) within 90 days
tags:
  - sales
  - real-estate
  - ai-receptionist
  - trillet
  - autonomous
---

AllTheCalls is a fully autonomous AI receptionist reselling company. Five agents run the complete operation: finding realtors, selling them the service, provisioning them on Trillet, keeping them happy, and publishing content that drives inbound leads.

## What We Sell

A 24/7 AI receptionist for real estate agents, white-labeled from Trillet AI and sold under the AllTheCalls brand. The AI answers every call in the agent's name, qualifies leads, books showings, and sends SMS follow-ups — for a fraction of the cost of a human assistant.

| Tier | Price | Trillet Cost | Margin |
|------|-------|-------------|--------|
| Starter | $149/mo | ~$49/mo | ~$100/mo |
| Pro | $249/mo | ~$99/mo | ~$150/mo |
| Team | $399/mo | ~$199/mo | ~$200/mo |

**Target:** 100 clients = $15,000–$20,000 MRR

## How It Works

**Loop 1 — Sales (weekly)**
Sales Agent → finds 50 new realtor prospects → drafts personalized outreach → sends emails → follows up → closes deals → hands off to Onboarding

**Loop 2 — Delivery (on-demand)**
Onboarding Agent → gets new client details → provisions Trillet sub-account → generates AI persona → confirms go-live → hands off to Client Success

**Loop 3 — Retention (weekly)**
Client Success Agent → pulls Trillet call logs → checks client health → sends check-ins → identifies upsell opportunities → flags churn risks to Director

**Loop 4 — Awareness (weekly)**
Content Agent → creates social posts, emails, blog content → keeps top of funnel warm → supports Sales outreach

## The Team

**Revenue Team**
- Director — orchestrates all agents, monitors KPIs, sets weekly priorities
- Sales Agent — prospect research, cold outreach, pipeline management

**Operations Team**
- Onboarding Agent — Trillet provisioning, AI persona generation, client go-live
- Client Success Agent — usage monitoring, check-ins, churn prevention, upsells
- Content Agent — marketing content, social posts, email sequences

## Tech Stack

- **Trillet AI** — white-label voice AI platform (`integrations/trillet.js`)
- **Claude API** — persona generation, outreach copy (`integrations/claude-personas.js`)
- **Next.js portal** — client dashboard, call logs, settings (`app/`)
- **Resend** — transactional email (`hello@allthecalls.com`)
- **Stripe** — billing (3 tiers)
- **Supabase** — client database

## Contact

- Website: https://allthecalls.com
- Email: hello@allthecalls.com
