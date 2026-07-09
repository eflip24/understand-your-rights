
# 30-Day "Right User, Not More Users" Plan

Goal: engineer pages + signals so Google serves the $15–$160 CPC legal, insurance, and finance ads — not random shoe/crypto ads. Every task below is designed to be shippable in one day inside Lovable.

The plan has 4 phases. Each phase runs one week. Every day has: (1) a build task, (2) a signal task (things that improve dwell time, engagement, or intent clarity), and (3) a distribution task (get the *right* users to the page).

---

## Phase 1 — Fix Contextual Signals (Days 1–7)
Make Google's crawler unmistakably classify each money page as "personal injury / insurance / legal services." This alone lifts RPM before any new traffic arrives.

**Day 1 — PI Hub context hardening**
- Build: Add a 400-word "About personal-injury settlements" intro block above the calculator on `/personal-injury-settlements` using in-market entities (adjuster, policy limit, MedPay, UM/UIM, subrogation, contingency fee, MMI).
- Signal: Add `Article` + `WebApplication` + `FAQPage` JSON-LD with `about` referencing schema.org LegalService and InsuranceAgency.
- Distribution: `seo--trigger_scan` + submit URL in Search Console.

**Day 2 — Insurance-entity injection across 4 PI sub-calculators**
- Build: Inject "How insurance companies value this claim" section into car/motorcycle/truck/bodily-injury sub-pages. Name real carriers (State Farm, GEICO, Progressive, Allstate) as entities — this is what makes Google map the page to auto-insurance ad inventory.
- Signal: Add "Related coverage terms" internal-link strip (bodily injury liability, UM/UIM, MedPay, PIP).
- Distribution: Cross-link from every existing settlement tool result card.

**Day 3 — Auto-insurance intent pillar**
- Build: New page `/auto-insurance-claim-guide` — 10-step claim guide + embedded settlement estimator. Auto-insurance CPC = $15–$45.
- Signal: HowTo JSON-LD + FAQ.
- Distribution: Link from `car-accident-checklist` and every state auto-accident page.

**Day 4 — Debt / bankruptcy intent expansion**
- Build: `/debt-settlement-calculator` + `/bankruptcy-vs-debt-settlement` comparison. Debt-relief CPC = $20–$60.
- Signal: Embed existing `BankruptcyMeansTestCalculator` + `WageGarnishmentCalculator` on the new hub.
- Distribution: Cross-link from wage-garnishment tool.

**Day 5 — Health / disability intent expansion**
- Build: `/long-term-disability-claim-guide` + `/ssdi-denied-what-next`. LTD/disability lawyer CPC = $25–$80.
- Signal: Embed `SSDIBackPayCalculator`, FAQ, HowTo.
- Distribution: Link from existing SSDI tool and workers' comp calculator.

**Day 6 — Mesothelioma / asbestos landing (highest CPC on the internet)**
- Build: `/mesothelioma-settlement-guide` under the mass-tort framework. CPC frequently $200–$400.
- Signal: Rigorous medical + legal citations, timeline, VA-benefits section, trust-fund table.
- Distribution: Add to mass-tort hub, submit to Search Console.

**Day 7 — Signal audit day**
- Build: Add "Save my results" + PDF export to any tool missing it (dwell + return-visit signal).
- Signal: Run `analytics--read_project_analytics`, identify pages with bounce > 70%, add a related-tools strip + inline FAQ to the top 5.
- Distribution: `keyword-radar` weekly run + `sprint-planner`.

---

## Phase 2 — Engagement & Dwell Time (Days 8–14)
Google rewards pages where in-market users linger. Every task here is designed to push time-on-page past 2 minutes.

**Day 8** — Multi-step wizard wrapper for `SettlementEstimator` (5 screens instead of 1 form). Multi-step = 3–4× dwell.
**Day 9** — Add "Compare 3 scenarios side-by-side" to alimony + child-support + spousal-support calculators.
**Day 10** — Add anonymous save-token + email-gated PDF ("Get your full report") to PI hub → first-party data.
**Day 11** — Build `/how-much-is-my-case-worth` interactive quiz (10 questions → routes user to the right calculator). Quiz completion is a very strong engagement signal.
**Day 12** — Add "Recently viewed tools" + "People also used" strips site-wide → pages/session up.
**Day 13** — Add sticky "Talk to a lawyer near me" CTA on every settlement result page → feeds highest-RPM directory pages.
**Day 14** — Ship inline glossary tooltips (hover a legal term → definition popover). Increases dwell without new pages.

