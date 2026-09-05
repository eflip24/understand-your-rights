# International expansion: New Zealand, South Africa + country calculators

## 1. Two new country guides

Add New Zealand and South Africa to the international section, matching the depth of the existing UK, Ireland, Canada and Australia pages:

- Claim deadlines table (injury, contract, employment, consumer)
- Quick facts strip, small-claims/low-value track summary with current fees
- Plain-English topic sections (employment dismissal, consumer rights, injury compensation)
- FAQs, free-help bodies (NZ: Employment NZ, Disputes Tribunal, ACC; ZA: CCMA, Small Claims Court, Legal Aid SA)
- Cited sources and a verification date

They appear automatically on the international hub comparison table, in site search, the guides menu and the sitemap.

## 2. Country calculators

Two interactive tools per country, reusing the existing calculator layout:

**Notice period / dismissal calculator** — enter role, length of service, contract type and reason for leaving; returns minimum notice, pay-in-lieu position, the tribunal/commission filing deadline and what to do next. Jurisdiction rules for UK, Ireland, Canada (federal + province note), Australia, New Zealand and South Africa.

**Small claims cost & eligibility checker** — enter claim value and country; returns whether it fits the small-claims track, the filing fee, hearing fee where one applies, whether lawyers are permitted, and the appeal position.

Both live under `/international/:country/notice-period` and `/international/:country/small-claims-cost`, with a chooser hub, so each country page gains two result-moment pages that rank for their own searches.

## 3. Wiring

Each country page links to its two calculators; each calculator links back to the country guide and across to the equivalent US tool. All new URLs are added to search, the guides index and the sitemap.

## Technical notes

- Extend `src/data/internationalJurisdictions.ts` with two new entries plus a `notice` rules block and a `smallClaimsTiers` fee table per jurisdiction.
- New `src/data/internationalCalculators.ts` for the rule engine; new pages `InternationalNoticeCalculator.tsx` and `InternationalSmallClaimsCalculator.tsx` rendered through the existing tool layout with FAQ/HowTo JSON-LD.
- Routes in `AppRoutes.tsx`; entries in `src/lib/searchIndex.ts`, `src/data/guideIndex.ts` and `supabase/functions/generate-sitemap/index.ts`.
- English-only `Head` handling, consistent with the rest of the international section.
