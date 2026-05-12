## Plan: Add 7 High-Demand Legal Calculators (Family + Housing + Cases)

I cross-referenced your list against the existing 100+ tools. Several user-suggested tools already exist and I'm excluding them to avoid duplicates:

**Already built (skipping):**
- Overtime Pay Calculator → `overtime-calc`
- Eviction Notice Timeline → `eviction-notice-lookup`
- Security Deposit Return → `security-deposit`
- Independent Contractor vs Employee → `contractor-vs-employee`
- Personal Injury Settlement → `settlement-estimator` + `accident-damage`
- Legal Fee Estimator → `attorney-fee`
- Severance Pay → `severance-pay`
- Statute of Limitations (lookup) → `statute-of-limitations`
- Wrongful Termination (checklist) → `wrongful-termination`

### New tools to build (7)

These fill the **family law gap** (currently zero tools) and add deeper case-value/housing utilities that don't duplicate anything:

| # | Tool | Category | Why it's distinct |
|---|------|----------|-------------------|
| 1 | **Child Support Calculator** | Family (new category) | Income shares + percentage-of-income models; state-aware (CA, NY, TX, FL, IL + generic) |
| 2 | **Alimony / Spousal Support Calculator** | Family | Length-of-marriage formulas, state guidelines, duration estimate |
| 3 | **Divorce Cost Estimator** | Family | Filing fees + attorney hours by state, contested vs uncontested |
| 4 | **Statute of Limitations Deadline Calculator** | Consumer | Date-input variant of existing lookup — "incident date → deadline date + days remaining". The current tool only shows years; this answers "can I still sue?" |
| 5 | **Wrongful Termination Case Value Estimator** | Employment | Lost wages + benefits + emotional distress range + attorney fees. Distinct from existing checklist (which only assesses if you have a case) |
| 6 | **Lease Break / Early Termination Penalty Calculator** | Real Estate | Months remaining × rent, minus mitigation, plus state-specific penalty caps |
| 7 | **Severance Offer Fairness Score** | Employment | Compares offer against industry/role/tenure benchmarks with a 0–100 score. Distinct from existing `severance-pay` (which only estimates a range, not fairness) |

### Implementation approach

For each tool, follow the established pattern used by `SeverancePayCalculator.tsx` and `StatuteOfLimitationsLookup.tsx`:

1. **Create component** in `src/components/tools/` — client-side React, shadcn `Input`/`Select`/`Card`, state-specific data tables inline.
2. **Register** in `src/data/tools.ts` (id, slug, name, category, descriptions, icon, SEO keywords).
3. **Add lazy import** in `src/pages/ToolPage.tsx` `toolComponents` map.
4. **Add new "Family Law" category** to `categories` array in `tools.ts` (icon: `Heart` or `Users` from lucide).
5. **Sitemap** auto-includes new tools via existing `generate-sitemap` edge function (driven by tools data).
6. **AdSense** ad slots auto-render via existing `ToolPageLayout` — no extra wiring needed.
7. **SEO**: each tool gets a unique `<Head>` title with format `{Tool Name} — Free {Year} Calculator | LegallySpoken`, meta description ~150 chars, FAQ-style intro copy on the page.

### Technical notes

- **State data**: hardcoded JSON tables for top 10 states (CA, NY, TX, FL, IL, PA, OH, GA, NC, MI) + "Other" fallback. Sources: state code citations included in result text.
- **Disclaimers**: every result block ends with the standard "general info, not legal advice" line (per project memory).
- **No new dependencies** — all tools use existing shadcn/ui + native React state.
- **No backend changes** — pure client-side calcs.
- **Design tokens only** — no hardcoded colors (text-accent, bg-muted, etc.).

### What I will NOT touch

- No changes to existing tools, auth, blog, or AdSense setup.
- No new edge functions or DB migrations.
- No layout/navigation redesign — new tools simply appear in the directory and category pages automatically.

### Deliverable

7 new tool pages live at `/tools/{category}/{slug}`, listed in the directory, indexed in the sitemap, with ads enabled — closing the family law gap and adding the highest-search-volume case-value calculators.