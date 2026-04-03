import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-extrabold text-white mb-4">
          You're in! Welcome to All The Calls.
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          Your 14-day free trial has started. Check your email for setup instructions
          — you'll be live in under 5 minutes.
        </p>
        <div className="card-dark rounded-2xl p-6 text-left space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-brand-400">✓</span>
            <span className="text-slate-300">Check your email for your onboarding link</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-brand-400">✓</span>
            <span className="text-slate-300">Forward your number to your new AI line</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-brand-400">✓</span>
            <span className="text-slate-300">Customize your AI's intro and script</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-brand-400">✓</span>
            <span className="text-slate-300">Connect your calendar (optional but recommended)</span>
          </div>
        </div>
        <Link
          to="/"
          className="inline-block text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
