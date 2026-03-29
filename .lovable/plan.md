

# Legal Health Check Quiz — Smart Tool Recommender

## Overview

A 6-question quiz that maps user situation + state + urgency to 3–6 recommended tools from the existing 100+ tool library. Fully client-side, no account needed, results stored in localStorage.

## Architecture

### New Files

| File | Purpose |
|---|---|
| `src/components/quiz/LegalHealthCheckQuiz.tsx` | Main quiz component — stepper UI with 6 questions, progress bar, results screen |
| `src/components/quiz/quizData.ts` | Question definitions + situation-to-tool mapping logic |
| `src/pages/LegalHealthCheckPage.tsx` | Standalone page at `/legal-health-check` for SEO + direct linking |

### Edited Files

| File | Change |
|---|---|
| `src/pages/HomePage.tsx` | Add teaser card between Stats Bar and Popular Tools sections |
| `src/App.tsx` | Add route for `/legal-health-check` |

## Quiz Questions & Mapping

**Q1 — Situation** (maps to tool category/tags):
- Renting/leasing → realestate tools (Rent Increase Calc, Security Deposit, Lease Analyzer, Move-Out Checklist)
- Employment → employment tools (Overtime Calc, Severance Pay, Wrongful Termination, PTO Calc)
- Contracts → contract tools (Red Flag Scanner, Clause Finder, Reading Time, Terms Summarizer)
- Car accident/injury/insurance → consumer + finance (Settlement Estimator, Accident Damage Calc, Insurance Premium, Statute of Limitations)
- Money/debt/taxes → finance tools (Debt Payoff, Income Tax, Compound Interest, Crypto Tax)
- Business → business tools (Business Name Checker, Freelance Rate, Partnership Split, Equity Dilution)
- Something else → show top popular tools

**Q2 — State** (dropdown of 50 states from existing `stateData.ts`) — used to personalize result descriptions

**Q3 — Urgency** (3 options) — used to sort results (urgent = actionable calculators first, planning = guides first)

**Q4 — Have documents?** (yes/no) — if yes, boost AI analysis tools (Red Flag Scanner, Contract Comparison, Clause Finder)

**Q5 — Main goal** (4 options: understand rights / calculate something / check risks / get guidance) — further filters tool recommendations

**Q6 — Optional free text** — displayed but not used for logic (keeps it simple)

### Scoring Logic (in `quizData.ts`)
```text
situationMap: Record<string, string[]>  // situation → array of tool IDs
goalBoost: Record<string, string[]>     // goal → bonus tool IDs
hasDocumentsBoost: string[]             // AI tool IDs to add if user has docs
```
Final list = intersection of situation tools + goal-filtered + document-boosted, sorted by popularity flag, capped at 6.

## UI Components

### Quiz Stepper (`LegalHealthCheckQuiz.tsx`)
- Modal/dialog or inline section — controlled by `mode` prop (`"modal" | "inline"`)
- Progress bar using existing `<Progress />` component
- Large tappable card-style options (not radio buttons) for mobile friendliness
- Back/Next navigation
- Results screen with tool cards linking to `/tools/{category}/{slug}`
- Each result card shows: tool name, short description, "Why recommended" line, estimated time, [Start Tool] button
- "Related Tools You Might Like" section below main results
- Action buttons: Retake Quiz, Browse All Tools, Save Results (localStorage)
- Disclaimer footer on every step

### Homepage Teaser Card
- Placed between Stats Bar and Popular Tools
- Headline: "Not sure which legal tool you need?"
- Subheadline + primary CTA button that opens the quiz inline or navigates to `/legal-health-check`
- Clean card with Shield/ClipboardCheck icon, matching existing design tokens

### Standalone Page (`/legal-health-check`)
- Full-page version with Head/SEO metadata
- Same quiz component rendered inline
- Good for direct linking and SEO ("free legal health check quiz")

## Mobile
- Questions render full-width with large touch targets (min 48px height option buttons)
- Single column layout, no horizontal scrolling
- Progress bar always visible at top

## Data Flow
- All client-side — no database, no API calls
- Results optionally saved to `localStorage` key `legalHealthCheckResults`
- No authentication required

