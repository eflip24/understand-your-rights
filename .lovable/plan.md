

# Phase 2: Programmatic SEO Engine

## Goal
Create a content-driven SEO engine generating 200+ structured pages for legal terms, legal clauses, and contract types — each with explanations, example clauses, related tools, FAQs, and internal links.

## What We'll Build

### 1. Three Content Data Files

**`src/data/legalTermPages.ts`** — Expand the existing 85 legal terms into full SEO page objects with: slug, title, plain-English definition, detailed explanation (2-3 paragraphs), example clauses, related terms, related tool IDs, FAQs (3 each), and category tags. Target: **100+ terms**.

**`src/data/legalClauses.ts`** — New file with 50+ common contract clauses (non-compete, termination, indemnification, confidentiality, arbitration, force majeure, limitation of liability, etc.). Each entry includes: slug, title, explanation, 2-3 example clause texts, enforceability notes, red flags to watch for, related terms, related tools, and FAQs.

**`src/data/contractTypes.ts`** — New file with 30+ contract types (NDA, freelance agreement, employment contract, lease, SaaS agreement, consulting agreement, etc.). Each entry includes: slug, title, description, key clauses typically found, common risks, related tools, and FAQs.

### 2. Three New Page Components

**`src/pages/LegalTermPage.tsx`** — `/legal-terms/:slug`
- Term name as H1, category badge
- Plain-English definition highlighted in a callout
- Detailed explanation section
- Example clause in a styled code/quote block
- Related terms (linked)
- Related tools (linked cards)
- FAQ accordion
- Breadcrumb navigation

**`src/pages/LegalClausePage.tsx`** — `/legal-clauses/:slug`
- Clause name as H1
- What it means section
- 2-3 example clause texts in styled blocks
- "Red flags to watch for" section
- Enforceability notes
- Related terms, related tools, FAQ accordion

**`src/pages/ContractTypePage.tsx`** — `/contract-types/:slug`
- Contract type name as H1
- Overview description
- "Key clauses typically found" list with links to clause pages
- Common risks section
- Related tools, FAQ accordion

### 3. Three Index/Directory Pages

**`src/pages/LegalTermsDirectory.tsx`** — `/legal-terms`
- Alphabetical listing with search/filter by category
- Letter jump navigation (A-Z sidebar)

**`src/pages/LegalClausesDirectory.tsx`** — `/legal-clauses`
- Grid of clause cards, filterable by category

**`src/pages/ContractTypesDirectory.tsx`** — `/contract-types`
- Grid of contract type cards

### 4. Updated Navigation & Internal Linking

- **Navbar**: Add dropdowns for "Legal Terms", "Clauses", "Contract Types"
- **Homepage**: Add a new "Legal Resources" section linking to the three directories
- **Tool pages**: Add links to relevant terms/clauses in the sidebar
- **Cross-linking**: Every content page links to related terms, clauses, and tools

### 5. SEO Enhancements

- `document.title` set dynamically on every content page
- Meta description via a small `useEffect` hook setting `<meta name="description">`
- Structured breadcrumbs on all pages
- Clean URL structure: `/legal-terms/indemnification`, `/legal-clauses/non-compete`, `/contract-types/nda`

### 6. Shared Layout Component

**`src/components/layout/ContentPageLayout.tsx`** — Reusable wrapper for all SEO content pages with:
- Breadcrumbs
- Sidebar with related links
- FAQ accordion
- "Related Tools" card grid
- "Was this helpful?" footer

## URL Structure

```text
/legal-terms              → Directory of all legal terms
/legal-terms/:slug        → Individual term page
/legal-clauses            → Directory of all clauses
/legal-clauses/:slug      → Individual clause page
/contract-types           → Directory of all contract types
/contract-types/:slug     → Individual contract type page
```

## Routes to Add (App.tsx)

Six new routes plus imports for the six new page components.

## Build Order

1. Data files (terms, clauses, contract types)
2. `ContentPageLayout` shared component
3. Three individual content pages
4. Three directory pages
5. Routes in App.tsx
6. Navbar updates + homepage "Legal Resources" section
7. Cross-linking between existing tools and new content

## Page Count Estimate

- 100+ legal term pages
- 50+ clause pages
- 30+ contract type pages
- 3 directory pages
- **Total: ~185+ new pages**

