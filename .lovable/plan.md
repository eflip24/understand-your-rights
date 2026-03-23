

# SEO & Growth: Next Steps to Drive Traffic and Revenue

## Current State Assessment

The site has strong bones: 200+ indexable pages, structured data, internal linking, pillar/cluster architecture, and a local lawyers directory with 1,500+ city permutations. But several technical and content gaps are limiting Google's ability to crawl, render, and rank these pages.

## Priority Actions (ordered by impact)

---

### 1. Fix Crawlability — The Site is an SPA

**The single biggest issue.** Google renders JavaScript but deprioritizes it. Your pages rely on client-side React rendering, meaning Googlebot must queue pages for a second rendering pass. Many pages may never get fully rendered.

**Fix**: Add a lightweight prerender middleware via a backend function that detects bot user agents and serves pre-rendered HTML. Alternatively, add `<meta name="fragment" content="!">` and ensure the sitemap is actively submitted.

**Practical step for now**: Generate a static `index.html` fallback with critical meta tags, and ensure the sitemap edge function is being called and cached at `/sitemap.xml`. Currently `public/sitemap.xml` is static — it should redirect or proxy to the edge function.

### 2. Split Sitemap into Sitemap Index

The current sitemap generates 1,500+ URLs in a single file. Google recommends splitting large sitemaps into a sitemap index with multiple sub-sitemaps (max 50K URLs each, but smaller is better for crawl efficiency).

**Fix**: Update the edge function to generate a sitemap index pointing to category-specific sitemaps:
- `/sitemap-tools.xml` — 100+ tool pages
- `/sitemap-legal-terms.xml` — 80+ legal term pages
- `/sitemap-guides.xml` — pillar + cluster articles
- `/sitemap-lawyers.xml` — 1,500+ local lawyer pages
- `/sitemap-blog.xml` — dynamic blog posts

### 3. Add `robots` Meta Tag on All Public Pages

Currently, the `Head` component only sets `robots` meta when `noindex` is true. For indexable pages, no `robots` meta exists — which is fine by default but explicit `index, follow` signals help when pages have been previously deindexed or are new.

**Fix**: Add `<meta name="robots" content="index, follow">` on all public pages.

### 4. Fix Remaining Stale JsonLd Usage

`LocalLawyersDirectory.tsx` still uses the old `JsonLd` component (not `JsonLdGraph`), which can produce duplicate schemas. Same check needed for `LocalLawyersAreaPage`, `LocalLawyersStatePage`.

### 5. Improve Core Web Vitals

- **LCP**: The hero section loads category images. Add `fetchpriority="high"` to the hero image and `width`/`height` attributes to prevent layout shift.
- **CLS**: Add explicit dimensions to all `<img>` tags and skeleton placeholders for lazy-loaded content.
- **INP**: The search input on home triggers navigation — ensure it's debounced.

### 6. Add Blog Content Pipeline

The blog is the fastest way to drive organic traffic. The admin panel exists but needs a content strategy:
- Target long-tail questions (e.g., "can I sue for a car accident in Texas")
- Each blog post should link to 2-3 tools and 1 pillar page
- Publish 2-4 posts per week targeting different keyword clusters

**Technical fix**: Add a "Related Tools" section to `BlogPostPage.tsx` that automatically suggests tools based on blog category tags.

### 7. Add Page-Level Performance Signals

Google rewards pages with strong E-E-A-T signals:
- Add "Last updated: {date}" to cluster articles and legal term pages
- Add reading time estimates to article pages
- Add author attribution (even if generic like "LegallySpoken Editorial Team")
- Add a "Sources" section to cluster articles

---

## Files to Edit

| File | Change |
|---|---|
| `src/components/seo/Head.tsx` | Add explicit `index, follow` robots meta on public pages |
| `src/pages/LocalLawyersDirectory.tsx` | Migrate to `JsonLdGraph` |
| `src/pages/LocalLawyersAreaPage.tsx` | Migrate to `JsonLdGraph` |
| `src/pages/LocalLawyersStatePage.tsx` | Migrate to `JsonLdGraph` |
| `supabase/functions/generate-sitemap/index.ts` | Split into sitemap index with sub-sitemaps |
| `public/sitemap.xml` | Replace with redirect/reference to edge function |
| `src/pages/ClusterArticlePage.tsx` | Add "Last updated", reading time, author line |
| `src/pages/BlogPostPage.tsx` | Add "Related Tools" section based on category |
| `src/pages/HomePage.tsx` | Add `fetchpriority="high"` to hero images |
| `index.html` | Add fallback meta tags for bots that don't execute JS |

## Revenue Acceleration

Once traffic grows:
1. The AdSense placements are already strategic (post-result on calculators is highest RPM)
2. Add exit-intent email capture on pillar pages to build a mailing list
3. Consider affiliate links in the "Find a Lawyer" directory (lawyer referral networks pay $50-200 per lead)
4. Add a "Get a Free Consultation" CTA that links to partner law firms

