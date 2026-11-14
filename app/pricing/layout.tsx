import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls",
  description:
    "See what AllTheCalls costs: $1,997 setup + $497/mo for 24/7 AI call-answering with missed-call text-back, a done-for-you website, a branded CRM app, and local SEO — built for real estate pros and any business that can't afford to miss a call. 14-day money-back guarantee.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
