/**
 * GET /api/voice-preview?voice=arcana_celeste
 * Generates a short TTS sample using Rime AI so clients can hear each voice before choosing.
 * Requires RIME_API_KEY in Vercel env.
 */

import { NextRequest, NextResponse } from "next/server";

const SAMPLE_TEXT = "Hi there! Thanks for calling — I'm your AI assistant, and I'm here to help. What can I do for you today?";

export async function GET(req: NextRequest) {
  const voiceId = req.nextUrl.searchParams.get("voice") || "arcana_celeste";

  const rimeKey = process.env.RIME_API_KEY;
  if (!rimeKey) {
    return NextResponse.json({ error: "RIME_API_KEY not configured" }, { status: 500 });
  }

  // mistv3_astra → modelId: "mistv3", speaker: "astra"
  const [modelId, speaker] = voiceId.includes("_")
    ? [voiceId.split("_")[0], voiceId.split("_").slice(1).join("_")]
    : ["mistv3", voiceId];

  const rimeRes = await fetch("https://users.rime.ai/v1/rime-tts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${rimeKey}`,
      "Content-Type": "application/json",
      "Accept": "audio/mp3",
    },
    body: JSON.stringify({
      speaker,
      text: SAMPLE_TEXT,
      modelId,
      samplingRate: 22050,
      speedAlpha: 1.0,
      reduceLatency: false,
    }),
  });

  if (!rimeRes.ok) {
    const err = await rimeRes.text();
    console.error("[voice-preview] Rime error:", err);
    return NextResponse.json({ error: `Rime TTS error: ${err.slice(0, 200)}` }, { status: 500 });
  }

  const audioBuffer = await rimeRes.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
