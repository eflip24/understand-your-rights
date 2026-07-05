
# Automated CPC Growth Engine — Full Plan

## Reality check on your plan

Your 4-phase plan is solid. Two things to adjust before we build:

1. **~40% of your "new tool ideas" already exist** (120 tools shipped, incl. `AlimonyCalculator`, `ChildSupportCalculator`, `EvictionNoticeLookup`, `DUICostEstimator`, `DivorceCostEstimator`, `EEOCSettlementCalculator`, `AttorneyFeeCalculator`, `FinalPaycheckLookup`, settlement estimators, etc.). We should **deepen/state-ize the existing ones** before shipping duplicates.
2. **The whole thing should be push-button, not copy-paste-Monday.** We already have `pg_cron`, the Semrush connector, Lovable AI Gateway, and an `ai-blog` pipeline — we can wire the loop end-to-end so Monday-morning prompts disappear.

Below is what to build.

---

## Part A — The automation loop (the core deliverable)

Four new edge functions, all cron-triggered, all writing to a new `growth_pipeline` schema. You approve/reject from an admin dashboard; nothing publishes without your click unless you flip a per-cluster `auto_publish` flag.

```text
   Mon 07:00 UTC          Wed 07:00 UTC          Daily 06:00 UTC        1st of month
        │                       │                       │                     │
        ▼                       ▼                       ▼                     ▼
  keyword-radar  ──▶  sprint-planner  ──▶  content-forge  ──▶  growth-analytics
  (Semrush pull)      (cluster+score)     (tool/blog/hub gen)   (RPM + rank review)
        │                       │                       │                     │
        └──────────────► growth_pipeline (Supabase) ◄────┴─────────────────────┘
                                │
                                ▼
                        /admin/growth  (approve, edit, publish)
```

**Tables (all RLS + GRANTs, admin-role gated via existing `has_role`):**
- `keyword_candidates` — id, keyword, cpc, volume, kd, intent, cluster, source_run, status
- `content_clusters` — id, name, pillar_id, target_tools[], target_blogs[], priority_score, auto_publish
- `sprint_queue` — id, cluster_id, type (`tool` | `blog` | `state_hub` | `lawyer_page`), spec_json, status, generated_asset_id
- `growth_metrics` — page_url, impressions, clicks, rpm, avg_position, snapshot_date

**Edge functions:**
1. `keyword-radar` (Mon) — calls Semrush connector for the 6 clusters you listed + auto-discovered adjacent ones; filters CPC ≥ $15, KD ≤ 55, vol 300–5k; upserts to `keyword_candidates`.
2. `sprint-planner` (Wed) — scores clusters `(CPC × volume × feasibility) / (KD+10)`; picks top 2; drafts a spec (tool schema, sections, FAQ, internal links). Writes to `sprint_queue` with `status='awaiting_review'`.
3. `content-forge` (daily) — pulls next approved sprint, generates: blog post HTML (existing `generate-blog-article` path), hero image (Gemini image), and for **tool sprints** a scaffolded React component file + `tools.ts` entry + i18n keys committed to a draft branch (or written to `pending_tools` for you to accept).
4. `growth-analytics` (monthly) — Semrush `top_pages` + `page_analysis` for our domain; flags underperformers, suggests refresh sprints.

**Admin UI** — new `/admin/growth` route: cluster board, sprint queue with diff preview, one-click publish/reject, RPM heatmap by page type. Reuses existing admin RBAC.

**Cron wiring:** `pg_cron` + `pg_net` calling each function with `CRON_SECRET` header (already provisioned).

---

## Part B — Net-new tools worth building (dedup'd against current 120)

Only ones **not already shipped**, ranked by CPC × intent:

| Tool | Why it wins | Notes |
|---|---|---|
| **Statute of Limitations Checker** (claim type × state) | Massive utility, near-zero competition on interactive format | State data table required |
| **Personal Injury Settlement Value Estimator** (medbills + lost wages + P&S multiplier) | CPC $50–$200 in PI vertical | Extends `SettlementEstimator` with tiered inputs |
| **Overtime & Unpaid Wages Calculator** (FLSA + state OT rules) | Employment CPC + high search vol | State overtime rules table |
| **Security Deposit Return Calculator** (state deadlines + interest) | Fills gap next to `EvictionNoticeLookup` | |
| **Legal Fee Estimator by Practice Area** | Rising trend, monetizes lawyer-directory CTAs | Cross-links directory |
| **Medical Lien / Subrogation Estimator** | Sky-high PI CPC, almost no interactive tools rank | |
| **Wage Garnishment Calculator** (state caps) | Consumer-debt CPC | |
| **SSDI/SSI Back Pay Estimator** | Very high intent, low competition | |

