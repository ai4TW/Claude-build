import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SiteNav, MobileBar } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FaqSection, type Faq } from "@/components/sections";
import PricingGate from "@/components/PricingGate";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls",
  description:
    "See what AllTheCalls costs — the done-for-you AI call-answering, CRM, and local SEO system for any business that can't afford to miss a call. 14-day money-back guarantee.",
};

const BOOK_URL = "/book";

const FAQ: Faq[] = [
  {
    q: "What do I actually get for $1,997 + $497/mo?",
    a: "A done-for-you website built and hosted for you and structured for local SEO, 24/7 AI call-answering with instant missed-call text-back, and your own branded CRM app where every call, text, and lead lands in one pipeline. The $1,997 covers the full build and setup; the $497/mo covers hosting, the AI, the CRM, and ongoing local SEO.",
  },
  {
    q: "Who is this actually built for?",
    a: "Any business owner who can't afford a missed call: home services, personal care, auto repair, real estate, and more. If a missed call costs you money, this is for you.",
  },
  {
    q: "How does it actually work?",
    a: "Your AI answers every inbound call in your business name, 24/7, and texts back anyone you miss. It qualifies the caller, captures the info you need, books them on your calendar, and logs it in your CRM app before they hang up.",
  },
  {
    q: "Does the AI sound real?",
    a: `Most callers don't realize they're talking to AI. It answers in your name and uses your exact qualification questions. Call ${SITE.phone.display} right now and decide for yourself.`,
  },
  {
    q: "How fast can I go live?",
    a: "Most clients are answering calls within 24-48 hours. Our team builds your AI, sets up the phone number, and walks you through forwarding your existing line.",
  },
  {
    q: "What if it doesn't work out?",
    a: "14-day money-back guarantee. No questions, no friction. Email hello@allthecalls.ai and we refund you.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="bg-white py-14 text-center sm:py-20">
          <div className="wrap max-w-3xl">
            <p className="text-[14px] font-bold tracking-[0.1em] text-brand">
              Built for any local business
            </p>
            <h1 className="display heading-1 mt-4">Every missed call is money walking out the door.</h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              AllTheCalls answers every call in your business name 24/7, text-backs the ones it
              misses, and runs it all through a website, branded CRM app, and local SEO built for
              your business.
            </p>
          </div>
        </section>

        <PricingGate />

        <section className="pb-10">
          <div className="wrap max-w-4xl">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[16px] border border-line bg-mist p-7 text-center md:flex-row md:text-left">
              <div>
                <h3 className="text-[17px] font-bold text-ink">Want to see it on your actual call flow first?</h3>
                <p className="mt-1 text-[14px] text-ink-soft">15-minute call. We&rsquo;ll run the AI against a sample caller from your business.</p>
              </div>
              <Link href={BOOK_URL} className="btn-secondary h-12 px-5 text-[15px] whitespace-nowrap">
                Book a 15-min call
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-mist">
          <FaqSection faqs={FAQ} heading="Quick answers" />
        </div>

        <section className="on-dark bg-brand-deep py-16 text-center text-white">
          <div className="wrap max-w-2xl">
            <h2 className="display heading-2 text-white">Every missed call is a lead going to someone else.</h2>
            <p className="mt-4 text-[17px] text-white/85">Live in 24-48 hours. No contracts. 14-day money-back guarantee.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={SITE.phone.href} className="btn-accent h-14 px-7 text-[17px]">
                <Phone size={18} aria-hidden />
                {SITE.phone.display}
              </a>
              <Link href={BOOK_URL} className="btn-outline-light h-14 px-7 text-[17px]">
                Book a 15-min call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </>
  );
}
