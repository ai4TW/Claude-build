import type { Metadata } from "next";
import { DarkNav, DarkMobileBar, DarkFooter, DarkHowItWorks, DarkFinalCta } from "@/components/dark-sections";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How AllTheCalls texts back every missed call in your business name, qualifies the caller, and books the appointment — live in 24-48 hours.",
  alternates: { canonical: "https://allthecalls.ai/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section className="py-14 text-center sm:py-20">
          <div className="wrap max-w-2xl">
            <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
              No AI voice, ever
            </p>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              How it works
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-[19px]">
              Your callers never talk to anything. The moment a call to your business goes missed, your AI
              texts that caller back in your name — then qualifies them and books the appointment.
            </p>
          </div>
        </section>
        <DarkHowItWorks />
        <DarkFinalCta />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
