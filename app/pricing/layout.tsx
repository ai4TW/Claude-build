import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls.ai",
  description:
    "AI receptionist plans for realtors, real estate investors, and tradespeople. 14-day money-back guarantee.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
