"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Plus } from "lucide-react";
import { INDUSTRIES, SITE } from "@/lib/site";
import Reveal from "@/components/reveal";

export interface Faq {
  q: string;
  a: string;
}

const STEPS = [
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

export function HowItWorks({ heading = "How it works" }: { heading?: string }) {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 lg:py-28">
      <div className="wrap">
        <h2 className="display heading-2 max-w-2xl">{heading}</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="border-t-2 border-ink pt-6">
              <span className="display block text-[64px] leading-none text-brand">{i + 1}</span>
              <h3 className="mt-5 text-[21px] leading-snug font-bold">{s.title}</h3>
              <p className="mt-2 max-w-[38ch] text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const COMPARISON = [
  { label: "Nights & weekends", ours: "Texted back the instant it's missed", theirs: "Voicemail" },
  { label: "Missed call follow-up", ours: "Instant text-back", theirs: "Nothing, until they call back" },
  { label: "New lead text-back", ours: "Under 30 seconds", theirs: "Whenever you get to it" },
  { label: "Where leads live", ours: "One CRM, every call & text logged", theirs: "Sticky notes, a notebook, your memory" },
  { label: "Local search presence", ours: "Built-in, ongoing SEO", theirs: "Whatever your old site happens to do" },
  { label: "Cost of a missed job", ours: "$0 — they get a text back in seconds", theirs: "The whole job, to a competitor" },
];

export function ComparisonSection() {
  return (
    <section className="bg-mist py-20 lg:py-28">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="display heading-2">AllTheCalls vs. voicemail</h2>
          <p className="mt-4 text-[18px] text-ink-soft">
            Most businesses don&rsquo;t have a bad phone system. They have no system — just whoever happens
            to pick up, and voicemail for everyone else.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[16px] border border-line bg-white">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-line bg-brand-deep px-5 py-4 text-[14px] font-bold text-white sm:px-7 sm:text-[15px]">
            <span />
            <span>With AllTheCalls</span>
            <span className="text-white/75">Without it</span>
          </div>
          <ul>
            {COMPARISON.map((row) => (
              <li
                key={row.label}
                className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-line px-5 py-4 text-[15px] last:border-b-0 sm:px-7 sm:text-[16px]"
              >
                <span className="font-semibold text-ink">{row.label}</span>
                <span className="font-semibold text-ink">{row.ours}</span>
                <span className="text-muted">{row.theirs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function IndustryGrid() {
  return (
    <section id="industries" className="scroll-mt-20 border-t border-line py-20 lg:py-28">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="display heading-2">Built for any local business</h2>
          <p className="mt-4 text-[18px] text-ink-soft">
            The system is the same everywhere. What changes is the questions your AI asks and the
            words it uses — set up for your industry, not a generic script.
          </p>
        </div>
        <ul className="mt-12 grid border-t border-line sm:grid-cols-2">
          {INDUSTRIES.map((i) => (
            <li key={i.slug} className="border-b border-line">
              <Link href={`/industry/${i.slug}`} className="group flex items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-[19px] font-bold group-hover:text-brand">{i.name}</span>
                  <span className="block text-[15px] text-muted">{i.oneLiner}</span>
                </span>
                <ChevronRight size={22} className="shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[15px] text-muted">
          Don&rsquo;t see your industry? Call {" "}
          <a href={SITE.phone.href} className="font-semibold text-brand underline underline-offset-4">{SITE.phone.display}</a>
          {" "}— it still works the same way.
        </p>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="mt-3 max-w-[65ch] text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ faqs, heading = "Questions business owners ask" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section id="faq" className="scroll-mt-20 py-20 lg:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="display heading-2">{heading}</h2>
          <p className="mt-4 text-ink-soft">
            Something else on your mind? Call{" "}
            <a href={SITE.phone.href} className="font-semibold text-brand underline underline-offset-4">{SITE.phone.display}</a>.
          </p>
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}

export function FinalCta({
  prelude = "The next missed call is already on its way.",
  heading = (
    <>
      Every missed call is a customer calling{" "}
      <span className="accent-chip">someone else</span>.
    </>
  ),
  body = "Live in 24-48 hours. No contracts. 14-day money-back guarantee.",
}: {
  prelude?: string;
  heading?: ReactNode;
  body?: string;
}) {
  return (
    <section className="on-dark bg-brand-deep border-t border-white/10 pb-20 pt-20 text-center text-white lg:pb-24 lg:pt-28">
      <div className="wrap flex flex-col items-center">
        <p className="text-[15px] font-semibold text-white/70">{prelude}</p>
        <h2 className="display heading-close mt-5 max-w-3xl text-white">{heading}</h2>
        <p className="mt-6 max-w-md text-[17px] text-white/85">{body}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/pricing" className="btn-accent h-14 px-7 text-[17px] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
            See pricing
          </Link>
          <a href={SITE.phone.href} className="btn-outline-light h-14 px-6 text-[17px]">
            <Phone size={18} aria-hidden />
            {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Honest founder section — no fabricated testimonials. Brayden builds and runs this. */
export function FounderSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <figure className="max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-mist">
            <Image
              src="/brayden.jpg"
              alt="Brayden Myers, founder of AllTheCalls"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4">
            <span className="block text-[19px] font-bold">Brayden Myers</span>
            <span className="block text-[15px] text-muted">Founder, AllTheCalls</span>
          </figcaption>
        </figure>
        <div>
          <h2 className="display heading-2">We run this on our own business first</h2>
          <p className="mt-4 text-[18px] text-ink-soft">
            I built AllTheCalls on the same missed-call text-back, CRM, and SEO stack running my own real
            estate business — it wasn&rsquo;t built as a product first and tested on customers later.
            Drainiacs Plumbing of Wichita is our first outside client, live now.
          </p>
          <p className="mt-4 text-[18px] text-ink-soft">
            No call center, no outsourced setup. When you sign up, I&rsquo;m involved in getting your
            system built right for your business.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a href={SITE.phone.href} className="btn-primary h-12 px-5 text-[16px]">
              <Phone size={17} aria-hidden />
              {SITE.phone.display}
            </a>
            <Link href="/contact" className="font-semibold text-brand underline underline-offset-4">Get in touch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
