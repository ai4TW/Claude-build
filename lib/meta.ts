/**
 * Client-side helpers for firing Meta Pixel standard events.
 *
 * Safe to call from "use client" components without checking for the env var —
 * if `fbq` isn't loaded (e.g. pixel disabled, or local dev) calls become no-ops.
 */

type FbqFn = (
  command: "track" | "trackCustom",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

function fbq(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    window.fbq("track", event, params);
  } catch {
    /* ignore */
  }
}

/** Fire when a visitor submits the VSL lead form on /pricing. */
export function trackLead(params?: {
  email?: string;
  businessType?: string;
  value?: number;
}) {
  fbq("Lead", {
    content_name: "Pricing VSL Gate",
    content_category: params?.businessType,
    currency: "USD",
    value: params?.value ?? 0,
  });
}

/** Fire when the VSL video actually starts playing. */
export function trackVideoView() {
  fbq("ViewContent", {
    content_name: "Pricing VSL",
    content_category: "video",
    content_type: "video",
  });
}

/** Fire when someone lands on the Stripe embedded checkout page. */
export function trackInitiateCheckout(params?: {
  plan?: "starter" | "pro" | "agency";
  value?: number;
}) {
  const planPrice = params?.value ?? planToPrice(params?.plan);
  fbq("InitiateCheckout", {
    content_name: params?.plan ? `Plan: ${params.plan}` : "Plan Select",
    content_category: "subscription",
    currency: "USD",
    value: planPrice,
  });
}

/** Fire on successful checkout completion (e.g. /welcome after Stripe redirect). */
export function trackPurchase(params: {
  plan?: "starter" | "pro" | "agency";
  value?: number;
  orderId?: string;
}) {
  const planPrice = params.value ?? planToPrice(params.plan);
  fbq("Purchase", {
    content_name: params.plan ? `Plan: ${params.plan}` : "Subscription",
    content_category: "subscription",
    currency: "USD",
    value: planPrice,
    ...(params.orderId ? { order_id: params.orderId } : {}),
  });
}

/** Fire when someone clicks to call the demo line or book via Calendly. */
export function trackContact(method: "call" | "book") {
  fbq("Contact", { method });
}

function planToPrice(plan: string | undefined): number {
  if (plan === "starter") return 199;
  if (plan === "pro") return 349;
  if (plan === "agency") return 599;
  return 0;
}
