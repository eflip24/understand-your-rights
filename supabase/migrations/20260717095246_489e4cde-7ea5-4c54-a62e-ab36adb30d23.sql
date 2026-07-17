CREATE TABLE public.form_drafts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_slug text NOT NULL,
  step integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  progress_pct integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, form_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.form_drafts TO authenticated;
GRANT ALL ON public.form_drafts TO service_role;
ALTER TABLE public.form_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own form drafts" ON public.form_drafts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.form_purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_slug text NOT NULL,
  stripe_session_id text,
  amount_cents integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, form_slug)
);
GRANT SELECT ON public.form_purchases TO authenticated;
GRANT ALL ON public.form_purchases TO service_role;
ALTER TABLE public.form_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own purchases" ON public.form_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_form_drafts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_form_drafts_updated_at
BEFORE UPDATE ON public.form_drafts
FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();