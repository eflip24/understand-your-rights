

# Phase 5D: User Accounts with Saved Analyses

## Database Migrations

### Migration 1: Profiles table + auto-creation trigger
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (new.id, new.email);
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Migration 2: Saved analyses table
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
CREATE POLICY "Users can read own analyses" ON public.saved_analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.saved_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON public.saved_analyses FOR DELETE TO authenticated USING (auth.uid() = user_id);
```

## New Files (6)

1. **`src/contexts/AuthContext.tsx`** — Auth provider using `onAuthStateChange` + `getSession`. Exposes `user`, `session`, `loading`, `signOut`.

2. **`src/pages/LoginPage.tsx`** — Email/password login form. Redirects to `/dashboard` on success. Link to signup and forgot password.

3. **`src/pages/SignupPage.tsx`** — Email/password signup form. Shows "check your email" message after signup (no auto-confirm).

4. **`src/pages/ForgotPasswordPage.tsx`** — Request password reset email via `resetPasswordForEmail` with `redirectTo: origin + '/reset-password'`.

5. **`src/pages/ResetPasswordPage.tsx`** — New password form. Checks for `type=recovery` in URL hash, calls `updateUser({ password })`.

6. **`src/pages/DashboardPage.tsx`** — Lists saved analyses with tool name, date, and delete button. Redirects to login if not authenticated. Links each analysis to its tool page.

7. **`src/components/SaveAnalysisButton.tsx`** — Button that saves current tool result to `saved_analyses`. Shows login prompt if not authenticated. Takes `toolSlug`, `toolName`, `inputData`, `resultData` props.

## File Edits (3)

1. **`src/App.tsx`** — Wrap in `AuthProvider`, add 5 routes: `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/dashboard`.

2. **`src/components/layout/Navbar.tsx`** — Add auth-aware buttons: show "Log in" when logged out, show "Dashboard" + "Log out" when logged in. Add to both desktop and mobile nav.

3. **`src/components/layout/ToolPageLayout.tsx`** — No changes needed; individual AI tool components will integrate `SaveAnalysisButton` themselves by passing result data.

## Build Order
1. Run both database migrations
2. Create `AuthContext.tsx`
3. Create auth pages (login, signup, forgot-password, reset-password)
4. Create `DashboardPage.tsx` and `SaveAnalysisButton.tsx`
5. Update `App.tsx` with AuthProvider + routes
6. Update `Navbar.tsx` with auth buttons

