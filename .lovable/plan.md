
# Phase A — Tools translation (ES/FR/DE/PT/IT) + cron continuation

Translate all ~100 tool definitions into the 5 non-English locales, with a credit-aware fallback that resumes via cron if free tier quota runs out mid-run.

---

## 1. Translation target

In `src/data/tools.ts`, the user-facing strings per `Tool` are:
- `name`, `shortDescription`, `description`
- `categoryLabel` (derived from `categories[].label`)
- `faqs[].question`, `faqs[].answer`

And in `categories[]`: `label`, `description`.

**Not translated:** `id`, `slug`, `category`, `icon`, `color`, `popular`, `relatedToolIds`, `faqs` array shape.

Roughly 100 tools × ~10 strings + 10 category strings ≈ **1,010 strings × 5 locales = ~5,050 leaves**.

---

## 2. Storage architecture — per-locale overlay JSON

New directory: `src/data/i18n/tools/`
- `tools.es.json`, `tools.fr.json`, `tools.de.json`, `tools.pt.json`, `tools.it.json`
- `categories.es.json`, ... `categories.it.json`

Each file is a flat dictionary keyed by `id`:
```json
{
  "contract-analyzer": {
    "name": "Analizador de contratos",
    "shortDescription": "...",
    "description": "...",
    "faqs": [{ "question": "...", "answer": "..." }]
  }
}
```

`categoryLabel` and category descriptions live in `categories.<locale>.json` keyed by category id.

**Why JSON not TS:** decouples translation churn from code; the overlay file can be regenerated/rewritten by the cron edge function without code-mod risk; dynamic `import()` keeps non-active locales out of the main bundle.

---

## 3. Runtime loader + hook

New file: `src/data/i18n/useLocalizedTool.ts` exporting:
- `useLocalizedTool(tool: Tool): Tool` — merges EN base with overlay for the active locale; missing overlay → EN fallback.
- `useLocalizedCategory(cat: CategoryInfo): CategoryInfo`
- `useLocalizedTools(): Tool[]` and `useLocalizedCategories(): CategoryInfo[]` for list pages.

The hook dynamically imports `tools.<locale>.json` once per locale change, caches in module-level memo. EN returns input unchanged. Strings missing from overlay fall back to EN per-field.

**Consumer wiring** (8 files): `ToolsDirectory`, `CategoryPage`, `ToolPage`, `PopularToolsSection`, `HomePage`, `ToolPageLayout`, `ContentPageLayout`, `LegalHealthCheckQuiz`. Each swap from `tools` / `categories` to the localized variant. Pure read-side change.

**Untouched:** slug/routing, `quizData.ts`, `BlogPostPage`, `StatutePage`, pillar/cluster pages — they reference tools by id only.

---

## 4. Offline translation script

New: `scripts/translate-tools.mjs`
- Reads `src/data/tools.ts` via a tiny extractor (re-uses the file's TS by running it through `tsx` to import the `tools`/`categories` arrays).
- For each target locale, batches tools in groups of ~10 (small enough for one AI call), translates only the user-facing fields, writes to `src/data/i18n/tools/tools.<locale>.json`.
- **Idempotent:** loads existing overlay, skips tool ids already present, appends only new/missing translations. Re-runnable any time.
- Uses `_aiTranslate.mjs` helper → Lovable AI Gateway first, Gemini free tier fallback. On 402/429 from both, exits cleanly leaving partial overlay in place.
- Validates shape (same keys, same `faqs` length) before writing.

Run order locally: `node scripts/translate-tools.mjs --locale es`, then fr, de, pt, it. CLI also supports `--all`.

---

## 5. Cron continuation — edge function + pg_cron

When the local script hits Lovable 402/Gemini 429 free-tier daily quota, the user can either re-run tomorrow or rely on the cron path below to grind through remaining items automatically.

**New edge function:** `supabase/functions/translate-tools-cron/index.ts`
- Reads a static manifest of tools/categories (embedded at build via `scripts/_build-edge-source.mjs` — same pattern as `translate-region-intros`).
- Reads pointer from existing `translation_cron_state` (we'll reuse it with a new `id = "tools"` row; existing `singleton` row stays untouched). Pointer fields: `next_country` repurposed as `next_locale`; `last_run_status` for `ok` / `quota_hit` / `done` / `error`; `last_filled_count` for items translated this run.
- Each invocation: pick next un-translated (locale, tool_id) batch (up to 20 items), call Lovable AI then Gemini, write results to a new DB table.
- On 402/429: persist progress, set `last_run_status = "quota_hit"`, return 200 (don't fail cron).
- On all done: `last_run_status = "done"`.

**New table:** `tool_translations` (`tool_id text`, `locale text`, `data jsonb`, `updated_at`, PK = `(tool_id, locale)`). Grants: `SELECT` to `anon` + `authenticated`, `ALL` to `service_role`. RLS: anyone can read, no client writes.

**Why DB not JSON file for cron path:** edge functions can't write to `public/` or `src/`. So the cron writes to the DB; the runtime loader (#3) reads from `tool_translations` via Supabase when an overlay JSON is missing for a tool. Two-tier resolution per field:
1. Static overlay JSON (preferred — zero round-trip)
2. DB `tool_translations` (cron-filled, fetched once per locale switch and cached)
3. EN fallback

When you're satisfied with quality, an admin "export DB → JSON" button later flattens the DB rows back into the static JSON files (out of scope for this plan, mentioned for context).

**pg_cron schedule:** every 6 hours. SQL inserted via `supabase--insert` tool so the function URL + anon key aren't checked into a migration:
```sql
select cron.schedule(
  'translate-tools-every-6h',
  '0 */6 * * *',
  $$ select net.http_post(
       url := '<edge-function-url>',
       headers := '{"Content-Type":"application/json","apikey":"<anon>"}'::jsonb,
       body := '{}'::jsonb
     ); $$
);
```

Enable `pg_cron` + `pg_net` extensions in the migration that creates `tool_translations`.

---

## 6. Execution order

I'll run the work in this order, stopping only if I hit credit quota or an unexpected error:

1. Migration: create `tool_translations`, enable extensions.
2. Build runtime loader (`useLocalizedTool` hook).
3. Wire 8 consumer files to use localized variants.
4. Write `scripts/translate-tools.mjs` and run it for all 5 locales. Lovable AI primary; Gemini fallback. Log progress, persist what completes.
5. Write `translate-tools-cron` edge function + register pg_cron schedule.
6. Smoke-test: switch site to ES/PT, visit `/tools` and a tool page, confirm localized strings render and fall back gracefully when an overlay key is missing.

If step 4 partially completes, step 5 will fill the rest on schedule with no manual intervention.

---

## Technical details

- **Model**: `google/gemini-2.5-flash` via Lovable AI Gateway (the helper's current default); Gemini direct fallback for 402/429.
- **Batch size**: 10 tools per AI call. Smaller for safety; ~50 calls per locale; 250 calls total. With Lovable AI fast-flash this is small.
- **Bundle impact**: 5 overlay JSONs × ~50 KB each = 250 KB total; only the active locale is fetched (dynamic import). EN users see zero overhead.
- **Type safety**: overlay typed as `Partial<Pick<Tool, "name"|"shortDescription"|"description"|"faqs">>` with strict TS.
- **DB writes**: `tool_translations.data` is a jsonb of the same `Partial<Tool>` shape; loader merges identically to the static overlay.
- **No changes** to existing PT i18n UI translations, sitemap, routing, or auth.
- **Out of scope**: admin UI to edit translations, blog post translation (Phase C), state/city guides (Phase D), legal terms/clauses/statutes (Phase B).
