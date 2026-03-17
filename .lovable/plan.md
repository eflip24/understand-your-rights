

# Site Expansion Map — High-CPC Legal Categories

## Current Architecture Summary

The site has 9 tool categories under `/tools/:category/:tool`, plus `/legal-terms/:slug`, `/legal-clauses/:slug`, `/contract-types/:slug`, and `/blog/:slug`. All content pages use `ContentPageLayout` with `Head` for SEO and `JsonLd` for structured data. Data is driven by static TypeScript arrays in `src/data/`.

---

## 1. URL Structure — No Conflicts

New top-level directories that don't collide with anything existing:

```text
/auto-accident-law/                    ← Pillar page
/auto-accident-law/:slug               ← Cluster articles

/personal-injury-law/                  ← Pillar page
/personal-injury-law/:slug             ← Cluster articles

/insurance-law/                        ← Pillar page
/insurance-law/:slug                   ← Cluster articles

/local-lawyers/                        ← Directory page
/local-lawyers/:state                  ← State page
/local-lawyers/:state/:city            ← City page

/tools/                                ← Already exists (no change)
```

No conflicts: existing routes are `/tools`, `/legal-terms`, `/legal-clauses`, `/contract-types`, `/blog`.

---

## 2. Pillar + Cluster Strategy

### A. Auto Accident Law (`/auto-accident-law/`)
**Pillar**: "Complete Guide to Auto Accident Law — Know Your Rights After a Car Crash"

| # | Cluster Topic | Slug |
|---|--------------|------|
| 1 | What to Do Immediately After a Car Accident | what-to-do-after-car-accident |
| 2 | How Fault Is Determined in Car Accidents | how-fault-is-determined |
| 3 | No-Fault vs. At-Fault States Explained | no-fault-vs-at-fault-states |
| 4 | How to File an Auto Accident Insurance Claim | filing-insurance-claim |
| 5 | Statute of Limitations for Car Accident Lawsuits | statute-of-limitations |
| 6 | Understanding Comparative Negligence | comparative-negligence |
| 7 | Uninsured & Underinsured Motorist Claims | uninsured-motorist-claims |
| 8 | How Much Is My Car Accident Case Worth? | car-accident-case-value |
| 9 | Rideshare Accident Claims (Uber/Lyft) | rideshare-accident-claims |
| 10 | Hit and Run Accidents — Legal Steps | hit-and-run-legal-steps |

### B. Personal Injury Law (`/personal-injury-law/`)
**Pillar**: "Personal Injury Law 101 — How Claims Work & What You Can Recover"

| # | Cluster Topic | Slug |
|---|--------------|------|
| 1 | Types of Personal Injury Cases | types-of-cases |
| 2 | How Personal Injury Settlements Work | how-settlements-work |
| 3 | Pain and Suffering Calculator Guide | pain-and-suffering-calculator |
| 4 | Medical Malpractice Basics | medical-malpractice |
| 5 | Slip and Fall Liability Explained | slip-and-fall-liability |
| 6 | Dog Bite Laws by State | dog-bite-laws |
| 7 | Workers Compensation vs. Personal Injury | workers-comp-vs-pi |
| 8 | Product Liability Claims | product-liability |
| 9 | Wrongful Death Claims Explained | wrongful-death-claims |
| 10 | How Contingency Fees Work | contingency-fees |

### C. Insurance Law (`/insurance-law/`)
**Pillar**: "Insurance Law Guide — Understand Your Policy, Your Rights & How to Fight Denials"

| # | Cluster Topic | Slug |
|---|--------------|------|
| 1 | How to Appeal a Denied Insurance Claim | appeal-denied-claim |
| 2 | Bad Faith Insurance Practices | bad-faith-insurance |
| 3 | Understanding Your Homeowners Policy | homeowners-policy-guide |
| 4 | Health Insurance Denial Rights | health-insurance-denial |
| 5 | Life Insurance Claim Disputes | life-insurance-disputes |
| 6 | Auto Insurance Coverage Types Explained | auto-coverage-types |
| 7 | Insurance Subrogation Explained | subrogation-explained |
| 8 | How to File a Complaint Against an Insurer | file-complaint-against-insurer |
| 9 | Umbrella Insurance — Do You Need It? | umbrella-insurance |
| 10 | Insurance Fraud — What Counts & Penalties | insurance-fraud |

