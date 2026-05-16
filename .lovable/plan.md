# Phase A2 — Multilingual SEO Plumbing

Make every route discoverable in all six languages (en, es, fr, de, pt, it) with proper canonical URLs, hreflang alternates, localized meta, and per-locale sitemap shards.

## Scope

1. **Per-locale canonical + hreflang on every page** via the shared `Head.tsx` component.
2. **Localized `<title>` / `<meta description>`** driven by `react-i18next` namespaces, with English fallback when a translation is missing.
3. **JSON-LD `inLanguage`** stamped on existing schema graphs.
4. **Sitemap shards per locale** in the existing `generate-sitemap` edge function, plus `xhtml:link rel="alternate"` entries inside each `<url>`.
5. **robots.txt + llms.txt** updated to advertise the new sitemap shards.
6. **`index.html` defaults** kept English (preserves rankings; per-route Helmet-style overrides handled by `Head.tsx`).

## Files to change

### Frontend

- `src/components/seo/Head.tsx`
  - Read current locale from URL (`useLocaleFromUrl`).
  - Build canonical as `https://legallyspoken.com` + locale-prefixed path (English = no prefix).
  - Inject `<link rel="alternate" hreflang="{lang}">` for all 6 locales + `x-default` (English).
  - Add `<meta property="og:locale">` and `og:locale:alternate` tags.
  - Accept optional `titleKey` / `descriptionKey` props; when provided, resolve via `t()` and fall back to literal `title`/`description`.

- `src/i18n/locales/{lang}/seo.json` (new namespace, 6 files)
  - Per-route title/description keys for the ~30 top routes (home, tools index, tool categories, legal-terms index, blog index, pillar landing pages, lawyer-near-me, about, privacy, terms, disclaimer). Long-tail dynamic pages keep current English meta until Phase A4 content translation.

- `src/components/seo/JsonLd.tsx`
  - Add `inLanguage` to the graph root using current locale.

- `index.html`
  - Keep English defaults. Remove any hard-coded `<link rel="canonical">` (Head.tsx now owns it per route).

### Sitemaps

- `supabase/functions/generate-sitemap/index.ts`
  - Add `LOCALES = ["en","es","fr","de","pt","it"]` and `DEFAULT_LOCALE = "en"`.
  - New helper `localizedUrl(path)` → returns all 6 absolute URLs for a path.
  - Update `u()` to emit `<xhtml:link rel="alternate" hreflang="{lang}" href="...">` for every locale + `x-default`, and add `xmlns:xhtml` to the urlset wrapper.
  - Add new shard types: `core-i18n`, `tools-i18n`, `legal-terms-i18n`, `guides-i18n`, `lawyers-i18n`. (state-guides + blog stay English-only for now; revisit Phase A4.)
  - Update sitemap index to list new shards.

- `public/sitemap.xml`
  - Add the new `?type=*-i18n` shards alongside existing ones.

- `public/robots.txt`
  - No structural change (still points to edge function index).

- `public/llms.txt`
  - Add a short "Languages: en, es, fr, de, pt, it" line under the description.

## Technical notes

```text
URL strategy
  English:   https://legallyspoken.com/tools/family
  Spanish:   https://legallyspoken.com/es/tools/family
  Canonical: self-referential per locale (each language is its own canonical)
  x-default: English URL (no prefix)
```

```tsx
// Head.tsx hreflang loop
SUPPORTED_LOCALES.forEach(loc => {
  const href = `https://legallyspoken.com${buildLocaleUrl(loc, pathname)}`;
  setLink(`alternate-${loc}`, { rel: "alternate", hreflang: loc, href });
});
setLink("alternate-x-default", { rel: "alternate", hreflang: "x-default", href: englishHref });
```

```xml
<!-- sitemap entry with alternates -->
<url>
  <loc>https://legallyspoken.com/tools/family</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://legallyspoken.com/tools/family"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://legallyspoken.com/es/tools/family"/>
  <!-- ...4 more... -->
  <xhtml:link rel="alternate" hreflang="x-default" href="https://legallyspoken.com/tools/family"/>
  <changefreq>weekly</changefreq><priority>0.7</priority>
</url>
```

## Out of scope (later phases)

- Translating tool content, FAQs, legal definitions, blog posts (Phase A4).
- EU lawyer directory routes/data (Track B).
- Swapping cookie banner for certified CMP (deferred per user).

## Acceptance

- View source of `/` and `/es/` shows correct canonical + 6 hreflang + x-default.
- `curl .../generate-sitemap?type=core-i18n` returns valid XML with `xhtml:link` alternates.
- Google Rich Results test passes for at least one localized route.
- Lighthouse SEO score unchanged or higher on `/`.
