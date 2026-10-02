/**
 * Writes state-specific depth blocks for proven-demand state guide pages
 * (src/data/provenDemandUrls.ts) into src/data/stateDepth/<pillar>.json.
 * Idempotent: skips keys already present (generated or hand-written).
 * Records without official sources are rejected.
 *
 * Usage: node scripts/generate-state-depth.mjs [limit] [concurrency]
 */
import fs from "node:fs";
import path from "node:path";
import { astraJson } from "./_aiAstra.mjs";

const limit = Number(process.argv[2] || 9999);
const conc = Number(process.argv[3] || 6);
const DIR = path.resolve("src/data/stateDepth");
fs.mkdirSync(DIR, { recursive: true });

const src = fs.readFileSync("src/data/provenDemandUrls.ts", "utf8");
const hand = fs.readFileSync("src/data/nearMissDepth.ts", "utf8");
let paths = [...src.matchAll(/"(\/[a-z-]+-law\/[^"]+)"/g)].map((m) => m[1]);
const order = fs.existsSync("/tmp/aug_impr.json") ? JSON.parse(fs.readFileSync("/tmp/aug_impr.json", "utf8")) : {};
paths.sort((a, b) => (order[b] || 0) - (order[a] || 0));

const files = {};
const load = (p) => (files[p] ??= fs.existsSync(path.join(DIR, `${p}.json`)) ? JSON.parse(fs.readFileSync(path.join(DIR, `${p}.json`), "utf8")) : {});
const save = (p) => fs.writeFileSync(path.join(DIR, `${p}.json`), JSON.stringify(files[p], null, 1));

const todo = paths.filter((p) => {
  const key = p.slice(1);
  const pillar = key.split("/")[0];
  return !hand.includes(`"${key}"`) && !load(pillar)[key];
}).slice(0, limit);
console.log(`${todo.length} pages to write`);

const SYSTEM = `You are a US legal researcher writing jurisdiction-specific detail for LegallySpoken.com state guides.
Write ONLY facts you are confident are correct for the named state as of 2026: statute names and section numbers, deadlines, dollar limits, penalty ranges, courts and agencies. If unsure of a figure, omit it — never guess. Plain English. No advice to the reader beyond "talk to a lawyer".
Output STRICT JSON:
{"summary": "2-3 sentence direct answer for this state (60-90 words)",
 "sections": [
   {"heading": "...", "facts": [{"label":"...","value":"... — citation"}]},
   {"heading": "...", "table": {"columns": ["..."], "rows": [["..."]]}},
   {"heading": "Where to file or complain in <State>", "bullets": ["..."]},
   {"heading": "Common questions in <State>", "bullets": ["Question? Answer."]}
 ],
 "sources": [{"label": "official source name", "url": "https://official .gov or state legislature/court URL"}]}
Requirements: 4-5 sections, at least one table with 4+ rows, 3-5 Q&A bullets, 2-4 sources from official government, legislature or court websites. Total 450-700 words.`;

let done = 0, failed = 0;
async function work(p) {
  const [pillar, state, slug] = p.slice(1).split("/");
  const stateName = state.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  const topic = slug.replace(/-/g, " ");
  try {
    const j = await astraJson({ system: SYSTEM, user: `State: ${stateName}\nTopic: ${topic} (${pillar.replace(/-/g, " ")})\nWrite the depth block.` });
    const ok = j?.summary && Array.isArray(j.sections) && j.sections.length >= 3 &&
      Array.isArray(j.sources) && j.sources.filter((s) => /^https:\/\//.test(s?.url || "")).length >= 1;
    if (!ok) throw new Error("rejected: missing sections or sources");
    j.sources = j.sources.filter((s) => /^https:\/\//.test(s.url));
    j.reviewed = "2026-10";
    load(pillar)[`${pillar}/${state}/${slug}`] = j;
    save(pillar);
    done++;
    console.log(`✓ ${p}`);
  } catch (e) {
    failed++;
    console.log(`! ${p} ${String(e.message).slice(0, 120)}`);
  }
}

const queue = [...todo];
await Promise.all(Array.from({ length: conc }, async () => { while (queue.length) await work(queue.shift()); }));
console.log(`\nDone: ${done} written, ${failed} failed.`);
