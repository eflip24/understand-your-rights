# Recover search visibility, then grow again

## Where we stand (Google, 2 Sep – 29 Sep vs previous 28 days)

| Measure | Now | Before |
|---|---|---|
| Times shown in Google | 350 | 2,830 |
| Clicks | 0 | 6 |
| Average position | 52.6 | 74.8 |

The homepage is still indexed and crawled normally (23 Sep), so the site is not blocked or penalised as far as Google reports. But showings fell about 88%. The better average position mostly reflects that only the stronger pages are still shown.

The cause is not confirmed yet. The most likely suspect: in September we hid about 5,200 thin state pages from Google and removed 4,644 from the sitemap. Those pages carried most of the long-tail showings (for example "denied life insurance claim attorneys" by state). The new blog articles and Spain guide may also not be live yet if they were never published.

## Step 1 — Find the real cause (no guessing)
- Pull page-level Search Console data for both periods and compare which pages lost showings.
- Group the losses: hidden thin pages, translated pages, lawyer pages, other.
- Check whether the September work (Spain guide, eight blog articles, ad units, sitemap cleanup) is actually live on legallyspoken.com.
- Check Google's indexed status for a sample of lost pages and new articles.

## Step 2 — Bring back the pages that were earning showings
- Any hidden page that had real showings gets restored to the sitemap and made indexable, with extra state-specific detail added so it is not thin.
- Keep hiding only pages that had zero showings.
- Make the cleanup rule use real Search Console data, not just a word count.

## Step 3 — Publish and get new pages discovered
- Publish pending work, resubmit the sitemap, and confirm new blog articles and the Spain guide appear in it.
- Link each new article from the homepage, blog hub and related guides.

## Step 4 — Turn showings into clicks
- Rewrite titles and descriptions for pages already on page 1–2 (about, contact, blog, Colorado employment law article, New Hampshire motorcycle page) and the five near-miss pages.
- Add one original table to each near-miss page.

## Step 5 — Continue the open plan once stable
Blog translations (needs AI credits), Spain cluster entry pages, new calculators, citable data page.

## Technical notes
- Search Console comparison via searchAnalytics/query with page dimension, two date ranges.
- Restoration edits `scripts/prune-thin-sitemap-urls.mjs` (allowlist of URLs with impressions) and the `contentDepth.ts` noindex gates on StateClusterArticlePage / PillarStateFanoutPage.
- Sitemap resubmission via the Search Console sitemaps endpoint after publish.
