#!/usr/bin/env node
/**
 * One-off: mirror the static i18n tools.json contents into public.tool_translations
 * so the cron worker starts with zero outstanding work.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fpdfibyywvlcqjrkuuhz.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY missing");
  process.exit(1);
}
const sb = createClient(SUPABASE_URL, KEY);

const LOCALES = ["es", "fr", "de", "pt", "it"];
const source = JSON.parse(readFileSync("/tmp/tools-source.json", "utf8"));
const toolIds = source.tools.map((t) => t.id);

for (const loc of LOCALES) {
  const data = JSON.parse(readFileSync(`src/i18n/locales/${loc}/tools.json`, "utf8"));
  const rows = [];

  // categories
  if (data._categories) {
    rows.push({
      tool_id: "__categories__", locale: loc, data: data._categories,
      updated_at: new Date().toISOString(),
    });
  }

  // tools
  for (const id of toolIds) {
    const e = data[id];
    if (!e) continue;
    const payload = {
      name: e.name, description: e.description, shortDescription: e.shortDescription,
      faqs: e.faqs ?? [],
    };
    if (!payload.name || !payload.description || !payload.shortDescription) continue;
    rows.push({ tool_id: id, locale: loc, data: payload, updated_at: new Date().toISOString() });
  }

  // chunk to avoid 6MB payload limits
  const chunkSize = 50;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await sb.from("tool_translations").upsert(chunk);
    if (error) { console.error(loc, "chunk error:", error.message); process.exit(1); }
  }
  console.log(`${loc}: seeded ${rows.length} rows`);
}

// Mark cron state done so the daily run is a no-op until tools.ts gains new entries.
await sb.from("translation_cron_state").update({
  next_country: "es", last_run_status: "done", last_filled_count: 0,
  last_run_at: new Date().toISOString(), updated_at: new Date().toISOString(),
}).eq("id", "tools");
console.log("cron state marked 'done'");
