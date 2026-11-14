"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PRICE } from "@/lib/site";

const BOOK_URL = "/book";

const FEATURES = [
  "24/7 AI call-answering — every call picked up in your business name",
  "Instant missed-call text-back on every call you don't catch",
  "Done-for-you website, built and hosted for you, structured for local SEO",
  "Your own branded CRM app — every call, text, and lead in one pipeline",
  "Lead qualification tuned to your business — the right questions, every time",
  "Native calendar booking — Google & Outlook, no password sharing",
  "Ongoing local SEO — we keep tuning the site and your local listings",
  "Full call transcripts + AI summary on your phone",
  "Business phone number + texting included",
  "Done-for-you setup — our team builds and configures all of it",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 lg:py-20">
      <div className="wrap max-w-[680px]">
        <div className="mb-10 text-center">
          <h2 className="display heading-2">One plan. Everything included.</h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-ink-soft">
            Everything you need to stop losing leads to voicemail — done-for-you, loaded into your
            account on day one.
          </p>
        </div>

        <div className="relative rounded-[20px] border-2 border-brand bg-white p-8 sm:p-9">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap text-white">
            ALLTHECALLS — ALL-IN-ONE PLAN
          </div>

          <div className="mb-7 mt-2 text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="display text-[2.5rem] text-ink">{PRICE.setup}</span>
              <span className="text-[14px] text-muted">setup</span>
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-1.5">
              <span className="text-[15px] text-muted">+</span>
              <span className="display text-[3.4rem] text-brand">$497</span>
              <span className="text-[16px] text-muted">/mo</span>
            </div>
            <p className="mt-2 text-[14px] text-ink-soft">No contracts · 14-day money-back guarantee</p>
          </div>

          <ul className="mb-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink">
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <Link href={BOOK_URL} className="btn-primary h-14 w-full justify-center text-[16px]">
            Book your setup call
          </Link>
          <p className="mt-3 text-center text-[12.5px] text-muted">
            15 minutes · We confirm your business details and get you on the build calendar
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-line bg-mist p-6">
          <div className="max-w-[440px]">
            <p className="text-[15px] font-bold text-ink">Running serious volume? Go custom.</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
              Multi-line teams, high-volume operations, agencies, franchises, and enterprises — we&rsquo;ll build a
              custom AI stack matched to your call flow, CRM, and playbook.
            </p>
          </div>
          <Link href={BOOK_URL} className="btn-secondary h-11 px-5 text-[14px] whitespace-nowrap">
            Book a custom call
          </Link>
        </div>
      </div>
    </section>
  );
}
