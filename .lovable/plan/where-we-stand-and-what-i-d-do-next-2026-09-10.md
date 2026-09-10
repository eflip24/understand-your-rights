# Where we stand, and what I'd do next

## Today's numbers (Google Search Console, 11 Aug – 7 Sep)

| Measure | Now | Previous 28 days |
|---|---|---|
| Times shown in Google | 2,787 | 838 |
| Clicks | 5 | 5 |
| Average position | 74.8 | 70.1 |

The homepage is indexed, crawled fine (6 Sep), and the sitemap files are
all present and pointing at legallyspoken.com. Nothing is broken.

The honest read: Google is showing the site more than three times as
often, but almost always on page 5–8, where nobody clicks. More pages
will not fix that. Ranking the pages we already have will.

Ad units: the seven AdSense unit IDs are wired into the code but have
not gone live yet — they only start earning after the next publish.

## What's actually holding us back

1. **Scale without strength.** The sitemap lists roughly 12,400 URLs,
   5,250 of them state fan-out pages. Very few earn anything. A site
   this wide with this little authority gets crawled thinly and ranked
   low across the board.
2. **The few pages with real signals are being ignored.** A handful sit
   in genuinely winnable spots: South Carolina severance (position 18),
   Ohio domestic violence (47), Colorado subrogation (55). Those move
   with one round of work each.
3. **Spain/expat demand is real and mostly foreign-language.** Dozens of
   impressions a month for Danish, Norwegian, Dutch and Spanish searches
   for a lawyer in Spain — the page exists but doesn't speak to them.
4. **No revenue measurement yet.** Our ad tracking table is still empty,
   so we can't say which page types earn.

## Plan

### Step 1 — Publish, then confirm ads are really showing
Publish so the seven ad units go live, then check a guide page, a
calculator result and a mobile view to confirm ads render and get
recorded. Without this the whole revenue side stays theoretical.

### Step 2 — Shrink the index to what can win
- Check every state fan-out page in the sitemap against the depth rule
  that already decides whether a page is indexable, and remove from the
  sitemap any page we are telling Google not to index.
- Report how many pages remain. Target: a few thousand strong pages
  rather than twelve thousand weak ones.

### Step 3 — Win the near-miss pages (highest short-term return)
For each page ranking 8–40 with real impressions:
- Retitle around the exact phrase it earns impressions for.
- Answer the sub-questions from the query report as real sections.
- Add one original table or figure competitors don't have.
- Link into it from stronger related pages.
Starting set: SC severance agreements, Ohio/NY domestic violence
charges, Colorado subrogation, the tools hub, the German stock-option
tax calculator.

### Step 4 — Own the Spain / expat lawyer demand
Build out the Spain page for foreign nationals and add matching
Norwegian/Danish/Dutch-facing entry points, since that is the one
audience already searching for us in volume.

### Step 5 — Finish the fact-check backlog
Still unverified: court filing fees and small-claims limits, workers'
comp caps, eviction, alimony, probate and DUI state rules, and the six
international calculators. Each gets checked against the official
source, corrected, and stamped with a checked-on date.

### Step 6 — Authority
Position 75 across thousands of pages is a trust problem, not a content
problem. Package the original datasets (filing fees, deadlines, caps) as
citable resources and pitch them — this is the only lever that lifts
everything at once.

## Technical notes

- Sitemap shards live in `public/sitemaps/`; `src/lib/contentDepth.ts`
  holds the `FANOUT_MIN_UNIQUE_CHARS` gate. Step 2 makes the shard
  generator honour that gate so sitemap and robots meta agree.
- Ad slot IDs are in `src/lib/adsense.ts`; `anchor-mobile` stays on
  Google Auto ads. Impressions/clicks land in `ad_events`.
- Near-miss rewrites use the existing depth-block components rather than
  new page templates.

## Order

1. Publish and verify ads.
2. Sitemap/index cleanup.
3. Near-miss page rebuilds.
4. Spain/expat expansion.
5. Fact-check the remaining datasets.
6. Authority outreach assets.
