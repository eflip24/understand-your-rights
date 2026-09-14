# New blog posts: current legal topics, images, and six languages

Eight new articles on legal topics people are searching for right now, each with an AI-generated header image, automatic links into the existing tools and guides, and translated versions in all six site languages.

## Topic shortlist

Checked against Semrush before writing; anything with no real demand gets swapped out. Two are already confirmed:

| Topic | Evidence | Paired tool/guide |
|---|---|---|
| How data breach settlement payouts are calculated | "data breach settlement" 1,600/mo, $1.72 CPC, moderate difficulty | Data breach compensation guide |
| Are deepfakes illegal? State-by-state and the TAKE IT DOWN Act | "take it down act" 18,100/mo, low competition; "deepfake laws" 260/mo | Deepfake laws guide, AI & Tech Law |
| AI hiring and workplace surveillance: your rights | To verify | AI hiring guide |
| Health insurance claim denied: appeal deadlines by state | To verify | Health insurance denial guide, appeal letter |
| Severance agreements: what to check before signing | Already ranks (South Carolina page, position 18) | Severance calculator |
| Subrogation: when your insurer takes part of your settlement | Already ranks (Colorado, position 55) | Settlement estimator |
| Hiring an English-speaking lawyer in Spain | Large impression cluster in Scandinavia/Netherlands/Spain | Spain lawyer guide, EU tools |
| Small claims court costs and deadlines by country | Extends existing court-fee dataset | Small claims checker, filing fee data |

Each post: ~1,400-1,800 words, direct answer first, one original data table, an FAQ block, editorial byline, review date, and the standard legal disclaimer.

## Featured images

Every post gets a generated header image (clean editorial illustration in the navy/gold palette, no text baked in), uploaded to the existing blog image storage and saved on the post so it shows on the article, the blog list, and social shares. Alt text written per post.

## Internal linking

Posts run through the existing automatic legal-term linking, plus 3-5 hand-picked links to the matching calculator, pillar guide and state pages. The paired tool and guide pages get a reciprocal link back so the new posts are not orphans.

## Multilingual versions

Blog posts currently exist in English only — there is no translation storage for them, unlike guides and tools. The plan adds the same pattern used for guides: a translations store, an AI translation job, language-prefixed article URLs, a language switcher on the article, and hreflang links between the six versions. Spanish, French, German, Italian and Portuguese for all eight posts; the Spain lawyer post additionally gets Danish, Swedish, Norwegian and Dutch summary sections inside the English article (matching what already worked on the Spain guide), since those languages are not full site locales.

## Technical notes

- New `blog_translations` table (post id + locale + title/excerpt/content/meta), RLS public read, admin write, GRANTs to `anon`/`authenticated`/`service_role`.
- New edge function `translate-blog-cron` mirroring `translate-guides-cron`, on the existing pg_cron schedule; overlay merge in `useBlogPosts` so a missing locale falls back to English with the existing fallback banner.
- Routes: `/:locale/blog` and `/:locale/blog/:slug` following `src/i18n/paths.ts` conventions; `Head.tsx` hreflang scope extended to blog URLs, and the blog sitemap shard emits all six locales per post.
- Drafting reuses the `scripts/publish-blog-1-5.mjs` pattern (Lovable AI, strict JSON, idempotent on slug) with an added image step writing to the `blog-images` bucket.
- Ad slots: articles already render above-content, mid-content and end-of-article units — verified per post.

## Order of work

1. Verify the unconfirmed topics in Semrush, finalise the eight.
2. Translation storage, function, routes, hreflang and sitemap.
3. Write and publish the eight English posts with images and links.
4. Run the translation pass for the five locales, spot-check each language.
5. Publish.
