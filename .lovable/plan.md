
# Plan: Footer credit + Online Fillable Legal Forms foundation

Two deliverables in one build:

1. Small change: add "Website designed and developed by [eFlip](https://eflip.ie)" to the site footer.
2. Large change: production-ready foundation for a Fillable Legal Forms system integrated into the existing site (auth, dashboard, design system, Stripe via Lovable Cloud).

---

## A. Footer credit (quick)

Edit `src/components/layout/Footer.tsx`:
- Add a small line in the bottom bar (next to or below the existing copyright): `Website designed and developed by eFlip` where "eFlip" is an `<a href="https://eflip.ie" target="_blank" rel="noopener noreferrer">`.
- Uses existing muted-foreground styling. No design token changes.

---

## B. Fillable Legal Forms foundation

### B1. Data model

New file `src/data/forms.ts`:

```ts
export type FormFieldType = "text" | "email" | "date" | "number" | "select" | "textarea" | "checkbox" | "ssn" | "ein";
export interface FormFieldDef { id: string; label: string; type: FormFieldType; help?: string; required?: boolean; options?: {value:string;label:string}[]; placeholder?: string; }
export interface FormStepDef { id: string; title: string; description?: string; fields: FormFieldDef[]; }
export interface LegalFormDef {
  slug: string; title: string; shortDescription: string; category: "employment"|"tax"|"business"|"realestate"|"personal";
  price: number;                 // clean-PDF price in USD
  lastUpdated: string;           // ISO
  isFeatured?: boolean;
  steps: FormStepDef[];
  pdfTemplate: "w9"|"i9"|"w4"|"nda"|"lease"|"poa"; // maps to a pdf-lib generator
  relatedForms?: string[]; relatedBlogSlugs?: string[];
}
export const legalForms: LegalFormDef[] = [ /* W-9, I-9, W-4, NDA, Lease, POA — placeholders with realistic step/field defs */ ];
```

6 seed forms so hub + homepage render fully.

### B2. Database (Lovable Cloud migration)

Two new tables in `public`, both with GRANTs + RLS scoped to `auth.uid()`:

- `form_drafts` — one row per (user, form_slug): `id uuid pk`, `user_id uuid not null`, `form_slug text not null`, `step int`, `data jsonb`, `progress_pct int`, `updated_at timestamptz`. Unique `(user_id, form_slug)`.
- `form_purchases` — `id`, `user_id`, `form_slug`, `stripe_session_id`, `amount_cents`, `created_at`. Unique `(user_id, form_slug)` for lifetime access.

Policies: user can select/insert/update/delete own rows. `service_role` full access (webhook writes purchases). Grants: `authenticated` CRUD, `service_role` ALL.

### B3. Routing & navigation

- `src/AppRoutes.tsx`: add `/forms` (hub) and `/forms/:slug` (wizard). Both lazy-loaded.
- `src/components/layout/Navbar.tsx`: insert "Forms" link after Home (desktop + mobile menu).
- Uses existing `useLocalizedPath` so multi-locale routing still works (per project memory).

### B4. Pages & components

New files:

```
src/pages/FormsHubPage.tsx
src/pages/FormWizardPage.tsx
src/components/forms/FormCard.tsx
src/components/forms/FormWizard.tsx        // reuses existing MultiStepWizard primitive
src/components/forms/FormField.tsx         // shadcn Input/Select/Textarea wrappers with help/validation
src/components/forms/AutoSaveIndicator.tsx
src/components/forms/FormDisclaimer.tsx
src/components/forms/PdfActionBar.tsx      // "Download Free (watermarked)" + "Get Clean PDF – $X"
src/components/forms/Breadcrumbs.tsx       // generic, reusable
src/components/home/FeaturedFormsSection.tsx
src/components/dashboard/MyFormsSection.tsx // In Progress / Completed / Purchased tabs
src/hooks/useFormDraft.ts                  // load + autosave (debounced 1.5s) to Supabase + localStorage mirror
src/lib/pdf/generateFormPdf.ts             // pdf-lib generator, watermark flag
src/lib/pdf/templates/{w9,i9,w4,nda,lease,poa}.ts
```

Edits:
- `src/pages/HomePage.tsx`: mount `<FeaturedFormsSection />` above the categories block.
- `src/pages/DashboardPage.tsx`: mount `<MyFormsSection />` above the existing Saved Analyses list.

