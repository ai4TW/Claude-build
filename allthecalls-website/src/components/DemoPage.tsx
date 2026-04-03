import { Link, useNavigate } from "react-router-dom";

export default function DemoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100">
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-white text-lg">All The Calls</Link>
          <button onClick={() => navigate("/checkout?plan=pro")} className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Hear your AI receptionist in action
          </h1>
          <p className="text-slate-400 text-lg">
            Real calls. Real estate scenarios. Real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Buyer Inquiry Call", desc: "Prospect calls about a listing they saw on Zillow at 10 PM.", duration: "2:34" },
            { title: "Seller Lead Call", desc: "Homeowner thinking about listing their property in 6 months.", duration: "3:12" },
            { title: "After-Hours Urgent Call", desc: "Buyer wants to make an offer before the deadline tomorrow.", duration: "1:58" },
            { title: "Open House Follow-Up", desc: "Visitor from Saturday's open house calling Monday morning.", duration: "2:47" },
          ].map((demo) => (
            <div key={demo.title} className="card-dark rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{demo.title}</h3>
                  <p className="text-slate-500 text-xs">{demo.desc}</p>
                </div>
                <span className="text-slate-600 text-xs font-mono bg-dark-600 px-2 py-1 rounded">{demo.duration}</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="flex items-center gap-2 bg-brand-600/10 hover:bg-brand-600/20 border border-brand-500/20 text-brand-400 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play Demo
                </button>
                <span className="text-slate-600 text-xs">Coming soon — recordings in progress</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center card-dark rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to try it yourself?</h2>
          <p className="text-slate-400 mb-6">Start your 14-day free trial. Be live in 5 minutes.</p>
          <button
            onClick={() => navigate("/checkout?plan=pro")}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Start Free Trial →
          </button>
        </div>
      </div>
    </div>
  );
}
