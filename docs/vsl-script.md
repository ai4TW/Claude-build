# AllTheCalls.ai — Pricing Page VSL

**Target length:** 2:30 – 3:00
**Target audience:** small business owners running ads to `/pricing` — real estate investors, agents, home service pros, trades, anyone who misses calls
**Tone:** direct, confident, zero fluff, founder-voice (Brayden)
**Goal:** Click "Start now" below the video
**Talent:** Brayden on camera (or screen recording + voiceover)

---

## Production notes

- **Opening shot:** tight on face, direct to camera. No intro logo, no music sting. Hook has to land before the viewer decides to scroll.
- **B-roll cues** marked in `[]`. Don't feel obligated to hit all of them — clean talking head is fine.
- **Captions on** by default (most Facebook/Instagram ad traffic watches muted).
- **CTA overlay** (bottom third): "Pick a plan below ↓" persistent from 0:30 onward.
- **End frame:** hold on Brayden, freeze, card text "Start today · 14-day guarantee".
- **No stock music.** Low subby under-bed (no vocals) for first 30s, drop for the offer, back in under the CTA.

---

## Section 1 — Hook (0:00 – 0:10)

> Right now, on your phone, there's at least one call you missed yesterday. Probably one this morning too. Every single one of those — that was a customer trying to hand you money.
>
> I'm going to show you how to never lose one of those calls again.

`[B-roll: quick cut of iPhone missed-call screen with "2 missed calls" badge. Then back to face.]`

---

## Section 2 — Agitate (0:10 – 0:45)

> Here's what most business owners don't want to admit: the average local business misses about 30 percent of the calls coming in. Not because you're lazy. Because you're actually doing the work.
>
> You're on a job. You're with a client. You're asleep. You're eating dinner with your family.
>
> And every one of those calls — that person didn't leave a voicemail. They called your competitor five minutes later.

`[B-roll: split-screen — busy contractor on a roof / mom with kids / phone ringing unanswered on a desk.]`

> A human answering service will run you four hundred to twelve hundred bucks a month. They take sick days, they turn over every six months, and they still only answer the call — they don't qualify the lead, they don't follow up, and they definitely don't book the appointment.

---

## Section 3 — Solution (0:45 – 1:25)

> Here's what we built instead.
>
> AllTheCalls is an AI receptionist that answers every single call the moment it rings, 24/7, in *your* name. She sounds like a real person. She asks the questions you would ask. She qualifies the lead. She texts them right after the call to keep them warm. And if you're on the Pro plan, she books them directly into your calendar.
>
> She never misses a call. Not one. Ever.

`[Screen recording of the Trillet dashboard or the portal app — calls rolling in live, transcripts populating, a call getting summarized.]`

> Most of our clients have their AI live within 24 hours of signing up. You forward your business number to us. We handle the rest.

---

## Section 4 — Proof (1:25 – 1:55)

> We answer phones for over 1,200 businesses right now. Our AI has handled more than 4.8 million real calls. The answer rate is 99.9 percent.
>
> Don't believe me? Pull out your phone right now and call this number: **3-1-6, 2-3-2, 4-7-7-7**. That's Gia — she's our live AI. Ask her anything about this business. Ask her to qualify you. Ask her to book a call. Ask her the weirdest question you can think of. She'll handle it.

`[On-screen lower-third: 📞 (316) 232-4777 — "Call Gia right now"]`

> That's the same AI we're going to put on your line.

---

## Section 5 — Offer (1:55 – 2:35)

> Three plans, all on this page below the video.
>
> **Solo** is 397 a month. One AI receptionist. 300 calls a month. Everything you need to stop missing leads.
>
> **Pro** is what most of our clients pick. 497 a month. Unlimited calls. Automated calendar booking straight into Calendly or Acuity. Automated SMS follow-up. Custom knowledge base — we load in your services, your pricing, your FAQs. Priority support. And — this part is new — a free high-converting marketing website, designed and built by our team.
>
> **Agency** is the full operation. 1,497 a month. Five AI receptionists on five lines. CRM auto-logging. White-glove setup. Monthly strategy call with our team.

`[Quick cuts of each plan card zooming in — just long enough to read the price and top features.]`

> Every plan comes with our live client app. You install it on your phone in 30 seconds. Every call, every recording, every transcript, every note you take — all in your pocket, everywhere you go.
>
> And every plan has a 14-day money-back guarantee. You love it, or we refund every penny.

---

## Section 6 — Urgency + CTA (2:35 – 2:55)

> Here's what I want you to do.
>
> Pick a plan right below this video. Click **Start now**. We'll have your AI answering calls before the end of the day. The next phone call that rings in for your business — your AI picks up.
>
> If you miss one more call after watching this, that's on you. We're not going to let you keep losing money to a voicemail inbox.
>
> Click the button. Let's get every call answered.

`[Freeze frame. Lower-third overlay: "👇 Pick a plan below · 14-day guarantee"]`

---

## Alt shorter cut (60 seconds, for Instagram Reels / TikTok ads)

> You missed at least one call yesterday. That was money. Here's the fix:
>
> AllTheCalls is an AI receptionist that answers every call in your name, 24/7. She qualifies leads. Texts them after. Books the appointment. Never misses.
>
> We run the phone lines for 1,200 businesses and we've handled 4.8 million calls.
>
> Want to hear her? Call 316-232-4777 right now. Ask her anything.
>
> Plans start at 397. 14-day money back. Your AI is answering calls before the end of the day.
>
> Pick a plan below. Stop losing money to voicemail.

---

## Ad-platform-specific tweaks

**Facebook / Instagram feed:**
- First 3 seconds must be a hook without the brand. The "There's at least one call you missed yesterday" line works — no logo reveal until 0:30+.
- Vertical 9:16 version: loses the comparison table / free website beat. Keep it to Hook → Pain → Solution → Call Gia → CTA.

**YouTube pre-roll:**
- Kill the "Right now on your phone..." line if it's skippable — lead with "I'll show you the AI receptionist answering 4.8 million calls for small businesses."
- Bumper (6s) cut: "Stop losing calls. AI answers every one, 24/7, $397/mo. Link below."

**Google Search ads to /pricing:**
- No video needed — they're high-intent already. Keep the placeholder card minimal or remove it with `NEXT_PUBLIC_VSL_URL=""`.

---

## When you have the recorded video

Upload to your host of choice (YouTube unlisted, Vimeo, Cloudflare Stream, direct mp4 on Vercel Blob / S3), then set these in Vercel env vars on the `allthecalls-ai` project:

```
NEXT_PUBLIC_VSL_URL=https://your.cdn/vsl.mp4
NEXT_PUBLIC_VSL_POSTER=https://your.cdn/vsl-poster.jpg
```

The pricing page will automatically swap the placeholder for the real video on the next deploy. For YouTube or Vimeo embeds instead of an mp4, the `<video>` element in `app/pricing/page.tsx` would need to be swapped for an `<iframe>` — ping me and I'll do it.

---

## Things to A/B test once it's live

1. **Thumbnail** — Brayden's face vs. a headline ("Never miss another call") vs. an iPhone missed-call screenshot
2. **Hook** — "There's a call you missed yesterday" vs. "Call 316-232-4777 right now. That's our AI." (proof-first)
3. **Offer order** — Pro-first vs. Solo-first in the script
4. **Auto-play muted** — on by default vs. click-to-play (mobile page load matters for Core Web Vitals)
5. **Video length** — 2:55 long-form vs. 60s short cut
