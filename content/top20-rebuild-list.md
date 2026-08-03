# Top-20 Rebuild List (audit, Aug 2026)

Source of keyword data: Semrush (US database). Depth score = 1-5 based on
current on-page unique content (word count, tables, jurisdiction data, FAQ,
tool integration). Priority = ad-revenue potential (volume x CPC) balanced
against difficulty and existing depth.

| # | Page | Keyword | Vol/mo | CPC | KD | Depth now | Priority |
|---|---|---|---|---|---|---|---|
| 1 | /what-to-do-after-a-car-accident | what to do after a car accident | 9,900 | $16.07 | 43 | 2 | 1 |
| 2 | /attorney-contingency-fee-explained | attorney contingency fee | 720 | $25.06 | 14 | 2 | 2 |
| 3 | /how-pain-and-suffering-is-calculated | pain and suffering calculator | 1,600 | $8.15 | 12 | 3 | 3 |
| 4 | /chapter-7-vs-chapter-13 | chapter 7 vs chapter 13 | 9,900 | $2.54 | 40 | 3 | 4 |
| 5 | /personal-injury-settlements | personal injury settlement amounts | 390 | $8.87 | 24 | 3 | 5 |
| 6 | /roundup-camp-lejeune-updates | camp lejeune / roundup lawsuit | 18,000 | $7.34 | 44-54 | 3 | 6 |
| 7 | /uber-lyft-accident-claims | uber accident claim | 70 | $64.62 | 34 | 3 | 7 |
| 8 | /car-insurance-claim-denied | car insurance claim denied | 70 | $30.18 | 10 | 3 | 8 |
| 9 | /mesothelioma-settlement-guide | mesothelioma settlement | 880 | high | 38 | 3 | 9 |
| 10 | /forms/power-of-attorney-financial | power of attorney form | 27,100 | $1.47 | 44 | 2 | 10 |
| 11 | /forms/eviction-notice | eviction notice template | 5,400 | $1.39 | 32 | 3 | 11 |
| 12 | /workers-comp-denied-what-next | workers comp denied | 110 | $12.84 | 0 | 3 | 12 |
| 13 | /tools/severance-calculator | severance pay calculator | 2,400 | $0.14 | 19 | 2 | 13 |
| 14 | /alimony-calculator | alimony calculator | 2,400 | $0.58 | 33 | 3 | 14 |
| 15 | /nursing-home-abuse-claims | nursing home abuse lawsuit | 1,900 | low | 12 | 3 | 15 |
| 16 | /motorcycle-helmet-insurance-laws-by-state | motorcycle helmet laws by state | 1,000 | $0.07 | 25 | 3 | 16 |
| 17 | /dui-first-offense-guide | dui first offense | 880 | $4.29 | 24 | 4 | 17 |
| 18 | /debt-settlement-calculator | debt settlement calculator | 140 | $7.47 | 45 | 3 | 18 |
| 19 | /wrongful-termination-settlements | wrongful termination settlement | 170 | $5.75 | 11 | 3 | 19 |
| 20 | /long-term-disability-claim-guide | long term disability denied | 140 | low | 15 | 3 | 20 |

## Rebuild recipe (applied to each page)
1. Expand to 2,000-3,000 words of genuinely unique, entity-dense content
   (named carriers, statutes, agencies, dollar figures).
2. Add at least one original table or dataset that can be cited.
3. Add 8-12 FAQ entries mapped to real "People also ask" questions.
4. Embed the matching calculator or form inline (dwell time + ad impressions).
5. Reciprocal internal links: pillar <-> state pages <-> tools <-> forms.
6. Refresh JSON-LD (Article + FAQ + HowTo/Breadcrumb), author + reviewed-on date.

## Notes from the audit
- Phase-8 pillars already carry ~1,600-1,750 words each: they need depth
  upgrades, not rewrites.
- Highest ad-revenue-per-visit terms are auto/insurance/injury
  ($16-$65 CPC); highest raw demand is forms (power of attorney, eviction).
- Thin state fan-out tiers are already noindexed via `src/lib/contentDepth.ts`;
  leave them out of the rebuild until the parent pillar ranks.
