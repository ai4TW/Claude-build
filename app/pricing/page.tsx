import type { Metadata } from "next";
import Link from "next/link";
import { DarkNav, DarkMobileBar, DarkFooter, DarkFaqSection, DarkFinalCta } from "@/components/dark-sections";
import { DarkPricingGate } from "@/components/dark-pricing";
import type { Faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls",
  description:
    "See what AllTheCalls costs — the done-for-you AI missed-call text-back, CRM, and local SEO system for any business that can't afford to miss a call. 14-day money-back guarantee.",
};

const BOOK_URL = "/book";

const FAQ: Faq[] = [
  {
    q: "What do I actually get for $1,997 + $497/mo?",
    a: "A done-for-you website built and hosted for you and structured for local SEO, 24/7 instant AI missed-call text-back, and your own branded CRM app where every call, text, and lead lands in one pipeline. The $1,997 covers the full build and setup; the $497/mo covers hosting, the AI, the CRM, and ongoing local SEO.",
  },
  {
    q: "Who is this actually built for?",
    a: "Any business owner who can't afford a missed call: home services, personal care, auto repair, real estate, and more. If a missed call costs you money, this is for you.",
  },
  {
    q: "How does it actually work?",
    a: "The moment a call to your business goes missed, your AI texts that caller back in your business name — it qualifies them, captures the info you need, books them on your calendar, and logs it in your CRM app, all over text.",
  },
  {
    q: "Does the text sound like me, not a bot?",
    a: `Yes. There's no AI voice involved — your callers never talk to anything, missed or not. You give us your business name and the exact questions you'd ask, and that's what the AI texts in your name. Most people texting back never realize it's not someone from your business typing.`,
  },
  {
    q: "How fast can I go live?",
    a: "Most clients are texting back missed calls within 24-48 hours. Our team builds your AI, sets up the phone number, and walks you through forwarding your existing line.",
  },
  {
    q: "What if it doesn't work out?",
    a: "14-day money-back guarantee. No questions, no friction. Email hello@allthecalls.ai and we refund you.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section className="py-14 text-center sm:py-20">
          <div className="wrap max-w-3xl">
            <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
              Built for any local business
            </p>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              Every missed call is money walking out the door.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-[19px]">
              AllTheCalls texts back every missed call in your business name, 24/7, and runs it
              all through a website, branded CRM app, and local SEO built for your business.
            </p>
          </div>
        </section>

        <DarkPricingGate />

        <section className="pb-10">
          <div className="wrap max-w-4xl">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[16px] border border-white/10 bg-white/[0.02] p-7 text-center md:flex-row md:text-left">
              <div>
                <h3 className="text-[17px] font-bold text-white">Want to see how it&rsquo;d actually work for your business first?</h3>
                <p className="mt-1 text-[14px] text-white/60">15-minute call. We&rsquo;ll walk through a sample missed call from your business and what the text-back would say.</p>
              </div>
              <Link
                href={BOOK_URL}
                className="flex h-12 items-center whitespace-nowrap rounded-[10px] border border-white/20 px-5 text-[15px] font-semibold text-white hover:border-white/40"
              >
                Book a 15-min call
              </Link>
            </div>
          </div>
        </section>

        <DarkFaqSection faqs={FAQ} heading="Quick answers" />
        <DarkFinalCta />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