We should **not** re-ship child support, alimony, divorce cost, DUI cost, wrongful termination — those exist. Instead, **state-ize them**: add state selector + per-state guideline data + `/tools/{tool}/{state}` programmatic pages (you already have the `programmatic-state-guides` pattern per project memory).

---

## Part C — Lawyer directory expansion (biggest untapped lever)

The directory currently serves `/lawyer-near-me` with static listings. To scale it into a CPC magnet:

1. **Practice-area × city matrix pages** — `/lawyer/{practice-area}/{city}` (e.g. `/lawyer/personal-injury/houston`). Programmatic, uses existing pillar pattern + LocalBusiness JSON-LD. Target: top 25 practice areas × top 100 US metros = 2,500 pages, generated in batches via `content-forge`.
2. **"Questions to ask a {practice-area} lawyer" content blocks** — AI-generated, per practice area, embedded in each city page. High "consult" intent → advertiser gold.
3. **"Average {practice-area} lawyer cost in {state}"** — one component, data-driven, replaces 50 blog posts with one dynamic template.
4. **Directory-to-tool bridge** — each directory page recommends 2–3 relevant calculators; each tool result page recommends nearest lawyers. Doubles pages/session.
5. **Verified-listing form** (free) — lets real attorneys claim/enrich listings. Builds unique content + backlinks; keep AdSense-compliant (no paid rankings).

---

## Part D — Engagement & compounding features

These lift RPM and pages/session on top of everything else:

- **"What should I do next?" recommender** — after any tool result, model-driven suggestion of 2–3 tools + 1 blog + 1 directory page. Uses existing `legal-chat` infra.
- **Downloadable PDF checklists** — auto-generated from tool results (accident, divorce, eviction, wage claim). Email-gated → remarketing list.
- **State hub pages** — `/legal-tools/{state}` aggregating every tool with that state's data + top attorneys + statute-of-limitations quick answers. Extends existing state-guide pattern.
- **"Save my case" persistent progress** — anon session token, resume tools later. Compounds returning-visitor value.
- **Comparison mode** — "DIY cost vs lawyer cost" side-by-side, wraps existing calculators. New page type, high commercial intent.
- **FAQ + HowTo schema everywhere** — extend the existing JSON-LD `@graph`; unlocks rich results.

---

## Part E — What we won't do (and why)

- **No auto-publish by default.** AdSense compliance memory already gates ads on quality; a bad AI page tanks the whole domain. Human approval stays, but it's 1-click instead of copy-paste-prompting.
- **No duplicate calculators.** Extend existing ones with state logic first.
- **No "voice optimization" work.** Marginal ROI vs the above; revisit after Part A ships.

---

## Rollout order (suggested)

1. **Sprint 1 (this week):** Part A tables + `keyword-radar` + `/admin/growth` skeleton. First real Semrush pull on Monday.
2. **Sprint 2:** `sprint-planner` + `content-forge` for **blog** type; ship 2 new blog clusters.
3. **Sprint 3:** Statute of Limitations Checker + Overtime Calculator (Part B top 2).
4. **Sprint 4:** Lawyer directory practice-area × city matrix (Part C.1) + recommender (Part D.1).
5. **Sprint 5+:** `content-forge` for **tool** type (scaffolded PRs), `growth-analytics`, remaining Part B/C/D.

---

## Technical details

- **Semrush access:** use the Semrush **connector** (per `semrush-tools-guide`) — the built-in chat tools won't run inside an edge function. Trigger `standard_connectors--connect` before Sprint 1.
- **AI content:** Lovable AI Gateway, `google/gemini-3-flash-preview` for text, `google/gemini-3.1-flash-image` for hero images. No user API key needed.
- **Cron:** `pg_cron` + `pg_net`, secret via `CRON_SECRET` header (already set). Written via `supabase--insert` per the schedule-jobs pattern (not migration, to keep secrets out of remixes).
- **Bot protection:** reuse existing multi-layer strategy on all new endpoints.
- **Localization:** new tools/pages fan out to the 6-locale pillar system already in place.
- **SEO:** each generated asset ends by calling `seo--trigger_scan`; failures block publish.
- **Cost guardrail:** hard monthly cap on AI/Semrush credits with alert row in `growth_metrics`.

Approve this and I'll start with Sprint 1.