### D. Local Lawyers (`/local-lawyers/`)
**Pillar**: Directory landing — "Find a Lawyer Near You — Free Local Attorney Directory"

| # | Cluster Topic | Slug |
|---|--------------|------|
| 1 | Personal Injury Lawyers Near Me | personal-injury |
| 2 | Car Accident Lawyers Near Me | car-accident |
| 3 | Workers Compensation Lawyers | workers-compensation |
| 4 | Employment Lawyers Near Me | employment |
| 5 | Insurance Dispute Lawyers | insurance-dispute |
| 6 | Real Estate Lawyers Near Me | real-estate |
| 7 | Family Law Attorneys | family-law |
| 8 | Bankruptcy Lawyers Near Me | bankruptcy |
| 9 | Criminal Defense Lawyers | criminal-defense |
| 10 | Immigration Lawyers Near Me | immigration |

These become practice-area sub-directories: `/local-lawyers/personal-injury`, with state/city nesting later.

---

## 3. SEO Templates

### Title Templates
```text
Pillar:    {Topic} — Free Legal Guide | LegallySpoken
Cluster:   {Article Title} — {Category} Guide | LegallySpoken
Lawyers:   Find a {Practice Area} Lawyer Near You | LegallySpoken
State:     {Practice Area} Lawyers in {State} | LegallySpoken
```

### Meta Description Templates
```text
Pillar:    "Learn about {topic} in plain English. Free tools, state-specific info, and FAQs. No lawyer required to get started."
Cluster:   "{One-sentence summary of article}. Includes examples, state laws, and free calculators."
Lawyers:   "Browse verified {practice area} lawyers near you. Compare ratings, read reviews, and get free consultations."
```

### Canonical & OG
All pages use the existing `Head` component — canonical auto-set from `useLocation`. OG type = `article` for cluster pages, `website` for pillars.

---

## 4. Implementation Architecture

### Data Layer
Create one data file per new category:

```text
src/data/autoAccidentLaw.ts      ← pillar content + 10 cluster definitions
src/data/personalInjuryLaw.ts
src/data/insuranceLaw.ts
src/data/localLawyers.ts         ← practice areas + state/city data
```

Each exports a pillar object and a `clusters` array with `slug`, `title`, `metaDescription`, `content` (markdown/JSX), `faqs`, and `relatedToolIds` (linking back to existing tools).

### Page Components
Create reusable templates using `ContentPageLayout`:

```text
src/pages/PillarPage.tsx                ← Generic pillar page (table of contents + cluster links)
src/pages/ClusterArticlePage.tsx        ← Generic cluster article renderer
src/pages/LocalLawyersDirectory.tsx     ← Practice-area grid
src/pages/LocalLawyersAreaPage.tsx      ← State list for a practice area
```

### Routes (add to App.tsx)
```text
/auto-accident-law          → PillarPage (autoAccidentLaw data)
/auto-accident-law/:slug    → ClusterArticlePage
/personal-injury-law        → PillarPage
/personal-injury-law/:slug  → ClusterArticlePage
/insurance-law              → PillarPage
/insurance-law/:slug        → ClusterArticlePage
/local-lawyers              → LocalLawyersDirectory
/local-lawyers/:area        → LocalLawyersAreaPage
```

### JSON-LD
- Pillar pages: `Article` + `BreadcrumbList` + `FAQPage`
- Cluster pages: `Article` + `BreadcrumbList` + `FAQPage`
- Lawyer directory: `ItemList` + `BreadcrumbList`

---

## 5. Internal Linking Strategy

