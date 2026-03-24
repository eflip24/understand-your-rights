

# Phase 4: AI Content Pipeline + Phase 5: AI & Tech Law Pillar

## Phase 4 — AI Blog Article Generator

### A. Edge Function: `supabase/functions/generate-blog-article/index.ts`

Creates an edge function that uses Lovable AI (via the gateway) to generate SEO-optimized legal blog articles. Accepts:
- `topic` (required) — e.g. "Average Car Accident Settlement in California"
- `target_keyword` (required) — e.g. "car accident settlement california"
- `target_state` (optional) — e.g. "California"

The function generates a 1,500-2,000 word HTML article with:
- H2/H3 structure for featured snippets
- FAQ section (5 questions) for schema markup
- Internal links to existing pillar pages and tools
- "Answer first" format (direct answer in first paragraph, then detail)
- Author attribution and disclaimer

Returns JSON with `{ title, slug, content, excerpt, faqs }`. The article is saved as a draft in `blog_posts` via the service role client.

System prompt will include the site's internal link map (pillar URLs, tool URLs) so the AI naturally weaves in contextual links.

### B. Admin UI: Add "Generate with AI" to `AdminBlogEditor.tsx`

Add a collapsible card at the top of the editor with:
- Topic input field
- Target keyword input field  
- State selector dropdown (optional, all 50 states)
- "Generate Article" button

On click, calls the edge function. On success, pre-fills the title, slug, content, and excerpt fields. The admin can review, edit, and publish normally.

Add loading state with a "Generating..." spinner (generation takes 10-20 seconds).

### C. Config

Add `[functions.generate-blog-article]` with `verify_jwt = false` to `supabase/config.toml` (JWT validated in code like `admin-blog`).

---

## Phase 5 — AI & Tech Law Pillar

### A. Data File: `src/data/aiTechLaw.ts`

Create following the `PillarData` interface with 10 cluster articles:

1. `ai-generated-content-legality` — "Is AI-Generated Content Legal?"
2. `ai-art-ownership` — "Who Owns AI-Generated Art?"
3. `deepfake-laws` — "Deepfake Laws in the US"
4. `data-privacy-rights` — "Your Data Privacy Rights (CCPA & State Laws)"
5. `social-media-legal-issues` — "Social Media Legal Issues You Should Know"
6. `online-defamation` — "Online Defamation — Can You Sue for It?"
7. `crypto-nft-legal-status` — "Crypto & NFT Legal Status in the US"
8. `terms-of-service-enforceability` — "Are Terms of Service Actually Enforceable?"
9. `right-to-repair` — "Right to Repair Laws Explained"
10. `algorithmic-discrimination` — "Algorithmic Discrimination & the Law"

Each cluster includes full HTML content, 3-4 FAQs, and links to relevant existing tools (privacy policy generator, terms of service generator, crypto calculators).

### B. Routing & Navigation

- Add `aiTechLaw` to `pillarDataMap` in `App.tsx`
- Add routes: `/ai-tech-law` and `/ai-tech-law/:slug`
- Add state variant route: `/ai-tech-law/:state/:slug`
- Add "AI & Tech Law" to `navLinks` in `Navbar.tsx`

### C. Sitemap

Update `generate-sitemap` edge function to include AI & Tech Law pillar and cluster URLs in the guides sub-sitemap.

---

## Files Summary

| File | Action |
|---|---|
| `supabase/functions/generate-blog-article/index.ts` | Create — AI article generator edge function |
| `supabase/config.toml` | Edit — add function config |
| `src/pages/admin/AdminBlogEditor.tsx` | Edit — add AI generation card |
| `src/data/aiTechLaw.ts` | Create — AI & Tech Law pillar with 10 clusters |
| `src/App.tsx` | Edit — add aiTechLaw to pillarDataMap + routes |
| `src/components/layout/Navbar.tsx` | Edit — add AI & Tech Law nav link |
| `supabase/functions/generate-sitemap/index.ts` | Edit — add AI & Tech Law URLs |

