
# Fix AdSense "Low value content" rejection for legallyspoken.com

Google's "Low value content" rejection for a Vite SPA almost always comes from a mix of:

1. **The crawler sees an empty page.** legallyspoken.com is a pure client-side React app — `view-source:` shows just `<div id="root"></div>`. Googlebot's AdSense crawler is much stricter than Search; it often does not execute JS and concludes "no content".
2. **Ad slots on thin / auto-generated pages.** AdSense flags sites that monetize programmatic pages with little unique text (our `/lawyer-near-me/...`, `/lawyer-eu/...`, state cluster pages, English-fallback EU pages).
3. **Missing or weak trust pages** (Contact, robust About, clear ownership).
4. **Ads loading before the user has anything to read** — homepage and directory pages with mostly links and cards.

This plan addresses all four. No design changes; only what's needed to pass review.

## 1. Make content visible to the AdSense crawler (biggest win)

Add static prerendering at build time so each public route ships real HTML, not an empty root div.

- Add `vite-react-ssg` (drop-in for Vite + React Router) OR `react-snap` as a `postbuild` step.
- Prerender the **content-rich, monetized routes** only — homepage, all pillar pages, all cluster articles, all state cluster articles, all legal terms / clauses / contract types, all blog posts, all tool pages, About, Disclaimer, Privacy, Terms, Contact.
- Skip prerendering for `/dashboard`, `/admin/*`, `/login`, `/signup`, `/reset-password`, `/forgot-password`.
- Each prerendered HTML must contain the page's `<title>`, meta description, H1, body copy and JSON-LD before hydration.

This single change is what typically unblocks AdSense for Lovable/Vite SPAs.

## 2. Gate ads to pages with real content

Edit `src/components/ads/AdSlot.tsx` so it only renders when:

- The user has given consent **and**
- The current route is in an allow-list of "content pages" (pillar, cluster, blog post, legal term/clause, contract type, statute, tool result pages).

Remove `<AdSlot>` from:

- `ContentPageLayout` directory-style pages that render mostly cards (legal terms directory, clauses directory, tools directory, blog index, lawyer directories).
- All `lawyer-near-me/*` and `lawyer-eu/*` pages (these are link-hub pages — exactly what AdSense flags).
- EU pages currently showing the `PillarLocaleFallbackBanner` (English fallback = "thin localized content" in Google's eyes).

Keep ads on: pillar pages, cluster articles, blog posts, legal term/clause/contract-type detail pages, statute pages, tool detail pages (after the tool result, not above the fold).

## 3. Noindex the remaining thin / auto-generated pages

In `Head` / `Tier3Head`, add a `noindex` flag and set it on:

- All `/lawyer-near-me/:area/:state/:city` pages where we have **zero** listings (currently many).
- All `/lawyer-eu/...` city pages without listings.
- Programmatic state cluster pages that contain only the generic template (no state-specific paragraph).
- Search/filter result pages, pagination > 1.

This prevents Google from counting them against site quality.

## 4. Strengthen the trust/EEAT pages Google checks

- **About page**: expand to ~400–600 words. Real ownership info: who runs LegallySpoken, mission, editorial standards, how content is produced and reviewed, AI-disclosure statement (we already use Lovable AI for blog drafts — disclose it), update cadence.
- **New `/contact` page**: contact email, response time, mailing/business address, link to Impressum for EU. Add link in footer and to `index.html` meta.
- **Editorial / methodology page** (`/editorial-standards`): how we research, sources, disclaimer reinforcement. Link from About, Footer, every article footer.
- Add an **author byline + last-updated date** to every blog post and pillar/cluster article. Already partly there; ensure 100% coverage.

## 5. Homepage uniqueness

The homepage hero copy is generic AI-style ("Legal clarity, simplified"). Add a unique 150–250-word intro paragraph below the hero explaining what makes LegallySpoken different (100+ free tools, plain-English, no signup, US + EU coverage, AI-assisted but human-reviewed). Static text, indexable, unique.

## 6. Re-submit checklist

After deploying:

1. Verify `curl https://legallyspoken.com/` returns prerendered HTML with H1 and body text.
2. Verify `curl https://legallyspoken.com/auto-accident-law` returns full article HTML.
3. Confirm noindex'd pages return `<meta name="robots" content="noindex">` in source.
4. Confirm `/contact` and expanded `/about` are linked from the footer.
5. Confirm no `<ins class="adsbygoogle">` renders on directory / lawyer / EU-fallback routes.
6. Then re-request review in the AdSense dashboard.

## Technical notes

- `vite-react-ssg` requires moving the route tree to an exported config and a small `entry-server.tsx`; React Router stays the same.
- The allow-list in `AdSlot` can live as a `shouldShowAds(pathname)` helper in `src/lib/adsense.ts` and read `useLocation()`.
- `noindex` is a one-line addition to `Head.tsx`: a `noindex?: boolean` prop that emits `<meta name="robots" content="noindex, follow">` when true.
- The AdSense `<script>` in `index.html` can stay — it does not need to be removed, only the per-page `<ins>` slots should be conditional.

## Out of scope

- Removing AdSense entirely.
- Visual redesign.
- Rewriting the existing tool catalog.
- Switching frameworks (we stay on Vite + React Router; prerender plugin only).
