import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, brokerage, plan } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "name and email required" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "DB unavailable" }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      name,
      email,
      phone: phone || null,
      brokerage: brokerage || null,
      plan: plan || null,
    });

    if (error) {
      console.error("leads insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("leads route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
