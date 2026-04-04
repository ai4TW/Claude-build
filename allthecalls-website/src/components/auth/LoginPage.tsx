import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    navigate(from, { replace: true });
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4">
      {/* Background orb */}
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
        <div className="card-dark rounded-2xl p-8">
          {!showReset ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
              <p className="text-slate-500 text-sm mb-8">Sign in to your dashboard</p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
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
                    type="password" required value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-2"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <button onClick={() => setShowReset(true)} className="w-full text-center text-slate-500 hover:text-slate-400 text-xs mt-4 transition-colors">
                Forgot password?
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-1">Reset password</h1>
              <p className="text-slate-500 text-sm mb-8">We'll send a reset link to your email</p>

              {resetSent ? (
                <div className="text-center">
                  <div className="text-3xl mb-3">📬</div>
                  <p className="text-white font-semibold mb-2">Check your inbox</p>
                  <p className="text-slate-400 text-sm mb-6">Reset link sent to {email}</p>
                  <button onClick={() => { setShowReset(false); setResetSent(false); }} className="text-brand-400 text-sm hover:underline">
                    Back to login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                  <button type="submit" disabled={loading} className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                  <button type="button" onClick={() => setShowReset(false)} className="w-full text-slate-500 text-sm hover:text-slate-400 transition-colors">
                    Back to login
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-400 hover:underline">Start free trial →</Link>
        </p>
      </div>
    </div>
  );
}
