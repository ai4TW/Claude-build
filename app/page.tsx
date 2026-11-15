import Link from "next/link";
import { Check } from "lucide-react";
import { SiteNav, MobileBar } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ComparisonSection, FaqSection, FinalCta, FounderSection, HowItWorks, IndustryGrid } from "@/components/sections";
import HeroLeadForm from "@/components/hero-lead-form";
import Reveal from "@/components/reveal";
import { PRICE, SITE } from "@/lib/site";
import { FAQS, FOUR_PARTS } from "@/lib/content";

/*
 * AllTheCalls homepage — rebuilt 2026-11-14 on the We Buy Houses Columbia /
 * Brayden Buys Homes component system (same fonts, same layout shapes),
 * recolored for AllTheCalls. Positioning fix: general local business first,
 * real estate is one vertical among several, not the headline audience.
 *
 * This is Variant A (control) of the brand A/B test — see middleware.ts and
 * app/variant-b/page.tsx for the "Midnight Intelligence" variant. Facts and
 * copy shared between both variants live in lib/content.ts; keep them there,
 * not duplicated here, so the two variants can never drift apart on claims.
 */

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteNav />
      <main>
        {/* HERO */}
        <section className="bg-white">
          <div className="wrap grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 lg:py-24">
            <div>
              <p className="text-[14px] font-bold tracking-[0.1em] text-brand">
                24/7 AI missed-call text-back for local businesses
              </p>
              <h1 className="display heading-1 mt-4">Every missed call is money walking out the door.</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:mt-6 sm:text-[19px]">
                AllTheCalls watches every inbound call to your business and, the moment one goes
                missed, instantly texts that caller back in your business name — qualifies them
                and books the appointment, all over text. You get the summary.
              </p>
              <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
                {["Done-for-you website", "Instant missed-call text-back", "Your own branded CRM app", "Ongoing local SEO"].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[16px] text-ink">
                    <Check size={18} strokeWidth={3} className="shrink-0 text-brand" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-[17px] font-semibold text-ink sm:text-[18px]">
                {PRICE.setup} setup + {PRICE.monthly} — one system, built for your business.
              </p>
              <p className="mt-6 hidden text-[16px] text-ink-soft sm:block">
                Rather talk it through?{" "}
                <a href={SITE.phone.href} className="font-semibold text-brand underline underline-offset-4">
                  Call {SITE.phone.display}
                </a>{" "}
                and we&rsquo;ll walk you through exactly how it works for your business.
              </p>
            </div>
            <HeroLeadForm />
          </div>
        </section>

        <HowItWorks />
        <IndustryGrid />
        <ComparisonSection />
        <FounderSection />

        {/* What you get */}
        <section className="border-t border-line py-20 lg:py-28">
          <div className="wrap">
            <div className="max-w-2xl">
              <h2 className="display heading-2">One system, four parts</h2>
              <p className="mt-4 text-[18px] text-ink-soft">
                {PRICE.setup} setup + {PRICE.monthly} gets you all four, built together so they
                actually talk to each other — not four separate vendors to manage.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {FOUR_PARTS.map((item, i) => (
                <Reveal key={item.n} delay={i * 0.06} className="border-t-2 border-ink pt-5">
                  <span className="display block text-[17px] text-brand">{item.n}</span>
                  <h3 className="mt-3 text-[17px] font-bold">{item.t}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{item.d}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-[14.5px] text-muted">No contracts · 14-day money-back guarantee · one flat setup fee, no surprise add-ons</p>
          </div>
        </section>

        <div className="bg-mist">
          <FaqSection faqs={FAQS} />
        </div>

        <FinalCta />
      </main>
      <SiteFooter />
      <MobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </>
  );
}
