

# Fix Duplicate FAQPage Schema & Improve SEO Compliance

## Root Cause

The "Duplicate field 'FAQPage'" error from Google Search Console is caused by how the `JsonLd` component works. It uses `useEffect` to append `<script type="application/ld+json">` tags to `<head>`. During SPA navigation, React mounts the new page's schemas **before** unmounting the old page's schemas, so Google's renderer briefly sees two FAQPage scripts in the DOM simultaneously.

Additionally, pages like `LegalClausePage`, `LegalTermPage`, `ContractTypePage`, and `ToolPageLayout` inject schemas as an **array via `.map()`**, creating multiple separate `<script>` tags — including one for the page schema and one for FAQPage. Google treats separate `<script>` tags with the same `@type` on the same page as duplicates.

## Fix Strategy

### 1. Consolidate all schemas into a single `<script>` tag per page

Instead of rendering multiple `<JsonLd>` components (one per schema), merge all schemas into a single `@graph` array inside one JSON-LD block. Google recommends this pattern.

**Change `JsonLd.tsx`**: Add a new `JsonLdGraph` component that accepts an array of schemas and outputs a single `<script>` with:
```json
{ "@context": "https://schema.org", "@graph": [ ...schemas ] }
```

### 2. Fix cleanup to prevent stale schemas

Replace the current `useEffect` append/remove pattern with a **deterministic approach**: use a single persistent `<script id="ld-json-graph">` element that gets its content **replaced** on every render, rather than appending new elements. This eliminates the mount/unmount race condition entirely.

### 3. Update all pages to use the new consolidated component

Replace the `.map()` pattern on every page that renders multiple `<JsonLd>` tags:
- `LegalClausePage.tsx` — 2 schemas (article + FAQ)
- `LegalTermPage.tsx` — 2 schemas (definedTerm + FAQ)
- `ContractTypePage.tsx` — 2 schemas (article + FAQ)
- `ToolPageLayout.tsx` — 2 schemas (webApplication + FAQ)
- `ClusterArticlePage.tsx` — 3 schemas (article + breadcrumb + FAQ)
- `PillarPage.tsx` — 2 schemas (article + breadcrumb)
- `LocalLawyersCityPage.tsx` — 2 schemas (breadcrumb + localBusiness)
- `BlogPostPage.tsx` — 2 schemas (blogPosting + breadcrumb)
- `HomePage.tsx` — 1 schema (website)

### 4. Additional SEO improvements

- **Add `datePublished` / `dateModified`** to Article schemas where possible (Google recommends these for Article rich results)
- **Add `Organization` schema** on the homepage with logo and siteLinks
- **Ensure canonical URLs** strip trailing slashes consistently
- **Add `robots` meta tag** for index/follow on public pages (currently only set for noindex pages)

---

## Files to Edit

| File | Change |
|---|---|
| `src/components/seo/JsonLd.tsx` | Add `JsonLdGraph` component that merges schemas into single `@graph` script; fix cleanup |
| `src/pages/LegalClausePage.tsx` | Use single `JsonLdGraph` instead of `.map()` |
| `src/pages/LegalTermPage.tsx` | Same |
| `src/pages/ContractTypePage.tsx` | Same |
| `src/components/layout/ToolPageLayout.tsx` | Same |
| `src/pages/ClusterArticlePage.tsx` | Same |
| `src/pages/PillarPage.tsx` | Same |
| `src/pages/LocalLawyersCityPage.tsx` | Same |
| `src/pages/BlogPostPage.tsx` | Same |
| `src/pages/HomePage.tsx` | Same + add Organization schema |
| `src/components/seo/Head.tsx` | Normalize canonical URL (strip trailing slash) |

## Technical Detail — New JsonLdGraph Component

```typescript
export function JsonLdGraph({ schemas }: { schemas: (Record<string, unknown> | null)[] }) {
  const filtered = schemas.filter(Boolean);
  // Remove @context from individual schemas, use single top-level @context
  const graph = filtered.map(({ "@context": _, ...rest }) => rest);
  const data = { "@context": "https://schema.org", "@graph": graph };
  const json = JSON.stringify(data);

  useEffect(() => {
    let el = document.getElementById("ld-json-graph") as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = "ld-json-graph";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = json;
    return () => { el?.remove(); };
  }, [json]);

  return null;
}
```

Each page passes all its schemas as an array to this single component, producing one clean `<script>` tag with no duplicates.

