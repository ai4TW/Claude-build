import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronRight, CreditCard, Mail, Phone } from "lucide-react";
import { SiteNav, MobileBar } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PRICE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AllTheCalls team. We respond within 1 business hour — or call our AI 24/7.",
  alternates: { canonical: "https://allthecalls.ai/contact" },
};

const BOOK_URL = "/book";

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="bg-white py-14 text-center sm:py-20">
          <div className="wrap max-w-xl">
            <p className="text-[14px] font-bold tracking-[0.1em] text-brand">We respond within 1 business hour</p>
            <h1 className="display heading-1 mt-4">Get in touch</h1>
            <p className="mx-auto mt-5 text-[17px] leading-relaxed text-ink-soft">
              Want to talk to our team? Want to hear the AI first? Every option below is one tap.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="wrap flex max-w-xl flex-col gap-3">
            <ContactCard
              label="Call our AI now"
              value={SITE.phone.display}
              caption="24/7 · Hear exactly what your callers would hear"
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
      <SiteFooter />
      <MobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </>
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
    <Link href={href} className="group flex items-center gap-4 rounded-[16px] border border-line bg-white p-5 hover:border-brand">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-mist text-brand">
        <Icon size={22} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-bold tracking-[0.08em] text-brand">{label.toUpperCase()}</span>
        <span className="display mt-0.5 block text-[18px]">{value}</span>
        <span className="mt-0.5 block text-[13px] text-muted">{caption}</span>
      </span>
      <ChevronRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
