# Ad revenue recovery + data accuracy pass

## What I found (verified in the code)

The site currently shows **no ad blocks of our own anywhere**. Every ad
placement we built (above content, mid-article, end of article, after a
calculator result, sidebar, in-feed, mobile anchor) is switched off because
none of the ad-unit IDs are filled in. With those blank, the code
deliberately renders nothing and leaves everything to Google's automatic
placement.

That matches the symptom exactly: visitors steady, earnings falling. Automatic
placement alone puts fewer, less valuable ads on long guide and calculator
pages, and it ignores the best-earning spot on this site — right under a
calculator result, where intent is highest.

Two other things worth checking as part of the same pass:
- Earnings data from our own ad tracking could not be read right now (the
  database was waking up), so the size of the drop is still unmeasured.
- A lot of legal figures on the site (filing fees, deadlines, caps, notice
  periods, international numbers) carry dates and have never been re-checked.

## Plan

### 1. Turn our own ad placements back on
- Add the eight ad unit IDs so each placement is a real, reportable unit.
  You create these once in AdSense (Display ad units); I wire them up.
- Keep automatic ads on alongside them, with our own units taking the key
  positions.
- Re-check that ads are suppressed where they should be (account pages,
  bare index pages, paying members) and shown on all money pages.

### 2. Put ads where the money is
- Result-adjacent placement on every calculator (after the number appears).
- Mid-article and end-of-article on all high-value guides.
- Sticky mobile anchor, since most traffic is phone traffic.
- Sidebar on desktop guide pages.

### 3. Measure before and after
- Read our stored ad impression/click data once the database is up, break it
  down by page type, and identify which page groups lost the most.
- Compare against Search Console traffic for the same weeks to confirm the
  drop is earnings-per-visitor, not a traffic-mix change.
- Report the findings plainly, with numbers.

### 4. Fact-check pass on the data-heavy pages
Priority order, highest-traffic first:
- Court filing fees and small claims limits (all states)
- Filing deadlines dataset
- Workers' comp caps and fee rules
- Pain and suffering caps
- International notice periods and small claims fees (6 countries)

For each: re-check against the official source, update the number, update the
"checked on" date, and log anything that changed.

### 5. Content refresh where earnings dropped most
Once step 3 names the weakest page groups, refresh those pages: current-year
figures, new questions, stronger internal links to the related calculators.

## Technical notes

- `src/lib/adsense.ts` — `AUTO_ADS_ONLY` evaluates true because every
  `VITE_ADSENSE_SLOT_*` env var is empty, so `AdSlot` returns `null` on all
  pages. Fix by supplying the slot IDs (env vars or literals).
- Consent defaults to advertising allowed when no CMP is present, so consent
  is not the cause.
- Ad performance data lives in `public.ad_events`; query by page type once the
  backend responds.
- Fact-check targets: `src/data/courts/stateCourts.ts`,
  `settlementDeadlineDataset.ts`, `workersCompSettlementRules.ts`,
  `painSufferingCaps.ts`, `internationalCalculators.ts`.

## What I need from you

The eight AdSense ad unit IDs (or permission to run the placements as
auto-format units without per-slot reporting, which still restores the ads
but loses the per-position revenue breakdown).