### B5. Autosave & resume

`useFormDraft(slug)`:
- On mount: load draft from Supabase (`form_drafts` where user_id + slug); fall back to `localStorage.forms:<slug>`; hydrate wizard state.
- Debounced 1.5s save on any change → upsert to Supabase (logged in) + always mirror to localStorage.
- Exposes `{ data, setField, step, setStep, status: "idle"|"saving"|"saved", lastSavedAt }` consumed by `<AutoSaveIndicator />`.
- Guest mode: localStorage only + "Email me a resume link" (Phase 2 — stub UI only, mark TODO).

### B6. PDF generation

Client-side with `pdf-lib`:
- One generator per template in `src/lib/pdf/templates/*` that lays out fields onto a blank page (placeholder layout — not a facsimile of official IRS/USCIS forms; make that explicit in disclaimer).
- `generateFormPdf({ template, data, watermark: boolean })` returns a `Blob`.
- Watermark: light gray diagonal text "Generated free on legallyspoken.com — Upgrade for clean version".
- Triggered from `<PdfActionBar />`; success/failure toasts via existing `use-toast`.

Dependency: `bun add pdf-lib`.

### B7. Stripe (Lovable-managed payments)

Runs Steps 1–7 of the payments-pre-enable flow:
1. Call `payments--recommend_payment_provider` to classify the product.
2. Present recommendation to user. Digital forms → likely Paddle or Stripe; will surface the tool's suggestion.
3. On confirm, enable via `payments--enable_stripe_payments` (or Paddle if recommended).
4. Create the 6 seed products via `batch_create_product` (one price per form).
5. Add checkout edge function + webhook per the knowledge files that appear after enable.
6. On webhook `checkout.session.completed` → insert `form_purchases` row (service role) keyed by `user_id` + `form_slug` from metadata.
7. Client checks `form_purchases` before letting user re-download the clean PDF; purchased forms appear under Dashboard → Purchased tab.

Because provider choice depends on the eligibility check result and needs user confirmation, this step will pause for user approval mid-build.

### B8. Dashboard "My Forms"

`<MyFormsSection />` inside existing `DashboardPage`:
- Tabs: **In Progress** (rows from `form_drafts` where progress_pct < 100), **Completed Free** (progress_pct = 100, not in purchases), **Purchased** (join with `form_purchases`).
- Each row: title, updated date, progress bar, action buttons (Continue, Download Free, Re-download Clean, Delete draft).
- Empty states per tab.

### B9. Cross-cutting

- `<FormDisclaimer />` used on hub, every wizard, and homepage section — mirrors existing legal disclaimer tone.
- `<Breadcrumbs />` on wizard: Home › Forms › {Category} › {Form}.
- SEO: `<Head>` on hub + wizard with title/description; JSON-LD `HowTo` schema on wizard (optional).
- Mobile-first: wizard stacks vertically, sticky action bar at bottom under `md`.

### B10. Implementation order in build mode

1. Footer credit (1 edit).
2. Migration for `form_drafts` + `form_purchases`.
3. `src/data/forms.ts` seeds + types.
4. Navbar + routes.
5. Hub page + FormCard + FeaturedFormsSection on Home.
6. Wizard page + FormWizard + FormField + AutoSaveIndicator + useFormDraft.
7. pdf-lib install + templates + free watermarked download.
8. Dashboard "My Forms".
9. **Pause** → run `recommend_payment_provider`, confirm provider with user, enable payments, create products, wire checkout + webhook + Purchased tab + clean PDF gating.
10. Disclaimers, breadcrumbs, related-forms/related-blog wiring, final polish.

### Technical notes

- Uses existing shadcn/ui components, Tailwind tokens, `useLocalizedPath`, `useAuth`, `supabase` client — no new design tokens.
- All new `public` tables include GRANTs in the same migration (project rule).
- Localized routes (`/es/forms`, etc.) work automatically because `AppRoutes` is mounted under each locale prefix.
- No changes to `src/integrations/supabase/client.ts` or auto-generated files.

### What will be delivered end-of-build

- Footer credit live.
- `/forms` hub + 6 seed forms + reusable wizard + autosave + free watermarked PDFs.
- Dashboard "My Forms" with In Progress / Completed / Purchased tabs.
- Stripe (or recommended provider) checkout + webhook + clean PDF gating.
- A short "How to add a new form" note at the end of the build reply.
