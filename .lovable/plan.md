

# LegallySpoken.com — Phase 1 Build Plan

## Overview
Build a clean, professional legal tools platform with 15 starter tools, a homepage, and tool page layout. No accounts initially — pure utility site. Navy & gold design. React + Vite + Tailwind stack.

## Design System
- **Colors**: Deep navy (`#1B2A4A`), charcoal (`#2D3748`), white, gold accent (`#D4A843`)
- **Fonts**: Serif headings (via Google Fonts — Playfair Display), clean sans-serif body (Inter)
- **Feel**: Trustworthy, simple, professional — not corporate law firm

## Site Structure

```text
/                        → Homepage
/tools                   → All tools directory
/tools/:category         → Category page
/tools/:category/:tool   → Individual tool page
```

## Homepage Sections
1. **Hero** — "Simple legal tools for everyday people" with search bar
2. **Popular Tools** — Grid of 6 most-used tools
3. **Tool Categories** — Cards for each category (5 categories)
4. **How It Works** — 3-step explainer
5. **Footer** — Links, disclaimer ("not legal advice")

## Navigation
- Logo + nav links: Tools, Categories, About
- Prominent search bar
- Mobile hamburger menu

## Phase 1 Tools (15 tools across 4 categories)

**Contract Tools (4)**
1. Contract Reading Time Calculator — word count → estimated read time
2. Contract Word Counter — paste text, get stats
3. Legal Jargon Translator — dictionary-based lookup of common legal terms
4. Contract Clause Finder — search for common clause types in pasted text

**Consumer Tools (4)**
5. Cancellation Deadline Calculator — input signup date + cooling-off period
6. Notice Period Calculator — input start date + notice terms
7. Late Fee Calculator — principal + rate + days late
8. Refund Eligibility Checker — guided questionnaire

**Employment Tools (3)**
9. Non-Compete Duration Checker — input state + duration, get enforceability info
10. Freelance Rate Calculator — hourly ↔ project ↔ annual conversion
11. Invoice Late Interest Calculator — amount + rate + overdue days

**Document Generators (4)**
12. NDA Template Generator — form-based, outputs formatted text
13. Privacy Policy Generator — guided form → policy text
14. Complaint Letter Generator — form → formal complaint letter
15. Terms of Service Generator — form → ToS document

## Tool Page Layout (reusable template)
Each tool page follows a consistent structure:
- **Title + description**
- **Tool interface** (the interactive calculator/form)
- **Example use case** — pre-filled demo
- **FAQ section** — 3-5 common questions
- **Related tools** — links to similar tools

## Technical Architecture

### Key Files & Components
- `src/data/tools.ts` — Tool registry (id, name, category, description, slug)
- `src/data/legalTerms.ts` — Dictionary of 100+ legal terms for the jargon translator
- `src/components/layout/Navbar.tsx` — Site navigation with search
- `src/components/layout/Footer.tsx` — Footer with disclaimer
- `src/components/layout/ToolPageLayout.tsx` — Reusable tool page wrapper
- `src/components/tools/` — One component per tool
- `src/pages/HomePage.tsx` — Landing page
- `src/pages/ToolsDirectory.tsx` — Browse all tools
- `src/pages/ToolPage.tsx` — Dynamic tool page (loads tool by slug)

### Routing
React Router with parameterized routes. Tool slugs like `/tools/contract/reading-time-calculator`.

### State Management
All tools run client-side only. No API calls, no database. Pure React state within each tool component.

### SEO Preparation
- Descriptive page titles and meta via `document.title`
- Clean URL structure ready for future SSR/prerendering
- Structured internal linking between related tools

## Build Order
1. Design system (colors, typography, global styles in Tailwind config)
2. Layout components (Navbar, Footer, ToolPageLayout)
3. Homepage
4. Tool registry and routing
5. Build all 15 tools (calculators first, then generators)
6. Tools directory page

This delivers a fully functional, polished Phase 1 with no backend costs.

