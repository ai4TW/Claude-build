"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Plus } from "lucide-react";
import { INDUSTRIES, SITE } from "@/lib/site";
import { HOW_IT_WORKS_STEPS, COMPARISON_ROWS, FAQS, type Faq } from "@/lib/content";
import Reveal from "@/components/reveal";
import LogoDark from "@/components/logo-dark";

/**
 * "Midnight Intelligence" — Variant B of the AllTheCalls brand A/B test.
 * Dark bg, cyan→purple gradient accents, Space Grotesk headings. Same
 * sections, same facts as Variant A (components/sections.tsx) — all shared
 * copy lives in lib/content.ts / lib/site.ts so the two variants can only
 * differ visually, never on a claim or a number. See middleware.ts for the
 * split and app/variant-b/page.tsx for the page that assembles these.
 */

const space = { fontFamily: "var(--font-space-grotesk)" };

export function DarkNav() {
  const LINKS = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#industries", label: "Industries" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090f]/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-5 lg:h-[76px] xl:gap-6">
        <Link href="/" aria-label="AllTheCalls, home page" className="shrink-0 rounded-md">
          <LogoDark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[15px] font-medium whitespace-nowrap text-white/60 xl:gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-sm transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={SITE.phone.href}
            className="hidden items-center gap-2 rounded-sm text-[15px] font-semibold whitespace-nowrap text-white/80 hover:text-white sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone size={16} aria-hidden />
            {SITE.phone.display}
          </a>
          <Link
            href="/pricing"
            className="hidden h-11 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-5 text-[15px] font-bold text-[#08090f] transition-opacity hover:opacity-90 md:inline-flex"
          >
            See pricing
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DarkMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08090f]/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex gap-3">
        <a href={SITE.phone.href} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[10px] border border-white/15 text-[16px] font-bold text-white">
          <Phone size={17} aria-hidden />
          Call
        </a>
        <Link
          href="/pricing"
          className="flex h-12 flex-[2] items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] text-[16px] font-bold text-[#08090f]"
        >
          See pricing
        </Link>
      </div>
    </div>
  );
}

