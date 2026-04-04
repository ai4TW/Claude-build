import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const PLANS: Record<string, string> = {
  starter: "Starter — $149/mo",
  pro: "Pro — $249/mo",
  team: "Team — $399/mo",
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan") || "pro";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");

    const { data, error: signupError } = await supabase.auth.signUp({ email, password });
    if (signupError) { setError(signupError.message); setLoading(false); return; }

    if (data.user) {
      // Create client row immediately
      await supabase.from("clients").insert({
        user_id: data.user.id,
        name,
        email,
        plan,
        onboarding_completed: false,
      });
    }

    navigate("/onboarding");
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <Link to="/" className="flex items-center gap-2 mb-10 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        </div>
        <span className="font-bold text-lg text-white">All The Calls</span>
      </Link>

      <div className="w-full max-w-sm relative z-10">
        {plan in PLANS && (
          <div className="bg-brand-600/10 border border-brand-500/20 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between">
            <span className="text-brand-400 text-xs font-semibold">{PLANS[plan]}</span>
            <span className="text-brand-300 text-xs bg-brand-600/20 px-2 py-0.5 rounded-full">14-day free trial</span>
          </div>
        )}

        <div className="card-dark rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">Your AI receptionist is 3 minutes away</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text" required value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Sarah Johnson"
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Work Email</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <input
                type="password" required value={password} minLength={8}
                onChange={e => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-2"
            >
              {loading ? "Creating account..." : "Create Account & Continue →"}
            </button>
          </form>

          <p className="text-slate-600 text-xs text-center mt-4">
            By signing up you agree to our{" "}
            <Link to="/terms" className="text-slate-500 hover:text-slate-400">Terms</Link>
            {" & "}
            <Link to="/privacy" className="text-slate-500 hover:text-slate-400">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-400 hover:underline">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
