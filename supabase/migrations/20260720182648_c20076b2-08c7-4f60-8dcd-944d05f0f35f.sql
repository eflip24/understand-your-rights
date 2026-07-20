
CREATE TABLE public.form_prices (
  slug text PRIMARY KEY,
  title text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('form','pack')),
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  currency text NOT NULL DEFAULT 'usd',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.form_prices TO anon;
GRANT SELECT ON public.form_prices TO authenticated;
GRANT ALL ON public.form_prices TO service_role;

ALTER TABLE public.form_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active prices"
  ON public.form_prices FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert prices"
  ON public.form_prices FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update prices"
  ON public.form_prices FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete prices"
  ON public.form_prices FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER form_prices_updated_at
  BEFORE UPDATE ON public.form_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();

INSERT INTO public.form_prices (slug, title, kind, amount_cents, currency) VALUES
  ('w-9', 'Form W-9 (Clean PDF)', 'form', 499, 'usd'),
  ('w-4', 'Form W-4 (Clean PDF)', 'form', 499, 'usd'),
  ('i-9', 'Form I-9 (Clean PDF)', 'form', 499, 'usd'),
  ('nda', 'Non-Disclosure Agreement (Clean PDF)', 'form', 999, 'usd'),
  ('residential-lease-agreement', 'Residential Lease Agreement (Clean PDF)', 'form', 1499, 'usd'),
  ('power-of-attorney-financial', 'Financial Power of Attorney (Clean PDF)', 'form', 1499, 'usd'),
  ('vehicle-bill-of-sale', 'Vehicle Bill of Sale (Clean PDF)', 'form', 999, 'usd'),
  ('eviction-notice', 'Eviction Notice (Clean PDF)', 'form', 999, 'usd'),
  ('demand-letter', 'Demand Letter (Clean PDF)', 'form', 999, 'usd'),
  ('promissory-note', 'Promissory Note (Clean PDF)', 'form', 1499, 'usd'),
  ('release-of-liability', 'Release of Liability (Clean PDF)', 'form', 999, 'usd'),
  ('offer-letter', 'Employment Offer Letter (Clean PDF)', 'form', 499, 'usd'),
  ('independent-contractor-agreement', 'Independent Contractor Agreement (Clean PDF)', 'form', 699, 'usd'),
  ('direct-deposit-authorization', 'Direct Deposit Authorization (Clean PDF)', 'form', 399, 'usd'),
  ('notice-to-vacate', 'Notice to Vacate (Clean PDF)', 'form', 399, 'usd'),
  ('move-in-move-out-checklist', 'Move-In / Move-Out Checklist (Clean PDF)', 'form', 399, 'usd'),
  ('security-deposit-receipt', 'Security Deposit Receipt (Clean PDF)', 'form', 399, 'usd'),
  ('late-rent-notice', 'Late Rent Notice (Clean PDF)', 'form', 399, 'usd'),
  ('llc-operating-agreement', 'LLC Operating Agreement (Clean PDF)', 'form', 999, 'usd'),
  ('healthcare-power-of-attorney', 'Healthcare Power of Attorney (Clean PDF)', 'form', 699, 'usd'),
  ('simple-will', 'Simple Will (Clean PDF)', 'form', 999, 'usd'),
  ('living-will', 'Living Will (Clean PDF)', 'form', 699, 'usd'),
  ('hipaa-authorization', 'HIPAA Authorization (Clean PDF)', 'form', 499, 'usd'),
  ('new-hire-pack', 'New Hire Forms Pack (Clean ZIP)', 'pack', 3400, 'usd'),
  ('landlord-starter-pack', 'Landlord Starter Pack (Clean ZIP)', 'pack', 2900, 'usd'),
  ('small-business-pack', 'Small Business Basics Pack (Clean ZIP)', 'pack', 3900, 'usd'),
  ('personal-planning-pack', 'Personal Planning Pack (Clean ZIP)', 'pack', 3400, 'usd');
