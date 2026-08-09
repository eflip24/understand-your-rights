# Next Phase: Workstream 2 — Earn Real Authority

You asked for next steps after the Top 20 rebuilds. The growth plan’s next workstream is authority: the domain is stuck at Authority Score 2/100 with 118 referring domains that are mostly directory/PBN spam. Page volume is no longer the constraint; trust is.

I’ve made the following default calls because you skipped the clarifying questions:
- **Reviewer identity:** use transparent editorial-team bylines and process disclosure; no invented attorney credentials.
- **Disavow:** prepare the file + Search Console instructions; you upload when ready.
- **First linkable asset:** state-by-state settlement & deadline dataset (more citable and reuses existing state data).

## What we will build (14 days)

| Days | Focus | Output |
|---|---|---|
| 1–2 | E-E-A-T byline layer | `AuthorByline` component, editorial-team data file, bylines on Top 20 pages, updated Article/Organization JSON-LD |
| 3–7 | Linkable dataset #1: state settlement & deadlines | `/data/settlement-deadlines` hub with filterable table, CSV download, embed snippet, Dataset schema, sitemap entry |
| 8–10 | Linkable dataset #2: legal fee transparency index | `/data/legal-fees` hub with contingency-fee matrix, hourly-rate bands, "lawyer cost estimator" mini-tool |
| 11–12 | Disavow cleanup | `disavow.txt` from Semrush low-quality domains + step-by-step Search Console upload guide |
| 13–14 | Internal linking + outreach prep | Link datasets from home, `/guides`, and relevant pillars; draft outreach list for journalists/law blogs |

## Why this sequence

1. **E-E-A-T first.** Google’s helpful-content signals for legal (YMYL) are strict. Every rebuilt page currently shows a generic "LegallySpoken Editorial Team" author. Adding visible review roles, last-reviewed dates, and a richer publisher schema is the fastest trust signal we can ship without waiting for backlinks.
2. **Dataset before disavow.** New backlinks from a citable dataset can start arriving while the disavow file processes, so the net authority trend moves up sooner.
3. **Disavow before outreach.** Cleaning the PBN spam removes the risk that future earned links are diluted by toxic neighbors.

## Technical approach

### E-E-A-T layer
- Create `src/data/editorialTeam.ts` with real roles (e.g., "Senior Legal Editor", "State Law Researcher") and short bios. No fake bar numbers or law-firm affiliations.
- Build `src/components/seo/AuthorByline.tsx` to render author + reviewer + "last reviewed" date on article-style pages.
- Update `src/components/seo/JsonLd.tsx`:
  - `organizationSchema()` should accept `sameAs` URLs (LinkedIn, etc.) — populated from a new env var or data file.
  - `articleSchema()` should emit a `Person` author when a named reviewer exists, otherwise fall back to the editorial organization.
- Roll the byline out to the Top 20 rebuilt pages first, then the rest of the guide/pillar corpus.

### State settlement & deadline dataset
- Aggregate data we already own:
  - Statutes of limitations from `src/data/personalInjuryLaw.ts`, `src/data/autoAccidentLaw.ts`, etc.
  - Workers’ comp appeal windows from `src/data/workersCompStates.ts`.
  - Wrongful-termination EEOC/state deadlines from `src/data/wrongfulTerminationStates.ts`.
  - DUI lookback/penalty baselines from `src/data/duiStates.ts`.
  - Settlement bands from the rebuilt pillar pages.
- Create `src/data/settlementDeadlineDataset.ts` as the canonical source.
- Build `/data/settlement-deadlines` page with:
  - Filterable state/claim-type table
  - CSV export button
  - Embeddable iframe snippet (reusable `DataEmbed` component)
  - Citation block with ready-to-copy HTML
  - FAQ + JSON-LD `Dataset` schema
- Register in `src/data/guideIndex.ts` and regenerate sitemap.

### Legal fee transparency index
- Create `src/data/legalFeeIndex.ts` with:
  - Contingency-fee ranges by case type (PI, employment, mass tort, SSDI, etc.)
  - Hourly-rate bands by US region/metro
  - Typical case-cost advances/deductions
- Build `/data/legal-fees` page with tables and a mini "lawyer cost estimator" that outputs estimated total cost by fee structure.
- Add `Dataset` schema and download/embed options.

### Disavow file
- Use the Semrush backlink profile (already pulled: 118 referring domains, mostly low-quality directories/PBNs) to generate a domain-level `disavow.txt`.
- Flag obvious spam: directories with AS/TS 2–4, PBN anchor text like "premium pbn network service", and unrelated foreign directories.
- Provide instructions for uploading to Google Search Console.

### Linking + outreach
- Add dataset cards to the `/guides` hub and home page.
- Insert contextual links from the rebuilt Top 20 pages into the new datasets.
- Create a simple outreach tracker (spreadsheet or lightweight admin table) listing 25–50 targets: legal journalists, law-school clinics, plaintiff-lawyer blogs, and data-journalism outlets.

## What I need from you

Only two things can block this plan:
1. **Real sameAs URLs** for `organizationSchema` — LinkedIn page, Crunchbase, etc. If you have them, paste them; otherwise I’ll leave placeholders.
2. **Disavow upload** — I can prepare the file but cannot upload it without your Search Console access.

## Suggested start

Approve this plan and I’ll begin with **Days 1–2: the E-E-A-T byline layer**. It is the fastest, lowest-risk work and immediately improves the trust signal on every rebuilt page.
