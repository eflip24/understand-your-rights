

# Admin Section Plan

## Overview

Build a role-based admin panel at `/admin` with blog post CRUD (create, edit, delete), category management, and a dashboard overview. Access controlled via a `user_roles` table with server-side role checks.

## Database Changes (1 migration)

### 1. `user_roles` table
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

### 2. `has_role` security definer function
Bypasses RLS to check roles without recursion.

### 3. RLS policies on `user_roles`
- Admins can SELECT all roles.
- No client-side INSERT/UPDATE/DELETE.

### 4. Blog table changes
- Add `status` column to `blog_posts` (`draft` / `published`) defaulting to `published` for existing rows.
- Add INSERT/UPDATE/DELETE policies on `blog_posts`, `blog_categories`, `blog_post_categories` for admin role users.

### 5. Storage policy
- Add INSERT/UPDATE/DELETE policies on `blog-images` bucket for admin role users.

## Edge Function

### `admin-blog` edge function
Handles blog CRUD operations server-side with role verification:
- `POST /create` — create post, upload featured image, manage category mappings
- `POST /update` — update post fields, replace image if changed
- `POST /delete` — delete post and its category mappings
- Validates admin role via `has_role()` before any mutation

## Frontend Pages

### Admin Layout (`/admin`)
- Protected route — checks `user_roles` table for admin role on load, redirects non-admins
- Sidebar navigation: Dashboard, Blog Posts, Categories

### Admin Dashboard (`/admin`)
- Quick stats: total posts, categories, published vs draft counts

### Blog Posts Manager (`/admin/blog`)
- Table listing all posts with title, status, date, categories
- Search/filter by status
- "New Post" button
- Edit/Delete actions per row

### Blog Post Editor (`/admin/blog/new`, `/admin/blog/edit/:id`)
- Form fields: title, slug (auto-generated from title), content (rich textarea), excerpt, author name, status (draft/published), published date
- Featured image upload with preview
- Category multi-select (checkboxes)
- Save/Publish button

### Category Manager (`/admin/categories`)
- List, add, edit, delete categories
- Parent category selection

## Files

**Create (7)**
- `src/pages/admin/AdminLayout.tsx` — layout wrapper with sidebar + role guard
- `src/pages/admin/AdminDashboard.tsx` — stats overview
- `src/pages/admin/AdminBlogList.tsx` — posts table with actions
- `src/pages/admin/AdminBlogEditor.tsx` — create/edit form
- `src/pages/admin/AdminCategories.tsx` — category CRUD
- `src/hooks/useAdminRole.ts` — hook to check admin role
- `supabase/functions/admin-blog/index.ts` — server-side blog CRUD

**Edit (2)**
- `src/App.tsx` — add `/admin/*` routes
- `supabase/config.toml` — add `[functions.admin-blog]` with `verify_jwt = false`

**Database (1 migration)**
- Create `user_roles` table, `has_role()` function, `app_role` enum
- Add `status` column to `blog_posts`
- Add admin RLS policies to blog tables and storage

## Security
- Role checks happen server-side in the edge function using `has_role()` — not client-side localStorage
- Client-side hook only controls UI visibility; all mutations go through the edge function which validates the JWT and role
- Blog post editor sanitizes content before storage

