

# Phase 5: SEO, Dark Mode, User Accounts & Content Expansion

Phase 5 covers four workstreams. Given the scope, I recommend building them in this order across multiple batches.

## 5A: Dark Mode (smallest, immediate visual impact)

- Add `next-themes` `ThemeProvider` wrapping the app in `App.tsx`
- Add a theme toggle button (Sun/Moon icon) to `Navbar.tsx`
- Dark mode CSS variables are already defined in `index.css` — just needs the `class` toggle
- `tailwind.config.ts` already has `darkMode: ["class"]` configured

**Files**: `App.tsx`, `Navbar.tsx` (edits only, ~20 lines total)

## 5B: JSON-LD Structured Data

Add a reusable `JsonLd` component that injects `<script type="application/ld+json">` into the page head.

- **Tool pages** (`ToolPageLayout.tsx`): Add `WebApplication` + `FAQPage` schema
- **Legal term pages** (`LegalTermPage.tsx`): Add `DefinedTerm` + `FAQPage` schema
- **Legal clause pages** (`LegalClausePage.tsx`): Add `Article` + `FAQPage` schema
- **Contract type pages** (`ContractTypePage.tsx`): Add `Article` + `FAQPage` schema
- **Homepage**: Add `WebSite` + `Organization` schema

**Files**: Create `src/components/seo/JsonLd.tsx`, edit 5 page files

## 5C: Expand SEO Content to 200+ Pages

Current counts: ~56 legal terms (with ~56 detail pages), ~21 clauses. Target: 100+ terms, 50+ clauses.

- Add ~44 new entries to `legalTermPages.ts` (terms already exist in `legalTerms.ts` without detail pages, plus new ones)
- Add ~30 new entries to `legalClauses.ts`
- Each entry includes: slug, explanation, example clauses, FAQs, related links

This is the largest workstream — will be done in 2-3 batches of content additions.

**Files**: `legalTermPages.ts`, `legalClauses.ts`, possibly `legalTerms.ts`

## 5D: User Accounts with Saved Analyses

- Create `saved_analyses` table in the database (user_id, tool_slug, input_data JSON, result_data JSON, created_at)
- Create `profiles` table with trigger for auto-creation on signup
- Enable email auth (with email confirmation)
- Add auth pages: `/login`, `/signup`, `/reset-password`
- Add auth context/provider component
- Add "Save Analysis" button to AI tool results
- Add `/dashboard` page showing saved analyses
- Update Navbar with login/profile/logout buttons
- RLS policies: users can only read/write their own data

**Files**: 2 DB migrations, ~6 new components/pages, edit `App.tsx`, `Navbar.tsx`, AI tool components

## Build Order

1. **5A: Dark Mode** — quick win, 2 file edits
2. **5B: JSON-LD** — 1 new component + 5 page edits
3. **5C: Content Expansion Batch 1** — add ~25 new term pages + ~15 new clauses
4. **5C: Content Expansion Batch 2** — add ~19 more term pages + ~15 more clauses
5. **5D: User Accounts** — database setup, auth pages, saved analyses feature

Total new pages when complete: 200+ (100 terms + 50 clauses + 50 tools + contract types)

