## Phase B4 — Seed EU Lawyer Listings

Populate `src/data/eu/lawyerListings.eu.ts` with hand-curated listings for the major EU5 metros to validate the LegalService JSON-LD chain, map rendering, and contact UI end-to-end.

### Scope

**Cities seeded (15 total, 3 per country — primary tier only):**
- FR: Paris, Lyon, Marseille
- DE: Berlin, Munich, Hamburg
- ES: Madrid, Barcelona, Valencia
- IT: Rome, Milan, Naples
- PT: Lisbon, Porto, Braga

**Listings per city:** 3 firms each → **45 total listings**.

**Practice area coverage:** Each firm tagged with 2–4 canonical areas drawn from `euPracticeAreas` (employment, family, immigration, real-estate, criminal, corporate, tax, consumer, ip, personal-injury, contract, civil-litigation) so every area page in a seeded city resolves to ≥1 firm.

### Data shape (already defined in B1)

```ts
{
  name, address, lat, lng,
  phone?, email?, website?,
  practiceAreas: EuAreaCanonicalSlug[],
  description?, barNumber?,
}
```

Keyed by `"{countryCode}-{citySlugCanonical}"` (e.g. `"fr-paris"`, `"de-munich"`).

### Curation rules

- **Real, verifiable firms only** — use publicly listed bar-registered firms with website + phone published on their own site.
- **Coordinates** within ~500m of the registered office; addresses written in local-language format (e.g. `10 rue de la Paix, 75002 Paris`).
- **Bar number** included where the firm publishes it; omitted otherwise (field is optional).
- **Description** ≤ 140 chars, neutral English (UI string already i18n; description is firm-supplied prose).
- **Phone** in E.164-friendly local format (`+33 1 …`, `+49 30 …`).

### Filtering for area pages

`EuLawyersCityPage` already calls `listingsForCity(country, city)` and renders all. The Area page (`EuLawyersAreaPage`) currently lists cities only — no change needed. If we want area-filtered listings on the City page, that's a B5 enhancement; B4 stays at "city-level seed".

### Verification

1. Visit `/lawyer-eu/france/employment/paris` → 1–3 cards render with map markers.
2. View source → `LegalService` JSON-LD per listing, `FAQPage` present.
3. Repeat one spot-check per country (e.g. `/de/lawyer-eu/deutschland/familienrecht/berlin`).
4. `curl …/generate-sitemap?type=lawyers-eu-i18n` — URL count unchanged (sitemap is route-based, not listing-based).

### Files

- **Edit:** `src/data/eu/lawyerListings.eu.ts` — replace empty record with 15 city entries × 3 firms.
- **Edit:** `.lovable/plan.md` — append B4 completion notes.

No template, route, or i18n changes. No new dependencies.

### Out of scope (deferred)

- Tier-2 cities (B5).
- Per-area filtering on city page.
- Firm logos / photos.
- Lawyer-level (vs firm-level) listings.
