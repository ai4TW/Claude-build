import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "See All The Calls in action. Book a free 15-minute demo and watch your AI receptionist answer a live call in your name.",
  alternates: { canonical: "https://realty-receptionist.vercel.app/demo" },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-brand-900">All The Calls</Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Log in</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Book a Free 15-Min Demo
            </h1>
            <p className="text-xl text-gray-600">
              Watch your AI receptionist answer a live call in your name. No commitment. No credit card.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-gray-900">What happens on the demo call:</h2>
            <ul className="space-y-4 mb-8">
              {[
                "We configure a live AI receptionist with your name and brokerage",
                "We call your number and you hear it answer exactly as your clients would",
                "You see how lead qualification and SMS follow-up works in real time",
                "We set up your account on the spot — you leave the call fully live",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <DemoForm />
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Prefer to start now?{" "}
            <Link href="/#pricing" className="text-brand-600 font-semibold hover:underline">
              Start your free trial →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoForm() {
  return (
    <form
      action="mailto:hello@allthecalls.com"
      method="get"
      encType="text/plain"
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Sarah Johnson"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="brokerage" className="block text-sm font-medium text-gray-700 mb-1">
            Brokerage
          </label>
          <input
            id="brokerage"
            name="brokerage"
            type="text"
            placeholder="Compass, KW, RE/MAX..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(512) 555-0100"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-colors text-lg"
      >
        Request My Demo →
      </button>
      <p className="text-center text-gray-400 text-xs">
        We&apos;ll reach out within 1 business hour to schedule.
      </p>
    </form>
  );
}
