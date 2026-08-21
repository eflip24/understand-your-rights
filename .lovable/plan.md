# Growth Plan: More Content, Now Multilingual

Goal: add content that earns qualified visits in the US *and* in the five EU languages the site already ships (ES, FR, DE, IT, PT), without breaking the hreflang scope rules already in place.

## 1. Promote proven English pages into 6 locales

The translation pipeline (`guide_translations` + `translate-guides-cron`) already exists but most money pages are still English-only Tier-3. Promote a first batch of 12 pages whose topics genuinely apply outside the US or are language-agnostic utilities:

- Tool/calculator pages: alimony, child support, overtime, severance, security deposit, settlement estimator, probate cost, lost wages.
- Explainer pages: contingency fees, pain & suffering, statute-of-limitations concept, "what a demand letter is".

For each: register in the translation source list, run the cron fan-out, switch the page from `Tier3Head`/`englishOnly` to plain `<Head>`, and move its sitemap entry into the `*-i18n` shard. US-statute-specific numbers stay flagged as "US law" inside translated copy so we never imply EU applicability.

## 2. Native EU-language clusters (not translations)

Ten new pillar pages written natively per country, matching the existing EU pillar structure, targeting high-CPC local intent:

| Cluster | Countries |
|---|---|
| Traffic accident compensation & insurer payouts | DE, FR, ES, IT |
| Unfair dismissal / severance entitlement | DE, FR, ES, IT, PT |
| Tenant deposit return & rent increase limits | DE, ES, FR |
| Consumer warranty & refund rights (EU 2-year rule) | all 6 |

Each ships with a country-specific data table (deadlines, statutory notice periods, caps), FAQ + JSON-LD, bar-association disclaimer, and links into the matching EU forms and `/lawyer-eu` pages.

## 3. New US tools (4)

- Car accident diminished-value calculator
- Workers' comp permanent-disability rating calculator
- Child custody / parenting-time percentage calculator
- Estate tax & inheritance tax estimator (state-aware)

Same pattern as the recent calculators: state-aware data layer in `src/data/`, scenario compare, methodology block, FAQ + SoftwareApplication JSON-LD, byline, related-intent strip.

## 4. New forms (4)

- Last Will and Testament (state-aware witness/notary rules)
- Living Will / Advance Healthcare Directive
- Independent Contractor Agreement
- Rent Increase Notice (state-aware timing)

Plus an **Estate Planning Starter Pack** (Will + Living Will + Financial POA + Release) using the existing shared-fields and ZIP bundling, priced through `form_prices`.

## 5. Blog quality pass

- Upgrade the generation prompt in the blog edge functions to require: a data table, cited sources, editorial byline, 3+ internal links to a matching tool or form, FAQ schema.
- Add a "linked tools" field on posts so every article points at a calculator.
- Seed 8 posts on cluster gaps (wrongful death payouts, probate fees by state, lost-wage documentation, small claims limits, contractor vs employee, will vs living trust, EU flight compensation, EU dismissal notice periods).

## 6. Discovery & hygiene

- Register every new page in `guideIndex.ts` (navbar, footer, `/guides`).
- Update `generate-sitemap`: `u()` for English-only, `uL()` in the i18n shard for promoted/EU pages.
- Add a translation-coverage check to the admin translations dashboard so missing locales are visible per page.
- Verify each batch in the preview before moving on.

## Technical notes

- Locale scope must stay consistent per route: head tags, noindex, and sitemap shard change together (never hreflang a noindexed locale).
- EU pillars extend `src/data/eu/countryPillars.ts` and the existing pillar template; US tools follow `ToolPageLayout`.
- Translations run through the existing Lovable AI cron pipeline; a 402/429 pauses the batch rather than retrying in a loop.

## Order

Promote existing pages to 6 locales → EU native clusters → US tools → forms → blog pipeline, verifying each batch in the preview.
