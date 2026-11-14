"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// Loaded only on the client, in its own chunk — the three.js/R3F bundle
// never ships as part of the initial page load or server render.
const HeroScene = dynamic(() => import("./hero-3d-scene"), { ssr: false, loading: () => null });

/**
 * Hero background motif. A static gradient — no WebGL fetched at all — for
 * anyone with prefers-reduced-motion set. Purely decorative: pointer-events
 * are disabled so it never intercepts clicks on the hero's lead form.
 */
export default function Hero3D() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(176,56,35,0.08),transparent)]"
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <HeroScene />
    </div>
  );
}
