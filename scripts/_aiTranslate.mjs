/**
 * Shared AI translation helper used by the B8 country-pillar translator and
 * the B9.5 region-intros translator.
 *
 * Calls Lovable AI Gateway (gemini-2.5-flash) first; falls back to Google AI
 * Studio's free Gemini tier on 402/429. Both providers return JSON via
 * response_format / responseMimeType. Includes exponential backoff for
 * 429/500/503 from Gemini.
 */

const LOVABLE_KEY = process.env.LOVABLE_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export function hasAnyKey() {
  return !!(LOVABLE_KEY || GEMINI_KEY);
}

/**
 * @param {{ system: string, user: string, provider?: "lovable"|"gemini",
 *           model?: string, temperature?: number }} opts
 * @returns {Promise<any>} parsed JSON
 */
export async function callAiJson(opts) {
  const {
    system,
    user,
    provider,
    model = "google/gemini-2.5-flash",
    temperature = 0.2,
  } = opts;

  const wantLovable = provider !== "gemini" && !!LOVABLE_KEY;
  const wantGemini = provider !== "lovable" && !!GEMINI_KEY;

  let lastErr;
  if (wantLovable) {
    try {
      return await callLovable({ system, user, model, temperature });
    } catch (err) {
      lastErr = err;
      const msg = String(err.message || err);
      const fallbackable = msg.includes("402") || msg.includes("429");
      if (!fallbackable || !wantGemini) throw err;
      console.log(`  ↪ Lovable AI ${msg.match(/\d{3}/)?.[0] ?? "error"} — falling back to Gemini`);
    }
  }
  if (wantGemini) {
    return await callGemini({ system, user, temperature });
  }
  throw lastErr ?? new Error("No AI provider key available (LOVABLE_API_KEY or GEMINI_API_KEY)");
}

async function callLovable({ system, user, model, temperature }) {
  const body = {
    model,
    temperature,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": LOVABLE_KEY,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gateway ${res.status}: ${text.slice(0, 400)}`);
  }
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("Lovable: empty content");
  return JSON.parse(content);
}

async function callGemini({ system, user, temperature }) {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: { temperature, responseMimeType: "application/json" },
  };
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Gemini: empty content " + JSON.stringify(json).slice(0, 300));
      return JSON.parse(content);
    }
    const text = await res.text();
    const retryable = res.status === 429 || res.status === 503 || res.status === 500;
    if (!retryable || attempt === maxAttempts) {
      throw new Error(`Gemini ${res.status}: ${text.slice(0, 400)}`);
    }
    const wait = Math.min(30, 4 * attempt) * 1000;
    console.log(`  ↪ Gemini ${res.status} — retry ${attempt}/${maxAttempts - 1} in ${wait / 1000}s`);
    await new Promise((r) => setTimeout(r, wait));
  }
  throw new Error("Gemini: exhausted retries");
}
