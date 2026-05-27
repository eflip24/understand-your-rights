## Phase B6 — Country Pillar Content (E-E-A-T Moat)

Goal: turn each `/lawyer-eu/{country}` page from a thin index into a substantial pillar page that ranks for head terms like "avocat France", "Rechtsanwalt Deutschland", "abogado España". Mirrors what `/auto-accident-law` etc. do for US.

### Scope
5 countries × 1 pillar each = **5 pillar pages**, plus a structured data file per country. No new routes (reuse `EuLawyersCountryPage.tsx`, upgrade in place). No DB changes.

### B6.1 — Country pillar content model

New file `src/data/eu/countryPillars.ts` exporting a typed registry keyed by `EuCountryCode`:

```ts
interface CountryPillar {
  hero: { tagline: LocalizedString; lede: LocalizedString };
  legalSystem: LocalizedString;          // 2-3 paras: civil law tradition, court hierarchy
  howToFindLawyer: LocalizedString;       // step-by-step, locale-appropriate
  feesAndAid: LocalizedString;            // typical fee structures + legal aid eligibility
  barAssociation: {                       // expanded from existing barDisclaimers
    name: LocalizedString;
    verifyUrl: string;
    membershipRules: LocalizedString;
  };
  crossBorderEU: LocalizedString;         // Establishment Directive 98/5/EC + Services Directive
  faqs: Array<{ q: LocalizedString; a: LocalizedString }>;  // 6 per country
  lastReviewed: string;                   // ISO date — drives `dateModified` schema
}
```

Content split per locale: each country authored primarily in its **own** language (DE in `de`, FR in `fr` …) with `en` translations for hub crawlability; other locales fall back to `en` to keep cost down (B8 covers full locale fan-out).

### B6.2 — Pillar page upgrade

Refactor `EuLawyersCountryPage.tsx` from "areas + cities grid" to a long-form pillar:

```
[Bar disclaimer]               ← existing
[Hero: H1 + tagline + lede]    ← new
[Legal-system primer]          ← new
[How to find a lawyer in X]    ← new
[Fees & legal aid]             ← new
[Bar association card]         ← upgraded
[Cross-border / EU rights]     ← new
[Practice areas grid]          ← existing
[Cities grid]                  ← existing
[FAQ accordion (6 Q&A)]        ← new (reuses shadcn Accordion)
[Last reviewed: {date}]        ← new
```

Word target: **1,800–2,400 words** per country (matches what US pillars do). All text from `countryPillars.ts`, no hardcoded copy in the component.

### B6.3 — Schema upgrades

`EuLawyersCountryPage` JSON-LD `@graph` adds:
- **`Article`** (or `Guide`) with `headline`, `inLanguage`, `author: { @type: Organization, name: 'Legally Spoken' }`, `dateModified` from `lastReviewed`.
- **`FAQPage`** built from the 6 FAQs.
- Existing `BreadcrumbList` + `ItemList` kept.

Single `JsonLdGraph` call as today.

### B6.4 — Internal linking

- Each pillar links **out** to its area pages (already) + 2-3 cluster blog posts when present (`useBlogPosts({ country: 'de' })` — already supports filter).
- Hub `/lawyer-eu` page upgrades country cards with a 1-sentence intro pulled from `countryPillars[code].hero.tagline`.
- Footer adds a "European Legal Guides" column linking the 5 pillars (locale-aware).

### B6.5 — Content generation strategy

5 countries × ~2,000 words × 2 primary locales (native + EN) ≈ 20K words. Two paths:

**Path A — Lovable AI (default)** via a new admin-only script `scripts/generate-country-pillar.mjs` calling `generate-blog-article`-style prompt against `google/gemini-3-flash-preview`. Outputs `countryPillars.ts` patches per country. Each generation reviewed by user, marked `ai_generated: true` (B5.4 badge surfaces automatically).

**Path B — AI credit fallback** if Lovable AI credits exhaust mid-generation:
- **Google AI Studio (Gemini API)** — free tier: 15 RPM / 1M tokens-per-day on `gemini-2.5-flash`. Plenty for 5 pillars. Key from https://aistudio.google.com/apikey.
- **Groq** — free tier on `llama-3.3-70b-versatile`, 30 RPM. Good fallback.
- **Mistral La Plateforme** — free experimental tier on `mistral-small-latest`, EU-hosted (bonus for EU content authenticity).

Add a `--provider {lovable|gemini|groq|mistral}` flag to the script; gemini/groq/mistral providers read a secret (`GEMINI_API_KEY` / `GROQ_API_KEY` / `MISTRAL_API_KEY`) added via `add_secret` only when needed. All four return OpenAI-compatible chat completions, so one adapter handles all.

Recommend starting with Lovable AI; switch only on 402.

### B6.6 — Out of scope (deferred)

- Per-city pillar content (B7).
- Region-tier pages (B9).
- Full 6-locale translation of every pillar (B8).
- Lawyer claim/verify flow (B10).

### Files

**New**
- `src/data/eu/countryPillars.ts` — content registry (typed scaffolding + 1 fully-authored country, others stubbed for incremental fill)
- `src/components/eu/CountryPillarSections.tsx` — presentational long-form sections
- `scripts/generate-country-pillar.mjs` — multi-provider generator

**Edited**
- `src/pages/eu/EuLawyersCountryPage.tsx` — render pillar sections, FAQ, Article+FAQ schema
- `src/pages/eu/EuLawyersHub.tsx` — country cards with taglines
- `src/components/layout/Footer.tsx` — European Legal Guides column
- `src/components/seo/JsonLd.tsx` — add `articleSchema` + `faqSchema` helpers if missing
- All 6 `eu-lawyer.json` — section headings ("Legal system", "How to find a lawyer", "Fees & legal aid", "Cross-border", "FAQ", "Last reviewed")

### Open questions

1. **Authoring order** — which country should I fully write first (DE recommended: highest CPC + strictest legal context, sets template), then stub the other 4?
2. **AI provider for fallback** — want me to wire all three fallbacks (Gemini / Groq / Mistral) or just Gemini? Gemini free tier alone covers the full job.
3. **Last-reviewed cadence** — show exact date ("Last reviewed 27 May 2026") or relative ("Reviewed this month")? Exact is stronger E-E-A-T signal but requires honest re-review.
