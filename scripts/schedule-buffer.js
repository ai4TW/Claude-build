/**
 * schedule-buffer.js
 * Schedules 10 founder LinkedIn posts via Buffer API (2/day Mon-Fri).
 *
 * Usage:
 *   BUFFER_ACCESS_TOKEN=<token> BUFFER_PROFILE_ID=<profile_id> node scripts/schedule-buffer.js
 *
 * How to get credentials:
 *   1. Go to https://buffer.com/developers/apps → Create an app (or use personal access token)
 *   2. Complete OAuth to get an access token
 *   3. Run: node scripts/schedule-buffer.js --list-profiles
 *      to print your connected LinkedIn profile IDs, then pick the right one
 */

require('dotenv').config();

const BUFFER_ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN;
const BUFFER_PROFILE_ID = process.env.BUFFER_PROFILE_ID;

// ── Schedule ──────────────────────────────────────────────────────────────────
// Week of April 6, 2026 — 2 posts/day at 8 AM and 12 PM local (UTC-5 CDT shown)
// Adjust UTC offset to match your timezone.
const UTC_OFFSET_HOURS = -5; // Change to your UTC offset (e.g. -7 for PDT)

function toUTC(dateStr, hour) {
  const local = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:00:00`);
  return new Date(local.getTime() - UTC_OFFSET_HOURS * 60 * 60 * 1000);
}

const SCHEDULE = [
  { date: '2026-04-06', hour: 8  },
  { date: '2026-04-06', hour: 12 },
  { date: '2026-04-07', hour: 8  },
  { date: '2026-04-07', hour: 12 },
  { date: '2026-04-08', hour: 8  },
  { date: '2026-04-08', hour: 12 },
  { date: '2026-04-09', hour: 8  },
  { date: '2026-04-09', hour: 12 },
  { date: '2026-04-10', hour: 8  },
  { date: '2026-04-10', hour: 12 },
];

// ── Post content ──────────────────────────────────────────────────────────────
const POSTS = [
  // Post 1 — The $50K Problem
  `A real estate agent told me something that stopped me cold:

"I missed 4 deals last year because I was in showings when buyers called."

At $12,000 average commission, that's $48,000 gone. Not from bad marketing. Not from a slow market. From a ringing phone she couldn't answer.

The worst part? She knew it was happening. She just didn't know how to fix it without hiring someone full-time.

That's why we built RealtyVoice AI.

Every call answered. Every lead qualified. Every appointment booked — even while you're standing in someone's kitchen talking about crown molding.

The math on missed calls is brutal. The fix doesn't have to be.

#RealEstate #AIforAgents`,

  // Post 2 — MIT Study
  `MIT researchers found something that should terrify every real estate agent:

Responding to a lead within 5 minutes makes you 100x more likely to close them vs. waiting 30 minutes.

After 1 hour? The odds drop to nearly zero.

Here's the problem: the average agent callback time is 3-4 hours.

Here's the other problem: you can't answer every call instantly. You're in showings. Listing appointments. Negotiations. Life.

Unless you have a system that does it for you.

An AI that picks up in 1 second — every time, 24/7 — solves the response time problem permanently. Not "better." Solved.

That's what RealtyVoice does.

#RealEstate #LeadResponse`,

  // Post 3 — Founder Origin
  `I used to watch great agents lose deals they deserved to win.

Not because of price. Not because of strategy.

Because they were too busy doing their job to answer the phone.

A buyer would call during a showing. Go to voicemail. Call the next agent. That agent answered. That agent got the deal.

It felt like a broken system. The most productive agents were punishing themselves.

So I asked: what if you never had to choose between being present with one client and being available to the next?

What if a call was never "missed" — just instantly answered, qualified, and handed back to you when you were ready?

That question became RealtyVoice AI.

#Founder #RealEstateTech`,

  // Post 4 — Voicemail Cost
  `Real estate agents spend an average of 3 hours per week returning voicemails.

That's 150 hours per year.

A senior agent billing their time at $200/hour is spending $30,000/year on voicemail tag.

Most of those callbacks don't convert anyway — because the lead already moved on.

What if those 150 hours went to showings? Listings? Client relationships?

The opportunity cost of voicemail is invisible. But it's massive.

#RealEstateAgents #ProductivityHack`,

  // Post 5 — Objection Handling
  `"I tried a virtual receptionist service. The person didn't know real estate at all."

Heard this from an agent last week. She was right — generic call centers don't work for real estate.

The difference with RealtyVoice AI:

— Trained specifically on real estate conversations
— Knows what pre-approval means and why it matters
— Understands buyer timelines and can ask the right questions
— Familiar with your listings, your market, your brand

It doesn't sound like a phone tree. It sounds like someone who actually knows the business.

That's not a small distinction. That's the whole product.

#RealEstate #PropTech`,

  // Post 6 — Weekend Problem
  `It's Saturday at 7 PM.

A buyer just finished browsing Zillow. They found your listing. They're excited. They call.

You're at dinner with your family. You silence the phone.

By Monday morning, they've toured two homes with another agent.

This happens every single weekend to agents across the country. It's not laziness. It's the impossible trade-off between having a life and having a business.

RealtyVoice AI doesn't take weekends off.

Neither do your leads.

#RealEstateLife #WorkLifeBalance`,

  // Post 7 — Social Proof
  `An agent told me what happened in her first 30 days with RealtyVoice:

"I was in a listing presentation. My phone rang 3 times. RealtyVoice handled all of it. By the time I got back to my car, I had a summary of each call — two qualified buyers and one seller who wanted a CMA.

I called them back in 10 minutes with full context. Booked two showings and one listing appointment. None of that would have happened before."

She didn't change her marketing. She didn't work more hours.

She just stopped missing calls.

#RealEstate #CustomerSuccess`,

  // Post 8 — Top Producers
  `Here's what separates the top 10% of agents from everyone else:

It's not their listings. It's not their negotiation skills. It's not even their marketing.

It's availability.

Top producers have systems that make them feel omnipresent — always responsive, always professional, always on — even when they're not physically there.

Clients trust agents who pick up. Leads convert when someone answers.

Build that system before your competition does.

#RealEstateSuccess #TopProducer`,

  // Post 9 — ROI Math
  `The math on AI call answering for real estate:

Cost of RealtyVoice AI: ~$200-300/month
Average commission: $12,000
Deals needed to recover annual cost: 0.25
Deals most agents recover in month one: 1-3

ROI: 30x-150x

We're not selling software. We're selling recovered commissions.

#RealEstateBusiness #ROI`,

  // Post 10 — CTA
  `If you're a real estate agent and you've read this far, you already know you're missing calls.

Maybe it's costing you one deal a year. Maybe five.

Either way, the fix takes about 15 minutes to set up.

RealtyVoice AI:
✓ Answers every call instantly
✓ Qualifies leads with real estate-specific questions
✓ Books appointments to your calendar
✓ Sends you a full summary after every call
✓ Works 24/7 — evenings, weekends, holidays

Try it free for 14 days. No credit card required.

Link in bio

#RealEstate #AIReceptionist`,
];

