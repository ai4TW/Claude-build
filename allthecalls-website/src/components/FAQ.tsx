import { useState } from "react";

const faqs = [
  {
    q: "Does it really sound like me?",
    a: "Yes. You set the name, intro, and tone during setup. Callers hear your name, your brokerage, and a natural conversational voice. Most clients never realize it's AI.",
  },
  {
    q: "What happens when I want to take a call myself?",
    a: "You can set business hours so calls route to you during the day and to your AI after hours. Or run your AI 24/7 as a first-response layer that screens calls before patching them through.",
  },
  {
    q: "Will it work with my current phone number?",
    a: "Yes. You forward your existing number to your All The Calls number. No number change required. Takes 2 minutes to set up.",
  },
  {
    q: "What CRMs does it sync with?",
    a: "We support Follow Up Boss, KVCore, Salesforce, HubSpot, and any CRM with a Zapier integration. Direct API access is available on Pro and Team plans.",
  },
  {
    q: "What happens after the 14-day trial?",
    a: "Your card is charged at the start of the first paid month. You can cancel at any time before or during your trial with zero charges.",
  },
  {
    q: "Can my AI book showings directly?",
    a: "Yes — with calendar integration enabled (Pro and Team), your AI checks your real-time availability and books appointments directly. You get an instant notification.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-400">Everything you need to know before you start.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card-dark rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
