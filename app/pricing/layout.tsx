import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls for Investors",
  description:
    "$497/mo. One plan for real estate investors. 24/7 inbound answering, <30s outbound on every new lead, CRM auto-sync, DFY setup. 14-day money-back guarantee.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
