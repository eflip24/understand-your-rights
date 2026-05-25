## Phase B5 — EU Compliance Bundle

Ship the legal + accessibility groundwork required before sending real EU traffic to the `/lawyer-eu/*` tree. Five workstreams, each independently shippable; recommend merging in the order below.

---

### B5.1 — Impressum + legal-pages tree

Germany (TMG §5) and Austria (ECG §5) legally require an "Impressum" reachable in ≤2 clicks from every page. France (LCEN art. 6) requires equivalent "Mentions légales". Without these, German hosts can issue Abmahnungen (formal cease-letters with cost orders) within weeks of indexing.

**Routes (locale-prefixed, mounted in `AppRoutes.tsx`):**
- `/impressum` (DE/AT) — operator name, address, contact, responsible person per §55 RStV, EU ODR link
- `/mentions-legales` (FR) — éditeur, hébergeur, directeur de publication, RCS/SIRET if applicable
- `/aviso-legal` (ES), `/note-legali` (IT), `/informacao-legal` (PT) — equivalent boilerplate
- All six render the same `<LegalImpressumPage locale="…" />` component with locale-specific copy

**Footer:** add a dedicated "Legal / Rechtliches" column that surfaces the locale-appropriate page based on `i18n.language`. Currently `Footer.tsx` only links Privacy/Terms/Disclaimer — extend it.

**Data:** new `src/data/eu/impressumData.ts` with operator details (entity name, registered address, email, EU ODR `https://ec.europa.eu/consumers/odr/`). Single source of truth — user must fill operator-identity fields before shipping; ship with `TODO:` placeholders gated by a build-time check.

### B5.2 — Per-country bar-association disclaimers

Each EU bar regulates non-lawyer publication of attorney info differently. The current generic disclaimer string in `eu-lawyer.json` (`disclaimer: "This directory is for informational purposes only..."`) is not sufficient for DE (BRAO §43b, RIN), FR (RIN art. 10), or IT (CNF deontology).

**Implementation:**
- New `src/data/eu/barDisclaimers.ts` keyed by `EuCountryCode` → `{ bodyKey, referenceUrl, verifyUrl }`
- Each country gets a dedicated disclaimer block (i18n key `eu-lawyer.barDisclaimer.{country}`) added to all 6 locale files
- Rendered as a bordered notice at the top of every `EuLawyersCountryPage`, `EuLawyersAreaPage`, `EuLawyersCityPage`, and as a small footnote under each listing card on the City page
- Includes: "We are not a law firm. Listings are sourced from public bar-association registries. Verify any lawyer's credentials at {barAssociationUrl} before engaging."
- DE/AT additionally: explicit "Werbung durch Rechtsanwälte" notice referencing BRAO §43b
- FR additionally: "Annuaire non officiel — consultez l'annuaire du CNB" link

**No DB.** Pure static data + i18n strings.

### B5.3 — TCF v2.2 CMP swap

Current `CookieConsent.tsx` is a homegrown banner storing `{analytics, advertising}` in localStorage and flipping `requestNonPersonalizedAds`. **This is not TCF v2.2 compliant.** Google AdSense requires a Google-certified CMP for all EEA/UK/CH traffic since Jan 16, 2024 — non-compliant sites get ads disabled in those regions.

**Approach:** integrate a Google-certified CMP. Two viable options, recommend Option A:

- **Option A (recommended): Funding Choices** — Google's own free CMP, configured in the AdSense dashboard, loaded via a single script tag in `index.html`. Zero per-page code. Replaces our custom banner entirely.
- **Option B: Self-hosted (Klaro, CookieConsent v3)** — more design control but requires writing a TCF v2.2 stub and consent-string encoder; substantially more work.

**Plan assumes Option A:**
- Add Funding Choices loader to `index.html` (script + `<meta name="google-adsense-account">` already present)
- Delete `src/components/consent/CookieConsent.tsx` and the `openConsentSettings` call sites in `Footer.tsx`
- Keep `src/lib/consent.ts` but rewrite `useConsent()` to read the IAB TCF `__tcfapi` `getTCData` purposes (purpose 1 = storage, purpose 3+4 = ads personalization) instead of localStorage
- `AdSlot.tsx` continues to gate on `consentDecided`, just sourced from TCF now
- Keep a "Cookie settings" footer link that calls `__tcfapi('displayConsentUi', 2, cb)` to re-open Funding Choices

**Risk:** Funding Choices UI is Google-styled, not ours — minor brand inconsistency, acceptable trade for cert + zero maintenance.

### B5.4 — AI-content labels

The EU AI Act (art. 50, in force Aug 2026) requires "clear and distinguishable" disclosure when content is generated or substantially assisted by AI. Our blog uses `generate-blog-article` edge function (Lovable AI / Gemini). The Legal Chat widget is also AI. Both currently lack explicit AI-generated labels.

