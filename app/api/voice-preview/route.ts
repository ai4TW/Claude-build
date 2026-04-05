/**
 * GET /api/voice-preview?voice=<elevenlabs_voice_id>
 * Generates a short TTS sample using ElevenLabs so clients can hear each voice before choosing.
 * Uses eleven_turbo_v2_5 model for fast response.
 */

import { NextRequest, NextResponse } from "next/server";

const SAMPLE_TEXT = "Hi there! Thanks for calling — I'm your AI assistant, and I'm here to help. What can I do for you today?";

export async function GET(req: NextRequest) {
  const voiceId = req.nextUrl.searchParams.get("voice") || "EXAVITQu4vr4xnSDxMaL"; // Default: Sarah

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ELEVENLABS_API_KEY not configured" }, { status: 500 });
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg",
    },
    body: JSON.stringify({
      text: SAMPLE_TEXT,
      model_id: "eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[voice-preview] ElevenLabs error:", err);
    return NextResponse.json({ error: `ElevenLabs TTS error: ${err.slice(0, 200)}` }, { status: 500 });
  }

  const audioBuffer = await res.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
