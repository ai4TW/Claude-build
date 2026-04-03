import Link from "next/link";

const NAV_CTA = "/dashboard";

const testimonials = [
  {
    quote:
      "I used to miss 3–4 calls a day during showings. Last month, RealtyVoice booked two new listings from calls I never would have answered. It's paid for itself 10 times over.",
    name: "Sarah M.",
    brokerage: "RE/MAX",
    location: "Austin, TX",
  },
  {
    quote:
      "Setup took literally five minutes. Now I feel like I have a full-time receptionist without the $4,000/month price tag.",
    name: "David K.",
    brokerage: "Keller Williams",
    location: "Phoenix, AZ",
  },
  {
    quote:
      "My leads used to go cold if I didn't call back within an hour. Now my AI follows up instantly and keeps them warm until I can connect. My conversion rate has never been higher.",
    name: "Maria R.",
    brokerage: "Coldwell Banker",
    location: "Miami, FL",
  },
];

const features = [
  {
    icon: "🎙️",
    title: "Answers in Your Name",
    desc: "Your AI greets every caller with your name and brokerage. Professional, personalized, and on-brand — every single time.",
  },
  {
    icon: "🎯",
    title: "Qualifies Leads Automatically",
    desc: "Your AI asks the right questions: buyer or seller? Timeline? Pre-approved? You get a full lead summary before you ever call back.",
  },
  {
    icon: "📅",
    title: "Books Showings to Your Calendar",
    desc: "Callers can schedule showings directly through your AI receptionist. No back-and-forth. Syncs with Google Calendar and more.",
  },
  {
    icon: "🌙",
    title: "24/7 After-Hours Coverage",
    desc: "Calls at 11pm? Calls on Sunday morning? Your AI answers every time. You'll never send a lead to voicemail again.",
  },
  {
    icon: "💬",
    title: "CRM & SMS Follow-Up",
    desc: "Every call syncs to Follow Up Boss, KvCORE, HubSpot, GHL, and more. Auto SMS follow-ups keep leads warm while you close deals.",
  },
  {
    icon: "⚡",
    title: "5-Minute Setup",
    desc: "No tech skills needed. Sign up, get your AI configured, forward your number, and you're live. Most agents are up in under 5 minutes.",
  },
];

const faqs = [
  {
    q: "Does the AI really sound natural?",
    a: "Yes. Your AI uses advanced conversational voice technology and is trained to sound professional, warm, and helpful — not robotic. Your clients will be impressed.",
  },
  {
    q: "How does call forwarding work?",
    a: "You simply forward your business number to your RealtyVoice number. It takes about 30 seconds. We provide step-by-step instructions for every carrier.",
  },
  {
    q: "What if I want to take calls myself?",
    a: "No problem. You control when your AI is active. Use it for after-hours, overflow, or full-time coverage — your choice.",
  },
  {
    q: "Does it work with my CRM?",
    a: "Yes. RealtyVoice AI integrates with Follow Up Boss, KvCORE, HubSpot, Go High Level, and more. Every call is automatically logged with full lead details.",
  },
  {
    q: "What if I want to cancel?",
    a: "No long-term contracts. Cancel anytime with one click from your dashboard.",
  },
  {
    q: "How fast can I get set up?",
    a: "Most agents are live in under 5 minutes. We walk you through every step.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$149",
    period: "/mo",
    desc: "Solo agents getting started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$249",
    period: "/mo",
    desc: "Active agents with high call volume",
    popular: true,
  },
  {
    name: "Team",
    price: "$399",
    period: "/mo",
    desc: "Small teams of 2–5 agents",
    popular: false,
  },
];

