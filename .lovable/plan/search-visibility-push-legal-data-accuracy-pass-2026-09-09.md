# Search visibility push + legal data accuracy pass

Two workstreams, run together so findings from one feed the other.

## Workstream A — Get near-page-one pages onto page one

Right now the site gets thousands of impressions but almost no clicks, because
the average ranking position is around 75. The fix is not more pages — it is
making the pages Google already shows stronger.

1. Pull the full Search Console query and page report for the last 28 days
   (top pages, top queries, position, impressions, clicks).
2. Build a ranked "striking distance" list: pages ranking positions 8–35 with
   real impressions. Those are the ones a single round of work can move.
3. For each of the top pages on that list, do a focused rebuild:
   - Rewrite the page title and description around the exact query Search
     Console shows it earns impressions for.
   - Add the missing sub-questions from the query report as real answered
     sections, not filler.
   - Add one original data table or calculation the competing pages lack.
   - Add links from stronger related pages into it, and out to its siblings.
4. Separately list pages with high impressions but a very poor click rate —
   usually a title problem, fixed in minutes.
5. Save the ranked list as a working file so progress is trackable between
   sessions, and re-check positions after the pass.

## Workstream B — Fact-check every legal number on the site

The site publishes filing fees, deadlines, compensation caps and calculator
rules for the US states plus six countries. Anything wrong here is both a
trust problem and a ranking problem.

Datasets to verify, in priority order (most-trafficked and most-quoted first):

| Priority | Data | What gets checked |
|---|---|---|
| 1 | Court filing fees and small claims limits | Fee amounts, claim ceilings per state |
| 2 | Claim deadlines (statutes of limitation) | Years per claim type per state |
| 3 | Workers' comp settlement rules | Weekly caps, fee percentages, waiting periods |
| 4 | Pain and suffering caps | Which states cap, amounts, exceptions |
| 5 | International calculators | Notice periods, severance formulas, court fees for UK, Ireland, Canada, Australia, New Zealand, South Africa |
| 6 | Eviction, alimony, probate, DUI state rules | Timing, thresholds, penalties |

For each dataset:
- Check each figure against the official source (court system, labour
  authority, state statute), recording the source URL and the date checked.
- Correct anything wrong, and flag anything that cannot be confirmed rather
  than leaving a confident wrong number.
- Add a visible "checked on" date and source link on the pages that display
  the figures, since Google rewards that on money pages.

## Cross-referencing so nothing is missed

- Every dataset is checked against the pages that render it, so a corrected
  number updates everywhere it appears, including calculators, guides and
  downloadable files.
- Every page in the site's guide list is checked for: correct title, a
  question-and-answer block, an author credit, a checked-on date, and links in
  and out. Gaps get filled.
- Every page and dataset is confirmed present in the sitemap and reachable
  from a menu or hub page.
- Ad placements are confirmed present on the rebuilt pages, so the traffic
  gained is actually earning.

## Technical notes

- Search Console data is read through the connected property; no new pages are
  created from it, only existing ones improved.
- Data files under `src/data` (including `courts/`) are the single source for
  the figures; components read from them, so corrections are made there.
- A `content/` tracking file records the striking-distance list and the
  fact-check status per dataset with source URLs and dates.
- Structured data on corrected pages gets a `dateModified` refresh so the
  update is visible to Google.

## Order of work

1. Search Console pull and striking-distance list.
2. Title and description fixes for the high-impression, low-click pages (fast wins).
3. Fact-check datasets 1–3, correcting as we go.
4. Deep rebuild of the top striking-distance pages.
5. Fact-check datasets 4–6.
6. Final cross-reference sweep: sitemap, links, ads, dates.
