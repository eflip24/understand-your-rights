import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = resolve(import.meta.dirname, "..");
const { REGION_INTROS } = await import(resolve(ROOT, "src/data/eu/regionIntros.ts"));
const { euRegions } = await import(resolve(ROOT, "src/data/eu/regions.ts"));
const out = [];
for (const r of euRegions) {
  const intro = REGION_INTROS[r.country]?.[r.canonical];
  if (!intro?.en) continue;
  out.push({ country: r.country, canonical: r.canonical, source: intro.en, names: r.name });
}
writeFileSync(resolve(ROOT, "supabase/functions/translate-region-intros/sources.json"), JSON.stringify(out, null, 2));
console.log("wrote", out.length, "regions");
