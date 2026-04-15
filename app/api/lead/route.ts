import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const firstName = String(body.firstName || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const businessType = String(body.businessType || "").trim().slice(0, 80);
  const source = String(body.source || "pricing-vsl").trim().slice(0, 80);

  if (!email || !email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const supa = getSupabase();
    const { error } = await supa.from("video_leads").insert({
      first_name: firstName || null,
      email,
      phone: phone || null,
      business_type: businessType || null,
      source,
      user_agent: userAgent.slice(0, 400),
      referrer: referrer.slice(0, 400),
      ip,
    });
    if (error) {
      console.error("[lead] insert failed:", error.message);
      // Don't block the user — still let them watch. The lead is the upside.
    }
  } catch (e) {
    console.error("[lead] supabase error:", (e as Error).message);
  }

  return NextResponse.json({ ok: true });
}