const planFeatures = [
  "24/7 AI receptionist in your name",
  "Lead qualification on every call",
  "Calendar integration",
  "SMS follow-up automation",
  "CRM sync",
  "5-minute setup",
  "Cancel anytime",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="text-xl font-bold text-brand-900">
            RealtyVoice <span className="text-brand-500">AI</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-brand-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href={NAV_CTA} className="hidden sm:block text-sm text-gray-600 hover:text-brand-600 transition-colors">
              Log in
            </Link>
            <Link
              href={NAV_CTA}
              className="bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-brand-900 text-white pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-brand-500/20 text-brand-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            The AI Receptionist Built for Real Estate Agents
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Never Miss a Lead.<br />Never Lose a Commission.
          </h1>
          <p className="text-xl sm:text-2xl text-brand-100 max-w-2xl mx-auto mb-10">
            RealtyVoice AI answers every call in your name — 24/7 — qualifying leads, booking showings, and following up automatically. So you can close deals without being glued to your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href={NAV_CTA}
              className="bg-brand-500 hover:bg-brand-400 text-white text-lg font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-brand-900/30"
            >
              Start Free Trial →
            </Link>
            <a
              href="#demo"
              className="border border-white/30 hover:border-white/60 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Book a 15-Min Demo
            </a>
          </div>
          <p className="text-brand-300 text-sm">
            No contracts. Set up in 5 minutes. Cancel anytime.
          </p>
        </div>
      </section>

      {/* PAIN */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            You&apos;re Losing Money Every Time<br className="hidden sm:block" /> Your Phone Goes to Voicemail
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📵",
                title: "Missed Calls = Missed Commissions",
                body: "You're in a showing, an open house, or finally getting some sleep. Your phone rings. You miss it. That caller moves on to the next agent.",
                highlight: "One missed call can cost you $10,000–$30,000.",
              },
              {
                icon: "⏱️",
                title: "Leads Don't Wait",
                body: null,
                highlight: null,
                custom: (
                  <p className="text-gray-400 leading-relaxed">
                    Today&apos;s buyers and sellers expect an instant response.{" "}
                    <span className="text-white font-semibold">
                      78% of leads go with the first agent who responds.
                    </span>{" "}
                    If you&apos;re not picking up, your competitor is.
                  </p>
                ),
              },
              {
                icon: "💸",
                title: "You Can't Hire a Human Receptionist",
                body: "A full-time receptionist costs $3,000–$5,000 per month. And they still take lunch breaks, sick days, and vacations.",
                highlight: "There's a better way.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-2xl p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                {item.custom ?? (
                  <>
                    <p className="text-gray-400 leading-relaxed">{item.body}</p>
                    {item.highlight && (
                      <p className="text-brand-400 font-semibold mt-4">{item.highlight}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your AI Receptionist That Works 24/7
            <span className="text-brand-600"> — Starting at $149/Month</span>
          </h2>
          <p className="text-gray-600 text-xl mb-12">
            RealtyVoice AI gives you a professional, always-on receptionist that answers in your name, qualifies every lead, and books showings directly to your calendar.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { step: "1", title: "Sign up", desc: "Takes 5 minutes, no tech skills needed" },
              { step: "2", title: "We configure your AI", desc: "Custom greeting with your name and brokerage" },
              { step: "3", title: "Forward your number", desc: "Point your business line to your RealtyVoice number" },
              { step: "4", title: "Never miss a lead", desc: "Your AI handles every call from day one" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 max-w-lg mx-auto text-left">
            <p className="text-brand-900 text-lg italic">
              &ldquo;Thank you for calling Sarah Johnson with Compass. I&apos;m her AI assistant — how can I help you today?&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <p className="text-gray-600 text-center text-lg mb-14">
            Built specifically for real estate agents, not generic businesses.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-900 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Real Estate Agents Love RealtyVoice AI
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-brand-800/50 border border-brand-700/50 rounded-2xl p-6">
                <p className="text-brand-100 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-brand-300 text-sm">{t.brokerage}, {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Simple Pricing. Serious ROI.</h2>
          <p className="text-gray-500 text-lg mb-2">One commission pays for years of RealtyVoice AI.</p>
          <p className="text-brand-600 font-semibold mb-12">14-day free trial. No credit card required.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 relative ${
                  plan.popular ? "border-brand-500 shadow-xl shadow-brand-100" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline justify-center mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  {planFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-brand-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={NAV_CTA}
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    plan.popular
                      ? "bg-brand-600 hover:bg-brand-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50 py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="demo" className="bg-brand-600 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            One Missed Call Could Cost You $20,000.
          </h2>
          <p className="text-xl text-brand-100 mb-10">
            Stop sending leads to voicemail. Start with RealtyVoice AI today — free for 14 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href={NAV_CTA}
              className="bg-white text-brand-700 text-lg font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              Start Free Trial — It&apos;s Free for 14 Days →
            </Link>
            <a
              href="#"
              className="border-2 border-white/50 hover:border-white text-white text-lg font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Book a Demo
            </a>
          </div>
          <p className="text-brand-200 text-sm">
            No contracts. No tech skills needed. Cancel anytime.<br />
            Join hundreds of agents who never miss a lead.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg mb-1">
                RealtyVoice <span className="text-brand-500">AI</span>
              </p>
              <p className="text-sm">The AI Receptionist Built for Real Estate Agents</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 RealtyVoice AI. All rights reserved.</p>
            <p className="mt-1 text-xs text-gray-600">
              RealtyVoice AI is an AI-powered receptionist service. Results may vary by market and usage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
