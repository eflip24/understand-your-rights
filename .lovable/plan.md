

# Blog Import from WordPress

## What We're Building

A full blog section for the app, importing all 34 posts from legallyspoken.com's WordPress REST API. This includes fetching posts, categories, and featured images — storing images in our own storage and rendering blog content with a polished layout.

## WordPress API Summary

- **34 posts** across ~20 categories (Laws, Estate Planning, Criminal Law, Calculators, etc.)
- **Categories** have parent-child hierarchy (e.g. Laws > Copyright Law, Business Law > Employment Law)
- **Featured images** available via `wp:featuredmedia` — mostly .webp and .jpg files
- **Content** is HTML (Elementor-generated), with titles, excerpts, slugs, dates, and author info

## Architecture

```text
Edge Function (import-blog)
  ├── Fetches all posts from WP REST API (with _embed for images)
  ├── Fetches all categories
  ├── Downloads each featured image → uploads to Storage bucket
  └── Inserts posts + categories into DB tables

Frontend
  ├── /blog                → Blog listing page (grid of cards)
  ├── /blog/:slug          → Individual blog post page
  └── /blog/category/:slug → Category filtered view
```

## Database Tables

### `blog_categories`
- `id` (uuid, PK)
- `wp_id` (integer, unique) — original WP category ID
- `name` (text)
- `slug` (text, unique)
- `parent_wp_id` (integer, nullable)
- `created_at` (timestamptz)

### `blog_posts`
- `id` (uuid, PK)
- `wp_id` (integer, unique) — original WP post ID
- `title` (text)
- `slug` (text, unique)
- `content` (text) — HTML content
- `excerpt` (text)
- `featured_image_url` (text, nullable) — URL to our storage bucket
- `published_at` (timestamptz)
- `author_name` (text)
- `created_at` (timestamptz)

### `blog_post_categories` (join table)
- `post_id` (uuid, FK → blog_posts)
- `category_id` (uuid, FK → blog_categories)

RLS: All three tables get a public SELECT policy (blog is public content). No INSERT/UPDATE/DELETE from client.

## Storage

- Create a `blog-images` public bucket
- The edge function downloads each featured image from WP and uploads it to `blog-images/{slug}.{ext}`

## Edge Function: `import-blog`

Single invocation function that:
1. Fetches `/wp-json/wp/v2/categories?per_page=100` → inserts into `blog_categories`
2. Fetches `/wp-json/wp/v2/posts?per_page=100&_embed` (paginated if needed) → for each post:
   - Downloads the featured image from the WP media URL
   - Uploads to storage bucket `blog-images`
   - Inserts post into `blog_posts` with the new storage URL
   - Inserts category mappings into `blog_post_categories`
3. Uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS for inserts

## Frontend Pages

### Blog Listing (`/blog`)
- Grid of post cards with featured image, title, excerpt, date, category badges
- Category filter sidebar/tabs
- Clean card layout with hover effects matching existing site style

### Blog Post (`/blog/:slug`)
- Hero featured image (full-width with overlay)
- Title, author, date, category badges
- Rendered HTML content with Tailwind Typography (`prose` classes)
- Related posts at bottom
- Breadcrumbs: Home > Blog > Post Title

### Blog Category (`/blog/category/:slug`)
- Filtered listing by category
- Category name as heading

## Content Layout Improvements

The WP content is raw HTML with Elementor markup. The blog post page will:
- Strip Elementor wrapper divs and clean up the HTML
- Apply `prose prose-lg dark:prose-invert` for beautiful typography
- Add proper spacing, heading hierarchy, and responsive images
- Show a table of contents generated from H2/H3 headings

## Files

**Create (5)**
- `supabase/functions/import-blog/index.ts` — WP import edge function
- `src/pages/BlogPage.tsx` — blog listing
- `src/pages/BlogPostPage.tsx` — individual post
- `src/pages/BlogCategoryPage.tsx` — category filtered view
- `src/hooks/useBlogPosts.ts` — data fetching hooks

**Edit (2)**
- `src/App.tsx` — add `/blog`, `/blog/:slug`, `/blog/category/:slug` routes
- `src/components/layout/Navbar.tsx` — add Blog link to navigation

**Database (1 migration)**
- Create `blog_categories`, `blog_posts`, `blog_post_categories` tables
- Create `blog-images` storage bucket with public access
- Public SELECT RLS policies on all three tables

