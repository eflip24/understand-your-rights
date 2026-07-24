
# Next Phases — Growth, Content, Multilingual & Design

Semrush snapshot (US db): 61 indexed keywords, 0 est. traffic, top positions still 80–100. Translation: Google knows the site but hasn't ranked it yet. The unlock is **more depth on money keywords + faster first-impression polish + multilingual reach into EU markets we already have forms for**.

Below is a 4-phase plan you can green-light phase by phase (same cadence we've been running).

---

## Phase 8 — High-CPC Content Expansion (US)

Goal: build 10 new pillar/landing pages on the highest-CPC legal + insurance clusters we don't own yet.

| # | Page | Cluster | Why (CPC signal) |
|---|---|---|---|
| 1 | `/truck-accident-settlements` | Personal injury | Truck accident lawyer CPC $200–$700 |
| 2 | `/uber-lyft-accident-claims` | Rideshare PI | Emerging, high-CPC, low competition |
| 3 | `/nursing-home-abuse-claims` | Elder law + PI | CPC $80–$300 |
| 4 | `/workers-comp-denied-what-next` | Workers comp | Companion to existing calc |
| 5 | `/car-insurance-claim-denied` | Auto insurance | CPC $50–$150 |
| 6 | `/homeowners-insurance-claim-denied` | Property | Hurricane/storm surge queries |
| 7 | `/dui-first-offense-guide` (state fan-out) | Criminal | CPC $30–$120 |
| 8 | `/chapter-7-vs-chapter-13` | Bankruptcy | Companion to debt hub |
| 9 | `/wrongful-termination-settlements` | Employment | CPC $40–$150 |
| 10 | `/roundup-camp-lejeune-updates` | Mass tort refresh | Very high RPM |

Each page: entity-dense intro (carriers, statutes, agencies), HowTo + FAQ JSON-LD, `RelatedIntentStrip`, `InMarketEntityBlock`, tie-in to matching calculator + `/lawyer-near-me/{practice-area}`.

---

## Phase 9 — Multilingual Depth (EU markets we already serve)

We ship 21 country-native EU forms + 7 UI locales but only English SEO landings. Fix that.

1. **Localize the 8 flagship EU form landings** (GDPR Consent, DPA, EU Employment, 14-Day Withdrawal, VAT Invoice, EU NDA, RtBF, EU PoA) into `de / fr / es / it / nl / pl / pt` using the existing translate-tools-cron pattern. Each = real per-locale `<title>`, `<meta>`, H1, HowTo/FAQ schema.
2. **Country legal pillars** — one long-form guide per (country × top topic): `/de/gdpr-leitfaden`, `/fr/rgpd-guide`, `/es/despido-improcedente`, `/it/licenziamento-illegittimo`, `/pl/wypowiedzenie-umowy-o-prace`. Data-driven from a new `src/data/eu/topicPillars.ts`.
3. **hreflang matrix** on all localized pages (currently only partial) + per-locale canonicals via Helmet.
4. **Localized sitemaps** — split `sitemap.xml` into `sitemap-en.xml`, `sitemap-de.xml`, etc. via the existing edge function.

---

## Phase 10 — First-Impression Design Polish

Applies to the pages users land on from Google (forms hub, tools hub, PI hub, lawyer hub, form/tool detail).

1. **Above-the-fold refresh** — swap generic hero panels for editorial-grade layouts: eyebrow chip → serif H1 → single-sentence promise → 1 primary CTA + 1 secondary → trust row (numbers, logos of statute authorities, not fake press badges).
2. **Card system v2** — unify FormCard / ToolCard / LawyerCard: icon badge, category chip, benefit line, meta row (time / free / state-aware), hover state with primary accent. Kill visual drift between hubs.
3. **Sticky mini-CTA bar** on all form/tool detail pages (mobile especially) — surfaces "Start form" / "Open calculator" on scroll. Big time-to-conversion win.
4. **Typography pass** — enforce serif for H1/H2, sans for body, cap line-length at 68ch on prose pages; fixes the "wall of text" feel on pillar pages.
5. **Empty-state and loading polish** — skeletons on hubs, friendlier "no results" copy, subtle motion (Framer) on tile hover only. No hero animation gimmicks.

---

## Phase 11 — Indirect Semrush + Programmatic Scale

Use the built-in Semrush tools (not the connector) as a weekly research loop:

1. **Weekly keyword radar** — I run `keyword_research` + `serp_analysis` on 5 candidate topics you flag, return a KDI/volume/CPC table, and we pick the 2 worth building.
2. **State fan-out generator** — extend `formStateFanout` pattern to: DUI, workers comp denial, wrongful termination, small claims limits. One template + 51 rows = 200+ indexable pages with real per-state statutes.
3. **City fan-out for top 5 practice areas** — extend `/lawyer-near-me/{area}/{state}/{city}` to top-100 metros for personal injury, workers comp, DUI, family, bankruptcy. Zero-content-debt because it reuses the existing programmatic template.
4. **AdSense RPM audit** — instrument `AdSlot` clicks per pillar to see which clusters actually monetize; feed that back into Phase 8 prioritization.

---

## Technical Notes

- No schema changes required for Phases 8, 10, 11. Phase 9 needs new JSON files under `src/i18n/locales/{lang}/eu-forms.json` and a `topicPillars.ts` per locale (mirrors existing `regionIntrosGenerated.ts` pattern).
- All new landing pages reuse `FormSeoLandingPage.tsx` / a new `PillarLandingPage.tsx` — no bespoke page components.
- Sitemap edge function already parameterized; split by locale is a `?lang=de` query param addition.
- Design polish is scoped to shared components (`FormsHero`, `ToolsHero`, `LawyerDirectoryHero`, card components, `ToolPageLayout`, `FormWizardPage`) — no page rewrites.

---

## Suggested order

1. **Phase 10 (design polish)** — 1 sprint, immediate visible ROI on the traffic we already get.
2. **Phase 8 (US high-CPC)** — 2 sprints, 5 pages each.
3. **Phase 9 (multilingual)** — 2 sprints; unlocks 7× the SEO surface.
4. **Phase 11 (programmatic + radar)** — ongoing weekly loop.

Tell me which phase to kick off and I'll start on it — or reorder if you'd rather ship content before polish.
