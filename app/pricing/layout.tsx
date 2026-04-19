import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls",
  description:
    "See what AllTheCalls costs. $497/mo for a 24/7 AI receptionist that answers every call in your business name — built for real estate pros and any business that can't afford to miss a call. 14-day money-back guarantee.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
