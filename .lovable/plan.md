

# Complete Phase 2 + Phase 3 Plan

## Phase 2 Remaining (Wire Up)

Three tasks to finish Phase 2:

### 1. App.tsx — Add 6 routes
Add imports and routes for: `LegalTermsDirectory`, `LegalTermPage`, `LegalClausesDirectory`, `LegalClausePage`, `ContractTypesDirectory`, `ContractTypePage`.

### 2. Navbar — Add Legal Resources links
Update `navLinks` to include "Legal Terms" (`/legal-terms`), "Legal Clauses" (`/legal-clauses`), and "Contract Types" (`/contract-types`). Restructure nav to keep it clean — group tools and resources logically.

### 3. HomePage — Add Legal Resources section
Add a new section between "Tool Categories" and "How It Works" showcasing the three content directories (Legal Terms, Legal Clauses, Contract Types) with counts and links.

---

## Phase 3: High-Value AI Tools

Premium AI-powered analysis tools that run on-demand (user clicks "Analyze") to control costs. These require connecting **Supabase** for edge functions that call OpenAI.

### Tools to Build

1. **Contract Red Flag Scanner** — Paste contract text, AI identifies risky clauses with severity ratings
2. **NDA Fairness Score** — Paste NDA, get a fairness score (1-100) with breakdown of one-sided terms
3. **Lease Agreement Analyzer** — Paste lease, get summary of key terms + hidden risks
4. **Terms & Conditions Summarizer** — Paste T&C, get plain-English bullet-point summary
5. **Contract Comparison Tool** — Paste two contracts side-by-side, AI highlights differences and risks
6. **Clause Explainer** — Paste any clause, get plain-English explanation + risk assessment

### Technical Architecture

- **Supabase Edge Functions** — Each AI tool gets an edge function that calls OpenAI's API
- **Rate Limiting** — Basic IP-based rate limiting (e.g., 5 scans/day for free users)
- **Tool Components** — Each tool follows the existing `ToolPageLayout` pattern with a textarea input + "Analyze" button + results display
- **Loading States** — Skeleton/spinner while AI processes (typically 3-8 seconds)
- **Error Handling** — Graceful fallbacks if API fails or rate limit hit

### New Files
- `src/components/tools/ContractRedFlagScanner.tsx`
- `src/components/tools/NDAFairnessScore.tsx`
- `src/components/tools/LeaseAnalyzer.tsx`
- `src/components/tools/TermsSummarizer.tsx`
- `src/components/tools/ContractComparison.tsx`
- `src/components/tools/ClauseExplainer.tsx`
- Update `src/data/tools.ts` with 6 new AI tool entries in a new "ai" category
- Supabase edge functions for each tool

### Build Order
1. Finish Phase 2 wiring (routes, navbar, homepage)
2. Connect Supabase
3. Create edge functions for AI tools
4. Build the 6 AI tool components
5. Register in tools.ts and update tool count on homepage

