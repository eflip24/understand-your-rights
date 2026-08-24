# Fix the ceiling, then win the money keywords

Semrush data for legallyspoken.com (US database, today):

| Metric | Value | Read |
|---|---|---|
| Organic keywords | 57 | Tiny, for a site with thousands of pages |
| Estimated organic traffic | ~0/mo | Nothing ranks on page 1 |
| Best positions | 48–99 | Everything sits on page 5–10 |
| Authority Score | 5/100 | New-site territory |
| Referring domains | 128 | Mostly junk directories and PBN anchors |

The diagnosis: publishing more pages is no longer the bottleneck. The site has huge coverage and near-zero authority, so Google is crawling a lot and trusting little. This plan spends the next cycle on trust, crawl efficiency and a small number of winnable, high-CPC pages instead of new page count.

## Priority 1 — Remove the crawl and trust blockers

1. **Sitemaps are served from the backend host, not legallyspoken.com.** `public/sitemap.xml` is an index whose 14 shards all point at `*.supabase.co` URLs. Cross-host sitemap entries are treated as unverified and largely discounted. Fix: serve every shard from `https://legallyspoken.com/sitemaps/{type}.xml` (rewrite/proxy to the existing function), so the index and all URLs share one host.
2. **Toxic anchor profile.** Anchors include "buy backlinks online cheap" and "premium PBN network". Compile a disavow file from the spam referring domains so the paid-link footprint stops suppressing the whole domain.
3. **Prune and consolidate thin programmatic pages.** Any city/state/locale page with no unique data beyond a template gets `noindex` (or is merged into its parent hub). Fewer, stronger indexable URLs is the fastest way to lift the pages that can actually rank.

## Priority 2 — Win the high-CPC calculators that are already winnable

Semrush says these are low difficulty and commercially valuable, and the site already has a tool for each — they just aren't competitive pages yet.

| Target keyword | Volume | CPC | Difficulty | Existing page |
|---|---|---|---|---|
| pain and suffering calculator | 1,600/mo | $8.15 | 12 (very easy) | pain & suffering tool |
| workers comp settlement calculator | 1,300/mo | $3.16 | 12 (very easy) | workers comp calculator |
| severance pay calculator | 1,900/mo | $2.95 | 28 (easy) | severance calculator |
| statute of limitations by state | 12,100/mo | $4.20 | 36 (possible) | SOL dataset |

The page-1 results for these are small law-firm pages and single-purpose calculator sites — beatable with a better tool. For each: rebuild as a dedicated money page with the calculator above the fold, a worked example with real numbers, a multiplier/state comparison table, a printable result, and internal links from every related pillar. High-CPC ad slots sit directly under the result, where intent peaks.

## Priority 3 — Rescue the near-misses

Pages ranking 48–74 need depth, not replacement:

- `/legal-clauses` — ranks 67 for "legal clause example" (KD 22) and is already visible for "clause of the contract" (1,600/mo). Split into individual clause pages with sample language, when-to-use, and negotiation notes.
- `/lawyer-near-me/workers-compensation/ohio/columbus` (56), `/personal-injury-law/wyoming/nursing-home-abuse` (53), `/criminal-law/maine/drug-charges` (48) — these prove the local template can rank; add filing venues, deadlines and local court data to the ones with real search demand and noindex the rest.

## Priority 4 — Earn links instead of buying them

The one asset type that reliably attracts legal citations is original data. Ship one linkable study per month, pitched to legal and local news:

1. Statute-of-limitations deadline tracker (already built) — promote it as a citable reference with an embeddable widget.
2. A 51-state filing-fee and small-claims-limit index with yearly change tracking.
3. An annual "cost of a legal claim" report combining filing fees, contingency norms and settlement timelines.

## Priority 5 — New topic coverage worth building

Researched around current legal search demand, chosen for CPC and low competition rather than volume: AI employment-decision and workplace-surveillance rules, data-breach and biometric-privacy claims, non-compete enforceability after recent rulings, and EU pay-transparency compliance (which also feeds the six-locale EU section already in place).

## Technical notes

- Sitemap host fix: a redirect/proxy layer under `/sitemaps/*` plus updating `public/sitemap.xml`; the existing edge function keeps generating the XML.
- Pruning uses the existing `noindex` support in `Head` / `Tier3Head`; no new SEO plumbing needed.
- Money-page rebuilds extend the current `ToolPageLayout` and JSON-LD graph pattern (SoftwareApplication + FAQ + Breadcrumb), with `AdSlot` placement kept to the post-result position.
- Head tags are set client-side, so social crawlers see only the static `index.html` head. If per-page social previews and server-rendered content matter, the app can get SSR by upgrading to Lovable's latest template — type "/" in chat and choose "Migrate to TanStack Start", or ask me to do it ([what the upgrade gives you](https://lovable.dev/blog/building-apps-using-tanstack-start)).

## Order

Priority 1 first (it gates everything else), then the four calculator money pages, then near-miss rescues, then the link assets and new topic clusters.
