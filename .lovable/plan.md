

# Fix: wp_id Integer Overflow

## Problem
`wp_id` is a PostgreSQL `integer` column (max ~2.1 billion). The code sets `wp_id = Date.now()` which in 2026 returns ~1.77 trillion — far exceeding the integer limit.

## Fix

### 1. Database Migration
Change `wp_id` column from `integer` to `bigint` on both `blog_posts` and `blog_categories` tables. This supports values up to ~9.2 quintillion.

```sql
ALTER TABLE public.blog_posts ALTER COLUMN wp_id TYPE bigint;
ALTER TABLE public.blog_categories ALTER COLUMN wp_id TYPE bigint;
```

No code changes needed — `Date.now()` will work correctly with `bigint`.

### Files
| File | Change |
|---|---|
| Database migration | Alter `wp_id` to `bigint` on both tables |

