import { Check } from "lucide-react";
import {
  DarkComparisonSection,
  DarkFinalCta,
  DarkFounderSection,
  DarkMobileBar,
  DarkNav,
  DarkFooter,
} from "@/components/dark-sections";
import Hero3DPhone from "@/components/dark-hero-3d";
import LiquidLightStage from "@/components/liquid-light-stage";
import HeroLeadForm from "@/components/hero-lead-form";
import Reveal from "@/components/reveal";
import { PRICE, SITE } from "@/lib/site";
import { FAQS, FOUR_PARTS } from "@/lib/content";

/*
 * AllTheCalls homepage — "Midnight Intelligence" (dark bg, cyan->purple
 * gradient accents, Space Grotesk headings). This used to be a 50/50
 * brand A/B test against a navy/signal-red variant; Brayden reviewed both
 * live and picked this one outright ("way better in every single way"),
 * so this is now the only design, site-wide. How it works / Industries /
 * FAQ moved to their own real pages (/how-it-works, /industries, /faq) —
 * nav used to anchor-scroll to sections on this page, which is also what
 * caused a real bug (clicking "Pricing" landed on a page that never got
 * themed). Every route on the site now shares this same dark system.
 * Facts (price, FAQs, four-parts) live in lib/content.ts / lib/site.ts so
 * nothing on any page can drift apart on a claim or a price.
 */

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <div className="bg-[#08090f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DarkNav />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <LiquidLightStage />
          <div className="wrap relative grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 lg:py-24">
            <div className="relative">
              <Hero3DPhone />
              <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
                24/7 AI missed-call text-back for local businesses
              </p>
              <h1
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="mt-4 text-[clamp(2.3rem,1.3rem+3.4vw,3.9rem)] leading-[1.08] text-white"
              >
                <span className="font-bold">Every missed call</span>{" "}
                <span className="font-light text-white/70">is money walking out the door.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/60 sm:mt-6 sm:text-[19px]">
                AllTheCalls watches every inbound call to your business and, the moment one goes
                missed, instantly texts that caller back in your business name — qualifies them
                and books the appointment, all over text. You get the summary.
              </p>
              <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
                {["Done-for-you website", "Instant missed-call text-back", "Your own branded CRM app", "Ongoing local SEO"].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[16px] text-white/85">
                    <Check size={18} strokeWidth={3} className="shrink-0 text-[#4cd7f6]" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-[17px] font-semibold text-white sm:text-[18px]">
                {PRICE.setup} setup + {PRICE.monthly} — one system, built for your business.
              </p>
              <p className="mt-6 hidden text-[16px] text-white/60 sm:block">
                Rather talk it through?{" "}
                <a href={SITE.phone.href} className="font-semibold text-[#4cd7f6] underline underline-offset-4">
                  Call {SITE.phone.display}
                </a>{" "}
                and we&rsquo;ll walk you through exactly how it works for your business.
              </p>
            </div>
            <HeroLeadForm theme="dark" />
          </div>
        </section>

        <DarkComparisonSection />
        <DarkFounderSection />

        {/* What you get */}
        <section className="border-t border-white/10 py-20 lg:py-28">
          <div className="wrap">
            <div className="max-w-2xl">
              <h2 style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
                One system, four parts
              </h2>
              <p className="mt-4 text-[18px] text-white/60">
                {PRICE.setup} setup + {PRICE.monthly} gets you all four, built together so they
                actually talk to each other — not four separate vendors to manage.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {FOUR_PARTS.map((item, i) => (
                <Reveal key={item.n} delay={i * 0.06} className="border-t-2 border-white/15 pt-5">
                  <span style={{ fontFamily: "var(--font-space-grotesk)" }} className="block text-[17px] font-bold bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
                    {item.n}
                  </span>
                  <h3 className="mt-3 text-[17px] font-bold text-white">{item.t}</h3>
                  <p className="mt-2 text-[15px] text-white/60">{item.d}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-[14.5px] text-white/40">No contracts · 14-day money-back guarantee · one flat setup fee, no surprise add-ons</p>
          </div>
        </section>

        <DarkFinalCta />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
