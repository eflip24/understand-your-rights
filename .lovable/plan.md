

# Navbar Improvements + Admin Role Grant

## Two things to do:

### 1. Grant admin role to beevsacer@gmail.com
Run a migration to insert the admin role for user `cfbc21ce-77b7-472c-839f-627a7065857a` into `user_roles`.

### 2. Navbar & Footer changes

**Navbar (`src/components/layout/Navbar.tsx`)**
- Make full-width: change `container` to `w-full px-6` (or similar) so the navbar stretches edge-to-edge
- Remove "Blog" from `navLinks` array
- Keep remaining links: Tools, AI Analysis, Legal Terms, Legal Clauses, Contract Types

**Footer (`src/components/layout/Footer.tsx`)**
- Add "Blog" link to the Resources section (alongside "All Tools")

**Mobile menu** — also remove Blog from the mobile sheet nav links (handled automatically since it reads from the same `navLinks` array).

## Files
- **Edit**: `src/components/layout/Navbar.tsx` — full-width layout, remove Blog link
- **Edit**: `src/components/layout/Footer.tsx` — add Blog link to Resources
- **Database**: Insert admin role for the user

