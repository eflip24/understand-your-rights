
# Google Ads Content & Placement Plan — Semrush-driven

**Goal:** Increase AdSense RPM by driving traffic to pages whose keywords have high commercial intent (high CPC), while staying on winnable rankings (KD ≤ 50). Ad *infrastructure* (Auto ads + `<AdSlot />` + consent + analytics by page-type) is already live — this plan focuses on **which pages should exist, what keywords they target, and where the manual ad slots should sit** to maximize both fill rate and CPC.

Semrush snapshot (US database): the site currently ranks for ~55 organic keywords, all in positions 82–98 — off page 1. Zero paid competition on our current terms. Big upside is unclaimed.

---

## 1. High-CPC + Low-KD keyword targets (from live Semrush data)

Sorted by **RPM opportunity = CPC × Volume × winnability**. All KD scores below are Semrush US.

### Tier A — Build/upgrade immediately (KD ≤ 30, CPC > $5)

| Target keyword | Vol/mo | CPC | KD | Existing page? | Action |
|---|---|---|---|---|---|
| slip and fall settlement | 2,400 | **$32** | 9 | ❌ | New tool: **Slip & Fall Settlement Estimator** |
| slip and fall lawsuit | 8,100 | $47 | 9 | ❌ | Pillar page in personal-injury cluster |
| personal injury settlement calculator | 1,000 | $6.67 | 21 | ✅ SettlementEstimator | Rewrite H1/title, add FAQ block |
| workers comp settlement calculator | 1,300 | $2.99 | 13 | ❌ | New tool |
| payout workers' comp settlement chart | 3,600 | $2.52 | ~15 | ❌ | State-by-state chart page |
| dui lawyer cost | 1,300 | **$15** | 7 | ❌ | New tool: **DUI Cost Estimator** + guide |
| wrongful termination settlement calculator | 720 | $3.62 | 11 | ✅ WrongfulTerminationValueEstimator | Rename, retarget copy |
| wrongful termination california avg settlement | 720 | **$15** | ~15 | ❌ | State pillar (CA) under employment |
| eeoc settlement calculator | 320 | $4.87 | ~15 | ❌ | New tool |
| divorce buyout calculator | 1,900 | $2.01 | ~15 | ❌ | New tool (house buyout in divorce) |
| divorce cost calculator | 40 | — | 9 | ✅ DivorceCostEstimator | Keep — long-tail seed |

### Tier B — Content pillar upgrades (KD 30–50, CPC > $5, huge volume)

| Target keyword | Vol/mo | CPC | KD | Play |
|---|---|---|---|---|
| mesothelioma lawyer | 9,900 | **$147** (attorney) | 43 | State-by-state mesothelioma pillar + FAQ hub. Extremely valuable ad inventory. |
| car accident lawyer | 368,000 | **$181** | 46 | Already have AutoAccident pillar — rewrite around question keywords ("do I need a lawyer for a car accident", CPC $84, 390/mo) |
| llc operating agreement | 8,100 | $4.80 | 49 | Have OperatingAgreementGenerator — add long-form FAQ (`what is an operating agreement`, 2,400/mo, $2.58) below tool |
| personal injury attorney | 246,000 | $122 | ~45 | Convert lawyer-near-me landing pages into keyword-optimized state/city entries |

### Tier C — Skip / deprioritize

- `child support calculator` (18,100/mo) — **CPC only $0.80, KD 65**. Traffic magnet but low ad revenue and hard to rank. Keep the tool for engagement; don't build content investment here.
- Anything with CPC = $0 on Semrush.

---

## 2. Per-page ad placement matrix

We already have `<AdSlot />` (consent-gated, analytics-tracked) and site-wide Auto ads. What's missing is **strategic manual placement** in the highest-CPC contexts.

| Page type | Slot 1 (above fold) | Slot 2 (mid) | Slot 3 (results / bottom) | Notes |
|---|---|---|---|---|
| Tier-A tool page (settlement / DUI / workers comp) | Below tool header, above inputs | Between inputs and results | Directly under result card | These are the money pages — 3 manual slots max per AdSense policy |
| Tier-B pillar page (mesothelioma, car accident) | Below H1 intro | After first H2 | Before final CTA | Long-form content = high ad density tolerated |
| Blog post | After intro paragraph | After ~50% scroll (in-article) | End-of-post + related-posts sidebar | Auto ads already handle in-article; add manual in-article for CPC control |
| Legal terms / clauses directory | None (thin content) | — | — | Rely on Auto ads only; deny-list candidates if RPM < $0.50 |
| Lawyer-near-me pages | Below city intro | Between listings | Bottom | Highest CPC context on the site — attorney keywords $120–$260 |
| Auth / dashboard / admin | ❌ none | ❌ | ❌ | Already deny-listed |