export function DarkHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 lg:py-28">
      <div className="wrap">
        <h2 style={space} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
          How it works
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="border-t-2 border-white/15 pt-6">
              <span style={space} className="block text-[64px] font-bold leading-none bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[21px] leading-snug font-bold text-white">{s.title}</h3>
              <p className="mt-2 max-w-[38ch] text-white/60">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DarkIndustryGrid() {
  return (
    <section id="industries" className="scroll-mt-20 border-t border-white/10 py-20 lg:py-28">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 style={space} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
            Built for any local business
          </h2>
          <p className="mt-4 text-[18px] text-white/60">
            The system is the same everywhere. What changes is the questions your AI asks and the
            words it uses — set up for your industry, not a generic script.
          </p>
        </div>
        <ul className="mt-12 grid border-t border-white/10 sm:grid-cols-2">
          {INDUSTRIES.map((i) => (
            <li key={i.slug} className="border-b border-white/10">
              <Link href={`/industry/${i.slug}`} className="group flex items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-[19px] font-bold text-white transition-colors group-hover:text-[#4cd7f6]">{i.name}</span>
                  <span className="block text-[15px] text-white/50">{i.oneLiner}</span>
                </span>
                <ChevronRight size={22} className="shrink-0 text-[#4cd7f6] transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[15px] text-white/50">
          Don&rsquo;t see your industry? Call{" "}
          <a href={SITE.phone.href} className="font-semibold text-[#4cd7f6] underline underline-offset-4">{SITE.phone.display}</a>
          {" "}— it still works the same way.
        </p>
      </div>
    </section>
  );
}

export function DarkComparisonSection() {
  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20 lg:py-28">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 style={space} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
            AllTheCalls vs. voicemail
          </h2>
          <p className="mt-4 text-[18px] text-white/60">
            Most businesses don&rsquo;t have a bad phone system. They have no system — just whoever happens
            to pick up, and voicemail for everyone else.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-4 text-[14px] font-bold text-white sm:px-7 sm:text-[15px]">
            <span />
            <span className="bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">With AllTheCalls</span>
            <span className="text-white/50">Without it</span>
          </div>
          <ul>
            {COMPARISON_ROWS.map((row) => (
              <li
                key={row.label}
                className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-white/10 px-5 py-4 text-[15px] last:border-b-0 sm:px-7 sm:text-[16px]"
              >
                <span className="font-semibold text-white">{row.label}</span>
                <span className="font-semibold text-white">{row.ours}</span>
                <span className="text-white/45">{row.theirs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Honest founder section — no fabricated testimonials, matching Variant A. */
export function DarkFounderSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <figure className="max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03]">
            <Image
              src="/brayden.jpg"
              alt="Brayden Myers, founder of AllTheCalls"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4">
            <span className="block text-[19px] font-bold text-white">Brayden Myers</span>
            <span className="block text-[15px] text-white/50">Founder, AllTheCalls</span>
          </figcaption>
        </figure>
        <div>
          <h2 style={space} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
            We run this on our own business first
          </h2>
          <p className="mt-4 text-[18px] text-white/60">
            I built AllTheCalls on the same missed-call text-back, CRM, and SEO stack running my own real
            estate business — it wasn&rsquo;t built as a product first and tested on customers later.
            Drainiacs Plumbing of Wichita is our first outside client, live now.
          </p>
          <p className="mt-4 text-[18px] text-white/60">
            No call center, no outsourced setup. When you sign up, I&rsquo;m involved in getting your
            system built right for your business.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a
              href={SITE.phone.href}
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-5 text-[16px] font-bold text-[#08090f]"
            >
              <Phone size={17} aria-hidden />
              {SITE.phone.display}
            </a>
            <Link href="/contact" className="font-semibold text-[#4cd7f6] underline underline-offset-4">Get in touch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DarkFaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] leading-snug font-semibold text-white [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#4cd7f6] transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="mt-3 max-w-[65ch] text-white/60">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function DarkFaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/10 py-20 lg:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 style={space} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
            Questions business owners ask
          </h2>
          <p className="mt-4 text-white/60">
            Something else on your mind? Call{" "}
            <a href={SITE.phone.href} className="font-semibold text-[#4cd7f6] underline underline-offset-4">{SITE.phone.display}</a>.
          </p>
        </div>
        <DarkFaqList faqs={FAQS} />
      </div>
    </section>
  );
}

export function DarkFinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#08090f] pt-20 pb-20 text-center lg:pt-28 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4cd7f6, #d2bbff, transparent)" }}
      />
      <div className="wrap relative flex flex-col items-center">
        <p className="text-[15px] font-semibold text-white/50">The next missed call is already on its way.</p>
        <h2 style={space} className="mt-5 max-w-3xl text-[clamp(2.6rem,1.3rem+5.4vw,5.5rem)] font-bold leading-[1.04] text-white">
          Every missed call is a customer calling{" "}
          <span className="bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">someone else</span>.
        </h2>
        <p className="mt-6 max-w-md text-[17px] text-white/70">Live in 24-48 hours. No contracts. 14-day money-back guarantee.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="flex h-14 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-7 text-[17px] font-bold text-[#08090f] shadow-[0_18px_40px_-20px_rgba(76,215,246,0.5)]"
          >
            See pricing
          </Link>
          <a href={SITE.phone.href} className="flex h-14 items-center gap-2 rounded-[10px] border border-white/25 px-6 text-[17px] font-semibold text-white">
            <Phone size={18} aria-hidden />
            {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

export function DarkFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08090f] text-white/60">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <LogoDark />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            A done-for-you AI missed-call text-back, branded CRM app, and local SEO system for any
            local business that can&rsquo;t afford to miss a call.
          </p>
          <a href={SITE.phone.href} className="mt-4 inline-block text-[18px] font-semibold text-white hover:underline">
            {SITE.phone.display}
          </a>
          <a href={`mailto:${SITE.email}`} className="mt-1 block text-[15px] hover:text-white hover:underline">
            {SITE.email}
          </a>
        </div>
        <DarkFooterList
          title="AllTheCalls"
          links={[
            { href: "/pricing", label: "Pricing" },
            { href: "/#how-it-works", label: "How it works" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]}
        />
        <DarkFooterList
          title="Industries"
          links={INDUSTRIES.map((i) => ({ href: `/industry/${i.slug}`, label: i.navLabel }))}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[13.5px] text-white/40 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl">
            AllTheCalls sells a done-for-you AI missed-call text-back, CRM, and SEO system to local
            businesses. Results depend on your market and how you use it.
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>&copy; {new Date().getFullYear()} AllTheCalls</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function DarkFooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[15px] font-bold text-white">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
