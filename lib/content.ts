/**
 * Shared homepage content — facts and copy that must read identically no
 * matter which brand variant (A/B test, see middleware.ts) renders them.
 * Only the visual layer is allowed to differ between variants; the claims,
 * numbers, and words live here once so they can't drift out of sync.
 */

import { SITE } from "@/lib/site";

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Who is this built for?",
    a: "Any local business that can't afford to miss a call: home services and trades, barbershops and salons, auto repair, real estate, and more. The system is the same — what changes is the questions your AI asks for your industry.",
  },
  {
    q: "Does it really sound like my business?",
    a: "Yes. You give us your business name and how you want the AI to text back missed callers. Callers get a text in your business's name, not a generic bot or \"AllTheCalls.\" Most callers never realize it's not someone from your front desk texting them.",
  },
  {
    q: "What am I actually losing to missed calls?",
    a: "A missed call that goes to voicemail converts far less often than one that gets an instant text-back — most owners never see the lost job because it just shows up as a call to a competitor instead. Think through your last few missed calls and what each one was probably worth.",
  },
  {
    q: "How fast can I go live?",
    a: "Most businesses are texting back missed calls within 24-48 hours. We handle the full setup — you just forward your existing number.",
  },
  {
    q: "What if I want to take a call myself?",
    a: "Don't forward during hours you want to handle yourself. You control when AllTheCalls is on — after-hours, weekends, when you're busy, or always.",
  },
  {
    q: "What if I'm not happy with it?",
    a: "14-day money-back guarantee. Let us know within 14 days and we refund every penny. No questions.",
  },
  {
    q: "Can I see it before I sign up?",
    a: `There's nothing to call and listen to — AllTheCalls never talks to your callers, it texts them. Call ${SITE.phone.display} and we'll walk you through exactly what a missed caller of yours would see, using your own business details. No signup required.`,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Tell us about your business",
    body: "Your name, how you want the AI to text back missed callers, and the questions you want asked. About five minutes.",
  },
  {
    title: "Forward your number",
    body: "We set up call-forwarding so a missed call is detected the instant it happens — nothing changes about how your phone rings or who answers.",
  },
  {
    title: "Never miss another call",
    body: "Every missed call gets an instant text back — qualified, captured, and booked over text. Answered calls just come to you, like always.",
  },
];

export const COMPARISON_ROWS = [
  { label: "Nights & weekends", ours: "Texted back the instant it's missed", theirs: "Voicemail" },
  { label: "Missed call follow-up", ours: "Instant text-back", theirs: "Nothing, until they call back" },
  { label: "New lead text-back", ours: "Under 30 seconds", theirs: "Whenever you get to it" },
  { label: "Where leads live", ours: "One CRM, every call & text logged", theirs: "Sticky notes, a notebook, your memory" },
  { label: "Local search presence", ours: "Built-in, ongoing SEO", theirs: "Whatever your old site happens to do" },
  { label: "Cost of a missed job", ours: "$0 — they get a text back in seconds", theirs: "The whole job, to a competitor" },
];

export const FOUR_PARTS = [
  { n: "01", t: "A website built to rank", d: "Done-for-you, hosted for you, structured for local SEO from day one." },
  { n: "02", t: "Instant missed-call text-back", d: "Every missed call gets an instant follow-up text that qualifies the caller and books the job — no voice AI, just a fast text." },
  { n: "03", t: "Your branded CRM app", d: "Every call, text, and lead lands in one pipeline under your own brand." },
  { n: "04", t: "Local SEO, ongoing", d: "We keep tuning the site and your local listings so you keep showing up." },
];
