## Part 1 — Loose ends

### 1. Footer "European Legal Guides" column
- Add a 5th column to `src/components/layout/Footer.tsx` listing the 5 country pillars (DE, FR, ES, IT, PT).
- Link text = `pickPillarLocale(COUNTRY_PILLARS[code].hero.tagline, locale)` truncated to country name; href uses the locale-aware `/lawyer-eu/{country}` resolver.
- Hide the column on the US-only routes? No — keep global, matches the existing pattern of always-on footer nav.

### 2. CI accessibility hook
- Add `"test:a11y": "node scripts/axe-audit.mjs"` to `package.json` scripts.
- Add a one-line note in `README.md` under the Testing section: "Run `npm run test:a11y` to audit key routes against WCAG 2.1 AA via axe-core."
- No GitHub Actions workflow added (project doesn't currently have `.github/workflows`); script is runnable locally and from any CI.

### 3. Cross-locale fallback banner for FR/ES/IT/PT pillars
- New component `src/components/eu/PillarLocaleFallbackBanner.tsx` (mirrors `EnglishOnlyBanner` styling).
- Logic: shown on `EuLawyersCountryPage` when the active i18n locale is neither `en` nor the country's native locale (e.g. user on `it` viewing `/lawyer-eu/fr`). Message: "Detailed guidance for {country} is currently shown in English. Native {language} translations are on the way." Dismissible.
- Add i18n key `eu-lawyer.pillarLocaleFallback` to all 6 `eu-lawyer.json` files with `{{country}}` and `{{language}}` interpolation.

---

## Part 2 — Phase B7: Tier-2 city expansion

### Scope
Today `src/data/eu/cities.ts` lists ~20 Tier-1 cities. Target: **60+ cities** by adding ~8 Tier-2 cities per country (Lyon, Marseille, Toulouse, Nice, Nantes, Strasbourg, Bordeaux, Lille for FR; Hamburg, Köln, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Dortmund, Hannover for DE; Valencia, Sevilla, Zaragoza, Málaga, Bilbao, Granada, Murcia, Palma for ES; Napoli, Torino, Bologna, Firenze, Bari, Catania, Verona, Genova for IT; Braga, Coimbra, Faro, Aveiro, Setúbal, Funchal, Évora, Viseu for PT).

Plus a small UX upgrade: per-area filter on the city page so `/lawyer-eu/de/hamburg` can be narrowed to "Family law" without a full route change.

### B7.1 — Data expansion
- Extend `src/data/eu/cities.ts` with ~40 new entries, each carrying: `slug`, `name`, `country`, `region`, `lat`, `lng`, `population` (rounded), `tier: "tier2"`, optional `nativeName` for IT/PT/ES diacritics.
- Add `tier: "tier1" | "tier2"` to existing entries (default `tier1`).
- Update `src/data/eu/slugRegistry.ts` to include the new slugs so route resolution doesn't 404.
- For each Tier-2 city add 3–5 entries to `src/data/eu/lawyerListings.eu.ts` (manually researched public listings, same shape as today's data — no fabricated firm names).

### B7.2 — City page enhancements (`EuLawyersCityPage.tsx`)
- Add a practice-area filter chip strip above the listings grid (uses `practiceAreas.ts`, syncs with `?area=` query param).
- Listing filter logic: if `?area=` is set, filter `lawyerListings.eu` by `practiceAreas.includes(area)`; otherwise show all.
- `LocalBusiness` JSON-LD continues to enumerate the full unfiltered set so SEO surface is preserved.
- Update `<title>` and meta description when an area filter is active: "Family law lawyers in Hamburg, Germany".

### B7.3 — Hub & country page integration
- `EuLawyersHub.tsx` country cards already show a city count — recompute from the expanded list, no code change beyond the data import.
- `EuLawyersCountryPage.tsx` cities grid: group by region (using the new `region` field) when `tier2` entries exist; collapse to a flat grid for countries with <10 cities.

### B7.4 — Sitemap & indexing
- `supabase/functions/generate-sitemap` city shard auto-picks up new entries (already iterates `cities.ts`). Re-verify the lang param fan-out generates 6 × 60 = 360 city URLs.
- No new sitemap shards needed.

### B7.5 — Out of scope (still deferred to later phases)
- Full per-city pillar long-form content (still B-future).
- Region-tier intermediate pages (B9).
- Lawyer claim flow (B10).
- Full 6-locale translation of pillar prose (B8).

### Files

**Edited**
- `src/components/layout/Footer.tsx` — new column
- `package.json` — `test:a11y` script
- `README.md` — testing note
- `src/i18n/locales/{en,de,fr,es,it,pt}/eu-lawyer.json` — `pillarLocaleFallback` key
- `src/pages/eu/EuLawyersCountryPage.tsx` — mount banner + region grouping
- `src/pages/eu/EuLawyersCityPage.tsx` — area filter chips + query-param sync
- `src/data/eu/cities.ts` — Tier-2 entries + `tier` field
- `src/data/eu/slugRegistry.ts` — new slugs
- `src/data/eu/lawyerListings.eu.ts` — ~120–200 new listing rows

**New**
- `src/components/eu/PillarLocaleFallbackBanner.tsx`

### Acceptance
- Footer shows 5 EU country pillar links on every page, locale-aware.
- `npm run test:a11y` passes against the new pillar pages with no new violations.
- Visiting `/lawyer-eu/fr` in `it` locale shows the fallback banner; visiting in `fr` or `en` does not.
- `/lawyer-eu/de` lists 8+ German cities grouped by Bundesland; `/lawyer-eu/de/hamburg?area=family-law` filters the grid and updates `<title>`.
- Sitemap regeneration emits 6× more city URLs than today, no duplicates.
- No new TypeScript or lint errors.

### Open questions
1. **Tier-2 listings sourcing** — should I populate the new cities with 3–5 hand-picked public listings each (slower, more authentic) or leave them empty with a "No verified listings yet — see the {country} bar register" placeholder (faster, weaker E-E-A-T)?
2. **Area filter UX** — chip strip (compact, scannable) or a `<Select>` dropdown (smaller footprint on mobile 360px viewport)?
