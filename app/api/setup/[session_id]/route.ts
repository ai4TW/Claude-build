import { NextRequest, NextResponse } from "next/server";
import { verifySession, submitIntake, getJobBySession, type BusinessFacts } from "@/lib/provisioning";

/** GET: verify the session actually paid before the wizard shows any form. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ session_id: string }> }
) {
  const { session_id } = await params;

  try {
    const verified = await verifySession(session_id);
    if (!verified) {
      return NextResponse.json({ error: "This link isn't valid, or the payment hasn't completed yet." }, { status: 402 });
    }

    const existingJob = await getJobBySession(session_id);

    return NextResponse.json({
      tier: verified.tier,
      vertical: verified.vertical,
      ownerEmail: verified.ownerEmail,
      alreadySubmitted: !!existingJob,
    });
  } catch (err) {
    console.error("GET /api/setup/[session_id] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong verifying your session." }, { status: 500 });
  }
}

/** POST: accept the intake form and create the (idempotent) provisioning job. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ session_id: string }> }
) {
  const { session_id } = await params;

  try {
    const verified = await verifySession(session_id);
    if (!verified) {
      return NextResponse.json({ error: "This link isn't valid, or the payment hasn't completed yet." }, { status: 402 });
    }

    let body: Partial<BusinessFacts>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const businessName = body.businessName?.trim();
    const phone = body.phone?.trim();
    const serviceArea = Array.isArray(body.serviceArea) ? body.serviceArea.filter(Boolean) : [];
    const services = Array.isArray(body.services) ? body.services.filter(Boolean) : [];

    if (!businessName || !phone || serviceArea.length === 0 || services.length === 0) {
      return NextResponse.json(
        { error: "Business name, phone, at least one service area city, and at least one service are required." },
        { status: 400 }
      );
    }

    const job = await submitIntake(verified, { businessName, phone, serviceArea, services });

    return NextResponse.json({ status: job.status, jobId: job.id });
  } catch (err) {
    console.error("POST /api/setup/[session_id] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong saving your setup." }, { status: 500 });
  }
}
