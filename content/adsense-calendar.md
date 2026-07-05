# AdSense Editorial Calendar — Semrush-driven

Source: Semrush US database, pulled during the ad-optimization planning turn.
See `.lovable/plan.md` for the full plan.

## Tier-A tools to build or upgrade (KD ≤ 30, CPC > $5)

| Status | Tool / page | Primary keyword | Vol/mo | CPC | KD | Path in repo |
|---|---|---|---|---|---|---|
| ⬜ build | Slip & Fall Settlement Estimator | slip and fall settlement | 2,400 | $32 | 9 | src/components/tools/SlipAndFallSettlementEstimator.tsx |
| ⬜ build | Workers' Comp Settlement Calculator | workers comp settlement calculator | 1,300 | $2.99 | 13 | src/components/tools/WorkersCompSettlementCalculator.tsx |
| ⬜ build | DUI Cost Estimator | dui lawyer cost | 1,300 | $15 | 7 | src/components/tools/DUICostEstimator.tsx |
| ⬜ build | Divorce Buyout Calculator | divorce buyout calculator | 1,900 | $2.01 | ~15 | src/components/tools/DivorceBuyoutCalculator.tsx |
| ⬜ build | EEOC Settlement Calculator | eeoc settlement calculator | 320 | $4.87 | ~15 | src/components/tools/EEOCSettlementCalculator.tsx |
| 🔁 rewrite title/H1 | SettlementEstimator → "Personal Injury Settlement Calculator" | personal injury settlement calculator | 1,000 | $6.67 | 21 | src/data/tools.ts + en/tools.json |
| 🔁 rewrite title/H1 | WrongfulTerminationValueEstimator | wrongful termination settlement calculator | 720 | $3.62 | 11 | src/data/tools.ts + en/tools.json |
| ✅ seoContext seeded | SettlementEstimator | — | — | — | — | seoContext.settlement-estimator |
| ✅ seoContext seeded | WrongfulTerminationValueEstimator | — | — | — | — | seoContext.wrongful-term-value |
| ✅ seoContext seeded | DivorceCostEstimator | — | — | — | — | seoContext.divorce-cost |

## Tier-B pillar upgrades (KD 30–50, high CPC)

- Mesothelioma pillar + state variants — CPC $147, KD 43
- Car accident lawyer pillar — CPC $181, KD 46 — rewrite around "do I need a lawyer" question keywords
- LLC operating agreement — CPC $4.80, KD 49 — extend OperatingAgreementGenerator with long-form FAQ

## Blog editorial calendar — first 15 posts

Ordered by revenue upside (Volume × CPC × winnability). Each cross-links to its matching tool.

1. How Slip and Fall Settlements Are Calculated (with examples) → slip-and-fall estimator
2. Average Slip and Fall Settlement Without Surgery — 2026 Data → slip-and-fall estimator
3. Do I Need a Lawyer for a Minor Car Accident? → SettlementEstimator
4. How Much Does a DUI Lawyer Cost? State-by-State Guide → DUI cost estimator
5. Wrongful Termination Settlement Amounts in California → WrongfulTerminationValueEstimator
6. Do You Pay Taxes on a Wrongful Termination Settlement? → WrongfulTerminationValueEstimator
7. Mesothelioma Lawyer Fees Explained (no upfront cost) → mesothelioma pillar
8. How to Choose a Mesothelioma Lawyer for an Asbestos Claim → mesothelioma pillar
9. Divorce Buyout of the House: How to Calculate What You Owe → divorce buyout calc
10. Does a Single-Member LLC Need an Operating Agreement? → OperatingAgreementGenerator
11. How Insurance Companies Calculate Personal Injury Settlements → SettlementEstimator
12. How Long Do Slip and Fall Settlements Take? → slip-and-fall estimator
13. Payout Chart: Workers' Comp Settlements by State → workers comp calc
14. Bodily Injury vs Personal Injury Settlements (Explained) → SettlementEstimator
15. EEOC Settlement Amounts: What to Expect → EEOC calc

## Ad slot inventory

- **Global**: Auto ads via `src/lib/adsense.ts` `initAutoAds()`
- **Every tool page** (via `ToolPageLayout`):
  - `<AdSlot slot="above-content" />` — below header, above tool card
  - `<AdSlot slot="post-result" />` — below tool card, above SEO context
- **Per-tool result slot** (still TODO — wire into individual tool components after result computed)
- **Blog post**: existing template already renders `AdSlot`; verify positions match plan §2

## Progress log

- 2026-07-05 — Wired `above-content` slot into `ToolPageLayout.tsx`; created `ToolSeoContext` component; seeded 3 Tier-A English seoContext entries. Next: build Tier-A new tools starting with Slip & Fall Settlement Estimator.