**Action:** Wire `<AdSlot placement="tool-header" />` into `ToolPageLayout.tsx` (renders on all 110 tools). Wire `<AdSlot placement="tool-result" />` per tool component (needs the tool to know when results exist — can't be centralized).

---

## 3. "Low-value content" mitigation (AdSense policy)

AdSense sometimes flags interactive tools as thin content. Fix by attaching a `<ToolSeoContext>` block below every tool with:

1. **150–250 word explainer** targeting the tool's primary keyword.
2. **5–8 FAQ items** using the question keywords Semrush surfaces (e.g., "How is a personal injury settlement calculated?", "How much does a DUI lawyer cost in California?").
3. **JSON-LD `FAQPage` schema** so Google understands the Q&A structure.
4. **State/EU-country variants** where the question keyword includes a jurisdiction (e.g., "how is child support calculated in Texas" → 880/mo).

Content sourcing: AI-drafted per tool using our Lovable AI gateway seeded with the Semrush question list for that tool, then human-reviewed. One `tools.json` field per locale.

---

## 4. Blog content plan (also grounded in Semrush)

The blog currently exists but has no high-CPC editorial calendar. Proposed **first 15 posts** ranked by revenue upside:

| # | Working title | Target keyword | Vol | CPC | KD |
|---|---|---|---|---|---|
| 1 | How Slip and Fall Settlements Are Calculated (with examples) | how are slip and fall settlements calculated | 90 | $12 | ~15 |
| 2 | Average Slip and Fall Settlement Without Surgery — 2026 Data | slip and fall settlements without surgery | 1,600 | $22 | ~20 |
| 3 | Do I Need a Lawyer for a Minor Car Accident? | should i get a lawyer for a minor car accident | 720 | $63 | ~25 |
| 4 | How Much Does a DUI Lawyer Cost? State-by-State Guide | how much does a dui lawyer cost | 480 | $11 | 7 |
| 5 | Wrongful Termination Settlement Amounts in California | wrongful termination california average settlement | 720 | $15 | ~15 |
| 6 | Do You Pay Taxes on a Wrongful Termination Settlement? | are wrongful termination settlements taxable | 30 | — | 5 |
| 7 | Mesothelioma Lawyer Fees Explained (no upfront cost) | how much does a mesothelioma lawyer cost | 30 | — | ~20 |
| 8 | How to Choose a Mesothelioma Lawyer for an Asbestos Claim | how to choose a mesothelioma lawyer | 170 | — | ~20 |
| 9 | Divorce Buyout of the House: How to Calculate What You Owe | divorce buyout calculator | 1,900 | $2 | ~15 |
| 10 | Does a Single-Member LLC Need an Operating Agreement? | does single member llc need operating agreement | 320 | $5.52 | ~25 |
| 11 | How Insurance Companies Calculate Personal Injury Settlements | how do insurance companies calculate personal injury settlements | 30 | — | ~15 |
| 12 | How Long Do Slip and Fall Settlements Take? | how long do slip and fall settlements take | 390 | $19 | ~15 |
| 13 | Payout Chart: Workers' Comp Settlements by State | payout workers' comp settlement chart | 3,600 | $2.52 | ~15 |
| 14 | Bodily Injury vs Personal Injury Settlements (Explained) | bodily injury settlement | 720 | $14 | ~25 |
| 15 | EEOC Settlement Amounts: What to Expect | eeoc settlement calculator | 320 | $4.87 | ~15 |

Each post cross-links to its matching tool ("Try the calculator →") for engagement + repeat pageviews.

---

## 5. EU / multilingual (DE / FR / IT / ES / PT)

Semrush shows near-zero rankings across EU databases today. Two-track approach:

- **Track A — mirror US content, translated + jurisdictionally re-anchored.** For each Tier-A US tool, publish a `.de` / `.fr` / `.it` variant with an FAQ block referencing local statutes (StGB, Code civil, Codice civile). H2/H3 use native-language money terms ("Schmerzensgeld Rechner", "indemnisation dommage corporel", "calcolo risarcimento danni"). EU display CPCs on these terms are also strong.
- **Track B — cross-border content.** New pillar per country: "US legal deadlines for [country] citizens" (SoL, small claims, tourist accidents). Low competition, high commercial intent for expat/travel audiences.

Add `hreflang` + `AreaServed` schema so Google routes EU traffic to the right locale — currently the multilingual pages exist but Semrush shows they aren't indexed for the local terms.

---

## Sequencing

1. **Wire the two manual `<AdSlot />` positions** into `ToolPageLayout` + per-tool result blocks (1 PR, ~110 tools).
2. **Build `<ToolSeoContext />`** (explainer + FAQ + JSON-LD) and populate the Tier-A tools first via AI + review.
3. **Ship Tier-A new tools** (Slip & Fall estimator, DUI Cost, Workers' Comp settlement, Divorce Buyout, EEOC Settlement).
4. **Rewrite existing tool page titles/H1s** for Tier-A keywords (SettlementEstimator → "Personal Injury Settlement Calculator", etc.).
5. **Publish blog posts #1–5** in the first sprint.
6. **EU Track A** rollout after US Tier-A is stable.

## Technical notes (dev-facing)

- `<AdSlot>` already exists at `src/components/ads/AdSlot.tsx` — reuse, don't create `AdBanner.tsx` (would duplicate consent + analytics).
- `<ToolSeoContext>` reads keys `internals.<toolId>.seoContext.{explainer,faq[]}` from `tools.json` per locale.
- FAQ JSON-LD generated inside `<ToolSeoContext>` using the existing `JsonLd.tsx` helper.
- Editorial calendar tracked in a new `content/adsense-calendar.md` for handoff.

## Out of scope for this plan

- Changing ad network (staying with AdSense only per `ads.txt`).
- Any header-bidding, Ezoic, or Mediavine integration.
- Named ad units — Auto ads + `data-ad-format="auto"` continue to serve; if you later create named units in AdSense, paste them into `AD_SLOT_IDS` in `src/lib/adsense.ts`.
- Buying paid Google Ads (this is AdSense monetization, not advertiser-side).

Approve and I'll start with step 1 (slot wiring) unless you want a different starting point.
