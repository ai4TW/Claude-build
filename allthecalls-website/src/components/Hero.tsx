import { useNavigate } from "react-router-dom";

function Waveform() {
  const heights = [20, 35, 55, 45, 70, 90, 75, 60, 85, 65, 50, 40, 30, 45, 60, 80, 70, 55, 40, 25];
  return (
    <div className="flex items-center gap-[3px] h-16">
      {heights.map((h, i) => (
        <div
          key={i}
          className="wave-bar w-1.5 rounded-full bg-gradient-to-t from-brand-600 to-brand-400"
          style={{
            height: `${h}%`,
            animationDelay: `${(i * 0.07).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orb */}
      <div className="hero-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Secondary glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
          AI Receptionist — Built for Real Estate
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          Never Miss a Lead
          <br />
          <span className="text-gradient">Again.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Your AI receptionist answers every call in your name, qualifies leads,
          books appointments, and sends SMS follow-ups — 24/7, even when you're showing homes.
        </p>

        {/* Waveform visualization */}
        <div className="flex justify-center mb-10 opacity-80">
          <div className="card-dark rounded-2xl px-8 py-4 inline-flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live Call
            </div>
            <Waveform />
            <div className="text-sm text-slate-400 text-left">
              <div className="text-white font-medium text-xs">AI Receptionist</div>
              <div className="text-xs text-slate-500">"Hi, this is Sarah with..."</div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/checkout?plan=pro")}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 w-full sm:w-auto"
          >
            Start 14-Day Free Trial
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 w-full sm:w-auto hover:bg-white/5"
          >
            See Live Demo →
          </button>
        </div>

        <p className="text-slate-500 text-sm mt-4">No credit card required · Cancel anytime</p>

        {/* Floating stats */}
        <div className="absolute -left-4 top-1/3 hidden lg:block animate-float">
          <div className="card-dark rounded-xl p-3 text-left shadow-xl">
            <div className="text-xs text-slate-400 mb-1">Lead Captured</div>
            <div className="text-sm font-bold text-white">John Smith · 3:47 AM</div>
            <div className="text-xs text-green-400 mt-1">✓ Appointment booked</div>
          </div>
        </div>

        <div className="absolute -right-4 bottom-1/3 hidden lg:block animate-float" style={{ animationDelay: "3s" }}>
          <div className="card-dark rounded-xl p-3 text-left shadow-xl">
            <div className="text-xs text-slate-400 mb-1">Calls Answered Today</div>
            <div className="text-2xl font-extrabold text-gradient">47</div>
            <div className="text-xs text-slate-400">100% answer rate</div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
}
