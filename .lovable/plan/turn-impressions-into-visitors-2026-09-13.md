# Turn impressions into visitors

Google now shows the site 2,684 times a month (up from 886), but only 5 people
click. Average position is 74 — page 7. More pages will not fix that. The plan
concentrates effort where Google already shows real interest.

## What the data actually says

- The only pages earning clicks are deep, specific ones: South Carolina
  severance (position 18), the German stock-option tax calculator (30),
  Ohio and New York domestic violence charges, Colorado subrogation.
- The single biggest impression cluster is not US law at all — it is people in
  Scandinavia, the Netherlands and Spain searching for a lawyer in Spain
  ("advokat i spanien", "advocaat spaanstalig", "abogado spain"). Dozens of
  impressions, zero clicks, position ~87.
- US "18 wheeler accident lawyer <city>" queries appear at positions 88-100:
  shown, but far too weak to win.
- Roughly 13,000 URLs are in the sitemap against a tiny amount of authority.

Conclusion: win narrow, deep, low-competition clusters first; stop spreading
thin across 13,000 near-identical pages.

## Workstream 1 — Own the "lawyer in Spain" cluster (highest-signal opportunity)

Google is already showing the site for this in five languages. Nobody is
clicking because the pages are generic directory stubs.

- Build a genuine "Finding an English-speaking lawyer in Spain" guide: how the
  Spanish bar (Colegio de Abogados) registration works, how to verify a lawyer,
  typical fees, NIE/property/inheritance/dismissal scenarios, what to do when
  you don't speak Spanish.
- Add Nordic and Dutch language entry points for the exact queries seen
  (Danish/Swedish/Norwegian/Dutch), since those are the searches with volume.
- Add the Spanish-region city pages real substance: which courts serve them,
  filing fees, language support, expat population notes.
- Cross-link from the EU employment and small-claims calculators.

## Workstream 2 — Rebuild the five pages that already earn clicks

For South Carolina severance, Ohio and New York domestic violence, Colorado
subrogation, and the German stock-option calculator:

- Rewrite title and description around the exact query each already earns
  impressions for.
- Add the sub-questions people search as answered sections.
- Add one original table per page (penalty ranges, deadlines, tax bands).
- Link the strongest related pages into them.

These sit at positions 18-61 — the only pages within realistic striking
distance of page one.

## Workstream 3 — Cut the dead weight

- Extend the existing thin-page pruning beyond state guides to the other
  fan-out sets (lawyer city pages, translated glossary pages), so the sitemap
  lists only pages with genuine unique content.
- Consolidate near-duplicate city/lawyer pages into stronger regional pages
  where the underlying data is identical.
- Target: a sitemap of a few thousand strong URLs instead of 13,000 weak ones.

## Workstream 4 — Titles and descriptions sweep (fast, cheap)

Every page currently shown by Google gets a title written for the human
scanning results, not the crawler: the outcome, the jurisdiction, the number.
Applied first to the pages with impressions but zero clicks.

## Workstream 5 — New tools worth linking to

Tools are what earn links and repeat visits. Next three, chosen for search
demand and ad value:

| Tool | Why |
|---|---|
| Spain dismissal and severance calculator (multi-language) | Feeds Workstream 1's audience directly |
| Truck accident claim value estimator | Matches the 18-wheeler queries already appearing |
| Small claims cost and deadline checker by country | Extends existing court-fee data |

## Workstream 6 — Authority

Impressions without clicks at position 74 is an authority problem as much as a
content one. Ongoing: publish the court filing-fee and settlement-deadline
datasets as citable resources, with clean CSV downloads and a stable URL, and
pitch them to legal-aid and consumer sites as reference material.

## Technical notes

- Pruning reuses `src/lib/contentDepth.ts` and the existing
  `scripts/prune-thin-sitemap-urls.mjs` pattern, extended to further URL sets.
- Spain content lives in `src/data/eu/` (countries, cities, lawyerListings.eu,
  countryExpatDepth); new locales follow the existing i18n route conventions
  and hreflang scope rules.
- Rebuilt pages get refreshed `dateModified`, author byline and FAQ JSON-LD.
- Every rebuilt page is checked for ad placements so gained traffic earns.

## Order of work

1. Workstream 2 (five click-earning pages) — fastest measurable movement.
2. Workstream 4 (title/description sweep).
3. Workstream 1 (Spain cluster) — the biggest single opportunity.
4. Workstream 3 (prune and consolidate).
5. Workstream 5 (tools), then 6 (authority) as ongoing.
