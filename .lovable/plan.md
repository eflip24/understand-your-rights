# Phase B8 — Full 6-Locale Pillar Fan-Out

Translate every country pillar (DE, FR, ES, IT, PT) into the 4 non-native, non-English locales so all 5 × 6 = 30 locale variants are filled. Today only `en` + the native locale exist; everything else silently falls back to English (with the B7 banner explaining this).

## Approach

Run a one-shot generator script that calls the Lovable AI gateway (`google/gemini-2.5-flash`) to translate each `PillarLocalized` field and FAQ from the English source into the 4 missing locales, then writes the result back into `src/data/eu/countryPillars.ts` in place.

Translation, not regeneration: we always feed the existing English text as the source of truth so legal facts stay identical across locales. The native-language text already authored (e.g. German `de` for DE) is left untouched.

## Scope of work

```text
Countries (5):     DE, FR, ES, IT, PT
Locales per country: en (source) + native + 4 to fill
Missing locales:   20 country×locale combos
Fields per combo:  hero.tagline, hero.lede, legalSystem,
                   howToFindLawyer, feesAndAid,
                   barAssociation.membershipRules,
                   crossBorderEU,  + 5–7 FAQ pairs
Approx. tokens:    ~3–4K input / ~3–4K output per combo
                   → ~70–80K output tokens total
```

## Deliverables

1. **`scripts/translate-country-pillars.mjs`** — Node script (ESM):
   - Reads `src/data/eu/countryPillars.ts` via dynamic import.
   - For each country × missing locale, builds one prompt containing the English source + a JSON schema of expected keys.
   - Calls `https://ai.gateway.lovable.dev/v1/chat/completions` with `LOVABLE_API_KEY`, `response_format: { type: "json_object" }`, temperature 0.2.
   - Validates the returned JSON shape, then patches the in-memory pillar object.
   - Serialises back to TypeScript using a small printer (keeps `en` first, native second, then fr/es/it/pt alphabetised; preserves URLs and `aiAssisted: true`).
   - Idempotent: skips any field that already has a value for the target locale, so reruns only fill gaps.
   - Logs token usage + a per-country summary; supports `--country=FR --locale=es` filters for incremental runs.

2. **Translated content** committed into `src/data/eu/countryPillars.ts` — file grows from ~360 lines to ~1.4–1.6K lines but structure is unchanged, so `pickPillarLocale` and `EuLawyersCountryPage` need no changes.

3. **`PillarLocaleFallbackBanner`** updated: it now only renders when a field actually falls back (we'll thread a `hasFallback` boolean from the page using a helper `isPillarFullyLocalized(pillar, locale)`), so post-B8 the banner disappears for the 30 covered combos but still protects any future gaps.

4. **`README.md`** — short "Translating pillars" section documenting `node scripts/translate-country-pillars.mjs [--country=XX] [--locale=yy]` and the `LOVABLE_API_KEY` requirement.

5. **`.lovable/plan.md`** — mark B8 complete, note the AI-assisted disclosure already in place via `aiAssisted: true` + the existing badge.

## Quality controls

- Glossary pinned in the system prompt: keep legal terms in source language with a parenthetical gloss on first use (e.g. `Rechtsanwalt (avocat allemand)`), preserve statute names (BRAO, RVG, LOPJ, CNB, CNF, OA) and URLs verbatim, never invent statute numbers.
- Temperature 0.2 + `response_format: json_object` to minimise drift.
- Spot-check pass: after generation, the script writes `/tmp/pillar-translation-report.md` with a sampled paragraph per locale so we can eyeball the output before committing.
- The existing `aiAssisted: true` flag continues to drive the AI Act art. 50 badge on the page — no new disclosure UI needed.

## Out of scope (deferred)

- Re-translating already-authored native locales.
- Localising city/area listing copy beyond what's already in `eu-lawyer.json`.
- B9 region pages, B10 lawyer claim flow.

## Files

- New: `scripts/translate-country-pillars.mjs`
- Edited: `src/data/eu/countryPillars.ts`, `src/components/eu/PillarLocaleFallbackBanner.tsx`, `src/pages/eu/EuLawyersCountryPage.tsx` (wire `hasFallback`), `README.md`, `.lovable/plan.md`

## Risk / cost

- Single run uses the project's Lovable AI credits (≈70–80K output tokens on `gemini-2.5-flash`). If credits are exhausted mid-run the script resumes on rerun thanks to idempotency.
- If quality on any locale is weak, rerun that one combo with `--country --locale` after tweaking the system prompt — no schema changes required.
