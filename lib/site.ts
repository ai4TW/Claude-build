/**
 * AllTheCalls — single source of truth for anything that shows up on more
 * than one page: name, phone, email, pricing, and the industries we serve.
 *
 * AllTheCalls sells to ANY local business that can't afford to miss a call —
 * real estate is one vertical among several, not the primary audience.
 * Drainiacs Plumbing (Wichita) is the first real paying client (2026-11).
 */

export const SITE = {
  name: "AllTheCalls",
  url: "https://allthecalls.ai",
  phone: {
    display: process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777",
    href: process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777",
  },
  email: "hello@allthecalls.ai",
} as const;

export const PRICE = {
  setup: "$1,997",
  monthly: "$497/mo",
} as const;

export interface Industry {
  slug: string;
  name: string;
  navLabel: string;
  oneLiner: string;
}

/** Order matters: no vertical is "first" in a way that reads as the primary audience. */
export const INDUSTRIES: Industry[] = [
  { slug: "home-services", name: "Home Services & Trades", navLabel: "Home Services & Trades", oneLiner: "Plumbing, HVAC, electrical, roofing" },
  { slug: "personal-care", name: "Personal Care", navLabel: "Personal Care", oneLiner: "Barbershops, salons, spas" },
  { slug: "auto-repair", name: "Auto Repair", navLabel: "Auto Repair", oneLiner: "Shops, mobile mechanics, detailing" },
  { slug: "real-estate", name: "Real Estate", navLabel: "Real Estate", oneLiner: "Agents, investors, lenders, title, property managers" },
];
