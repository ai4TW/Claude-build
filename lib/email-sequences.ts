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

You just saw how AllTheCalls texts back a missed call.

Quick question: what did you think?

This isn't a sales pitch. I genuinely want to know what landed for you and what seemed off. Most business owners either love it immediately or have a specific concern.

If you loved it, let's get you started. If you had a concern, I want to hear it. Maybe we address it in 5 minutes.

Reply to this email. Or book your setup call: https://allthecalls.ai/book

The AllTheCalls Team`,
    },
    {
      step: 2,
      delayHours: 48,
      subject: "how AllTheCalls saves businesses 2+ hours a week",
      body: `Hey {{name}},

After seeing the demo, here's what you're actually getting:

- Every missed call texted back instantly (no more missed leads)
- Lead qualification happening while you're busy
- Calendar bookings automatic
- Follow-up text sent (no admin work)

Across a month, that's 8+ hours of time you get back. Time you spend closing deals, not chasing missed calls.

$1,997 setup + $497/mo. No contracts, 14-day money-back guarantee.

Book your setup call: https://allthecalls.ai/book

The AllTheCalls Team`,
    },
    {
      step: 3,
      delayHours: 120,
      subject: "let's get you live this week",
      body: `Hey {{name}},

You have everything you need to know. It works. Texts back every missed call, qualifies leads, books your calendar.

The only question left is: are you doing this?

If yes: book your setup call and you'll be live this week.

If no: totally fine. But one of your competitors will be live by next week. Thought you should know.

https://allthecalls.ai/book

The AllTheCalls Team`,
    },
  ],


  // ── Failed Payment Recovery ────────────────────────────────────────────
  payment_failed: [
    {
      step: 1,
      delayHours: 0,
      subject: "Your payment didn't go through",
      body: `Hey {{name}},

Your payment failed this morning. Your subscription is paused, which means your AI stopped texting back missed calls a few hours ago.

What to do:

1. Log in to https://allthecalls.ai/my
2. Go to Billing
3. Update your card details
4. Confirm

It takes 90 seconds. Your AI will be live again immediately after.

If you're having trouble, reply and I'll handle it.

The AllTheCalls Team`,
    },
    {
      step: 2,
      delayHours: 72,
      subject: "Your service is still paused (update your card)",
      body: `Hey {{name}},

Just checking in. Your payment still hasn't gone through. That means your AI is sitting idle while missed calls are going unanswered and untexted.

This usually means:
- The card is expired
- The card hit a fraud block
- It's just been forgotten

Log in here and update it: https://allthecalls.ai/my

Takes a minute. Your AI comes right back.

The AllTheCalls Team`,
    },
    {
      step: 3,
      delayHours: 168,
      subject: "Last warning: Your service pauses tomorrow",
      body: `Hey {{name}},

Final heads-up. Your payment has been unsuccessful for 7 days.

In 24 hours, I'm pausing your account. That means:
- Your AI missed-call text-back goes completely offline
- Missed calls to your AllTheCalls number won't get a text-back
- You'll lose leads while this is unresolved

Update your card right now: https://allthecalls.ai/my

Or if there's a reason you want to cancel, just let me know. No hard feelings.

But if you're just forgetting, don't. Fix it today.

The AllTheCalls Team`,
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
