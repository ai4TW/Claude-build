import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { DarkNav, DarkMobileBar, DarkFooter, DarkFaqSection, DarkFinalCta, DarkIndustryGrid } from "@/components/dark-sections";
import type { Faq } from "@/lib/content";
import HeroLeadForm from "@/components/hero-lead-form";
import { PRICE, SITE } from "@/lib/site";

interface IndustryContent {
  title: string;
  headline: string;
  description: string;
  bullets: string[];
  faqs: Faq[];
  metaTitle: string;
  metaDesc: string;
}

const INDUSTRY_DATA: Record<string, IndustryContent> = {
  "home-services": {
    title: "Home Services & Trades",
    headline: "Stop losing jobs to voicemail while you're on a job.",
    description:
      "Plumbers, HVAC, electricians, roofers, and other trades lose real jobs to missed calls every week. Your AI texts back anyone you miss, qualifies them, and books the job on your calendar — live in 24-48 hours.",
    bullets: [
      "Texts back every missed call in your name — 24/7, including after-hours and weekends",
      "Instant missed-call text-back so the job doesn't go to the next company in the search results",
      "Captures service type, address, and urgency before you call back",
      "Books estimates and service calls straight onto your calendar",
      "Your own branded CRM app — every call, text, and job in one pipeline",
      "A done-for-you website built for local SEO in your service area",
    ],
    faqs: [
      { q: "Does it know the difference between an emergency and a routine call?", a: "Yes — you tell us what counts as urgent for your trade (a burst pipe vs. a slow drain, no heat vs. a filter change) and the AI triages accordingly, flagging urgent jobs to you immediately." },
      { q: "Can it quote a price over the phone?", a: "It can share your stated service-call or diagnostic fee if you give us one, but it doesn't quote full job pricing on the spot — it captures the details and gets the job on your calendar or callback list instead." },
    ],
    metaTitle: "AI Missed-Call Text-Back for Plumbers, HVAC & Home Services | AllTheCalls",
    metaDesc: "Never miss another service call. AllTheCalls texts back every missed call in your name 24/7, books the job, and runs it through your own branded CRM app.",
  },
  "personal-care": {
    title: "Personal Care",
    headline: "Stop losing bookings to a phone nobody can answer mid-cut.",
    description:
      "Barbershops, salons, and spas lose walk-in-worthy bookings every day because the chair is busy and the phone just rings. Your AI texts back anyone who called while you were with a client, qualifies them, and books the appointment.",
    bullets: [
      "Texts back every missed call in your shop's name while you're with a client",
      "Books appointments straight onto your calendar — no more sticky notes",
      "Instant text-back for any call you miss",
      "Captures which service and which stylist/barber they want",
      "Your own branded CRM app — every call, text, and booking in one place",
      "A done-for-you website built for local SEO in your area",
    ],
    faqs: [
      { q: "Can it book with a specific stylist or barber?", a: "Yes — tell us your team and their schedules, and the AI books the client with the person they ask for (or offers the next available if their first choice is full)." },
      { q: "Can it handle cancellations and rescheduling?", a: "Yes — the AI can reschedule or cancel an existing booking and update your calendar in real time." },
    ],
    metaTitle: "AI Missed-Call Text-Back for Barbershops & Salons | AllTheCalls",
    metaDesc: "Never miss another booking. AllTheCalls texts back every missed call in your shop's name and books the appointment.",
  },
  "auto-repair": {
    title: "Auto Repair",
    headline: "Stop losing repair jobs to a phone that rings while you're under a car.",
    description:
      "Shops and mobile mechanics lose jobs to missed calls constantly — customers call the next shop on the list the moment voicemail picks up. Your AI texts back anyone you miss, captures the vehicle and the issue, and books the appointment.",
    bullets: [
      "Texts back every missed call in your shop's name — 24/7, including after-hours",
      "Captures the vehicle, the issue, and urgency before you call back",
      "Instant text-back for any call you miss",
      "Books drop-offs and estimates straight onto your calendar",
      "Your own branded CRM app — every call, text, and job in one pipeline",
      "A done-for-you website built for local SEO in your service area",
    ],
    faqs: [
      { q: "Can it give a repair estimate?", a: "It doesn't diagnose or quote repairs — it captures the vehicle, the symptoms, and contact info, and gets the customer booked for a look or a callback from you." },
      { q: "Does it work for mobile mechanics too?", a: "Yes — it captures the customer's location along with the vehicle and issue so you have everything you need before you drive out." },
    ],
    metaTitle: "AI Missed-Call Text-Back for Auto Repair Shops | AllTheCalls",
    metaDesc: "Never miss another repair job. AllTheCalls texts back every missed call in your shop's name, captures the vehicle and issue, and books the appointment.",
  },
  "real-estate": {
    title: "Real Estate",
    headline: "Never miss another lead while you're out on a showing.",
    description:
      "Your AI texts back every missed call in your name — 24/7 — qualifies the caller, books the appointment, and texts you the details. Built for agents, brokers, investors, lenders, title, and property managers.",
    bullets: [
      "Texts back every missed call in your name — 24/7",
      "Qualifies buyer vs seller, loan type, property condition, timeline",
      "Books appointments on your calendar",
      "Texts every new lead back in under 30 seconds",
      "Missed-call text-back and a transcript sent the moment each text thread ends",
      "Your own branded CRM app — every call, text, and lead in one pipeline",
    ],
    faqs: [
      { q: "Can it qualify a motivated seller lead?", a: "Yes — it asks the questions you'd ask: condition, timeline, reason for selling, and whether they're open to a cash offer, then logs it straight into your CRM." },
      { q: "Does it work for property management calls too?", a: "Yes — tenant calls, maintenance requests, and leasing inquiries get triaged by urgency, with emergencies routed straight to you." },
    ],
    metaTitle: "AI Missed-Call Text-Back for Real Estate Pros | AllTheCalls",
    metaDesc: "Never miss a real estate lead again. AllTheCalls texts back every missed call in your name 24/7, qualifies the caller, books the appointment, and texts you the summary.",
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug];
  if (!data) return { title: "Not found | AllTheCalls", robots: { index: false, follow: false } };
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `https://allthecalls.ai/industry/${slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug];
  if (!data) notFound();

  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section>
          <div className="wrap grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 lg:py-24">
            <div>
              <p className="text-[14px] font-bold tracking-[0.1em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">
                Built for {data.title.toLowerCase()}
              </p>
              <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mt-4 text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
                {data.headline}
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-[19px]">{data.description}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {data.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[16px] text-white/85">
                    <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-[#4cd7f6]" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-[17px] font-semibold text-white">
                {PRICE.setup} setup + {PRICE.monthly}.{" "}
                <a href={SITE.phone.href} className="font-semibold text-[#4cd7f6] underline underline-offset-4">
                  Call {SITE.phone.display}
                </a>{" "}
                and we&rsquo;ll walk you through it.
              </p>
            </div>
            <HeroLeadForm id="lead-form" theme="dark" />
          </div>
        </section>

        <DarkFaqSection
          heading={`Questions ${data.title.toLowerCase()} businesses ask`}
          faqs={[
            ...data.faqs,
            { q: "How fast can I go live?", a: "Most businesses are texting back missed calls within 24-48 hours. We handle the full setup — you just forward your existing number." },
            { q: "What if I'm not happy with it?", a: "14-day money-back guarantee. Let us know within 14 days and we refund every penny." },
          ]}
        />

        <DarkIndustryGrid />
        <DarkFinalCta heading={data.headline} body={`${PRICE.setup} setup + ${PRICE.monthly}. Live in 24-48 hours. No contracts.`} />
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
