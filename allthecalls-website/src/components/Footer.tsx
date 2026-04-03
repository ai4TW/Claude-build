import { Link } from "react-router-dom";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="font-bold text-white">All The Calls</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              The AI receptionist built for real estate agents who refuse to miss a lead.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo("features")} className="text-slate-500 hover:text-white text-xs transition-colors">Features</button></li>
              <li><button onClick={() => scrollTo("pricing")} className="text-slate-500 hover:text-white text-xs transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollTo("how-it-works")} className="text-slate-500 hover:text-white text-xs transition-colors">How It Works</button></li>
              <li><Link to="/demo" className="text-slate-500 hover:text-white text-xs transition-colors">Demo</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-slate-500 hover:text-white text-xs transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Get Started</h4>
            <Link
              to="/checkout?plan=pro"
              className="inline-block bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Start Free Trial →
            </Link>
            <p className="text-slate-600 text-xs mt-2">14 days free. No card required.</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} All The Calls. All rights reserved.</p>
          <p className="text-slate-700 text-xs">Secured by Stripe · 256-bit SSL</p>
        </div>
      </div>
    </footer>
  );
}
