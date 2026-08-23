# European Employment Calculators

Ship a new `/eu-tools` hub with country-aware employment calculators for Germany, France, Spain, Italy and Portugal, available in all six site locales (en, es, fr, de, it, pt).

## What ships

**1. Severance / dismissal compensation calculator**
Inputs: country, gross monthly salary, start date, end date, contract type (permanent/fixed-term), dismissal reason (redundancy/economic, personal, mutual agreement, unfair). Output: statutory entitlement range, the formula applied, and a note on what a tribunal can add for unfair dismissal.

Per-country rules encoded in a data layer:

| Country | Core statutory basis |
|---|---|
| Germany | Kündigungsschutzgesetz §1a: 0.5 month per year of service (customary settlement range shown separately) |
| France | Indemnité de licenciement: 1/4 month/year up to 10 years, 1/3 month/year after |
| Spain | Despido objetivo 20 days/year (cap 12 months); improcedente 33 days/year (cap 24 months) |
| Italy | TFR accrual: annual pay / 13.5, revalued |
| Portugal | 12 days of base pay per full year of service |

**2. Notice period calculator**
Inputs: country, service length, who terminates (employer/employee), collective agreement override. Output: statutory minimum notice, pay-in-lieu equivalent, and the last working day from a chosen notice date.

Both calculators show the source statute name, an "estimate only — collective agreements and contracts can increase these amounts" disclaimer, and link to the matching `/lawyer-eu/{country}` pillar.

## Pages and URLs

- `/eu-tools` — hub listing the calculators, with country tiles.
- `/eu-tools/severance-calculator`
- `/eu-tools/notice-period-calculator`
- Country-scoped deep links: `/eu-tools/{slug}/{countrySlug}` pre-selects the country and gets its own title, intro and FAQ (e.g. Spain despido improcedente).
- Every route emits localized paths and full hreflang for the six locales (`/es/...`, `/fr/...`, etc.), matching the existing EU lawyer directory behaviour.

## Content and discovery

- Country intro copy, FAQs and result labels authored in English, then fanned out to the other five locales through the existing AI translation pipeline (same pattern as country pillars), with native-language copy winning where authored.
- Register the hub and both calculators in `guideIndex.ts` so they appear in the navbar, footer and `/guides`.
- Add an `eu-tools-i18n` sitemap shard using `uL()` so each path × locale is listed with alternates.
- Cross-link from the EU country pillars, `/eu-forms`, and the US severance calculator ("working in the EU?").

## Technical notes

- New data layer `src/data/eu/employmentRules.ts` keyed by `EuCountryCode`, holding notice tables, severance formulas, caps and statute references — pure functions so the maths is unit-testable.
- Slugs and localized paths extend the existing `slugRegistry` approach (`buildEuPath`-style helper for the `eu-tools` base) so hreflang generation stays in one place.
- Pages use `<Head>` (not `Tier3Head`) since all six locales are indexable; sitemap shard and head tags change together.
- Calculators are client-side only, rendered through the shared tool layout with byline, methodology block, FAQ + SoftwareApplication JSON-LD.

## Order

Data layer + severance calculator → notice period calculator → hub + country deep links → translations fan-out → guideIndex + sitemap, verifying in the preview after each step.
