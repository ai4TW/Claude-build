import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ClientDashboard from "./ClientDashboard";

export const metadata = { title: "My Dashboard | AllTheCalls.ai" };

export default async function MyPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <ClientDashboard clientName={session.clientName} email={session.email} />;
}
