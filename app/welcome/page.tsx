import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-brand-900 text-white flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Welcome to All The Calls!
        </h1>
        <p className="text-brand-100 text-lg mb-4">
          Your 14-day free trial has started. We&apos;ll have your AI
          receptionist configured and ready within 24 hours.
        </p>
        <p className="text-brand-200 text-sm mb-8">
          Check your email for next steps — we&apos;ll need your name,
          brokerage, and the phone number you want to forward.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Go to Dashboard
          </Link>
          <a
            href="mailto:hello@allthecalls.com"
            className="border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
