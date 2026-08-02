# Growth plan: more qualified visitors, higher ad revenue

## Where the site actually stands (Semrush, US database, today)

| Metric | Value | What it means |
|---|---|---|
| Organic keywords | 52 | Only a tiny fraction of the pages we've built rank at all |
| Estimated organic traffic | ~0/mo | Every ranking sits at position 56-98 — page 6+, effectively invisible |
| Authority Score | 2/100 | Brand-new-site territory |
| Referring domains | 116 | Mostly low-quality directories and PBN spam, not real citations |

The honest read: we have been shipping page volume for months, and page volume is not the constraint. Google is crawling the site (52 pages surfaced with correct titles) but ranks none of them competitively, because the domain has almost no authority and the content is spread thin across thousands of near-identical programmatic URLs. Adding an eleventh pillar cluster will not change this.

So this plan changes strategy: **stop scaling page count, start concentrating authority and raising revenue per visitor.**

## Three workstreams

### 1. Concentrate, don't expand (weeks 1-2)

- Pick the 20 pages with the best combination of existing position and commercial value (the workers-comp Columbus page at #56, the insurance-clause page, the motorcycle-laws state pages) and rebuild each into a genuinely best-on-the-internet answer: original data tables, worked examples, real carrier/agency specifics, updated dates.
- Add `noindex` to the thinnest programmatic tiers (state fan-outs whose only difference is a swapped state name) so crawl budget and internal link equity flow to the 20 pages instead of being diluted across hundreds of clones. Keep them reachable for users.
- Tighten internal linking so every strengthened page receives links from the home page, its hub, and at least five siblings.

### 2. Earn real authority (ongoing, starts week 1)

Nothing else moves until Authority Score rises off 2.

- Disavow the PBN/directory spam already pointing at the domain.
- Ship two genuinely linkable assets: an annually-updated **state-by-state settlement and deadline dataset** (free, citable, with an embed snippet) and a **legal-fee transparency index**. These are the kind of pages journalists and law-firm blogs cite.
- Add real author identity: named reviewers, credentials, an editorial page that reads like a publisher's, not a template. Google's helpful-content signals for legal (YMYL) topics are strict, and this is currently our weakest area.

### 3. Raise revenue per visitor (week 1 — fastest payback)

This is the highest-leverage short-term work because it does not depend on rankings.

- **Create real AdSense ad units.** Every slot in the ad config currently ships an empty ad-unit ID, so all inventory falls back to generic auto-format. Named units per placement unlock per-placement reporting and better fill.
- **Re-open monetization on pages that deserve it.** The current deny list blocks ads on the whole lawyer directory, which is our most commercially valuable traffic. Replace the blanket block with a content-depth check so substantive directory pages monetize.
- Add a sticky anchor unit on mobile (the majority of legal search traffic) and a sidebar unit on desktop pillar pages.
- Wire the per-result in-tool ad slot (the component exists but is not yet used inside individual calculators) — ads adjacent to a computed settlement number classify into the highest-CPC legal/insurance categories.

## 30-day sequence

| Days | Focus |
|---|---|
| 1-3 | Ad units + deny-list rework + in-tool result slots (revenue, immediate) |
| 4-10 | Choose and rebuild the top 20 pages |
| 11-14 | Noindex thin fan-outs, rewire internal links |
| 15-21 | Build the citable dataset asset + embed widget |
| 22-30 | Author/E-E-A-T layer, disavow file, outreach list for the dataset |

## Technical notes

- Ad unit IDs live in `src/lib/adsense.ts` (`AD_SLOT_IDS`); the deny/allow logic is `shouldShowAds` in the same file.
- `ToolResultAd` already exists in `src/components/tools/` and just needs mounting under each calculator's result block.
- Noindex control belongs in the existing `Head` / `Tier3Head` components, driven by a flag on the fan-out data files.
- Sitemap regeneration runs through the `generate-sitemap` edge function and must be redeployed after any noindex change.

## What I'd start with

Workstream 3, day 1-3. It is a few hours of work, needs no Google patience, and lifts revenue on the traffic we already have while the SEO work compounds.
