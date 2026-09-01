# Making LegallySpoken the best legal site in the world

Four workstreams, run in order. Each is shippable on its own, so you can stop or reprioritise at any point.

---

## 1. Design refinement (keep navy/gold, raise the craft to 2026)

Not a rebrand — a systematic tightening of what's already there.

- **Type scale rebuild.** One consistent scale across hubs, pillars, tools and blog. Serif headings stay; body line-length capped for reading comfort (currently long-form sections run wide on desktop).
- **Card and surface pass.** Unify the many card variants (guides, tools, forms, datasets, blog) into one set of shared surface tokens — same radius, border, shadow, hover treatment everywhere.
- **Mobile-first calculators.** Tools are the money pages and the worst mobile experience: sticky result bar so the estimate stays visible while inputs scroll, larger tap targets, single-column input stacks, numeric keypads on number fields.
- **Sticky utility layer.** Persistent "jump to result / save PDF / get case review" bar on tool and pillar pages.
- **Motion discipline.** Subtle entrance and hover motion only, respecting reduced-motion; no decorative animation on legal content.
- **Dark mode audit.** Every new surface checked in both themes for contrast (WCAG AA).
- **Density modes on data tables.** The 51-jurisdiction tables get horizontal-scroll affordance, sticky first column, and a mobile card fallback.

## 2. Findability — one front door for any legal problem

Today a visitor must already know which tool they want. That's the biggest structural gap.

- **Global command search (Cmd+K and a prominent mobile entry).** Indexes every tool, form, guide, state page, glossary term and dataset in one client-side index with fuzzy matching and keyboard nav.
- **"What happened to me?" triage.** A short guided flow — situation, jurisdiction, timing — that routes to the exact tool, deadline, form and next step. Replaces the current static situation strip as the primary entry.
- **Jurisdiction memory.** Ask once, remember the country/state, and pre-filter every page thereafter (calculators, deadlines, filing fees, lawyer directory).
- **Topic hubs with real structure.** Each practice area gets a hub that lists: the deadline, the calculator, the forms, the state variations, the glossary terms and the guides — so no page is an orphan.
- **Related-content engine.** Replace hand-maintained link strips with a single relationship map driven by the existing registries, so new pages auto-link both ways.

## 3. Content completeness — add UK, Ireland, Canada, Australia

English-speaking common-law markets: high CPC, no translation cost, fastest route to genuine worldwide coverage.

For each of the four countries:

- Country hub page with the legal system explained in plain English.
- **Limitation periods index** (the equivalent of the US statute-of-limitations dataset) — per nation/province/state where they differ.
- **Employment rights**: notice periods, unfair dismissal, redundancy pay — with a calculator per country.
- **Personal injury**: how damages are assessed (Judicial College Guidelines in the UK, Irish Personal Injuries Guidelines, provincial caps in Canada, state schemes in Australia) plus an estimator.
- **Tenancy rights**: notice to quit, deposit protection, eviction process.
- **Court/tribunal fees and small-claims limits** dataset per country.
- Sub-national fan-out where meaningful: 4 UK nations, 13 Canadian provinces/territories, 8 Australian states/territories.
- Correct localisation throughout: currency, date format, spelling, and local terminology (solicitor/barrister, tribunal, redundancy, strata).

Also filling US/EU gaps: immigration basics, consumer/product liability, medical negligence, defamation and online harms, and elder law.

Every new page carries the same disclaimer discipline and jurisdiction-specific bar notices already in place.

## 4. Revenue quality (not more ads — better ones)

- **Ad layout tied to intent.** High-CPC pillar and calculator pages get in-content placements at natural reading breaks rather than relying on Auto-ads alone; thin and utility pages get fewer.
- **Result-moment monetisation.** The point where a calculator shows a number is the highest-intent moment on the site: that's where the email-result capture, case review, and attorney CTA belong — currently they're scattered.
- **Membership repositioning.** Right now membership sells "unlimited form downloads". Widen it: saved matters, deadline reminders, clean PDFs, no ads, document library. Show the value at the moment a paywall is hit, not only on `/pricing`.
- **Lead quality over lead volume.** Extend the existing lead scoring with jurisdiction and claim-type routing so case reviews are worth more per submission.
- **RPM reporting per template.** Extend the admin ads dashboard to report by page template, so you can see which content types actually earn and commission more of those.

---

## Technical notes

- Design work is token-level: `src/index.css` and `tailwind.config.ts` gain surface, elevation and density tokens; components stop carrying ad-hoc classes.
- Search index is generated at build time from the existing registries (`guideIndex.ts`, tool data, form definitions, state datasets) — no backend query per keystroke.
- New country content follows the established pattern: typed data modules under `src/data/`, one shared page template per content type, routes registered in `AppRoutes.tsx`, entries added to the guide registry, sitemap shards regenerated.
- New countries are English-only: hreflang scope stays as-is, no new locales.
- Jurisdiction memory is client-side (localStorage), so no auth requirement and no cache/SEO impact — pages stay statically indexable with a canonical default.

## Suggested order

1. Findability (search + triage + jurisdiction memory) — biggest immediate lift, benefits every existing page.
2. Design refinement — applies to everything built afterwards.
3. UK/IE/CA/AU expansion — the largest body of work, delivered country by country.
4. Revenue quality — best done once the new traffic and layouts are in place.
