## What's actually unfinished

I checked the database and the deployed functions. Two concrete gaps, one loose end:

| # | Gap | Evidence |
|---|-----|----------|
| 1 | **Guide translations are empty** — the Phase 9 pipeline was built and deployed, but zero translations exist. Every Phase-8 pillar still renders English-only, so the 6-locale hreflang path in `HighCpcPillarPage` never activates. | `select count(*) from guide_translations` returns 0 rows for all locales |
| 2 | **No schedule for the guide translator** — `translate-tools-daily` and `translate-region-intros-daily` are active pg_cron jobs; there is no `translate-guides` job. It only ever ran manually, and those runs hit credit/rate limits. | `cron.job` lists only the two jobs |
| 3 | **Phase 11 (programmatic scale) never started** — the roadmap's last outstanding phase. | No state fan-out beyond DUI + alimony |

Everything else from the roadmap is in place: Phase 8's 10 pillars + 51 DUI states, Phase 10 design polish, Phase 12 guide registry/hub/mega-menu, and the sitemap shards (guides, guides-i18n, dui states, PI sub-pages, mass tort).

## Step 1 — Finish Phase 9 (translation backfill)

- Schedule `translate-guides-cron` in pg_cron on a staggered slot (e.g. `41 5 * * *`) so it doesn't collide with the tools/region jobs, and reduce per-run batch size so a single run stays inside free-tier limits.
- Add a manual "drain" path: run the function repeatedly with an explicit `?locale=` until each of es/fr/de/pt/it is complete (9 guides × 5 locales = 45 rows).
- Verify the merge path end-to-end in the browser: load `/es/truck-accident-settlements`, confirm translated copy renders, canonical is self-referential, and all 6 hreflang tags emit (instead of the English-only fallback).
- Once a locale is complete, its URLs need to appear in the `guides-i18n` sitemap shard — currently that shard should only emit locales that actually have rows, so gate it on real translation coverage rather than assuming all 5.

## Step 2 — Phase 11: programmatic scale (state fan-out)

Reuse the DUI state-template pattern for the clusters with the highest CPC and clearest state-level variation:

| Cluster | Route pattern | State-varying data |
|---|---|---|
| Workers' comp denial | `/workers-comp-denied-what-next/:state` | Appeal board name, filing deadline, IME rules, benefit caps |
| Wrongful termination | `/wrongful-termination-settlements/:state` | At-will exceptions, state FEP agency, filing window vs EEOC |
| Car insurance claim denial | `/car-insurance-claim-denied/:state` | Fault vs no-fault, DOI complaint route, bad-faith statute, prompt-pay deadline |

Each gets one data file (51 jurisdictions), one shared template component driven by the existing pillar template, self-referential canonical + breadcrumb per state, registration in `guideIndex.ts`, and sitemap entries. That's ~153 new indexable pages on already-validated templates.

## Technical notes

- New state data files follow `src/data/duiStates.ts` shape; templates follow `DuiFirstOffenseStatePage.tsx`.
- State pages are Tier-3 (English-only) → `Tier3Head`, consistent with the hreflang scope rule.
- `generate-sitemap` gets three new slug arrays in the guides shard, then redeploy.
- No new calculators; state pages link to existing tools and `/lawyer-near-me/{area}/{state}`.

## Suggested order

Step 1 first — it's finishing work already paid for, and it unlocks 45 translated pages with no new content authoring. Step 2 is the bigger new-surface bet.
