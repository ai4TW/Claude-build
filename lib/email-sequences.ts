/**
 * Email sequence definitions for AllTheCalls.ai
 *
 * Each sequence is an array of steps with delay (hours from trigger),
 * subject, and body template. Templates use {{name}}, {{plan}}, etc.
 */

interface EmailStep {
  step: number;
  delayHours: number;
  subject: string;
  body: string;
}

export const SEQUENCES: Record<string, EmailStep[]> = {
  // ── Demo Follow-Up (triggered when someone calls the demo line) ───────
  demo_followup: [
    {
      step: 1,
      delayHours: 1,
      subject: "quick question — what did you think?",
      body: `Hey {{name}},

You just called (316) 232-4777 and talked to Richard.

Quick question: what did you think?

This isn't a sales pitch. I genuinely want to know what landed for you and what seemed off. Most business owners either love it immediately or have a specific concern.

If you loved it, let's get you started. If you had a concern, I want to hear it. Maybe we address it in 5 minutes.

Reply to this email. Or start your free trial: https://allthecalls.ai/#pricing

Brayden`,
    },
    {
      step: 2,
      delayHours: 48,
      subject: "how Richard saves businesses 2+ hours a week",
      body: `Hey {{name}},

After you experienced Richard, here's what you're actually getting:

- Every call picked up (no more missed leads)
- Lead qualification happening while you're busy
- Calendar bookings automatic
- Follow-up SMS sent (no admin work)

Across a month, that's 8+ hours of time you get back. Time you spend closing deals, not answering phones.

$397/month. First 7 days free. You'll know in 3 days if it's working.

Start your free trial: https://allthecalls.ai/#pricing

Brayden`,
    },
    {
      step: 3,
      delayHours: 120,
      subject: "let's get you live this week",
      body: `Hey {{name}},

You have everything you need to know. Richard works. Answers calls, qualifies leads, books your calendar.

The only question left is: are you doing this?

If yes: 7-day free trial, no credit card. You'll be live by tomorrow.

If no: totally fine. But one of your competitors will be live by next week. Thought you should know.

https://allthecalls.ai/#pricing

Brayden`,
    },
  ],

  // ── Trial Onboarding (triggered on signup) ────────────────────────────
  trial_onboarding: [
    {
      step: 1,
      delayHours: 0,
      subject: "Welcome to AllTheCalls — Your AI receptionist is almost ready",
      body: `Hey {{name}},

Welcome to AllTheCalls. You're about to set up an AI receptionist that handles inbound calls 24/7 for your business.

Here's what happens now:

1. Complete the onboarding wizard (takes ~5 min) — Add your business info, services, and AI personality
2. We'll activate your AI — It goes live automatically after you finish
3. You'll get a phone number — I'll assign one and send you the details (might take a few hours)
4. Your AI starts taking calls — From that moment, every inbound call is answered

You've got 7 days free to test everything.

Your dashboard is here: https://allthecalls.ai/my

If you hit any snags during setup, just reply to this email. I read everything.

Let's go.

Brayden`,
    },
    {
      step: 2,
      delayHours: 24,
      subject: "Your AI is live — here's what to do first",
      body: `Hey {{name}},

Your AI receptionist is now answering calls. Congratulations.

Here's what I'd do in the next 24 hours:

1. Call your own number — Hear how your AI handles a call from a lead. Does the greeting sound professional? Is the information flow smooth?
2. Forward 3-5 calls manually — Set the expectation with a few clients that their calls might be handled by your AI receptionist
3. Check your dashboard — https://allthecalls.ai/my shows every call, transcript, and lead captured

Pro tip: The first few calls are weird. Your AI learns your business as calls come in. By day 3-4, you'll notice it getting sharper.

Questions? Just reply here.

Brayden`,
    },
    {
      step: 3,
      delayHours: 72,
      subject: "How many calls have you gotten so far?",
      body: `Hey {{name}},

Quick check-in. Have you started getting calls on your AllTheCalls number yet?

A few things I'm curious about:

- How many inbound calls? Even if it's zero — that tells me something
- Is the AI greeting hitting right? Should it sound warmer? More formal?
- Any calls the AI got wrong? Those are actually gold. They help you train it better

Don't overthink it. The magic happens when your AI has real calls to learn from.

If you're not getting calls yet, it might just be because we need to point more traffic at that number. Let me know and I can help you think through that.

Brayden`,
    },
    {
      step: 4,
      delayHours: 120,
      subject: "5 days in: here's what you're avoiding",
      body: `Hey {{name}},

Five days in. Good time to pause and think about what you're actually getting.

What your AI does while you're busy:

- Answers every call (no more missed leads)
- Captures buyer intent, timeline, and needs
- Schedules meetings automatically
- Qualifies leads before they hit your inbox
- Works nights, weekends, holidays

That's essentially a 24/7 assistant that costs a fraction of a real person.

But here's the real number: If your AI captures just one extra deal this month due to never missing a call, it pays for itself 10x over.

You still have 2 days left on your trial. This is the time to really stress-test it. Forward calls. Let it handle your voicemail. See what it can do.

Brayden`,
    },
    {
      step: 5,
      delayHours: 144,
      subject: "Only 1 day left on your trial",
      body: `Hey {{name}},

Your free trial expires tomorrow.

When it does:
- Your AI stops answering calls
- New leads stop coming in automatically
- Your phone number goes silent

If you've gotten real value this week — even just one lead or one hour of your time back — it's worth keeping.

No long-term contract. Cancel anytime. But losing this AI receptionist mid-stream usually means losing calls you could've captured.

Ready to keep it running? Pick your plan: https://allthecalls.ai/my

Questions about pricing? Reply and I'll walk you through it.

Brayden`,
    },
  ],

  // ── Churn Prevention (triggered when trial expires without converting) ─
  churn_prevention: [
    {
      step: 1,
      delayHours: 0,
      subject: "Your AllTheCalls AI just went offline",
      body: `Hey {{name}},

This morning, your trial expired and your AI receptionist went offline.

I'm not sure why you didn't convert. Maybe:
- Timing wasn't right
- You didn't get enough call volume to test it
- The price felt high
- You wanted to think about it

But here's the truth: every day your AI is off, you're missing calls. Real money calls. The kind that close deals.

I'd rather have you as a customer than not. If there's something I can do to make this a yes, tell me.

Brayden`,
    },
    {
      step: 2,
      delayHours: 72,
      subject: "I'm extending your trial (and offering a discount)",
      body: `Hey {{name}},

I checked my notes and realized you didn't get a full week to really test this.

Here's what I'm offering:

Option 1: 7 more days free — I'll turn your AI back on right now. No credit card. Test it for real.

Option 2: 30% off your first month — Lock in a discounted rate. Three months minimum.

Pick whichever feels right. I just think you're making a mistake by not having this running.

Reply with which option and I'll set it up.

Brayden`,
    },
    {
      step: 3,
      delayHours: 240,
      subject: "Okay, I'm letting this go",
      body: `Hey {{name}},

This is my last email about AllTheCalls. I respect the no.

I just wanted to leave you with one thing: the cost of missing calls.

If you get 10 inbound calls a week, and you're missing 40% of them to voicemail, that's 4 missed calls per week. 16 per month.

At even one closing per 10 contacts, that's 1-2 deals per month you're not seeing.

An AI receptionist costs less than one lost deal per year. The math is brutal.

If you change your mind — even in six months — just reach out. I'll help.

Brayden`,
    },
  ],

  // ── Failed Payment Recovery ────────────────────────────────────────────
  payment_failed: [
    {
      step: 1,
      delayHours: 0,
      subject: "Your payment didn't go through",
      body: `Hey {{name}},

Your payment failed this morning. Your subscription is paused, which means your AI stopped answering calls a few hours ago.

What to do:

1. Log in to https://allthecalls.ai/my
2. Go to Billing
3. Update your card details
4. Confirm

It takes 90 seconds. Your AI will be live again immediately after.

If you're having trouble, reply and I'll handle it.

Brayden`,
    },
    {
      step: 2,
      delayHours: 72,
      subject: "Your service is still paused (update your card)",
      body: `Hey {{name}},

Just checking in. Your payment still hasn't gone through. That means your AI is sitting idle while calls are coming in unanswered.

This usually means:
- The card is expired
- The card hit a fraud block
- It's just been forgotten

Log in here and update it: https://allthecalls.ai/my

Takes a minute. Your AI comes right back.

Brayden`,
    },
    {
      step: 3,
      delayHours: 168,
      subject: "Last warning: Your service pauses tomorrow",
      body: `Hey {{name}},

Final heads-up. Your payment has been unsuccessful for 7 days.

In 24 hours, I'm pausing your account. That means:
- Your AI receptionist goes completely offline
- Calls to your AllTheCalls number won't be answered
- You'll lose leads while this is unresolved

Update your card right now: https://allthecalls.ai/my

Or if there's a reason you want to cancel, just let me know. No hard feelings.

But if you're just forgetting, don't. Fix it today.

Brayden`,
    },
  ],
};

