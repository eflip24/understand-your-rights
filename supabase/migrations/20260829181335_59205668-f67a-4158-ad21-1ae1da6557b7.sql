CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_slug text NOT NULL,
  status text NOT NULL DEFAULT 'incomplete',
  stripe_customer_id text,
  stripe_subscription_id text UNIQUE,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX subscriptions_user_active_idx ON public.subscriptions (user_id) WHERE status IN ('active','trialing','past_due');
CREATE INDEX subscriptions_user_idx ON public.subscriptions (user_id);

GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();

ALTER TABLE public.form_prices DROP CONSTRAINT IF EXISTS form_prices_kind_check;
ALTER TABLE public.form_prices ADD CONSTRAINT form_prices_kind_check CHECK (kind IN ('form','pack','subscription'));

INSERT INTO public.form_prices (slug, title, kind, amount_cents, currency, active)
VALUES
  ('unlimited-monthly', 'Unlimited Forms — Monthly', 'subscription', 1900, 'usd', true),
  ('unlimited-annual', 'Unlimited Forms — Annual', 'subscription', 14900, 'usd', true)
ON CONFLICT (slug) DO NOTHING;