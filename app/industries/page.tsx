import type { Metadata } from "next";
import { DarkNav, DarkMobileBar, DarkFooter, DarkIndustryGrid, DarkFinalCta } from "@/components/dark-sections";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "AllTheCalls is built for any local business that can't afford to miss a call — home services, personal care, auto repair, real estate, and more.",
  alternates: { canonical: "https://allthecalls.ai/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section className="py-14 text-center sm:py-20">
          <div className="wrap max-w-2xl">
            <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
              Built for any local business
            </p>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              Industries we serve
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-[19px]">
              The system is the same everywhere. What changes is the questions your AI asks and the
              words it uses — set up for your industry, not a generic script.
            </p>
          </div>
        </section>
        <DarkIndustryGrid />
        <DarkFinalCta />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
