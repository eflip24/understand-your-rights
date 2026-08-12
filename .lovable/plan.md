# Grow traffic: page upgrades first, court hub second

Two things you asked about. Short answer on judges: we should build a **court information hub — no named judge profiles**. Judge pages need verified, per-person public records; without a licensed source they'd be thin, unverifiable, and a real risk (defamation/E-E-A-T). Court procedure pages capture almost the same search demand ("how to file small claims in Harris County", "Cook County eviction court") with none of that risk.

## Where we actually stand

Semrush shows the site ranking for keywords but almost entirely on **pages 5–10** (best positions 49–98). Nothing is close to page one yet. That means the highest-return work is not more new pages — it's pushing existing near-miss pages up, and fixing the pages that are indexed but too thin to compete.

## Part 1 — Improve existing pages (main effort)

### A. Rescue the "almost ranking" pages
Pages already ranking 40–70 are the cheapest wins. Target set from live ranking data:

| Page | Issue | Fix |
|---|---|---|
| `/lawyer-near-me/workers-compensation/ohio/columbus` | Position 56, thin city template | Add local court/filing detail, county comp-board info, real deadlines, FAQs |
| `/legal-terms/negligence` | Position 49, glossary-thin | Expand to a full explainer: elements, examples, state comparison, related tools |
| `/legal-clauses` + `/legal-clauses/insurance-clause` | 5 keywords, pos. 67–98 | Rebuild hub with clause library table, plain-English rewrites, copyable samples |
| `/insurance-law` | Position 89 on a head term | Rebuild as a real pillar with carrier tables and links to claim tools |
| `/about` | Ranking oddly for brand-adjacent terms | Strengthen E-E-A-T: team, methodology, review process |

### B. Fix the thin-template problem at scale
The location and glossary templates repeat the same skeleton across hundreds of URLs, which caps every one of them. Rather than editing them one by one:
- Add a **local depth block** to city lawyer pages: which courthouse handles the case type, filing address, typical timelines, county-level notes (we already store courthouse name/address/phone/site per city).
- Add a **term depth block** to glossary pages: statutory definition, worked example, "commonly confused with", related calculator.
- Keep the existing noindex rule for anything still below the depth threshold so thin pages stop diluting the site.

### C. Internal link consolidation
Point the near-miss pages at each other and at the strong Top-20 rebuilds, so authority flows to the pages closest to breaking through.

## Part 2 — Court information hub (`/courts`)

Built on verifiable public data only.

```text
/courts                          national hub: how US courts are structured
/courts/{state}                  court system, filing fees, e-filing, small claims limits
/courts/{state}/{county-or-city} courthouse details, what it hears, filing steps, maps
```

Each page carries: courthouse name/address/phone/official site, court type and jurisdiction, filing fee and small-claims limit, e-filing system, self-help resources, "what to bring", and links to our matching forms and calculators (eviction notice, small claims demand letter, etc.). Every fact links to the official `.gov`/court source.

### Sourcing the dataset
1. Seed from what we already hold: courthouse records already exist for the cities in the directory.
2. Expand by scraping official state judiciary sites (Firecrawl) for court lists, fees, small-claims limits and e-filing systems — official sources only, each row storing its source URL and capture date.
3. Anything we can't verify from an official source is left blank rather than guessed.

Judges stay out of scope in this pass. Once the court layer exists and we have a confirmed judiciary roster source, adding judge listings later is a data-only extension.

## Suggested sequencing

| Step | Work |
|---|---|
| 1 | Depth blocks for city lawyer pages + glossary terms (fixes hundreds of pages at once) |
| 2 | Rescue the five named near-miss pages |
| 3 | Internal link consolidation pass |
| 4 | Court dataset sourcing + `/courts` national and state pages |
| 5 | County/city court pages, sitemap + guide-index registration |

## Technical notes

- Depth blocks follow the existing `FormGuideContent` / `ToolGuideContent` pattern and merge FAQs into the page's JSON-LD graph.
- Court data goes in `src/data/courts/` with a per-row `sourceUrl` + `lastVerified`, mirroring the settlement-deadlines dataset approach.
- New routes register in `AppRoutes.tsx`, `src/data/guideIndex.ts` and the `generate-sitemap` edge function.
- Court pages emit `Courthouse`/`GovernmentOffice` + `FAQPage` + `BreadcrumbList` JSON-LD, and reuse `LocalMap` for the courthouse pin.
- English-only routing (no 6-locale hreflang) since this is US-specific.
