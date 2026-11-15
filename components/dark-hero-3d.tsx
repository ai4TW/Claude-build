"use client";

import { useRef } from "react";

/**
 * A real 3D element for the homepage hero — CSS perspective/rotateX/rotateY
 * driven by pointer position, not WebGL. Deliberately dependency-free:
 * a prior Three.js/React-Three-Fiber hero on this exact repo took
 * production down with a duplicate-React-instance crash, so this stays
 * on plain CSS 3D transforms + a vanilla pointermove listener — no new
 * npm package, nothing that can collide with the app's own React tree.
 *
 * Shows the actual product, not an abstract decoration: a tilted phone
 * mockup of the real missed-call -> AI text-back -> booked conversation.
 * Desktop/pointer:fine only (see the `hidden lg:block` wrapper in
 * app/page.tsx) — skipped on touch devices, where a mouse-tilt effect
 * has nothing to respond to and isn't worth the extra DOM/JS weight.
 */
export default function Hero3DPhone() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 22; // left/right tilt
    const rotateX = (0.5 - py) * 16; // up/down tilt

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    card.style.transform = "rotateX(6deg) rotateY(-10deg) translateZ(0)";
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: "1400px" }}
      className="pointer-events-none absolute -right-6 top-6 hidden h-[460px] w-[320px] lg:block xl:-right-10 xl:top-0"
      aria-hidden
    >
      <div
        ref={cardRef}
        className="atc-hero-float relative h-full w-full rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-4 shadow-[0_40px_90px_-30px_rgba(76,215,246,0.35)] backdrop-blur-sm transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: "rotateX(6deg) rotateY(-10deg) translateZ(0)", transformStyle: "preserve-3d" }}
      >
        <div className="flex h-full flex-col gap-2.5 overflow-hidden rounded-[20px] bg-[#0b0d16] p-4">
          <p className="text-[11px] font-semibold tracking-wide text-white/35">missed call · 2 sec ago</p>

          <div className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-[13px] text-white/90">
            Hey, this is Drainiacs Plumbing — sorry we missed your call! What&rsquo;s going on, and what&rsquo;s a
            good time to get a tech out?
          </div>

          <div className="self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-3.5 py-2.5 text-[13px] font-medium text-[#08090f]">
            Water heater&rsquo;s leaking, today if possible
          </div>

          <div className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-[13px] text-white/90">
            Got it — we have a 2:00 PM today. Want that slot?
          </div>

          <div className="self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-3.5 py-2.5 text-[13px] font-medium text-[#08090f]">
            Yes, 2pm works
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-xl border border-[#4cd7f6]/25 bg-[#4cd7f6]/10 px-3 py-2 text-[12px] font-semibold text-[#8be8fb]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4cd7f6]" />
            Booked · logged to CRM automatically
          </div>
        </div>
      </div>

      <style>{`
        @keyframes atc-hero-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -10px; }
        }
        .atc-hero-float {
          animation: atc-hero-float 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .atc-hero-float { animation: none; }
        }
      `}</style>
    </div>
  );
}
