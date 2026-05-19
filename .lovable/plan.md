## Phase A5 — Search Console + Analytics (plus Bing verification)

### 1. Bing Webmaster verification
- Copy uploaded `BingSiteAuth.xml` to `public/BingSiteAuth.xml` so it is served at `https://legallyspoken.com/BingSiteAuth.xml` (file-based verification method).
- No code/meta tag changes required; Bing will fetch the file directly.

### 2. Google Search Console
- Already verified via existing `google-site-verification` meta tag in `index.html` — no change.
- Action item (user-side, outside code): in GSC, add the 4 new locale URL prefixes as properties or rely on the single domain property: `/es/`, `/fr/`, `/de/`, `/it/`. Submit the sitemap URL: `https://fpdfibyywvlcqjrkuuhz.supabase.co/functions/v1/generate-sitemap`.

### 3. Bing Webmaster Tools
- Submit same sitemap URL in Bing Webmaster after verification file is live.
- Note: `robots.txt` currently has no Bing-specific block; Bingbot is `Allow: /` — good.

### 4. hreflang verification
- `Head.tsx` already emits `<link rel="alternate" hreflang="…">` for all 6 locales + `x-default`. Verify in GSC International Targeting report once locales are crawled.
- Sitemap (`supabase/functions/generate-sitemap`) was updated in Phase A2 to include `<xhtml:link rel="alternate">` per URL. Confirm output is well-formed (quick curl).

### 5. Analytics (privacy-safe, consent-gated)
- Add **Plausible Analytics** (script-only, no cookies, no consent required) OR keep AdSense-only.
- Recommendation: Plausible via simple `<script defer data-domain="legallyspoken.com" src="https://plausible.io/js/script.js">` injected in `index.html`. Pros: no cookie banner impact, GDPR-friendly, captures locale traffic via URL path automatically.
- Skip GA4 unless user prefers — GA4 needs consent wiring through existing `CookieConsent` (analytics toggle).

### 6. Locale-aware tracking
- Plausible auto-segments by URL, so `/es/*`, `/fr/*`, etc. show up as separate pages in dashboard. No code needed beyond install.
- Add a tiny helper `src/lib/analytics.ts` exposing `trackEvent(name, props)` that fires `window.plausible?.(name, { props })` — used later for quiz completions, tool runs, lawyer-link clicks.

### 7. Out of scope
- Cookie banner copy changes (per user: defer until all phases done).
- GA4, Hotjar, Microsoft Clarity.
- Server-side analytics / log shipping.

### Acceptance
- `curl https://legallyspoken.com/BingSiteAuth.xml` returns the XML.
- Bing Webmaster verifies the site (user confirms in their account).
- Plausible dashboard records pageviews and shows `/es/`, `/fr/`, `/de/`, `/it/` paths once traffic arrives.
- No console errors; cookie banner unchanged.

### Files to touch
- **Create**: `public/BingSiteAuth.xml` (copy from upload)
- **Edit**: `index.html` (add Plausible script in `<head>`, if approved)
- **Create**: `src/lib/analytics.ts` (thin wrapper, if Plausible approved)

### Decision needed
- Confirm **Plausible** vs. **no analytics tool** vs. **GA4** before I implement step 5–6.
