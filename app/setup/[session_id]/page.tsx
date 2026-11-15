import type { Metadata } from "next";
import SetupWizard from "@/components/SetupWizard";

export const metadata: Metadata = {
  title: "Set up your account — AllTheCalls",
  robots: { index: false },
};

export default async function SetupPage({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) {
  const { session_id } = await params;

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="wrap max-w-lg">
        <SetupWizard sessionId={session_id} />
      </div>
    </main>
  );
}
