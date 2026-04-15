"use client";

import { useEffect, useRef } from "react";
import { trackPurchase } from "@/lib/meta";

/**
 * Fires a Meta Pixel `Purchase` event once per session on mount.
 * Guards against double-fire from React strict mode / HMR by
 * stamping sessionStorage with the order id (or plan fallback).
 */
export default function TrackPurchase({
  plan,
  orderId,
}: {
  plan?: "starter" | "pro" | "agency";
  orderId?: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const key = `atc_purchase_fired_${orderId || plan || "unknown"}`;
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* ignore */
    }
    trackPurchase({ plan, orderId });
    fired.current = true;
  }, [plan, orderId]);

  return null;
}
