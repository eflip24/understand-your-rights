

# Phase 5C + 5D: Content Expansion & User Accounts

## Current State
- **56 legal term pages** in `legalTermPages.ts`
- **21 legal clauses** in `legalClauses.ts`  
- **~50 tools** across 8 categories
- **~20 contract types** (estimated)
- **Total**: ~147 pages. Need ~53+ more to hit 200+.
- **No database tables** exist yet. No auth system.

---

## 5C: Content Expansion (3 batches)

### Batch 1: Add 25 new legal term pages
New terms to add to `legalTermPages.ts` (terms NOT already having detail pages):

`accord-and-satisfaction`, `bailment`, `bona-fide`, `chattel`, `duress`, `ex-parte`, `felony`, `garnishment`, `habeas-corpus`, `in-camera`, `indemnity`, `malfeasance`, `misdemeanor`, `novation`, `perjury`, `privity`, `retainer`, `standing`, `subrogation`, `usury`, `tort-reform`, `unconscionable`, `venue`, `quitclaim-deed`, `pro-bono`

Also add these terms to `legalTerms.ts` if missing, and create corresponding detail pages.

### Batch 2: Add 15 more legal term pages (new terms not in glossary yet)
`adhesion-contract`, `anti-assignment-clause`, `bilateral-contract`, `capacity`, `class-action`, `comparative-negligence`, `consequential-damages`, `constructive-notice`, `counterpart`, `cross-default`, `de-facto`, `forum-selection`, `motion-to-dismiss`, `statute-of-frauds`, `strict-liability`

### Batch 3: Add 30 new legal clauses to `legalClauses.ts`
`acceleration-clause`, `anti-dilution-clause`, `automatic-renewal-clause`, `best-efforts-clause`, `choice-of-forum-clause`, `clawback-clause`, `change-of-control-clause`, `compliance-clause`, `cross-default-clause`, `cure-period-clause`, `drag-along-clause`, `exclusivity-clause`, `first-right-of-refusal-clause`, `holdback-clause`, `indemnity-cap-clause`, `integration-clause`, `key-person-clause`, `material-adverse-change-clause`, `most-favored-nation-clause`, `no-shop-clause`, `non-disparagement-clause`, `penalty-clause`, `price-adjustment-clause`, `right-to-audit-clause`, `right-of-first-offer-clause`, `survival-clause`, `tag-along-clause`, `time-is-of-the-essence-clause`, `tolling-clause`, `venue-clause`

**Result**: 56+25+15 = 96 term pages + 21+30 = 51 clauses + 50 tools + 20 contract types = **217+ pages**

---

## 5D: User Accounts with Saved Analyses

### Database Setup (2 migrations)

**Migration 1**: Create `profiles` table + auto-creation trigger
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- RLS: users read/update own profile
-- Trigger: auto-create profile on signup
```

**Migration 2**: Create `saved_analyses` table
```sql
CREATE TABLE public.saved_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_slug text NOT NULL,
  tool_name text NOT NULL,
  input_data jsonb NOT NULL DEFAULT '{}',
  result_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.saved_analyses ENABLE ROW LEVEL SECURITY;
-- RLS: users CRUD own analyses only
```

### New Files
- `src/contexts/AuthContext.tsx` — Auth provider with `onAuthStateChange` + `getSession`
- `src/pages/LoginPage.tsx` — Email/password login form
- `src/pages/SignupPage.tsx` — Email/password signup form  
- `src/pages/ResetPasswordPage.tsx` — Password reset form (handles `type=recovery`)
- `src/pages/ForgotPasswordPage.tsx` — Request password reset email
- `src/pages/DashboardPage.tsx` — Shows saved analyses list with delete capability
- `src/components/SaveAnalysisButton.tsx` — Reusable button for tool results

### File Edits
- `src/App.tsx` — Wrap in AuthProvider, add 5 new routes
- `src/components/layout/Navbar.tsx` — Add login/profile/dashboard/logout buttons
- `src/components/layout/ToolPageLayout.tsx` — Add SaveAnalysisButton support (optional, tools pass data)

### Auth Configuration
- Email signup with email confirmation required (no auto-confirm)
- Password reset flow with `/reset-password` route

---

## Build Order

1. **5C Batch 1**: Add 25 legal term pages to `legalTermPages.ts` + sync `legalTerms.ts`
2. **5C Batch 2**: Add 15 more term pages + 30 new clauses
3. **5D**: Database migrations, auth context, auth pages, dashboard, navbar updates

This will be implemented across 3 messages due to file size constraints.

