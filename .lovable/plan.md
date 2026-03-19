

# Internal Linking Bridge — Global SEO Audit & Implementation

## Summary

Implement a comprehensive internal linking system across the entire LegallySpoken codebase: add CTAs to pillar articles, create contextual "local" bridges, auto-link legal keywords in content, ensure pillar pages act as hubs, and verify nav/footer links.

---

## 1. Article → Calculator CTAs

**Problem**: Cluster articles in `autoAccidentLaw.ts` and `personalInjuryLaw.ts` reference generic tools (e.g., `late-fee-calculator`) but never link to the high-value `settlement-estimator` or `accident-damage` calculators.

**Fix**:
- **`src/data/autoAccidentLaw.ts`**: Add `"settlement-estimator"` and `"accident-damage"` to `relatedToolIds` on every cluster article.
- **`src/data/personalInjuryLaw.ts`**: Add `"settlement-estimator"` to `relatedToolIds` on every cluster article.
- **`src/data/insuranceLaw.ts`**: Add `"insurance-premium"` and `"insurance-quote-comparison"` to relevant clusters.
- **`src/pages/ClusterArticlePage.tsx`**: Add a prominent CTA banner between the content and FAQ sections — a styled card linking to the settlement estimator with text like "Estimate Your Settlement → Use our free calculator to get a rough estimate of your claim value."

## 2. Contextual "Local" Smart Link

**Problem**: No cross-linking between informational articles and the local lawyer directory.

**Fix** — Create a reusable `SmartLocalLink` component (`src/components/seo/SmartLocalLink.tsx`):
- Accepts a `category` prop (e.g., "Auto Accident Law", "Personal Injury Law", "Insurance Law").
- Maps categories to practice area slugs: Auto Accident → `car-accident`, Personal Injury → `personal-injury`, Insurance → `insurance-dispute`.
- Renders a styled card: "Looking for legal help near you? → View our {Practice Area} Lawyer Directory."
- Links to `/local-lawyers/{practice-area-slug}`.

**Integration**: Add `<SmartLocalLink category={data.category} />` at the bottom of `ClusterArticlePage.tsx` (before the "Was this helpful?" section).

## 3. Retroactive Deep Linking (Auto-Link Keywords)

**Problem**: Content in `legalTermPages.ts` and blog posts contains unlinked keywords like "negligence", "liability", "insurance claim", "policy".

**Fix** — Create a `linkifyLegalContent` utility (`src/lib/linkifyContent.ts`):
- A function that takes an HTML string and returns it with keyword matches wrapped in `<a>` tags.
- Keyword map:
  - "negligence" / "Negligence" → `/personal-injury-law/`
  - "liability" / "Liability" → `/personal-injury-law/`
  - "insurance claim" / "Insurance claim" → `/insurance-law/`
  - "policy" → skip (too generic; only link "insurance policy" → `/insurance-law/`)
- Rules: Only link the first occurrence of each term per page. Don't link inside existing `<a>` tags, headings, or `<code>` blocks.

**Integration**:
- **`src/pages/LegalTermPage.tsx`**: Apply `linkifyLegalContent()` to the `explanation` field before rendering.
- **`src/pages/BlogPostPage.tsx`**: Apply it inside the `cleanContent()` pipeline so blog HTML gets auto-linked.
- **`src/pages/ClusterArticlePage.tsx`**: Apply to `article.content` before `dangerouslySetInnerHTML`.

## 4. Pillar Pages as Hubs

**Problem**: Pillar pages already list all clusters (via `data.clusters.map()`), so they function as hubs. But they lack cross-links to related pillars and the local directory.

**Fix** — Enhance `src/pages/PillarPage.tsx`:
- Add a "Related Guides" section after the cluster grid, linking to the other two pillar pages. For example, on `/auto-accident-law`, show cards linking to `/personal-injury-law/` and `/insurance-law/`.
- Add the `<SmartLocalLink>` component at the bottom.
- Add a "Popular Tools" row featuring the `settlement-estimator` and `accident-damage` calculator cards.

## 5. Navigation & Footer Verification

**Current state**: Nav already has "Guides" → `/auto-accident-law` and "Find a Lawyer" → `/local-lawyers`. Footer has links to all three pillars and local lawyers. These are correct and active.

**Fix** — Minor enhancements:
- **Navbar**: The "Guides" link only points to `/auto-accident-law`. Change it to a dropdown or update it to point to a guides index, or add the other two pillars. Simplest: rename to "Guides" and keep it, but also add `/personal-injury-law` and `/insurance-law` as additional nav entries in the mobile menu.
- **Footer**: Already correct. Add "Blog" link under "Guides" section (already present — verified).

---

## Files to Create

| File | Purpose |
|---|---|
| `src/components/seo/SmartLocalLink.tsx` | Contextual local directory CTA based on article category |
| `src/lib/linkifyContent.ts` | Auto-link legal keywords in HTML content |

## Files to Edit

| File | Change |
|---|---|
| `src/data/autoAccidentLaw.ts` | Add `settlement-estimator`, `accident-damage` to all `relatedToolIds` |
| `src/data/personalInjuryLaw.ts` | Add `settlement-estimator` to all `relatedToolIds` |
| `src/data/insuranceLaw.ts` | Add `insurance-premium`, `insurance-quote-comparison` to relevant clusters |
| `src/pages/ClusterArticlePage.tsx` | Add CTA banner, SmartLocalLink, apply `linkifyLegalContent` |
| `src/pages/PillarPage.tsx` | Add related guides section, SmartLocalLink, popular tools row |
| `src/pages/LegalTermPage.tsx` | Apply `linkifyLegalContent` to explanation content |
| `src/pages/BlogPostPage.tsx` | Apply `linkifyLegalContent` in content pipeline |
| `src/components/layout/Navbar.tsx` | Add PI Law and Insurance Law to mobile menu under Guides |