**Implementation:**
- **Blog posts** generated via the edge function: add `ai_generated boolean default false` column to `blog_posts` (migration), set `true` from `generate-blog-article`. Surface in `BlogPostPage.tsx` as a small badge above the title: "AI-assisted article — reviewed by editors" (i18n key `blog.aiAssistedBadge`).
- **Legal Chat widget**: prepend a one-line disclosure to the opening message: "Responses are generated by AI and are not legal advice." (already says "not legal advice"; add "generated by AI" explicitly). Update `LegalChatWidget.tsx` greeting + the JSON-LD `WebApplication` schema in `Head.tsx` to mark `applicationCategory: "AI-assisted legal information"`.
- **EU lawyer pages**: add a one-line footnote "Listings curated by our team; descriptions may be AI-summarized from public sources." under the existing `disclaimer` block on `EuLawyersCityPage`.
- New i18n keys in `common.json` (`ai.assistedBadge`, `ai.generatedDisclosure`, `ai.summarizedFootnote`) across all 6 locales.

**DB migration:** single column add, RLS unchanged (already public-read).

### B5.5 — axe-core accessibility audit (EAA)

The European Accessibility Act applies to commercial services serving EU consumers from June 28, 2025. Effectively WCAG 2.1 AA on customer-facing flows. Lawyer directory + chat widget are in scope.

**Process:**
1. Install `@axe-core/cli` as a dev dep
2. Add `scripts/axe-audit.mjs` that crawls a representative URL list (home, /lawyer-near-me, /lawyer-eu, /lawyer-eu/deutschland, /lawyer-eu/deutschland/familienrecht/berlin, /blog, /tools, /legal-health-check, plus each new Impressum route) using a headless Puppeteer driver
3. Run once, capture findings JSON to `.lovable/axe-baseline.json`
4. Fix critical + serious violations in-place. Expected hotspots based on current code:
   - `LegalChatWidget` floating button — confirm `aria-label`, focus trap on open, ESC to close
   - `LangSwitcher` dropdown — keyboard nav (probably already correct via shadcn)
   - Map markers in `LocalMap` — Leaflet markers need accessible names or the map needs a parallel text list (the city page already renders a card list, so mark the map `aria-hidden="true"` and keep cards as the canonical control)
   - Cookie banner removal (B5.3) eliminates several existing focus-trap issues
   - Color-contrast: spot-check navy-on-gold and gold-on-navy combos against WCAG AA 4.5:1 — current palette is borderline on small text
5. Re-run, target zero critical/serious. Document remaining moderate items in `.lovable/a11y-known.md`.

**No runtime dep added** — `@axe-core/cli` stays in `devDependencies`.

---

### File-level summary

**New:**
- `src/pages/legal/ImpressumPage.tsx`
- `src/data/eu/impressumData.ts`
- `src/data/eu/barDisclaimers.ts`
- `src/components/eu/BarDisclaimerNotice.tsx`
- `scripts/axe-audit.mjs`
- `.lovable/axe-baseline.json`, `.lovable/a11y-known.md`

**Edited:**
- `src/AppRoutes.tsx` — 6 new Impressum-equivalent routes
- `src/components/layout/Footer.tsx` — new Legal column, remove custom-consent trigger, add TCF re-open link
- `index.html` — Funding Choices script
- `src/lib/consent.ts` — rewrite to read TCF API
- `src/components/ads/AdSlot.tsx` — minor: source consent from TCF
- `src/components/chat/LegalChatWidget.tsx` — AI disclosure in greeting
- `src/pages/BlogPostPage.tsx` — AI badge
- `src/pages/eu/EuLawyersCountryPage.tsx`, `EuLawyersAreaPage.tsx`, `EuLawyersCityPage.tsx` — render `BarDisclaimerNotice`
- All 6 `src/i18n/locales/{lang}/eu-lawyer.json` — `barDisclaimer.{country}` keys
- All 6 `src/i18n/locales/{lang}/common.json` — `ai.*` + legal-page nav keys
- `.lovable/plan.md` — completion notes

**Deleted:**
- `src/components/consent/CookieConsent.tsx`

**DB migration:** `ALTER TABLE blog_posts ADD COLUMN ai_generated boolean DEFAULT false;` + update `generate-blog-article` edge function to write `true`.

**New deps:** `@axe-core/cli`, `puppeteer` (devDependencies only). Funding Choices = script tag, no npm dep.

### Verification

- Visit `/impressum`, `/mentions-legales`, etc. — each renders with operator details
- Footer shows correct legal link per active locale
- Disable JS → custom banner gone; reload with JS → Funding Choices shows EU consent UI for EEA IP, nothing for US IP (test via VPN)
- `view-source:/blog/{ai-post}` → AI badge renders
- `node scripts/axe-audit.mjs` → 0 critical, 0 serious
- AdSense dashboard "EEA + UK consent" status → "Compliant"

### Out of scope (defer to later phases)

- Lawyer claim/verify flow + `lawyer_listings` DB table (B10)
- Country pillar content (B6)
- Tier-2 city expansion (B7)
- Region tier in URL (B9)
- Belgium/Switzerland multi-lang-per-country (B8)
- AI Act art. 50 watermarking of generated images (not yet shipping AI-image content)

### Open questions for the user before build mode

1. **Operator identity for Impressum** — what entity/name/address/email should appear? (Required before DE/AT pages can ship.)
2. **CMP choice** — Funding Choices (recommended) or self-hosted Klaro?
3. **AI badge wording** — "AI-assisted article — reviewed by editors" assumes editors actually review. If posts publish unreviewed, the honest label is "AI-generated — not reviewed by editors." Which is true today?
