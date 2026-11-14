import Link from "next/link";
import { Check } from "lucide-react";
import { SiteNav, MobileBar } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ComparisonSection, FaqSection, FinalCta, FounderSection, HowItWorks, IndustryGrid, type Faq } from "@/components/sections";
import HeroLeadForm from "@/components/hero-lead-form";
import Hero3D from "@/components/hero-3d";
import Reveal from "@/components/reveal";
import { PRICE, SITE } from "@/lib/site";

/*
 * AllTheCalls homepage — rebuilt 2026-11-14 on the We Buy Houses Columbia /
 * Brayden Buys Homes component system (same fonts, same layout shapes),
 * recolored for AllTheCalls. Positioning fix: general local business first,
 * real estate is one vertical among several, not the headline audience.
 */

const FAQS: Faq[] = [
  {
    q: "Who is this built for?",
    a: "Any local business that can't afford to miss a call: home services and trades, barbershops and salons, auto repair, real estate, and more. The system is the same — what changes is the questions your AI asks for your industry.",
  },
  {
    q: "Does it really sound like my business?",
    a: "Yes. You give us your business name and how you want the AI to answer. Callers hear your name, not a generic bot or \"AllTheCalls.\" Most callers never realize they're not talking to your front desk.",
  },
  {
    q: "What am I actually losing to missed calls?",
    a: "A missed call that goes to voicemail converts far less often than one answered live — most owners never see the lost job because it just shows up as a call to a competitor instead. Think through your last few missed calls and what each one was probably worth.",
  },
  {
    q: "How fast can I go live?",
    a: "Most businesses are answering calls within 24-48 hours. We handle the full setup — you just forward your existing number.",
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
    q: "Can I hear it before I sign up?",
    a: `Yes — call ${SITE.phone.display} right now and hear a live AllTheCalls AI handle a call end-to-end. 60 seconds, no signup.`,
  },
];

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
        <section className="relative overflow-hidden bg-white">
          <Hero3D />
          <div className="wrap relative z-10 grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 lg:py-24">
            <div>
              <p className="text-[14px] font-bold tracking-[0.1em] text-brand">
                24/7 AI call-answering for local businesses
              </p>
              <h1 className="display heading-1 mt-4">Every missed call is money walking out the door.</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:mt-6 sm:text-[19px]">
                AllTheCalls answers every inbound call in your business name, 24/7, qualifies the
                caller, books the appointment, and texts you the summary. Any missed call gets an
                instant text-back so the lead doesn&rsquo;t call the next business in line.
              </p>
              <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
                {["Done-for-you website", "AI call-answering + text-back", "Your own branded CRM app", "Ongoing local SEO"].map((b) => (
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
                and hear a live AllTheCalls AI handle a call end to end.
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
              {[
                { n: "01", t: "A website built to rank", d: "Done-for-you, hosted for you, structured for local SEO from day one." },
                { n: "02", t: "AI call-answering + text-back", d: "Every call picked up 24/7 in your name. Every missed call gets an instant follow-up text." },
                { n: "03", t: "Your branded CRM app", d: "Every call, text, and lead lands in one pipeline under your own brand." },
                { n: "04", t: "Local SEO, ongoing", d: "We keep tuning the site and your local listings so you keep showing up." },
              ].map((item, i) => (
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
