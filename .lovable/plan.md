

# Phased Content & SEO Expansion Strategy

## The Opportunity

The site has the technical infrastructure (pillar/cluster architecture, tools, local directory, blog CMS) but lacks **content volume** targeting the high-CPC keywords you've identified. The architecture supports rapid scaling — we just need to fill it.

## Current Assets

- 3 pillar pages with ~10 cluster articles each (~30 total)
- 100+ calculator/tool pages
- 1,500+ local lawyer directory pages (50 states x 30+ cities)
- Blog CMS with admin panel (create/edit/publish)
- State-specific legal data for all 50 states already in `stateData.ts`

## What's Missing

1. **No state-specific article variants** — e.g., "Car Accident Settlement in California" doesn't exist as its own page
2. **No employment law pillar** — huge keyword gap
3. **No criminal law / landlord-tenant / AI law pillars** — the fastest-growing niches
4. **Blog is underutilized** — the CMS exists but needs a content pipeline
5. **No AI-assisted content generation** — manual authoring is the bottleneck

---

## Phase 1: State-Specific Article Engine (Immediate — Week 1-2)

**Goal**: Turn 30 cluster articles into 300+ state-specific pages using existing `stateData.ts`.

### Technical Implementation

1. **Add a new data structure** — `src/data/stateVariants.ts` — mapping each cluster article slug to state-specific content templates that inject real data (SOL, negligence rule, insurance minimums) from `stateData.ts`.

2. **Create `StateClusterArticlePage.tsx`** — a new page component at routes like `/auto-accident-law/california/what-to-do-after-car-accident` that renders the base cluster article content with a state-specific panel showing:
   - Statute of limitations for that state
   - Negligence rule (comparative vs contributory)
   - Minimum auto insurance requirements
   - No-fault status
   - Link to local lawyers in that state

3. **Update `App.tsx`** — add routes: `/:pillar/:state/:slug` for all 3 pillars x 50 states x ~10 clusters = **1,500 new indexable pages**.

4. **Update sitemap edge function** — add `sitemap-state-guides.xml` sub-sitemap for these new URLs.

5. **Add state selector on existing cluster articles** — a dropdown or link grid: "Read this guide for your state →" with links to all 50 state variants.

**Impact**: ~1,500 new pages targeting "[topic] in [state]" queries — the exact pattern that dominates legal search.

---

## Phase 2: New Pillar — Employment Law (Week 2-3)

**Goal**: Add an Employment Law pillar with 12 cluster articles targeting high-demand queries.

### Content Map

Create `src/data/employmentLaw.ts` with clusters:
- `wrongful-termination` — "What Is Wrongful Termination?"
- `at-will-employment` — "Can You Be Fired Without Cause?"
- `workplace-discrimination` — "Can I Sue My Employer for Discrimination?"
- `contractor-vs-employee` — "Contractor vs Employee Rights"
- `overtime-rights` — "Overtime Pay Laws by State"
- `workplace-harassment` — "Sexual Harassment Laws at Work"
- `severance-agreements` — "Understanding Severance Packages"
- `non-compete-agreements` — "Are Non-Competes Enforceable?"
- `whistleblower-protections` — "Whistleblower Rights in the US"
- `wage-theft` — "What to Do About Unpaid Wages"
- `family-medical-leave` — "FMLA Rights Explained"
- `unemployment-benefits` — "How to File for Unemployment"

### Technical Steps
- Create `src/data/employmentLaw.ts` following the `PillarData` interface
- Add routes in `App.tsx` for `/employment-law` and `/employment-law/:slug`
- Update Navbar to include Employment Law under Guides
- Link existing employment tools (overtime calculator, contractor checker, severance calculator)
- Add to sitemap

---

## Phase 3: New Pillars — Criminal Law & Landlord-Tenant (Week 3-4)

### Criminal Law — `src/data/criminalLaw.ts`
Clusters: DUI consequences, felony vs misdemeanor, arrest process, bail/bond, plea bargaining, expungement, drug charges, domestic violence charges, traffic violations, juvenile law

