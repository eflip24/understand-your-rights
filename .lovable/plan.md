# Feature Roadmap: Legal Niche Authority + SEO Growth

LegallySpoken already has 100+ tools, blog, lawyer directory, pillar pages, and AI chat. The biggest remaining wins are **content depth, programmatic SEO, trust signals, and engagement loops** — not more one-off tools. Below is a prioritized plan grouped by SEO impact.

---

## Tier 1 — Programmatic SEO Engines (highest traffic ROI)

### 1. "Statute Library" — State × Topic landing pages
Generate pages like `/laws/california/security-deposit-limits`, `/laws/texas/at-will-employment` from a structured dataset.
- ~50 states × ~20 topics = ~1,000 indexable pages
- Each page: plain-English summary, statute citation, related tools, related lawyers, JSON-LD `LegalService` + `FAQPage`
- Reuses existing `stateData.ts`, links into tools and lawyer directory

### 2. "Compare Two States" pages
`/compare/california-vs-texas/non-compete`, etc. High intent, low competition.
- Auto-generated diff tables from the same statute dataset
- Internal links to both single-state pages and the relevant tool

### 3. "Document Library" — Free legal templates as standalone pages
Each existing generator (NDA, Operating Agreement, etc.) gets a paired SEO page:
`/templates/nda-template`, `/templates/llc-operating-agreement`
- Long-form: when to use, what's inside, state nuances, downloadable PDF/DOCX, embedded generator
- Targets high-volume "[document] template" keywords directly

### 4. "Legal Question" Q&A hub
`/answers/can-my-landlord-enter-without-notice`, etc.
- Seed 200 common questions, AI-assist drafts, human review
- Schema: `QAPage` + `FAQPage`; great for Google "People Also Ask"

---

## Tier 2 — Engagement & Conversion Features

### 5. Saved Workspace ("My Legal Folder")
Logged-in users can save tool results, generated docs, and bookmarked guides in one dashboard.
- Boosts return visits, email capture, lawyer-referral conversion
- Already have auth + `SaveAnalysisButton` — extend to a real folder UI

### 6. Document Vault with PDF/DOCX export
Add proper PDF + DOCX export to all generators (NDA, Operating Agreement, POA, etc.) using `pdf-lib` and `docx` packages.
- Major perceived-value upgrade vs. plain-text output
- Adds shareable/printable artifacts → backlinks

### 7. Email-gated "Legal Health Report"
Turn the existing Health Check Quiz into a downloadable personalized PDF report sent by email.
- Builds mailing list (newsletter = recurring traffic)
- Each report links to recommended tools + local lawyers

### 8. Lawyer-match form (lead-gen)
"Describe your situation → get matched with 3 nearby lawyers." Free for users, monetizable later.
- Plays directly into existing lawyer directory + geo pages

---

## Tier 3 — Trust, E-E-A-T & SEO Hygiene

### 9. Author/Reviewer system
Add `Person` schema, author bios, "Reviewed by [JD/Attorney]" badges on every legal article and statute page. Critical for Google's YMYL ranking on legal content.

### 10. Citations & "Last reviewed" dates
Every statute/guide page shows: source citation (link to official `.gov` statute), last reviewed date, change log. Big trust + freshness signal.

### 11. Glossary cross-linking auto-pass
Run `linkifyLegalContent` across blog posts and statute pages on render so every legal term auto-links to its glossary entry. Internal-link graph boost.

### 12. Breadcrumb + HowTo + Speakable schema
Add `BreadcrumbList` site-wide, `HowTo` schema on tool pages, `Speakable` on FAQs (voice search).

---

## Tier 4 — Differentiation Features

### 13. "Plain-English Mode" toggle
Site-wide toggle that re-renders any legal article at a 6th-grade reading level via cached AI rewrite. Unique brand moat — matches the "plain English" identity.

### 14. Deadline/Reminder system
Users save deadlines (eviction notice, statute of limitations, lease renewal) and get email reminders. Sticky feature, builds list.

### 15. Community Q&A (moderated)
Users submit questions; verified attorneys answer. Generates UGC pages → long-tail SEO compounding over time.

### 16. Case Outcome Estimator (AI)
Input situation → ballpark settlement range based on state + claim type, with disclaimer. High-intent traffic from "how much is my X case worth."

---

## Suggested Build Order

```text
Phase 1 (4-6 weeks, biggest SEO lift):
  1. Statute Library (#1)
  2. Document Library SEO pages + PDF/DOCX export (#3, #6)
  3. Author/Reviewer + citations + "Last reviewed" (#9, #10)
  4. Breadcrumb/HowTo/FAQ schema audit (#12)

Phase 2 (engagement + list-building):
  5. Saved Workspace (#5)
  6. Email-gated Health Report (#7)
  7. Q&A hub seeded with 200 questions (#4)

Phase 3 (differentiation + compounding):
  8. Compare-states pages (#2)
  9. Plain-English toggle (#13)
  10. Deadline reminders (#14)
  11. Lawyer-match form (#8)
  12. Community Q&A + Case Estimator (#15, #16)
```

---

## Technical Notes

- All programmatic pages use existing `Head`, `JsonLd`, `ToolPageLayout`/`ContentPageLayout`, and `SmartLocalLink` patterns
- Statute dataset: new `src/data/statutes/{topic}.ts` files keyed by state code; reuse `stateData.ts`
- PDF/DOCX export: add `pdf-lib` + `docx` (client-side, no backend cost)
- Email features: extend Lovable Cloud edge functions; use Resend (already common pattern) or Supabase SMTP
- AI features (#13, #16): reuse `analyze-contract` edge function with new `mode` branches; no new secrets
- Sitemap: extend `generate-sitemap` edge function with new sections (statutes, templates, answers, compare)
- All new pages must include the standard legal disclaimer (per project memory)

---

## Open Questions

1. Which phase do you want to start with — Phase 1 (pure SEO firepower) or jump to a specific feature like Saved Workspace or PDF export?
2. For the Statute Library, OK to seed with the top 20 topics across all 50 states (~1,000 pages) in one batch, or start with 5 topics to validate?
3. Do you want monetization hooks (lawyer-match lead-gen, premium PDF export) baked in from the start, or kept fully free for now?
