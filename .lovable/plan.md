# Make LegallySpoken Google AdSense Ready & Compliant

Goal: Pass Google AdSense site review and stay compliant with their Publisher Policies, GDPR, and CCPA.

## 1. Install the AdSense script (the immediate Google requirement)

Add to `index.html` inside `<head>`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7983626512285415" crossorigin="anonymous"></script>
<meta name="google-adsense-account" content="ca-pub-7983626512285415" />
```

The `<meta>` tag is what AdSense actually checks during site review (works even if the script is blocked by an ad blocker on the reviewer's end).

## 2. Create `public/ads.txt`

Required by AdSense for ad serving authorization:

```
google.com, pub-7983626512285415, DIRECT, f08c47fec0942fa0
```

## 3. Fix the `<AdSlot />` component so ads actually render

Current bug: it returns `null` until the script tag exists, but never re-renders, and never calls `(adsbygoogle = window.adsbygoogle || []).push({})` — meaning no ad ever loads even after approval.

Rewrite to:
- Render the `<ins>` container always (with reserved height to avoid CLS).
- On mount, push to `window.adsbygoogle` so AdSense fills the slot.
- Accept a real `data-ad-slot` ID per placement (configurable, with a single env-style constant file `src/lib/adsense.ts` mapping slot names → numeric IDs).
- Set `data-ad-client="ca-pub-7983626512285415"`.
- Respect cookie consent (see step 5) — only push if user accepted.

## 4. Place ads on real pages (currently `<AdSlot />` is rarely used)

Add `<AdSlot />` to the high-traffic content pages:
- `BlogPostPage` — above content + mid-content + end-of-article
- `ToolPage` — post-result
- `StatutePage`, `LegalTermPage`, `LegalClausePage`, `ContractTypePage`, `ClusterArticlePage`, `PillarPage` — mid + end
- `LocalLawyersDirectory` etc. — already wired, keep
- Home: optional in-feed between sections

AdSense rejects sites with the script installed but no ad units placed.

## 5. Cookie consent banner (GDPR/CCPA)

Build a lightweight in-house banner (no third-party dependency):
- New file: `src/components/consent/CookieConsent.tsx` — bottom sheet with **Accept all**, **Reject non-essential**, **Manage preferences** (Analytics + Advertising toggles).
- New file: `src/lib/consent.ts` — stores choice in `localStorage` (`ls_consent_v1`), exposes `useConsent()` hook + `hasAdConsent()` helper.
- Mount the banner once in `App.tsx`.
- Before AdSense `push()` runs, gate on `hasAdConsent()`.
- Also forward consent to Google via `window.adsbygoogle.requestNonPersonalizedAds = 1` when user rejects personalized ads.

## 6. Update Privacy Policy & Terms

`PrivacyPolicyPage.tsx`: add sections for:
- Google AdSense + third-party advertising cookies (DoubleClick DART)
- How users can opt out (link to https://www.google.com/settings/ads and https://www.aboutads.info)
- IP address / device data processed by ad partners
- CCPA "Do Not Sell My Personal Information" notice
- GDPR legal basis (consent) + how to withdraw

`TermsOfServicePage.tsx`: add a short "Advertising" clause.

Add a footer link: **"Cookie Settings"** that re-opens the consent banner.

## 7. AdSense policy compliance audit

- Ensure every page has unique, substantive content (already true — 100+ tools, blog, statutes).
- Keep the existing legal disclaimer visible on tool pages (already present).
- Confirm `robots.txt` and sitemap allow Googlebot + Mediapartners-Google (verify `public/robots.txt`).
- Ensure no ads appear on: 404 page, login/signup, reset-password, admin pages, thank-you/empty states.
- Maintain a clear navigation, About, Contact, Privacy, Terms (already present).

## 8. Verify

After implementation, manually load a blog post page and:
- Confirm script loads (Network tab → `adsbygoogle.js`).
- Confirm `<ins>` slots render with reserved height.
- Confirm consent banner blocks ads until accepted.
- Resubmit site for AdSense review.

## Files to create
- `public/ads.txt`
- `src/lib/adsense.ts`
- `src/lib/consent.ts`
- `src/components/consent/CookieConsent.tsx`
- `src/components/consent/CookieSettingsButton.tsx`

## Files to edit
- `index.html` (script + meta tag)
- `src/components/ads/AdSlot.tsx` (fix render + push logic + consent gate)
- `src/App.tsx` (mount `<CookieConsent />`)
- `src/pages/PrivacyPolicyPage.tsx` (advertising disclosures)
- `src/pages/TermsOfServicePage.tsx` (advertising clause)
- `src/components/layout/Footer.tsx` (Cookie Settings link)
- `src/pages/BlogPostPage.tsx`, `src/pages/ToolPage.tsx`, `src/pages/StatutePage.tsx`, `src/pages/LegalTermPage.tsx`, `src/pages/LegalClausePage.tsx`, `src/pages/ContractTypePage.tsx`, `src/pages/ClusterArticlePage.tsx`, `src/pages/PillarPage.tsx` (insert `<AdSlot />`)
- `public/robots.txt` (allow Mediapartners-Google if needed)
