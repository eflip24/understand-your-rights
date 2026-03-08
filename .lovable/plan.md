

# Phase 5C Batch 2: 15 New Legal Term Pages + 30 New Legal Clauses

## What We're Building

Two large content additions to reach 200+ total pages:

### 1. Add 15 new legal term detail pages to `legalTermPages.ts`

Insert before the helper functions (before line 1239). Each entry follows the existing `LegalTermPage` interface with slug, term, category, definition, explanation, exampleClause, relatedTermSlugs, relatedToolIds, and 2-3 FAQs.

Terms to add:
`adhesion-contract`, `anti-assignment-clause`, `bilateral-contract`, `capacity`, `class-action`, `comparative-negligence`, `consequential-damages`, `constructive-notice`, `counterpart`, `cross-default`, `de-facto`, `forum-selection`, `motion-to-dismiss`, `statute-of-frauds`, `strict-liability`

Also sync these 15 terms into `legalTerms.ts` base glossary if not already present.

### 2. Add 30 new legal clauses to `legalClauses.ts`

Insert before the helper functions (before line 581). Each entry follows the existing `LegalClause` interface with slug, title, category, explanation, exampleClauses (2-3), enforceabilityNotes, redFlags (4-6), relatedTermSlugs, relatedToolIds, and 2-3 FAQs.

Clauses to add:
`acceleration-clause`, `anti-dilution-clause`, `automatic-renewal-clause`, `best-efforts-clause`, `choice-of-forum-clause`, `clawback-clause`, `change-of-control-clause`, `compliance-clause`, `cross-default-clause`, `cure-period-clause`, `drag-along-clause`, `exclusivity-clause`, `first-right-of-refusal-clause`, `holdback-clause`, `indemnity-cap-clause`, `integration-clause`, `key-person-clause`, `material-adverse-change-clause`, `most-favored-nation-clause`, `no-shop-clause`, `non-disparagement-clause`, `penalty-clause`, `price-adjustment-clause`, `right-to-audit-clause`, `right-of-first-offer-clause`, `survival-clause`, `tag-along-clause`, `time-is-of-the-essence-clause`, `tolling-clause`, `venue-clause`

### Files Modified
- `src/data/legalTermPages.ts` — append 15 entries before helpers
- `src/data/legalTerms.ts` — add 15 glossary entries if missing
- `src/data/legalClauses.ts` — append 30 entries before helpers

### Result
- Legal terms: ~81 + 15 = **96 term pages**
- Legal clauses: ~21 + 30 = **51 clause pages**
- Plus ~50 tools + ~20 contract types = **217+ total pages**

No new components or routes needed — existing directory pages and detail page components handle everything automatically.

