# Next stages: more qualified visitors, more revenue per visitor

The site now has depth (100+ tools, money pages, datasets, EU locales, paid forms). The gap is no longer content volume — it is (a) capturing the visitors who arrive and (b) earning from them in more than one way. Right now there is exactly one automated revenue stream working at scale (AdSense auto-ads) plus paid forms. This plan adds three more and tightens the two that exist.

## Stage 1 — Capture the visitor (week 1)

Traffic that arrives, calculates a number, and leaves is worth one ad impression. Traffic that leaves an email is worth many.

- **Email capture tied to the result.** After any calculator produces a number, offer "Email me this estimate + the deadline for my state." Stores to a new `subscribers` table with source page and claim type, sends the result as a formatted email through the existing transactional email pipeline.
- **Deadline reminder emails.** Anyone who used the statute-of-limitations or settlement tools gets a scheduled reminder as their filing deadline approaches. High open rate, brings them back to a high-CPC page.
- **Exit-intent / scroll-depth offer** on pillar pages only (not on thin pages, not on mobile anchor conflict).

## Stage 2 — Add attorney lead-gen (weeks 1-2)

This is the single biggest revenue upgrade available. A legal case-evaluation lead is worth $20-$200 to a firm; an ad click is worth $2-$40. The traffic already qualifies itself by using a settlement calculator.

- **"Get a free case review" form** under every settlement result and on every `/lawyer-near-me` page: claim type, state, injury date, brief description, contact details.
- Leads stored in a `case_leads` table with RLS (admin-only read), plus an admin review queue at `/admin/leads`.
- **Lead quality scoring** — claim type, state, whether the statute of limitations is still open, estimated value from the calculator. Score is what determines the price tier.
- Delivery is manual/email-based to start (no partner network needed on day one); the schema supports adding a per-firm routing table later.
- Compliance: explicit consent checkbox, "this is not legal advice and does not create an attorney-client relationship", TCPA-safe wording, no auto-dial claims.

## Stage 3 — Fix the ad layer that is currently underperforming (week 2)

- Auto-ads is on with **zero named units**, so there is no per-placement reporting and no manual control on the highest-value real estate. Create named units for: post-result, in-content on pillars, sidebar on desktop guides, mobile anchor. Wire the existing `VITE_ADSENSE_SLOT_*` env vars.
- Move the post-result unit **above** the "what this means" explainer on calculators — the moment after a number appears is peak intent.
- Add a second high-CPC network alongside AdSense on the top-20 pages only (Ezoic/Mediavine become viable once sessions justify it; until then run AdSense manual units and measure).
- Track RPM by page type using the existing `adAnalytics` instrumentation and surface it in an admin dashboard so decisions stop being guesses.

## Stage 4 — Premium tier for the forms product (weeks 2-3)

Paid forms already work per-download. Add:

- **Unlimited-forms subscription** (monthly/annual) via Stripe, which converts far better than one-off purchases on multi-form situations (landlords, small business, new hires).
- **Attorney-review upsell** at checkout: pay more to have a form reviewed. Fulfilled manually at first.
- Ads suppressed for subscribers — subscribers are worth more than their impressions and it makes the tier feel premium.

## Stage 5 — Traffic: three clusters worth building next (weeks 3-4)

Chosen for commercial value and winnability rather than volume, and each one feeds a calculator and a lead form:

1. **Insurance claim denial** — health, auto, homeowners, disability. Very high CPC, and every page ends in either a demand letter form or a lead.
2. **Data breach / privacy claims** — currently zero coverage, growing search demand, ties to the EU locales already built.
3. **Employment: AI hiring, surveillance, non-compete enforceability post-ruling** — high CPC, low competition, feeds the severance and wrongful-termination calculators.

Each cluster ships as one pillar plus a 51-state fan-out only where state law actually differs (no thin clones — the existing depth gate applies).

## Stage 6 — Authority, because nothing above ranks without it (ongoing)

Authority Score is the ceiling on all of this. Continue the linkable-asset cadence, one per month, promoted rather than just published:

- Asset #3: **Cost of a Legal Claim** annual report combining the filing-fee, deadline and contingency data already collected.
- Embeddable widget for the deadline and filing-fee datasets (embeds earn links passively).
- Outreach list: legal aid orgs, university law clinics, local news — these cite free state-by-state data reliably.

## Technical notes

- New tables: `subscribers`, `case_leads`, `subscriptions` — each with RLS, admin-only reads via the existing `has_role` pattern, and explicit GRANTs.
- Email uses the existing `send-transactional-email` function plus a new scheduled reminder job on pg_cron, matching the translation cron pattern.
- Subscription checkout extends the current `create-form-checkout` / `payments-webhook` pair rather than a new integration.
- Ad units are config-only (`src/lib/adsense.ts` + env), no component rewrites; `AUTO_ADS_ONLY` flips off automatically once IDs exist.
- Lead forms reuse the form-wizard field components and validation.

## Order of execution

Stage 1 and 2 first — they raise revenue on traffic that already exists and need no ranking improvement. Stage 3 in parallel (config work). Then premium tier, then new clusters, with the authority work running continuously underneath.
