

# Navbar, Footer & Homepage Refresh

## Problems

1. **Navbar**: 13 flat links crammed into a single row — unreadable on desktop, overwhelming on mobile
2. **Footer**: Only lists 3 of the 7 legal guide pillars, missing Employment Law, Criminal Law, Landlord-Tenant Law, AI & Tech Law
3. **Homepage**: Legal Guides section only shows 4 items (Auto Accident, Personal Injury, Insurance, Find a Lawyer) — missing 4 new pillars; hero badge still says "50+" (site now has 100+); no Blog section

## Plan

### 1. Navbar — Grouped Mega-Menu Dropdowns

Replace the 13 flat links with 4 clean top-level items using the existing `NavigationMenu` (Radix) component:

| Top-level | Dropdown contents |
|---|---|
| **Tools** | Links to All Tools + each tool category (Contract, Consumer, Employment, etc.) |
| **Guides** | All 7 pillars: Auto Accident, Personal Injury, Insurance, Employment, Criminal, Landlord-Tenant, AI & Tech Law |
| **Resources** | Legal Terms, Legal Clauses, Contract Types, Blog |
| **Find a Lawyer** | Direct link (no dropdown) |

Desktop: 4 clean items with hover dropdowns in a styled grid.
Mobile: Accordion-style grouped sections in the Sheet menu.

### 2. Footer — Full Site Map

Expand from 4 columns to 5 columns:

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 |
|---|---|---|---|---|
| Brand + tagline | Tools (6 categories) | Legal Guides (all 7 pillars) | Resources (Terms, Clauses, Contract Types, Blog, Find a Lawyer) | Legal (Disclaimer, Privacy, Terms of Service) |

### 3. Homepage Updates

- **Hero badge**: Change "50+" to "100+" to reflect current tool count
- **Legal Guides section**: Add all 7 pillars (Employment Law, Criminal Law, Landlord-Tenant Law, AI & Tech Law) with appropriate icons — change grid from `lg:grid-cols-4` to responsive layout for 7+ items
- **New "Latest from the Blog" section**: Add between Legal Guides and How It Works — fetches 3 most recent published blog posts using the existing `useBlogPosts` hook
- **Stats bar**: Add a simple stats section below the hero: "100+ Tools | 7 Legal Guides | 50 States Covered | 1,500+ Pages"

### Files to Edit

| File | Change |
|---|---|
| `src/components/layout/Navbar.tsx` | Replace flat links with NavigationMenu dropdowns + grouped mobile menu |
| `src/components/layout/Footer.tsx` | Expand to 5 columns with all pillars and resources |
| `src/pages/HomePage.tsx` | Add new pillars to guides, update hero badge, add blog section + stats bar |

