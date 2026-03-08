

# Footer Legal Pages + Visual Enhancements

## Part 1: Create Legal Pages

Create three new static pages with proper SEO, reusing the existing `ContentPageLayout` pattern:

### Pages to Create
1. **`/disclaimer`** — Standard legal disclaimer: not legal advice, no attorney-client relationship, information accuracy limits, liability limitations
2. **`/privacy-policy`** — Privacy policy: data collection (analytics, cookies), Lovable Cloud usage, no selling of data, contact info
3. **`/terms-of-service`** — Terms of service: acceptable use, intellectual property, limitation of liability, termination, governing law

### Files
- **Create**: `src/pages/DisclaimerPage.tsx`, `src/pages/PrivacyPolicyPage.tsx`, `src/pages/TermsOfServicePage.tsx`
- **Edit**: `src/App.tsx` — add routes for `/disclaimer`, `/privacy-policy`, `/terms-of-service`
- **Edit**: `src/components/layout/Footer.tsx` — update links from `/` to correct paths

## Part 2: Add Images & Visual Polish

### Approach
Use AI image generation via the Lovable AI gateway to create themed graphics, stored in a storage bucket. This adds visual richness without relying on external stock photo services.

### What to Add
1. **Homepage hero**: Add a subtle decorative illustration or abstract legal-themed graphic alongside the text (e.g., a stylized contract/scales motif)
2. **Category cards on homepage**: Add small themed illustrations per category (contract, consumer, employment, etc.)
3. **Blog post default image**: Create a default featured image for blog posts that don't have one

### Implementation
- Create an edge function `generate-images` that uses the Lovable AI image generation API to produce themed graphics
- Store generated images in a storage bucket
- Reference them from the homepage and category components
- Add a fallback/default blog image

### Files
- **Create**: `supabase/functions/generate-images/index.ts`
- **Edit**: `src/pages/HomePage.tsx` — add category illustrations and hero graphic
- **Edit**: `src/pages/BlogPostPage.tsx` — add default featured image fallback

**Note**: Image generation will use the Lovable AI supported model (`google/gemini-3-pro-image-preview`) and store results in a storage bucket so they're served as static assets after initial generation.

