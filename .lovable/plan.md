

# Create About Us Page

## Overview

A visually rich About Us page at `/about` that matches the site's existing design language — hero section, icon grid, trust signals, and strong CTAs.

## New File

| File | Purpose |
|---|---|
| `src/pages/AboutPage.tsx` | Full About Us page with all provided content |

## Edited Files

| File | Change |
|---|---|
| `src/App.tsx` | Add lazy-loaded route for `/about` |
| `src/components/layout/Footer.tsx` | Add "About Us" link to resources column |
| `src/components/layout/Navbar.tsx` | Add "About" link to the Resources dropdown |

## Page Structure

1. **Hero Section** — "Legal clarity, simplified." headline + "Free Legal Tools for Everyday People" tagline + "Explore All Tools" button. Clean gradient background matching homepage style.

2. **Trust Icons Row** — Four badges: "Free Forever" (Gift icon), "No Signup Required" (UserCheck), "Plain English" (MessageSquare), "50 States Covered" (MapPin).

3. **Our Mission** — Large text block with the mission statement.

4. **What We Offer** — 5-item icon grid (cards): Free Tools, AI Analysis, State Guides, Legal Dictionary, Health Check Quiz. Each with Lucide icon, title, and description from the provided copy.

5. **Who We Are** — Text section about the team, with attorney input mention.

6. **Our Promise** — 4-column grid: Always Free, No Nonsense, Transparency First, Continuously Improving. Each with icon and description.

7. **Why "Legally Spoken"** — Text section with the name explanation.

8. **CTA Section** — "Start Your Legal Health Check" and "Browse 100+ Tools" buttons. Disclaimer text and last updated date.

## Design

- Uses `Head` component for SEO metadata
- Uses existing `ContentPageLayout` pattern but with custom hero (not the standard breadcrumb header)
- Prose styling for text sections, card grid for features/promises
- Fully responsive — single column on mobile, multi-column grids on desktop
- Lucide icons throughout, no emojis

