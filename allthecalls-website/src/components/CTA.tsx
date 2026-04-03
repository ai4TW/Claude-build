import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative rounded-3xl overflow-hidden card-dark p-12 glow-blue">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-violet-600/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-5xl mb-6">📞</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to answer every call?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Start your free 14-day trial today. No credit card required.
              Be live in 5 minutes or less.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/checkout?plan=pro")}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 w-full sm:w-auto"
              >
                Start Free Trial — No Card Needed
              </button>
              <button
                onClick={() => navigate("/demo")}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Hear a demo call first →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
