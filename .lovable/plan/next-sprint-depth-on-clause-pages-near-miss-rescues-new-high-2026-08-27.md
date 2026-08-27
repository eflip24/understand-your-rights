# Next sprint: depth on clause pages, near-miss rescues, new high-CPC clusters

Linkable assets #1 (settlement deadlines) and #2 (court filing fees) are live. The next cycle finishes Priority 3 and starts Priority 5 from the current growth plan.

## 1. Deepen the clause library (51 pages already routed)

`/legal-clauses/:slug` renders explanation, sample language, red flags and FAQs from `legalClauses.ts`. That's thin for a page ranking at 67. Add to every clause a:

- **Negotiation playbook** — what to ask for, realistic fallback language, what the other side usually accepts.
- **Alternative wording block** — "employer-friendly / balanced / counterparty-friendly" versions of the same clause.
- **Enforceability by state** table for the clauses where it actually varies (non-compete, non-solicitation, waiver of jury trial, liquidated damages, arbitration, non-disparagement).
- **Related contract types** links, so each clause feeds the contract-type pages.

Start with the 12 highest-CPC clauses (non-compete, arbitration, indemnification, limitation of liability, termination, confidentiality, IP, payment terms, non-solicitation, liquidated damages, governing law, waiver of jury trial); the rest get the negotiation and alternatives blocks generically.

## 2. Near-miss rescue pass

Pages already ranking 48-74 that need depth rather than replacement:

| Page | Add |
|---|---|
| `/lawyer-near-me/workers-compensation/ohio/columbus` | Filing venue, comp board deadlines, local court data |
| `/personal-injury-law/wyoming/nursing-home-abuse` | State caps, reporting agencies, statute citations |
| `/criminal-law/maine/drug-charges` | Charge tiers, sentencing ranges, diversion programs |

Same treatment for any other city/state page with real search demand; everything else stays `noindex`.

## 3. Linkable asset #3 — Cost of a Legal Claim report

One page combining the two datasets already built plus contingency-fee norms and typical settlement timelines, per state. Same pattern as the existing dataset pages: sortable table, CSV download, embed snippet, citation block, Dataset JSON-LD.

## 4. New high-CPC clusters (Priority 5)

Four new pillars with entity-dense content, each with a calculator or checker where it fits:

1. **AI in hiring and workplace surveillance** — state AI-employment laws (IL, NYC LL144, CO AI Act), what candidates can demand.
2. **Data breach and biometric privacy claims** — BIPA/CCPA statutory damages, class action eligibility checker.
3. **Non-compete enforceability after recent rulings** — state-by-state status tracker, ties into clause page #1.
4. **EU pay transparency compliance** — feeds the existing six-locale EU section.

## Technical notes

- Clause depth: extend `LegalClause` in `src/data/legalClauses.ts` with optional `negotiation`, `alternatives`, `stateVariation` fields; render conditionally in `LegalClausePage.tsx` so untouched clauses keep working.
- New pillars reuse `HighCpcPillarPage.tsx` + `phase8Pillars.ts`-style data, register in `guideIndex.ts`, `AppRoutes.tsx` and the sitemap edge function, then refresh shards.
- Cost-of-claim report mirrors `CourtFilingFeesDataset.tsx`.
- New clusters are English-only, so `Head` gets `englishOnly` except the EU pay transparency pillar, which fans out to six locales.

## Order

Clause depth first (fastest ranking lift on pages already indexed), then near-miss rescues, then the report, then the four new clusters.
