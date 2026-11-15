/**
 * "Midnight Intelligence" wordmark — Brayden's original AllTheCalls brand
 * (commit c9cb330, April 2026): cyan #4cd7f6 → light-purple #d2bbff gradient,
 * Space Grotesk. Used only by the dark brand A/B variant (see
 * components/dark-sections.tsx) — Variant A keeps the flat signal-red mark
 * in components/logo.tsx, untouched.
 */
export function LogoDark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none" aria-hidden className="shrink-0">
        <defs>
          <linearGradient id="atc-dark-logo-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4cd7f6" />
            <stop offset="100%" stopColor="#d2bbff" />
          </linearGradient>
        </defs>
        <rect x="44" y="38" width="12" height="42" rx="6" fill="url(#atc-dark-logo-grad)" />
        <path
          d="M25 30H70C75.5228 30 80 34.4772 80 40V45C80 48.3137 77.3137 51 74 51H70C66.6863 51 64 48.3137 64 45V42H25C21.6863 42 19 39.3137 19 36V36C19 32.6863 21.6863 30 25 30Z"
          fill="url(#atc-dark-logo-grad)"
        />
        <rect x="32" y="55" width="6" height="15" rx="3" fill="url(#atc-dark-logo-grad)" />
        <rect x="22" y="60" width="6" height="8" rx="3" fill="url(#atc-dark-logo-grad)" />
        <rect x="62" y="52" width="6" height="22" rx="3" fill="url(#atc-dark-logo-grad)" />
        <rect x="72" y="58" width="6" height="12" rx="3" fill="url(#atc-dark-logo-grad)" />
        <rect x="82" y="62" width="6" height="6" rx="3" fill="url(#atc-dark-logo-grad)" />
      </svg>
      <span
        className="text-[18px] font-bold tracking-[-0.01em] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        allthecalls.ai
      </span>
    </span>
  );
}

export default LogoDark;
