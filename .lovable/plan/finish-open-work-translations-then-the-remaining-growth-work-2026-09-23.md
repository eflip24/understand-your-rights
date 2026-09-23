# Finish open work: translations, then the remaining growth workstreams

## 1. Finish the blog translations (from the blog plan)
- Check that AI credits are available again (the last run stopped at the workspace credit limit).
- Translate all eight new articles into Spanish, French, German, Italian and Portuguese (40 versions). Already-finished ones are skipped.
- Spot-check one article per language: links still work, tables intact, figures unchanged.
- Add blog posts to the admin Translation Progress page so future gaps are visible.

## 2. Workstream 2 — finish the five click-earning pages
South Carolina severance, Ohio and New York domestic violence charges, Colorado subrogation, German stock-option calculator: write specific titles and descriptions, add one original data table each, link each to the matching new blog article.

## 3. Workstream 4 — titles and descriptions sweep
Rewrite titles/descriptions for the ~50 pages with the most impressions and lowest clicks (from Search Console), putting the searched phrase and a concrete benefit first.

## 4. Workstream 1 — own the Spain cluster
- Short entry pages in Danish, Swedish, Norwegian and Dutch pointing to the Spain lawyer guide and article.
- Add real substance to Spanish city lawyer pages (Madrid, Barcelona, Malaga, Alicante, Valencia, Marbella): courts, fees, typical expat issues.
- Cross-link to the EU Spain calculators.

## 5. Workstream 3 — cut dead weight
Keep thin lawyer-city and glossary pages out of the sitemap and search index; merge near-duplicate pages with redirects to the stronger page.

## 6. Workstream 5 — new tools
Spain dismissal/severance calculator, truck-accident settlement estimator, small-claims cost and deadline checker (reusing the court fee data).

## 7. Workstream 6 — authority
Package the settlement-deadline and court-fee datasets as a citable "data" page with downloads, and list them in the llms.txt file.

## Technical notes
- Translations: run `scripts/translate-blog-posts.mjs` with all eight slugs; add a `blog` pipeline row to `AdminTranslations.tsx` reading `blog_translations` (total = published posts with translations target).
- Titles sweep driven by a fresh Search Console query; changes live in page data files/Head props.
- Pruning extends `prune-thin-sitemap-urls.mjs` and `contentDepth.ts` noindex gates; redirects in `AppRoutes.tsx`.
- Every new page: guideIndex, searchIndex, sitemap shard, author byline, review date, disclaimer, ad slots.

## Order
1 then 2 and 3 together, then 4, 5, 6, 7. Publish after steps 1-3 so the translations, ad units and Spain guide go live.
