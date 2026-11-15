import type { Metadata } from "next";
import { DarkNav, DarkMobileBar, DarkFooter, DarkFaqSection, DarkFinalCta } from "@/components/dark-sections";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions business owners ask most about AllTheCalls — pricing, setup time, and how the AI missed-call text-back actually works.",
  alternates: { canonical: "https://allthecalls.ai/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <div className="bg-[#08090f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DarkNav />
      <main>
        <section className="py-14 text-center sm:py-20">
          <div className="wrap max-w-2xl">
            <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
              Questions business owners ask
            </p>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              Frequently asked questions
            </h1>
          </div>
        </section>
        <DarkFaqSection />
        <DarkFinalCta />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
