/**
 * generate-demo-call.mjs
 *
 * Generates a fully synthetic AI demo call using ElevenLabs.
 * Two voices: Gia (AI receptionist) + Caller (real estate agent)
 * Stitches audio with pauses, applies phone call filter via ffmpeg.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=your_key node scripts/generate-demo-call.mjs
 *
 * Output:
 *   /tmp/demo-call-final.mp3
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set ELEVENLABS_API_KEY environment variable");
  process.exit(1);
}

// ElevenLabs voice IDs
const VOICES = {
  gia: "cgSgspJ2msm6clMCkdW9",       // Jessica — Playful, Bright, Warm
  caller: "pNInz6obpgDQGcFmaJgB",    // Adam — deep, professional male
};

const VOICE_SETTINGS = {
  gia:    { stability: 0.5, similarity_boost: 0.85, style: 0.3, use_speaker_boost: true },
  caller: { stability: 0.6, similarity_boost: 0.80, style: 0.2, use_speaker_boost: true },
};

// The conversation — {speaker, text, pause} where pause = ms after line
const SCRIPT = [
  {
    speaker: "gia",
    text: "Thanks for calling — I'm Gia, Brayden's AI receptionist. What can I help you with?",
    pause: 700,
  },
  {
    speaker: "caller",
    text: "Hey — I'm a real estate agent. I miss calls all the time when I'm showing homes. Can this fix that?",
    pause: 600,
  },
  {
    speaker: "gia",
    text: "That's exactly what this is built for. The AI answers in your name twenty-four seven — qualifies the caller and follows up by text automatically. Brayden can show you how it works in fifteen minutes. Do you have time this week?",
    pause: 700,
  },
  {
    speaker: "caller",
    text: "What does it cost?",
    pause: 500,
  },
  {
    speaker: "gia",
    text: "Plans start at three forty-nine a month, no contract. Want me to grab you a time with Brayden?",
    pause: 600,
  },
  {
    speaker: "caller",
    text: "Yeah, let's do it.",
    pause: 500,
  },
  {
    speaker: "gia",
    text: "Perfect. I'll text you his booking link now — is this number good to text?",
    pause: 500,
  },
  {
    speaker: "caller",
    text: "Yes.",
    pause: 400,
  },
  {
    speaker: "gia",
    text: "Sent. Brayden's looking forward to it — have a great day!",
    pause: 0,
  },
];

const TMP_DIR = "/tmp/demo-call-parts";
const OUTPUT = "/tmp/demo-call-final.mp3";

async function generateLine(text, speaker, index) {
  const voiceId = VOICES[speaker];
  const filePath = path.join(TMP_DIR, `${String(index).padStart(2, "0")}-${speaker}.mp3`);

  console.log(`  [${index + 1}/${SCRIPT.length}] ${speaker.toUpperCase()}: "${text.slice(0, 50)}..."`);

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: VOICE_SETTINGS[speaker],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs error (${res.status}): ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

function generateSilence(ms, index) {
  const filePath = path.join(TMP_DIR, `${String(index).padStart(2, "0")}-silence.mp3`);
  execSync(`ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t ${ms / 1000} -q:a 9 -acodec libmp3lame "${filePath}" -y -loglevel quiet`);
  return filePath;
}

function applyPhoneFilter(inputFile, outputFile) {
  // Bandpass filter simulating phone call audio (300Hz - 3400Hz)
  // Add slight compression and distortion for realism
  execSync(
    `ffmpeg -i "${inputFile}" \
    -af "highpass=f=300, lowpass=f=3400, acompressor=threshold=-12dB:ratio=4:attack=5:release=50, volume=1.5" \
    "${outputFile}" -y -loglevel quiet`
  );
}

async function main() {
  console.log("\n🎙  AllTheCalls Demo Call Generator");
  console.log("=====================================\n");

  // Check ffmpeg
  try {
    execSync("which ffmpeg", { stdio: "ignore" });
  } catch {
    console.error("ERROR: ffmpeg not found. Install with: brew install ffmpeg");
    process.exit(1);
  }

  // Setup temp dir
  if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  console.log("Step 1/3 — Generating voice lines via ElevenLabs...\n");

  const allFiles = [];

  for (let i = 0; i < SCRIPT.length; i++) {
    const { speaker, text, pause } = SCRIPT[i];
    const lineFile = await generateLine(text, speaker, i);
    allFiles.push(lineFile);

    // Add pause after each line
    if (pause > 0) {
      const silenceFile = generateSilence(pause, i);
      allFiles.push(silenceFile);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\nStep 2/3 — Stitching audio...\n");

  // Create ffmpeg concat file
  const concatFile = path.join(TMP_DIR, "concat.txt");
  const concatContent = allFiles.map((f) => `file '${f}'`).join("\n");
  fs.writeFileSync(concatFile, concatContent);

  const rawStitched = path.join(TMP_DIR, "stitched-raw.mp3");
  execSync(`ffmpeg -f concat -safe 0 -i "${concatFile}" -c copy "${rawStitched}" -y -loglevel quiet`);

  console.log("Step 3/3 — Applying phone call audio filter...\n");

  applyPhoneFilter(rawStitched, OUTPUT);

  console.log(`✅ Done!\n`);
  console.log(`Output: ${OUTPUT}`);
  console.log(`\nOpen with: open "${OUTPUT}"`);
  console.log("\nPost this audio over a phone screen recording for social media.\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
