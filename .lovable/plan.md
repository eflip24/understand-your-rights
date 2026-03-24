

# Rename `/local-lawyers` to `/lawyer-near-me`

## Scope

Global find-and-replace of `/local-lawyers` with `/lawyer-near-me` across 10 files (141 occurrences total).

## Files to Edit

| File | Occurrences | What changes |
|---|---|---|
| `src/App.tsx` | 4 | Route paths |
| `src/pages/LocalLawyersDirectory.tsx` | 4 | Breadcrumb URLs, JSON-LD URLs, internal links |
| `src/pages/LocalLawyersAreaPage.tsx` | 8 | Breadcrumb URLs, JSON-LD URLs, internal links, redirect fallback |
| `src/pages/LocalLawyersStatePage.tsx` | 10 | Breadcrumb URLs, JSON-LD URLs, internal links, redirect fallback |
| `src/pages/LocalLawyersCityPage.tsx` | 8 | Breadcrumb URLs, JSON-LD URLs, internal links, redirect fallback |
| `src/pages/HomePage.tsx` | 1 | "Find a Lawyer" link in guides section |
| `src/components/layout/Navbar.tsx` | 2 | Desktop + mobile nav links |
| `src/components/layout/Footer.tsx` | 1 | Footer resources link |
| `src/components/seo/SmartLocalLink.tsx` | 1 | Dynamic link builder |
| `supabase/functions/generate-sitemap/index.ts` | 5 | Sitemap URL generation for all lawyer pages |

## Approach

Straight string replacement: every instance of `/local-lawyers` becomes `/lawyer-near-me`. No logic changes, no new files, no data model changes. The page components, file names, and data exports keep their current names (only URL slugs change).

After implementation, I will do a final search to confirm zero remaining references to `/local-lawyers`.