// ── Helpers ───────────────────────────────────────────────────────────────────
async function bufferRequest(path, method = 'GET', body = null) {
  const url = `https://api.bufferapp.com/1${path}`;
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${BUFFER_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  if (body) {
    opts.body = new URLSearchParams(body).toString();
  }
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok) throw new Error(`Buffer API error ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

async function listProfiles() {
  const profiles = await bufferRequest('/profiles.json');
  console.log('\nConnected profiles:');
  for (const p of profiles) {
    console.log(`  id: ${p.id}  service: ${p.service}  username: ${p.service_username}`);
  }
}

async function schedulePost(text, scheduledAt) {
  const timestamp = Math.floor(scheduledAt.getTime() / 1000);
  return bufferRequest('/updates/create.json', 'POST', {
    profile_ids: BUFFER_PROFILE_ID,
    text,
    scheduled_at: timestamp,
    now: 'false',
    top: 'false',
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (process.argv.includes('--list-profiles')) {
    if (!BUFFER_ACCESS_TOKEN) {
      console.error('Set BUFFER_ACCESS_TOKEN first.');
      process.exit(1);
    }
    await listProfiles();
    return;
  }

  if (!BUFFER_ACCESS_TOKEN) {
    console.error('Missing BUFFER_ACCESS_TOKEN.');
    console.error('Set it via: export BUFFER_ACCESS_TOKEN=<your-token>');
    console.error('Or add BUFFER_ACCESS_TOKEN=<token> to your .env file.');
    process.exit(1);
  }
  if (!BUFFER_PROFILE_ID) {
    console.error('Missing BUFFER_PROFILE_ID.');
    console.error('Run: node scripts/schedule-buffer.js --list-profiles');
    console.error('Then set: export BUFFER_PROFILE_ID=<your-linkedin-profile-id>');
    process.exit(1);
  }

  console.log(`Scheduling ${POSTS.length} posts to Buffer profile ${BUFFER_PROFILE_ID}...\n`);

  let successCount = 0;
  for (let i = 0; i < POSTS.length; i++) {
    const slot = SCHEDULE[i];
    const scheduledAt = toUTC(slot.date, slot.hour);
    try {
      const result = await schedulePost(POSTS[i], scheduledAt);
      const update = result.updates?.[0] ?? result;
      console.log(`✓ Post ${i + 1}/10 — ${slot.date} ${slot.hour}:00 → id: ${update.id}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Post ${i + 1}/10 — ${slot.date} ${slot.hour}:00 → FAILED: ${err.message}`);
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone. ${successCount}/${POSTS.length} posts scheduled.`);
  if (successCount >= 5) {
    console.log('Success criteria met (5+ posts scheduled).');
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
