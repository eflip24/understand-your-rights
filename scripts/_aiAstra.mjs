/**
 * Minimal Lovable AI Gateway JSON helper for content scripts.
 * Uses the default chat model (openai/gpt-6-astra), which requires a reasoning
 * effort and rejects temperature/max_tokens. Output size is controlled in the
 * prompt, not by parameters.
 */
const KEY = process.env.LOVABLE_API_KEY;

export async function astraJson({ system, user, effort = "low", attempts = 4 }) {
  if (!KEY) throw new Error("LOVABLE_API_KEY missing");
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": KEY,
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          reasoning_effort: effort,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        const retryable = res.status === 429 || res.status >= 500;
        const err = new Error(`Gateway ${res.status}: ${text.slice(0, 300)}`);
        if (!retryable || i === attempts) throw err;
        const wait = Number(res.headers.get("retry-after")) || 5 * i;
        console.log(`  ↪ ${res.status} — retrying in ${wait}s`);
        await new Promise((r) => setTimeout(r, wait * 1000));
        continue;
      }
      const json = await res.json();
      const content = json.choices?.[0]?.message?.content;
      if (!content) throw new Error("empty content");
      return JSON.parse(content);
    } catch (e) {
      lastErr = e;
      if (i === attempts) throw e;
      console.log(`  ↪ attempt ${i} failed: ${String(e.message).slice(0, 140)}`);
      await new Promise((r) => setTimeout(r, 4000 * i));
    }
  }
  throw lastErr;
}
