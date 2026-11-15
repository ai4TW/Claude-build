import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronRight, CreditCard, Mail, Phone } from "lucide-react";
import { DarkNav, DarkMobileBar, DarkFooter } from "@/components/dark-sections";
import { PRICE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the AllTheCalls team. We respond within 1 business hour.",
  alternates: { canonical: "https://allthecalls.ai/contact" },
};

const BOOK_URL = "/book";

export default function ContactPage() {
  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section className="py-14 text-center sm:py-20">
          <div className="wrap max-w-xl">
            <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
              We respond within 1 business hour
            </p>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              Get in touch
            </h1>
            <p className="mx-auto mt-5 text-[17px] leading-relaxed text-white/60">
              Want to talk to our team? Every option below is one tap.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="wrap flex max-w-xl flex-col gap-3">
            <ContactCard
              label="Call us"
              value={SITE.phone.display}
              caption="A real person on our team — no AI voice, ever"
              href={SITE.phone.href}
              icon={Phone}
            />
            <ContactCard
              label="Email"
              value={SITE.email}
              caption="1-hour response during business hours"
              href={`mailto:${SITE.email}`}
              icon={Mail}
            />
            <ContactCard
              label="Book a call"
              value="15 minutes with our team"
              caption="We'll build a demo in your business name live on the call"
              href={BOOK_URL}
              icon={Calendar}
            />
            <ContactCard
              label="See pricing"
              value={`${PRICE.setup} setup + ${PRICE.monthly}`}
              caption="14-day money-back guarantee"
              href="/pricing"
              icon={CreditCard}
            />
          </div>
        </section>
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}

function ContactCard({
  label,
  value,
  caption,
  href,
  icon: Icon,
}: {
  label: string;
  value: string;
  caption: string;
  href: string;
  icon: typeof Phone;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-[16px] border border-white/10 bg-white/[0.03] p-5 hover:border-[#4cd7f6]/40"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/5 text-[#4cd7f6]">
        <Icon size={22} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-bold tracking-[0.08em] text-[#4cd7f6]">{label.toUpperCase()}</span>
        <span style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-0.5 block text-[18px] text-white">{value}</span>
        <span className="mt-0.5 block text-[13px] text-white/50">{caption}</span>
      </span>
      <ChevronRight size={20} className="shrink-0 text-white/40 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