/**
 * Queue an email sequence for a recipient.
 * Returns the number of emails queued.
 */
export async function queueSequence(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  sequenceName: string,
  recipientEmail: string,
  recipientName: string,
  clientId?: string,
  metadata?: Record<string, string>
): Promise<number> {
  const sequence = SEQUENCES[sequenceName];
  if (!sequence) {
    console.error(`[email-sequences] Unknown sequence: ${sequenceName}`);
    return 0;
  }

  const now = Date.now();
  const rows = sequence.map((step) => ({
    recipient_email: recipientEmail,
    recipient_name: recipientName,
    sequence_name: sequenceName,
    step_number: step.step,
    subject: step.subject,
    body_text: step.body
      .replace(/\{\{name\}\}/g, recipientName || "there")
      .replace(/\{\{plan\}\}/g, metadata?.plan || "your plan"),
    send_at: new Date(now + step.delayHours * 60 * 60 * 1000).toISOString(),
    client_id: clientId || null,
    metadata: metadata || {},
  }));

  const { error } = await supabase.from("email_queue").upsert(rows, {
    onConflict: "recipient_email,sequence_name,step_number",
    ignoreDuplicates: true,
  });

  if (error) {
    console.error(`[email-sequences] Queue error for ${sequenceName}:`, error.message);
    return 0;
  }

  console.log(`[email-sequences] Queued ${rows.length} emails for ${recipientEmail} (${sequenceName})`);
  return rows.length;
}

/**
 * Cancel all unsent emails in a sequence for a recipient.
 * Used when a user converts, upgrades, or takes the desired action.
 */
export async function cancelSequence(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  sequenceName: string,
  recipientEmail: string
): Promise<void> {
  await supabase
    .from("email_queue")
    .update({ cancelled: true })
    .eq("recipient_email", recipientEmail)
    .eq("sequence_name", sequenceName)
    .eq("sent", false);

  console.log(`[email-sequences] Cancelled ${sequenceName} for ${recipientEmail}`);
}