```text
┌─────────────────────────────────────────────┐
│                  Homepage                    │
│  (add section: "Legal Guides" with 4 cards) │
└─────┬────────┬────────┬────────┬────────────┘
      │        │        │        │
      ▼        ▼        ▼        ▼
   /auto-   /personal- /insurance- /local-
   accident  injury     law        lawyers
      │        │        │
      ▼        ▼        ▼
   10 cluster articles each
      │        │        │
      └────────┼────────┘
               ▼
   Cross-links to existing:
   • /tools/consumer/statute-of-limitations
   • /tools/consumer/small-claims-checker
   • /tools/finance/compound-interest-calculator
   • /legal-terms/negligence, /legal-terms/damages
   • /legal-clauses/indemnity, /legal-clauses/liability
```

Each cluster article will include a "Related Tools" section linking to 2-3 existing tools, and existing tool pages will get a "Related Guides" section linking back.

### Navbar Update
Add a "Guides" dropdown to the navbar linking to the 4 new pillar pages.

### Footer Update
Add a "Guides" column with links to all 4 new sections.

### Sitemap Update
Add all new URLs to the edge function sitemap generator.

---

## 6. Monetization Map — AdSense Placements

### Content Pages (Pillar + Cluster)
| Placement | Location | Ad Size | Priority |
|-----------|----------|---------|----------|
| Above content | Below H1, above first paragraph | Responsive leaderboard (728x90 / mobile 320x100) | High |
| Mid-content | After 3rd section/heading | In-article native (fluid) | High |
| End-of-article | Below last paragraph, above "Related Tools" | Responsive rectangle (336x280) | Medium |
| Sidebar (desktop) | Sticky right rail on pillar pages | 300x250 or 300x600 | Medium |

### Calculator/Tool Result Pages (existing + new)
| Placement | Location | Notes |
|-----------|----------|-------|
| Post-result | Below calculator output, before "Save" button | Highest RPM position — user attention peak |
| Below FAQ | After FAQ accordion | Good secondary placement |

### Lawyer Directory Pages
| Placement | Location | Notes |
|-----------|----------|-------|
| Between listings | Every 5th listing | Native in-feed ad |
| Above CTA | Before "Request Free Consultation" | High-intent placement |

### Implementation
Create an `<AdSlot>` component that renders a `<div>` with AdSense data attributes, and conditionally shows based on environment. Place it in `ContentPageLayout` and `ToolPageLayout` at the defined positions.

```text
src/components/ads/AdSlot.tsx    ← slot="above-content" | "mid-content" | "post-result" etc.
```

---

## 7. Files to Create/Edit

### New Files
| File | Purpose |
|------|---------|
| `src/data/autoAccidentLaw.ts` | Pillar + 10 cluster data |
| `src/data/personalInjuryLaw.ts` | Pillar + 10 cluster data |
| `src/data/insuranceLaw.ts` | Pillar + 10 cluster data |
| `src/data/localLawyers.ts` | Practice areas + state data |
| `src/pages/PillarPage.tsx` | Generic pillar page component |
| `src/pages/ClusterArticlePage.tsx` | Generic cluster article component |
| `src/pages/LocalLawyersDirectory.tsx` | Lawyer directory landing |
| `src/pages/LocalLawyersAreaPage.tsx` | Practice area page |
| `src/components/ads/AdSlot.tsx` | AdSense placement component |

### Modified Files
| File | Change |
|------|--------|
| `src/App.tsx` | Add 8 new routes |
| `src/components/layout/Navbar.tsx` | Add "Guides" nav link/dropdown |
| `src/components/layout/Footer.tsx` | Add "Guides" column |
| `src/pages/HomePage.tsx` | Add "Legal Guides" section |
| `supabase/functions/generate-sitemap/index.ts` | Add all new URLs |
| `src/components/layout/ContentPageLayout.tsx` | Add optional `AdSlot` placements |
| `src/components/layout/ToolPageLayout.tsx` | Add post-result `AdSlot` |

No existing pages are deleted or relocated.

