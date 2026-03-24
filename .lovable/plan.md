

# Expand Blog Post Page Width

## Change

In `src/pages/BlogPostPage.tsx`, line 194, change `max-w-4xl` to a custom max-width of 1350px using Tailwind's arbitrary value syntax: `max-w-[1350px]`.

This single change widens the entire blog post container — the card, table of contents sidebar, and content area all benefit from the extra space.

| File | Change |
|---|---|
| `src/pages/BlogPostPage.tsx` | `max-w-4xl` → `max-w-[1350px]` on the main container |

