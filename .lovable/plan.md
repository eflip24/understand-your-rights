
# Milestone C — Tool Internals i18n (Phase 1)

Goal: translate the internal UI (button labels, input labels, result headings, placeholders) of the 20 highest-traffic tools, using a shared `common.actions` namespace so we don't re-translate "Calculate"/"Reset"/"Copy" 100 times.

## 1. Shared `common.actions` namespace

Extend the existing `common.json` in all 6 locales with a new `actions` block plus a small `fields` block for ultra-generic input labels:

```json
{
  "actions": {
    "calculate": "Calculate",
    "reset": "Reset",
    "copy": "Copy",
    "copied": "Copied!",
    "download": "Download",
    "analyze": "Analyze",
    "detect": "Detect",
    "generate": "Generate",
    "check": "Check",
    "estimate": "Estimate",
    "count": "Count",
    "clear": "Clear",
    "paste": "Paste text",
    "loading": "Loading…"
  },
  "fields": {
    "state": "State",
    "amount": "Amount ($)",
    "date": "Date",
    "name": "Your name",
    "email": "Email",
    "yourText": "Paste your text here…",
    "contractText": "Paste your contract text here…",
    "monthlyIncome": "Monthly income ($)",
    "annualWages": "Annual wages ($)",
    "notFound": "Not found",
    "results": "Results",
    "words": "Words",
    "characters": "Characters",
    "sentences": "Sentences",
    "paragraphs": "Paragraphs",
    "minutes": "Minutes",
    "seconds": "Seconds"
  }
}
```

Translate via `scripts/translate-pages.mjs` pattern (reuse Lovable AI Gateway, JSON structure preserved). ES/FR/DE/IT/PT filled in one batch script run.

## 2. Top 20 tools to wire

Chosen by prior traffic + generic reusability (calculators + analyzers first — these have the most reusable strings):

1. WordCounter
2. ReadingTimeCalculator
3. AutoRenewalDetector
4. GoverningLawIdentifier
5. DMCAGenerator
6. SubscriptionCancellationLetter
7. DataBreachChecklist
8. DiscriminationChecklist
9. EmergencyFundCalculator
10. FinalPaycheckLookup
11. UnemploymentEstimator
12. OvertimeCalculator
13. SeverancePayCalculator
14. RefundChecker
15. ChildSupportEstimator
16. AlimonyEstimator
17. SmallClaimsLimitLookup
18. StatuteOfLimitationsLookup
19. NDAAnalyzer
20. LeaseClauseScanner

## 3. Per-tool wiring pattern

Each component gets:
```tsx
import { useTranslation } from "react-i18next";
const { t } = useTranslation(["common", "tools"]);
```

- Buttons: `t("common:actions.calculate")` etc.
- Generic field labels: `t("common:fields.state")` etc.
- Tool-specific strings (result headings unique to that tool, warning messages, US-state lookup rules text): add per-tool keys under a new `tools:internals.<toolId>.*` subtree in `tools.json`, e.g.
  ```json
  "internals": {
    "wordCounter": { "resultLabels": { "estPages": "Est. Pages" } },
    "autoRenewal": {
      "detected": "⚠ Auto-renewal language detected",
      "clean": "✓ No auto-renewal language found",
      "warnRisky": "Auto-renewal detected but no clear notice window — risky."
    }
  }
  ```
- Lookup tables containing US-state rule text (FinalPaycheckLookup, UnemploymentEstimator) stay as constants but the surrounding labels and disclaimers move to i18n. State names themselves stay English (proper nouns).

## 4. Translation script

Add `scripts/translate-tool-internals.mjs` — same shape as `translate-pages.mjs`:
- Reads `src/i18n/locales/en/{common,tools}.json`
- For each non-EN locale, sends only the new keys (delta) to `google/gemini-3-flash-preview` via Lovable AI Gateway
- Merges into existing locale files, preserving prior translations
- Idempotent: re-runs skip keys already present unless `--force`

## 5. Verification

- Run `bun run build` — must pass with no TS errors.
- Smoke-check 3 tools in ES (`/es/tools/word-counter`, `/es/tools/auto-renewal-detector`, `/es/tools/unemployment-estimator`) via Playwright screenshot to confirm buttons/labels render in Spanish.
- Confirm English routes render identically (no regressions).

## Out of scope for this milestone

- The remaining ~93 tools (planned for Milestone C phase 2, same script + pattern).
- Translating dynamic disclaimers embedded in constants tables (state-specific legal text) — flagged for a later legal-review pass.

## Deliverables

- Updated `src/i18n/locales/{en,es,fr,de,it,pt}/common.json` with `actions` + `fields`.
- Updated `src/i18n/locales/{en,es,fr,de,it,pt}/tools.json` with `internals.*` subtree for the 20 tools.
- 20 refactored tool components under `src/components/tools/`.
- New `scripts/translate-tool-internals.mjs`.
- Green build + 3 Playwright screenshots as evidence.
