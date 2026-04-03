import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark-800/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-white">All The Calls</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("how-it-works")} className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</button>
            <button onClick={() => scrollTo("features")} className="text-sm text-slate-400 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo("pricing")} className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</button>
            <Link to="/demo" className="text-sm text-slate-400 hover:text-white transition-colors">Demo</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/demo" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5">
              See Demo
            </Link>
            <button
              onClick={() => navigate("/checkout?plan=pro")}
              className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 mt-1 pt-4 space-y-2">
            <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left px-2 py-2 text-slate-400 hover:text-white">How It Works</button>
            <button onClick={() => scrollTo("features")} className="block w-full text-left px-2 py-2 text-slate-400 hover:text-white">Features</button>
            <button onClick={() => scrollTo("pricing")} className="block w-full text-left px-2 py-2 text-slate-400 hover:text-white">Pricing</button>
            <Link to="/demo" onClick={() => setMenuOpen(false)} className="block px-2 py-2 text-slate-400 hover:text-white">Demo</Link>
            <button onClick={() => { setMenuOpen(false); navigate("/checkout?plan=pro"); }} className="block w-full text-center bg-brand-600 text-white font-semibold py-2 rounded-lg mt-2">
              Start Free Trial
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
