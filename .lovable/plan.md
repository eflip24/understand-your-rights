# Find a Lawyer Hub Redesign (/lawyer-near-me)

Bring the Lawyer directory up to the same polish tier as the redesigned Forms and Tools hubs, using the shared navy/gold token system. Frontend/presentation only.

## Problems with current page
- Container is capped at `max-w-4xl` — the page feels narrow and empty next to Forms/Tools hubs.
- No hero, no search, no trust signals. Just a Badge + H1 + paragraph.
- Every practice-area card uses the same generic `Users` icon, so nothing scans visually.
- No entry-point for the two things users actually want: **their location** and **their situation**.
- No "popular" or "most-searched" shortcuts above the fold.
- Disclaimer is a plain footer — should be a proper trust strip.

## What we'll build

### 1. New `LawyerDirectoryHero.tsx`
- Full-width hero card with navy/gold gradient, blur orbs (same style as Forms/Tools hero).
- H1 "Find the right lawyer, fast" with gold-underlined key phrase.
- Sub-line about free directory, no signup, attorney-verified.
- Prominent **practice-area search input** that live-filters the grid below (client-side on `shortTitle`, `title`, `description`).
- Trust chip row: "12 practice areas", "Free consultations", "Attorney-verified", "50-state coverage".
- Popular shortcuts: Personal Injury, Car Accident, Workers' Comp, Family Law, Bankruptcy, Employment.

### 2. New `LawyerSituationTiles.tsx`
"What happened?" — 6 large tiles that each deep-link to the relevant practice area:
- I was in an accident → `/lawyer-near-me/car-accident`
- I was hurt on the job → `/lawyer-near-me/workers-compensation`
- My claim was denied → `/lawyer-near-me/insurance-dispute`
- I'm getting divorced → `/lawyer-near-me/family-law`
- I'm drowning in debt → `/lawyer-near-me/bankruptcy`
- I was fired or discriminated against → `/lawyer-near-me/employment`

Each tile: icon + plain-English situation + destination hint + arrow.

### 3. Distinct icon per practice area
Map each of the 12 slugs to a specific Lucide icon inside the page (no data-model change):
- personal-injury → HeartPulse
- car-accident → Car
- workers-compensation → HardHat
- employment → Briefcase
- insurance-dispute → ShieldAlert
- real-estate → Home
- family-law → HeartHandshake
- bankruptcy → Wallet
- criminal-defense → Gavel
- immigration → Globe2
- truck-accident → Truck
- medical-malpractice → Stethoscope

### 4. Polished practice-area cards
- Full-width grid: `sm:grid-cols-2 lg:grid-cols-3` (was 2 cols only).
- Per-card: colored icon tile with gold ring on hover, category eyebrow ("Practice Area"), bold title, description, and a footer row with "Free consultations · No obligation" + "Browse lawyers →".
- Whole card clickable with focus-visible ring; card lifts on hover.
- If `relatedPillarPath` exists, show a small secondary "Read the law guide" chip in the footer (opens pillar page in same tab via nested link — implemented as separate `<Link>` so the card link doesn't wrap it).

### 5. State chooser strip
Below the grid: "Browse lawyers by state" with a clean chip grid of all 50 state abbreviations. Clicking a state routes to `/lawyer-near-me/personal-injury/{state-slug}` (the highest-volume practice area) — this leverages existing routes without new pages.

### 6. Trust strip (below results)
4-column card row matching Forms/Tools hubs:
- ShieldCheck — "Attorney-verified listings"
- Sparkles — "Free consultations"
- Scale — "50-state coverage"
- Users — "No referral fees"

### 7. Rewritten disclaimer
Keep the legal disclaimer but move it into a soft-bordered muted card so it reads as intentional, not orphaned.

## File plan
- New: `src/components/lawyers/LawyerDirectoryHero.tsx`
- New: `src/components/lawyers/LawyerSituationTiles.tsx`
- Edit: `src/pages/LocalLawyersDirectory.tsx` — widen container to `container py-10` (no `max-w-4xl`), compose new sections, keep existing `AdSlot`, `JsonLdGraph`, breadcrumbs, and disclaimer copy.
- No changes to `src/data/localLawyers.ts`, routes, or JSON-LD structure.

## Scope guardrails
- Frontend only. No new routes, no backend, no data-model changes.
- All colors via semantic tokens; no hardcoded hex/utilities.
- Existing i18n `useLocalizedPath` preserved.
- Ad slots kept in current positions.

**Highest-impact single change if we do nothing else:** the Hero + per-area icons + situation tiles — that trio alone transforms the "empty page" feeling and gives users an obvious entry point.
