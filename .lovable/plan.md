# Bring the homepage up to date with everything shipped

The homepage still reflects the site as it was several sprints ago: tools, practice-area guides, categories and blog. It says nothing about the forms membership, the new high-CPC guide clusters, the free data sets, the court hub, or the case-review capture — and one paragraph now actively contradicts the product ("instead of selling you a subscription... stays free").

## What changes

**1. New "Free legal data sets" band**
Two cards linking the two linkable assets built as authority plays:
- Settlement deadlines by state (51 jurisdictions) — `/data/settlement-deadlines`
- Court filing fees and small-claims limits — `/data/court-filing-fees`
Plus a link to the courts hub (`/courts`). Positioned after "Most used this week", where it also earns internal links to the assets we want cited.

**2. New "Latest guides" band**
Surfaces the recently shipped high-CPC clusters that currently have no homepage entry point:
health insurance claim denied, data breach compensation, AI hiring and workplace surveillance, plus truck accident, workers' comp denial and DUI first offense. Ends with a link to the `/guides` hub.

**3. New membership band**
A single clear section for the unlimited-forms plan: what it includes (every form and pack, watermark-free PDFs, e-signature, saved documents, ad-free), monthly/annual pricing pulled from the same `form_prices` source the pricing page uses so numbers never drift, and a button to `/pricing`. Hidden for people who are already members (the subscription context already exposes this), so members never see an upsell.

**4. Free case review entry point**
A compact call-to-action band pointing to the case-review flow, matching the wording and disclaimers already used on the pillar pages (not legal advice, no attorney-client relationship).

**5. Fix the outdated long-form copy**
Rewrite the "What LegallySpoken actually does for you" section so it is accurate: tools and guides stay free and no-signup; forms can be bought individually or unlocked with an optional membership. Mention the data sets, the court information, the EU calculators and the 6-language coverage.

**6. Situation strip and "most used" refresh**
Add the newer high-intent situations (insurance denied a claim, my data was breached) and swap in a couple of the newer calculators so the shortcuts match what the site is now strongest at.

## Technical notes

- All new sections go in `src/pages/HomePage.tsx` plus small new components under `src/components/home/` following the existing pattern (`HomeSituationStrip`, `MostUsedThisWeek`).
- Links use `useLocalizedPath` so the locale prefixes keep working. New sections carry English copy like the existing `MostUsedThisWeek` and `HomeSituationStrip` sections do — no new translation-key work in this pass; guide/data/membership pages are English-only anyway, so those bands render for the English tree only.
- Membership band reads prices from `form_prices` (kind `subscription`) and hides itself via `useSubscription().isSubscriber`.
- No routing, schema, sitemap or backend changes — homepage presentation only.