---

## Phase 3 — Right-User Acquisition (Days 15–21)
Publish content that attracts users whose Google profile is *already* tagged in-market for legal/insurance/finance.

**Day 15** — "Cost of hiring a personal injury lawyer" — pairs with contingency-fee explainer.
**Day 16** — "How insurance adjusters calculate pain and suffering" — insurance-industry entity dense.
**Day 17** — "What is a demand letter? (with template + calculator)" — commercial intent.
**Day 18** — "Average settlement amounts by injury type" data-table page — attracts researchers deep in the funnel.
**Day 19** — "How long after a car accident can you sue?" — statute-of-limitations by state, funnels to existing SOL tool.
**Day 20** — "Workers' comp vs personal injury: which pays more?" comparison.
**Day 21** — "Do I need a lawyer for a car accident?" decision-tree page → routes to lawyer directory (highest-RPM page).

---

## Phase 4 — First-Party Data + Retention (Days 22–30)
The 2026 game: users who return and users you can re-target with consented data. Return visitors have far higher RPM.

**Day 22** — "Case Tracker" mini-app: signed-in users save calculator inputs, get 7-day check-in email.
**Day 23** — Weekly "Settlement News" digest (auto-generated via existing blog pipeline) → email opt-in.
**Day 24** — "Personalized settlement report" — user enters email, gets branded PDF + follow-up sequence.
**Day 25** — Add `user_intent` tracking to saved analyses (PI / family / employment / housing) — used to personalize on-site recommendations.
**Day 26** — Build `/my-legal-dashboard` for logged-in users showing saved cases + relevant tools. Return-visitor RPM is 2–3× first-visit.
**Day 27** — Add "Continue where you left off" banner + localStorage draft for anonymous users.
**Day 28** — Retarget-friendly landing pages: 3 dedicated pages optimized for Google Discover pickup (mass-tort updates).
**Day 29** — Ship "Ask a lawyer" lead form on top 5 money pages (already the highest-RPM funnel).
**Day 30** — Review: pull `analytics` + Semrush, identify top-10 pages by dwell × CPC, double down.

---

## Technical section

**New routes to add:** `/auto-insurance-claim-guide`, `/debt-settlement-calculator`, `/bankruptcy-vs-debt-settlement`, `/long-term-disability-claim-guide`, `/ssdi-denied-what-next`, `/mesothelioma-settlement-guide`, `/how-much-is-my-case-worth`, `/my-legal-dashboard`, plus ~7 content pages in Phase 3.

**Reusable primitives to build first (Day 1 quick wins that unlock the rest):**
1. `<MultiStepWizard>` wrapper — wraps existing calculators into 3–5 step flows.
2. `<InMarketEntityBlock>` — standardized carrier/entity name block for contextual signals.
3. `<EmailGatedPDF>` — reuses existing PDF export + adds email capture to `saved_analyses`.
4. `<RelatedIntentStrip>` — cross-links by intent cluster (PI, insurance, debt, family, housing).

**JSON-LD:** every new page ships with `Article` + `FAQPage` + `BreadcrumbList`. Money pages also add `WebApplication` (for calculators) and `HowTo` (for guides).

**Ad placement:** keep existing gating. High-CPC pages get one unit after the form, one after results, one in the related-tools strip.

**Measurement:** after each phase, run `semrush--seo_trend` on the domain + `analytics--read_project_analytics` to confirm dwell time and pages/session are climbing before starting the next phase.

---

## The single first thing to build

**Day 1 kickoff = harden `/personal-injury-settlements` contextual signals + ship the `<InMarketEntityBlock>` primitive.** It's the highest-CPC page you already have; making Google unmistakably classify it as PI + auto-insurance will lift RPM within one crawl cycle — before any of the Phase 2–4 work lands.

Approve this plan and I'll start on Day 1 immediately.
