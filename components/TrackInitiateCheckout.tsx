"use client";

import { useEffect } from "react";
import { trackInitiateCheckout } from "@/lib/meta";

export default function TrackInitiateCheckout({
  plan,
}: {
  plan: "starter" | "pro" | "agency";
}) {
  useEffect(() => {
    trackInitiateCheckout({ plan });
  }, [plan]);
  return null;
}
