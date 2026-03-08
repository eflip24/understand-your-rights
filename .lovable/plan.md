

# Speed Optimization, Cloud Cost Reduction & SEO Completion

## Current Issues Identified

1. **Google Fonts loaded via CSS `@import`** — render-blocking, delays first paint
2. **Navbar calls `useAdminRole` on every page** — unnecessary database query for non-logged-in users (majority of traffic)
3. **Blog queries make 3 sequential DB calls** (posts, mappings, categories) — can be reduced
4. **`useBlogPosts` fetches ALL posts for related posts on `BlogPostPage`** — wasteful
5. **No `staleTime` on React Query hooks** — refetches on every mount
6. **Sitemap is static XML** — missing `/blog` and all blog post URLs
7. **Missing SEO**: no `BreadcrumbList` JSON-LD on any page, no `BlogPosting` JSON-LD on blog posts, no `og:image` on blog posts
8. **No `<link rel="preconnect">` for Supabase API domain**
9. **`date-fns` imported without tree-shaking awareness** — minor but format is heavy

## Plan

### 1. Font Loading Optimization
- Move Google Fonts from CSS `@import` to `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html` with `display=swap` (already has it but `@import` blocks render)
- Remove the `@import` line from `src/index.css`

### 2. Reduce Unnecessary Database Calls
- **`useAdminRole`**: Skip the DB query entirely when `user` is null (already does this, good). Add caching with React Query instead of raw `useEffect` + `useState` to avoid re-fetching.
- **`useBlogPosts`**: Add `staleTime: 5 * 60 * 1000` (5 min) to all blog queries so they don't refetch on every navigation
- **`useBlogCategories`**: Same staleTime treatment
- **`BlogPostPage` related posts**: Instead of fetching ALL posts via `useBlogPosts()`, fetch only 3 related posts with a dedicated lightweight query

### 3. Optimize Blog Database Queries
- Create a **database view** `blog_posts_with_categories` that joins posts + categories in a single query, eliminating the 3-call waterfall in `useBlogPosts`. This uses a single DB round-trip instead of 3.

### 4. SEO Completions

**Structured Data (JSON-LD):**
- Add `BreadcrumbList` schema to `ContentPageLayout`, `ToolPageLayout`, and `BlogPostPage`
- Add `BlogPosting` schema to `BlogPostPage` (headline, author, datePublished, image)
- Add `ItemList` schema to `BlogPage` for the post listing

**Open Graph:**
- Pass `ogImage` to `<Head>` on `BlogPostPage` using the featured image
- Add `ogType="article"` on blog post pages

**Sitemap:**
- Add `/blog` URL to sitemap
- Create an edge function `generate-sitemap` that dynamically generates the sitemap including all blog post URLs from the database, so new posts are automatically indexed

**Missing meta:**
- Add `<meta name="theme-color">` to `index.html`

### 5. Preconnect Hints
- Add `<link rel="preconnect" href="https://fpdfibyywvlcqjrkuuhz.supabase.co">` to `index.html` to speed up API calls
- Add `<link rel="dns-prefetch">` as fallback

### 6. React Query Global Defaults
- Set global `staleTime` and `gcTime` on the QueryClient in `App.tsx` to reduce unnecessary refetches across the app

## Files

**Edit (7)**
- `index.html` — preconnect hints for fonts + Supabase, theme-color meta
- `src/index.css` — remove `@import` for Google Fonts
- `src/App.tsx` — add QueryClient default staleTime/gcTime
- `src/hooks/useBlogPosts.ts` — add staleTime, add lightweight related posts query, optimize with view
- `src/pages/BlogPostPage.tsx` — use lightweight related query, add BlogPosting + BreadcrumbList JSON-LD, pass ogImage
- `src/components/seo/JsonLd.tsx` — add `breadcrumbSchema` and `blogPostingSchema` helpers
- `src/hooks/useAdminRole.ts` — convert to React Query for caching

**Create (1)**
- `supabase/functions/generate-sitemap/index.ts` — dynamic sitemap with blog posts

**Database (1 migration)**
- Create `blog_posts_with_categories` view joining posts + categories in one query

