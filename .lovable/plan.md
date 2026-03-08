

# Speed & SEO Optimization Plan

## Issues Found

### Performance (Critical)
1. **ToolPage.tsx imports 70+ components eagerly** — every tool component is bundled together, making the initial JS bundle massive. Users loading the homepage download code for all 70+ calculators.
2. **All page routes loaded eagerly in App.tsx** — no code splitting at the route level.

### SEO Gaps
3. **Missing sitemap.xml** — no sitemap for search engines to discover all pages.
4. **robots.txt missing Sitemap directive**.
5. **No `document.title` or meta description** on: `ToolsDirectory`, `CategoryPage`, `ToolPage` (partially via layout), `HomePage`.
6. **No canonical URLs** on individual pages (only homepage has one in index.html).
7. **No Open Graph / Twitter meta tags** on individual pages.
8. **No meta description tag** on directory pages (`LegalClausesDirectory`, `ContractTypesDirectory` set title only).

## Plan

### 1. Lazy-load all tool components (biggest performance win)
Convert all 70+ imports in `ToolPage.tsx` to `React.lazy()` with a `Suspense` fallback. This splits each tool into its own chunk — users only download the tool they visit.

### 2. Lazy-load route-level pages in App.tsx
Wrap page imports with `React.lazy()` and add `Suspense` around `Routes`. Splits homepage, directories, auth pages, etc. into separate chunks.

### 3. Create a reusable SEO `<Head>` component
A single component that sets `document.title`, meta description, canonical URL, and OG/Twitter tags via `useEffect`. Use it on every page.

### 4. Add SEO head tags to all pages missing them
- `ToolsDirectory` — "All Legal Tools | LegallySpoken"
- `CategoryPage` — "{Category Name} Tools | LegallySpoken"
- `HomePage` — already has some, add canonical + OG dynamically
- `DashboardPage`, `LoginPage`, `SignupPage`, `ForgotPasswordPage`, `ResetPasswordPage` — add titles + noindex where appropriate

### 5. Generate a static sitemap.xml
Create `public/sitemap.xml` listing all tool, term, clause, and contract-type URLs. Update `robots.txt` with `Sitemap:` directive.

### 6. Update robots.txt
Add `Sitemap: https://legallyspoken.com/sitemap.xml` and `Disallow` for auth/dashboard routes.

## Files

**Create (2)**
- `src/components/seo/Head.tsx` — reusable SEO meta component
- `public/sitemap.xml` — static sitemap

**Edit (7)**
- `src/pages/ToolPage.tsx` — lazy-load all tool components
- `src/App.tsx` — lazy-load route pages + Suspense
- `public/robots.txt` — add Sitemap directive + disallow auth routes
- `src/pages/ToolsDirectory.tsx` — add Head component
- `src/pages/CategoryPage.tsx` — add Head component
- `src/pages/HomePage.tsx` — add canonical + OG tags
- `src/components/layout/ToolPageLayout.tsx` — add canonical + OG tags

