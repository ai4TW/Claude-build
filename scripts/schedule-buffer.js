/**
 * schedule-buffer.js
 * Schedules 10 founder LinkedIn posts via Buffer GraphQL API (2/day Mon-Fri).
 *
 * Usage:
 *   1. Get your API key from: https://publish.buffer.com/settings/api
 *   2. Add to .env:  BUFFER_API_KEY=<your-key>
 *      Or export:    export BUFFER_API_KEY=<your-key>
 *
 *   List your connected channels first:
 *     node scripts/schedule-buffer.js --list-channels
 *
 *   Then schedule all posts:
 *     BUFFER_CHANNEL_ID=<linkedin-channel-id> node scripts/schedule-buffer.js
 */

require('dotenv').config();

const BUFFER_API_KEY    = process.env.BUFFER_API_KEY;
const BUFFER_CHANNEL_ID = process.env.BUFFER_CHANNEL_ID;
const BUFFER_ENDPOINT   = 'https://api.buffer.com';

// ── Schedule ──────────────────────────────────────────────────────────────────
// Week of April 6, 2026 — 2 posts/day at 8 AM and 12 PM
// Adjust UTC_OFFSET_HOURS to match your timezone (e.g. -5 for CDT, -7 for PDT)
const UTC_OFFSET_HOURS = -5;

function toUTC(dateStr, hour) {
  const utcHour = hour - UTC_OFFSET_HOURS;
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCHours(utcHour, 0, 0, 0);
  return d.toISOString();
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

// ── GraphQL helpers ───────────────────────────────────────────────────────────
async function gql(query, variables = {}) {
  const res = await fetch(BUFFER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BUFFER_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map(e => e.message).join('; '));
  return json.data;
}

async function getOrgId() {
  const data = await gql(`
    query {
      account {
        organizations { id name }
      }
    }
  `);
  const orgs = data.account.organizations;
  if (!orgs.length) throw new Error('No organizations found on this Buffer account.');
  return orgs[0].id;
}

async function listChannels() {
  const orgId = await getOrgId();
  const data = await gql(`
    query GetChannels($orgId: String!) {
      channels(input: { organizationId: $orgId }) {
        id name service
      }
    }
  `, { orgId });
  return data.channels;
}

async function schedulePost(text, dueAt) {
  const data = await gql(`
    mutation CreatePost($text: String!, $channelId: String!, $dueAt: String!) {
      createPost(input: {
        text: $text,
        channelId: $channelId,
        schedulingType: automatic,
        mode: customScheduled,
        dueAt: $dueAt
      }) {
        ... on PostActionSuccess {
          post { id text dueAt }
        }
        ... on MutationError {
          message
        }
      }
    }
  `, { text, channelId: BUFFER_CHANNEL_ID, dueAt });

  const result = data.createPost;
  if (result.message) throw new Error(result.message);
  return result.post;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!BUFFER_API_KEY) {
    console.error('Missing BUFFER_API_KEY.');
    console.error('Get it from: https://publish.buffer.com/settings/api');
    console.error('Then set: export BUFFER_API_KEY=<your-key>  (or add to .env)');
    process.exit(1);
  }

  if (process.argv.includes('--list-channels')) {
    console.log('Fetching connected channels...\n');
    const channels = await listChannels();
    for (const ch of channels) {
      console.log(`  id: ${ch.id}  service: ${ch.service}  name: ${ch.name}`);
    }
    console.log('\nCopy the id of your LinkedIn channel, then run:');
    console.log('  BUFFER_CHANNEL_ID=<id> node scripts/schedule-buffer.js');
    return;
  }

  if (!BUFFER_CHANNEL_ID) {
    console.error('Missing BUFFER_CHANNEL_ID.');
    console.error('Run: node scripts/schedule-buffer.js --list-channels');
    console.error('Then set: export BUFFER_CHANNEL_ID=<linkedin-channel-id>');
    process.exit(1);
  }

  console.log(`Scheduling ${POSTS.length} posts to channel ${BUFFER_CHANNEL_ID}...\n`);

  let successCount = 0;
  for (let i = 0; i < POSTS.length; i++) {
    const slot = SCHEDULE[i];
    const dueAt = toUTC(slot.date, slot.hour);
    try {
      const post = await schedulePost(POSTS[i], dueAt);
      console.log(`✓ Post ${i + 1}/10 — ${slot.date} ${slot.hour}:00 local → id: ${post.id}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Post ${i + 1}/10 — ${slot.date} ${slot.hour}:00 → FAILED: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone. ${successCount}/${POSTS.length} posts scheduled.`);
  if (successCount >= 5) console.log('Success criteria met (5+ posts scheduled).');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
