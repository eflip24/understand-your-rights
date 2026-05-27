# B9 verification

B9 shipped successfully:
- `src/data/eu/regions.ts` — 73 regions (FR 13, DE 16, ES 17, IT 20, PT 7) with name/slug × 6 locales, capital, cities, court of appeal, optional bar chamber.
- `src/data/eu/regionIntros.ts` — English baseline for all 73 regions; ~10 hand-authored native-language drafts (FR×1, DE×2, ES×2, IT×3, PT — none yet). 73×5 = ~365 locale gaps remain, of which ~355 still need filling.
- Route, page, country-page wiring, sitemap (+438 URLs), and 6 i18n bundles all in place.
- `pickRegionIntro` falls back to English with a visible "shown in English" notice.

# B9.5 — Translate region intros to all 6 locales

Reuse the B8 translation pipeline (Lovable AI Gateway with Gemini free-tier fallback, exponential-backoff retries) to fill every missing `regionIntros[country][region][locale]` entry. Hand-authored entries stay authoritative and are never overwritten.

## Storage shape

Same overlay pattern as `countryPillarsGenerated.ts` — authored copy stays in `regionIntros.ts`, machine translations go in a separate generated file the page merges on read.

**New `src/data/eu/regionIntrosGenerated.ts`**
```ts
export type GeneratedRegionIntros =
  Partial<Record<EuCountryCode, Partial<Record<string, Partial<Record<LocaleCode, string>>>>>>;
export const GENERATED_REGION_INTROS: GeneratedRegionIntros = { /* filled by script */ };
```

**Edit `pickRegionIntro`** to check authored first, then generated, then English. Order: `REGION_INTROS[c][r][locale]` → `GENERATED_REGION_INTROS[c][r][locale]` → `REGION_INTROS[c][r].en`. The locale field returned drives whether the "shown in English" banner shows (only when both authored and generated miss).

## Translator script

**New `scripts/translate-region-intros.mjs`** — sibling of `translate-country-pillars.mjs`, sharing identical structure:

- CLI flags: `--country=fr`, `--region=ile-de-france`, `--locale=es`, `--provider=lovable|gemini`, `--dry`.
- Loads `REGION_INTROS` + `GENERATED_REGION_INTROS` via Bun's TS import.
- For each (country, region, locale) with `locale !== 'en'`, `locale !== native(country)` (skip same-language work the author already did), and no authored or generated entry yet → translate the English source.
- Reuses the Lovable→Gemini fallback wrapper and the `gemini-2.5-flash` model + retry/backoff from B8 (lift the `callModel` helper into a shared `scripts/_aiTranslate.mjs` so both scripts import it instead of duplicating).
- Writes back to `regionIntrosGenerated.ts` after each country to avoid losing work on transient failures, same as B8.
- Prompt template: short region-context translator prompt — "Translate this 2-3 sentence overview of {Region}, {Country} into {Target Language}. Preserve proper nouns (court names, bar chamber names) in their official form. Keep tone editorial and concise."

## Shared helper

**New `scripts/_aiTranslate.mjs`** — extract from `translate-country-pillars.mjs`:
- `callModel({ prompt, system, provider })` with Lovable Gateway primary + Gemini fallback.
- Retry/backoff (max 5 attempts, 30s cap, 429/500/503 retryable).
- Token accounting.

Then `translate-country-pillars.mjs` imports from it (no behavior change, just deduped).

## Page wiring

- `EuLawyersRegionPage.tsx` — no change needed; it already consumes `pickRegionIntro`.
- The "shown in English" banner naturally disappears once generated copy lands for the user's locale.

## Sitemap / SEO

No changes. URL set is already emitted in B9. Translated intros improve `<meta description>` quality (the page already uses `intro.text.slice(0, 158)`).

## Scope / volume

73 regions × ~3 missing locales each (after authored + native skip) ≈ ~220 calls × ~150 tokens out = ~33K output tokens. Well within Gemini free-tier daily quota; Lovable Gateway runs first if credits are available.

## Files

**New**
- `scripts/translate-region-intros.mjs`
- `scripts/_aiTranslate.mjs`
- `src/data/eu/regionIntrosGenerated.ts` (initially empty `{}`; populated by the script)

**Edited**
- `src/data/eu/regionIntros.ts` — `pickRegionIntro` checks the generated overlay before the English fallback.
- `scripts/translate-country-pillars.mjs` — import shared helper instead of inlining `callModel` + retry logic.
- `README.md` — short usage section for the new script.
- `.lovable/plan.md` — append B9.5 shipped notes.

## Out of scope

- Re-translating hand-authored entries.
- Editorial review UI; trust the model + English fallback for now.
- New languages beyond the existing 6 locales.

## Risk

- Proper-noun drift (court / bar chamber names) — mitigated by the "preserve proper nouns" instruction; spot-check 3-5 outputs per locale after the run.
- Generated file size — 73 × 5 × ~600 chars ≈ 220 KB, comparable to `countryPillarsGenerated.ts`. Acceptable.
