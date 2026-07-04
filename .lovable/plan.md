## Goal

Turn on Google AdSense Auto ads across the whole site (anchor, vignette, in-article, matched content) while keeping the existing consent-gated `<AdSlot />` placements and per-page allow/deny rules intact.

## Current state (already done — no changes needed)

- `index.html` loads the AdSense script + Funding Choices CMP for consent.
- `public/ads.txt` correctly declares `pub-7983626512285415`.
- `<AdSlot />` is placed on tool pages, blog posts, pillar articles, cluster articles, content pages, and lawyer directory pages.
- `AD_DENY_PREFIXES` in `AdSlot.tsx` blocks thin/utility pages (login, dashboard, admin, directory index pages, etc.).

## Changes

### 1. Enable Auto ads (page-level tag)

Add the Auto ads config snippet inside `<head>` in `index.html`, right after the existing AdSense script tag:

```html
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-7983626512285415",
    enable_page_level_ads: true
  });
</script>
```

This tells Google it may auto-insert anchor, vignette, and in-article ads in addition to whatever `<AdSlot />` renders.

### 2. Respect consent + deny-list for Auto ads

Auto ads would otherwise fire on login/admin/thin pages and before the CMP resolves. Two guardrails:

- **Consent gating:** move the Auto-ads `push({...})` out of `index.html` and into a small `src/lib/adsenseAutoAds.ts` hook wired into `App.tsx`, so it only pushes after `useConsent()` returns a decision (mirrors what `AdSlot.tsx` already does).
- **Route gating:** reuse the existing `shouldShowAds(pathname)` helper (extract it from `AdSlot.tsx` into `src/lib/adsense.ts`) and skip the Auto-ads push on denied routes. Auto ads unfortunately can't be un-injected once pushed for a session, so we push only when the user first lands on an allowed route.

### 3. Non-personalized ads under "reject"

When `useConsent()` returns `"rejected"`, set `window.adsbygoogle.requestNonPersonalizedAds = 1` before the push. Already declared in `src/lib/adsense.ts` types — just needs to be applied in the new auto-ads init and in `AdSlot.tsx`.

### 4. Leave slot IDs empty

Per your answer, keep `AD_SLOT_IDS` empty strings — AdSense fills them via `data-ad-format="auto"`. When you later create named units in the dashboard, paste the IDs into `src/lib/adsense.ts` and manual slots start serving those specific units.

### 5. ads.txt

No changes — already AdSense-only and correct.

## Files touched

- `index.html` — remove any inline auto-ads push (moved to React so consent is respected).
- `src/lib/adsense.ts` — export `shouldShowAds()` helper; add `initAutoAds()` that respects consent + non-personalized flag.
- `src/components/ads/AdSlot.tsx` — import `shouldShowAds` from `adsense.ts` (dedupe), apply non-personalized flag on reject.
- `src/App.tsx` — call `initAutoAds()` from a `useEffect` tied to consent + route.

## Verification

- Load `/` in preview → confirm no console errors, CMP banner appears on EEA IPs, `adsbygoogle` queue receives the auto-ads push after consent.
- Navigate to `/login` → confirm Auto ads init is skipped.
- Navigate to a tool detail page → confirm both Auto ads and manual `<AdSlot />` fire once each.

## Not in scope

- Creating named ad units in the AdSense dashboard (you can do that later; paste the IDs into `AD_SLOT_IDS` and I'll wire them).
- Adding new `<AdSlot />` positions.
- Any A/B testing of ad density.
