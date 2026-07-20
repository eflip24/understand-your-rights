## Phase 5 — State-Specific Logic + Advanced Features

Delivered as one implementation pass, but organized in 5 self-contained modules so each can be verified before moving on.

---

### Module A — State engine (foundation)

Create `src/data/stateFormRules.ts` — a single source of truth keyed by USPS state code with priority coverage for **CA, NY, TX, FL, IL, PA, OH** (all 50 fall back to sensible defaults).

Per state, we store:
- Lease: max security deposit, deposit-return window, late-fee cap, mandatory disclosures (e.g. CA lead-based paint + bedbug + Megan's Law; NY window guard; TX §92.056 repair notice; FL §83.49 deposit; IL RLTO for Chicago).
- Eviction: notice periods per cause (non-payment, lease violation, holdover, no-cause) — replaces/extends the current `evictionStateRules.ts`.
- Notice to vacate: tenant-side notice period by lease type.
- POA (financial + healthcare): notarization required, witnesses required (count), statutory form warning.
- Simple Will: witnesses required, self-proving affidavit availability.
- Bill of Sale: notarization required flag, odometer disclosure requirement.

A reusable `<StateSelector>` step component drops into any form; forms declare `stateAware: true` in `LegalFormDef` and get a state step auto-inserted first. Rule lookups happen at render time so notice periods, clauses, and disclaimers change live.

Forms upgraded to state-aware in this phase: Residential Lease, Eviction Notice (existing rules merged in), Notice to Vacate, Financial POA, Healthcare POA, Simple Will, Vehicle Bill of Sale, Late Rent Notice.

---

### Module B — E-signature

New `<SignaturePad>` component (canvas draw + typed-name fallback + auto-dated) built on `react-signature-canvas`. Adds a final "Sign" step to every form and pack. Captured signature is stored in the draft `data.signature = { dataUrl, typedName, signedAt, ipHash }` and stamped into the PDF signature block by each renderer (already have signature lines — we replace the underline with the image or typed name in a script font).

Server-side: extend `form_drafts.data` (JSONB, no schema change) — no new column needed. Status transitions to `signed` when a signature is present.

---

### Module C — Document library + version history

**Schema (single migration):**
- `form_documents` — permanent record of every generated PDF. Columns: `user_id`, `form_slug` (or `pack_slug`), `kind` (`form`|`pack`), `variant` (`watermarked`|`clean`), `status` (`draft`|`completed`|`signed`|`purchased`), `storage_path`, `size_bytes`, `sha256`, `snapshot` (JSONB copy of form data at generation), `version` (int, auto-increment per user+slug), `created_at`. RLS: user-owns-row. Grants to `authenticated` + `service_role`.
- `documents` storage bucket (private) with RLS on `storage.objects` restricting to `auth.uid()::text` folder prefix.

**Behavior:**
- Every PDF download (free or paid) is also uploaded to `documents/{user_id}/{slug}/v{n}.pdf` and a `form_documents` row is inserted. Anonymous users still get the download but no row (existing behavior preserved).
- New `MyDocumentsPage` at `/dashboard/documents` — table with search, status filter, kind filter, re-download button (signed URL, 60 min), and a "Versions" popover showing every prior version with per-version re-download.
- `DashboardPage` gets a "My Documents" card linking there; existing drafts card stays.

---

### Module D — PDF hardening + bulk pack download

- Switch clean-variant PDFs to **flattened output** (pdf-lib `form.flatten()` when acroform fields exist; otherwise no-op) so downstream editors can't tamper with fields.
- Optional password protection on paid variants: user chooses in the review step; we use `pdf-lib`'s encrypt-on-save (via `qpdf-wasm` fallback if pdf-lib version lacks it — implementation detail decided at build time based on installed lib). Off by default.
- Watermarked/free variants stay unencrypted so free previews remain frictionless.
- Pack ZIPs already exist; add a "Download all as ZIP" button on the pack review step for both variants and a re-download-ZIP button on the dashboard row.

---

### Module E — Dashboard UX

`DashboardPage` reworked into two cards + one table:
- **In-progress drafts** (from `form_drafts`) with Resume + progress bar.
- **My Documents** (from `form_documents`) with search, status pill (Draft / Completed / Signed / Purchased), kind filter (Form / Pack), re-download, versions.
- Mobile: cards stack; search sticks to top; row actions collapse into a menu.

Strong disclaimers surface in three places: state step ("Rules shown are general — not legal advice"), signature step ("Electronic signatures are valid under ESIGN/UETA in most cases — some documents (wills in some states) require wet signature + witnesses"), and dashboard footer.

---

### Out of scope for Phase 5

Not included so this phase stays shippable: notary integration, multi-party remote signing invitations, custom state coverage beyond the 7 priority states (defaults still apply), Stripe pack-checkout wiring (kept as-is from prior phases).

---

### Technical section

Files touched:
- `src/data/stateFormRules.ts` — new, replaces the narrow `evictionStateRules.ts` (kept as re-export shim so nothing breaks).
- `src/data/forms.ts` — add `stateAware?: boolean` to `LegalFormDef`; flag the 8 forms above.
- `src/components/forms/StateSelector.tsx`, `SignaturePad.tsx` — new.
- `src/pages/FormWizardPage.tsx`, `FormPackWizardPage.tsx` — inject state step + signature step; pass `stateRules` to renderers.
- `src/lib/pdf/generateFormPdf.ts` — accept `signature`, `stateRules`, flatten, optional encrypt.
- `src/lib/pdf/generatePackZip.ts` — pass-through of new options + bulk button hook.
- `src/lib/documents/uploadDocument.ts` — new; storage + insert.
- `src/pages/MyDocumentsPage.tsx` — new; route `/dashboard/documents`.
- `src/pages/DashboardPage.tsx` — restructure.
- `src/AppRoutes.tsx` — add `/dashboard/documents`.
- One migration: `form_documents` table + grants + RLS + `documents` storage bucket + object policies.
- Package add: `react-signature-canvas`.

### Verification

- `tsgo --noEmit` clean.
- Manual: fill lease with state = CA, confirm deposit clause and disclosures render; switch to TX, confirm they change. Sign, download free PDF, confirm signature image appears. Re-open dashboard, confirm document row + version 1. Regenerate, confirm version 2 with prior version still downloadable. Pack: bulk ZIP works from review and from dashboard.