### Landlord-Tenant Law — `src/data/landlordTenantLaw.ts`
Clusters: eviction process, security deposits, lease breaking, tenant rights, landlord responsibilities, rent increase laws, habitability standards, subletting rules, fair housing, repair obligations

### Technical Steps (same pattern)
- New data files following `PillarData` interface
- New routes in `App.tsx`
- State variants automatically available via Phase 1 engine
- Link to existing tools (rent increase calculator, security deposit calculator, move-out checklist)

---

## Phase 4: AI Content Generation Pipeline (Week 4-5)

**Goal**: Use the existing blog CMS + AI to generate and publish high-quality articles at scale.

### Technical Implementation

1. **Create an edge function `generate-blog-article`** that:
   - Accepts a topic, target keyword, and target state
   - Uses AI to generate a 1,500-2,000 word article with H2/H3 structure, FAQ section, and internal links to existing tools/pillars
   - Returns draft content that goes into the blog_posts table as status "draft"

2. **Add a "Generate Article" button in AdminBlogEditor** that:
   - Shows a form: topic, keyword, state (optional)
   - Calls the edge function
   - Pre-fills the editor with the generated content for review/editing before publish

3. **Batch generation** — admin can queue 10-20 articles at once from a keyword list.

**Target**: Generate 15 ready-to-publish blog posts from the keyword list you provided:
- "Average Car Accident Settlement in California (2026 Guide)"
- "What Happens After a DUI Arrest in Texas?"
- "Statute of Limitations for Personal Injury by State"
- etc.

---

## Phase 5: AI & Tech Law Pillar (Week 5-6)

### `src/data/aiTechLaw.ts`
Clusters: AI-generated content legality, AI art ownership, deepfake laws, data privacy rights (CCPA/state laws), social media legal issues, online defamation, crypto/NFT legal status, terms of service enforceability, right to repair, algorithmic discrimination

**This is the fastest-growing niche with the least competition.**

---

## Phase 6: Content Optimization & Revenue (Ongoing)

1. **Add "How Much Is My Case Worth?" interactive estimator** — a new tool page that combines the settlement estimator with state-specific data. Target the highest-CPC keyword cluster.

2. **Lawyer referral CTA** — on all local lawyer pages + state-specific articles, add a "Get a Free Consultation" button (placeholder for future affiliate integration).

3. **Email capture** — add an email signup component to pillar pages: "Get free legal updates for your state."

4. **Programmatic FAQ pages** — generate FAQ pages from the FAQ data already embedded in every cluster article, targeting "People Also Ask" results.

---

## Files Summary

### Phase 1 (State Engine)
| File | Action |
|---|---|
| `src/data/stateVariants.ts` | Create — state-specific content templates |
| `src/pages/StateClusterArticlePage.tsx` | Create — renders state-specific article variant |
| `src/App.tsx` | Edit — add state variant routes |
| `src/pages/ClusterArticlePage.tsx` | Edit — add state selector links |
| `supabase/functions/generate-sitemap/index.ts` | Edit — add state guides sub-sitemap |

### Phase 2 (Employment Law)
| File | Action |
|---|---|
| `src/data/employmentLaw.ts` | Create — employment law pillar + 12 clusters |
| `src/App.tsx` | Edit — add employment law routes |
| `src/components/layout/Navbar.tsx` | Edit — add to navigation |

### Phase 3 (Criminal + Landlord-Tenant)
| File | Action |
|---|---|
| `src/data/criminalLaw.ts` | Create |
| `src/data/landlordTenantLaw.ts` | Create |
| `src/App.tsx` | Edit — add routes |

### Phase 4 (AI Content Pipeline)
| File | Action |
|---|---|
| `supabase/functions/generate-blog-article/index.ts` | Create — AI article generator |
| `src/pages/admin/AdminBlogEditor.tsx` | Edit — add generate button |

### Phase 5 (AI & Tech Law)
| File | Action |
|---|---|
| `src/data/aiTechLaw.ts` | Create |

