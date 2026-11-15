/**
 * Hero background atmosphere — adapted from a Refero style reference
 * (Solana.com's "Liquid light stage" build recipe: a full-width black
 * layer, blurred light ellipses concentrated in the lower third, a
 * faint repeating horizontal line texture, and a rising multi-crest
 * SVG ribbon with a dark core and colored highlight strokes).
 *
 * Deliberately NOT the source's own violet/mint palette or any WebGL —
 * same cyan/purple "Midnight Intelligence" tokens already used
 * everywhere else on this site, built with plain CSS + one SVG path so
 * it carries zero new dependencies (this site has a real history of a
 * 3D-library crash in production; this stays dependency-free on purpose).
 */
export default function LiquidLightStage() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint repeating horizontal line texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* blurred light pooled in the lower portion */}
      <div
        className="atc-liquid-drift absolute left-[8%] bottom-[-6%] h-[70px] w-[620px] rounded-full opacity-[0.55] blur-[48px]"
        style={{ background: "rgba(76,215,246,0.55)" }}
      />
      <div
        className="atc-liquid-drift absolute right-[4%] bottom-[2%] h-[50px] w-[460px] rounded-full opacity-[0.4] blur-[40px]"
        style={{ background: "rgba(210,187,255,0.5)", animationDelay: "-5s" }}
      />
      <div
        className="absolute left-[32%] bottom-[-10%] h-[40px] w-[380px] rounded-full opacity-30 blur-[32px]"
        style={{ background: "rgba(76,215,246,0.35)" }}
      />

      {/* rising multi-crest ribbon */}
      <svg
        className="absolute bottom-0 left-0 h-[55%] w-full"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -50 380 C 150 380, 200 180, 380 200 C 560 220, 600 80, 820 60 C 940 48, 980 70, 1050 40"
          stroke="rgba(8,9,15,0.9)"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M -50 374 C 150 374, 200 174, 380 194 C 560 214, 600 74, 820 54 C 940 42, 980 64, 1050 34"
          stroke="rgba(76,215,246,0.45)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M -50 388 C 150 388, 200 188, 380 208 C 560 228, 600 88, 820 68 C 940 56, 980 78, 1050 48"
          stroke="rgba(210,187,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <style>{`
        @keyframes atc-liquid-drift {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.04); }
        }
        .atc-liquid-drift { animation: atc-liquid-drift 10s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .atc-liquid-drift { animation: none; }
        }
      `}</style>
    </div>
  );
}
