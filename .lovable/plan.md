## Plan: Add New Free Legal Tools

After auditing the current 100+ tools in `src/data/tools.ts`, I've identified gaps. Below is a curated set of ~20 new client-side tools that don't duplicate existing ones, span all categories, and fit the site's plain-English utility positioning.

### New Tools by Category

**Contract Analysis (AI / client-side)**
1. **Force Majeure Clause Checker** — paste a contract, detect & rate force majeure language strength.
2. **Auto-Renewal Clause Detector** — flags evergreen/auto-renew terms and notice windows.
3. **Governing Law Identifier** — extracts jurisdiction, venue, and arbitration clauses.
4. **Contract Plain-English Rewriter** (AI) — rewrites a clause in 6th-grade reading level.

**Consumer Rights**
5. **Chargeback Eligibility Checker** — quiz-style tool: returns likelihood of successful chargeback.
6. **Lemon Law Qualifier** — state-aware checker for defective vehicle claims.
7. **Subscription Cancellation Letter Generator** — fillable letter for cancelling gym/SaaS/etc.
8. **Data Breach Response Checklist** — personalized steps after a breach notification.

**Employment**
9. **Final Paycheck Deadline Lookup** — by state, when last paycheck is legally due.
10. **Unemployment Benefits Estimator** — ballpark weekly benefit by state + prior wages.
11. **Non-Disclosure vs Non-Compete Comparator** — side-by-side explainer/checker.
12. **Workplace Discrimination Claim Checklist** — EEOC filing readiness checker.

**Real Estate / Landlord-Tenant**
13. **Eviction Notice Period Lookup** — by state and reason (nonpayment, lease violation).
14. **Habitability Issue Tracker** — generates a documented repair-request letter + log.
15. **Mortgage Affordability Calculator** — DTI-based max home price.

**Business / Generators**
16. **Operating Agreement Generator (LLC)** — single/multi-member fillable template.
17. **Founders Agreement Generator** — equity split, vesting, IP assignment.
18. **DMCA Takedown Notice Generator** — fillable template.

**Finance**
19. **Emergency Fund Calculator** — months of expenses goal + monthly savings plan.
20. **Tip & Service Charge Splitter** — receipt splitter with tax/tip allocation (legal nuance for mandatory service charges).

**Energy**
21. **Net Metering Savings Estimator** — annual savings from selling back excess solar.

### Implementation Approach

For each tool:
- Create `src/components/tools/<Name>.tsx` as a self-contained client component (Tailwind + shadcn/ui), matching existing patterns (see `WordCounter`, `LeaseAnalyzer`, `NDAFairnessScore`).
- Pure client-side logic where possible; use `useContractAnalysis` + a new edge function case only for AI-powered ones (#4).
- Register in `src/data/tools.ts` with id, slug, category, icon (lucide-react), short description, long description, SEO meta.
- Add lazy import entry in `src/pages/ToolPage.tsx` `toolComponents` map.
- Each tool page auto-renders via `ToolPageLayout` (title, breadcrumbs, JSON-LD, AdSlot, disclaimer already handled).
- For state-aware tools (#9, #13), reuse `src/data/locations/stateData.ts` patterns; add small static lookup tables.
- AI tool (#4) extends `supabase/functions/analyze-contract/index.ts` with a new `mode: "plain-english-rewriter"` branch using the existing Lovable AI gateway (no new secrets).

### Delivery Strategy

To keep PRs reviewable, I'll ship in **3 batches**:
- **Batch 1** (Contract + Consumer): tools 1–8
- **Batch 2** (Employment + Real Estate): tools 9–15
- **Batch 3** (Business + Finance + Energy): tools 16–21

Each batch: build components, register tools, verify build, no homepage changes required (they auto-appear in `/tools` directory and category pages).

### Questions Before Building

- Approve all 21, or trim/swap any?
- OK to proceed with Batch 1 first after approval, then continue to 2 & 3 automatically?
