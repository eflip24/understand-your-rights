CREATE TABLE public.review_lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text NOT NULL,
  firm_name text,
  email text NOT NULL,
  jurisdiction text NOT NULL CHECK (jurisdiction IN ('us','ie')),
  region text,
  credential_number text NOT NULL,
  has_insurance boolean NOT NULL DEFAULT false,
  fixed_price_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  turnaround_hours integer NOT NULL DEFAULT 48,
  payment_link text,
  bio text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','paused')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.review_lawyers TO authenticated;
GRANT SELECT ON public.review_lawyers TO anon;
GRANT ALL ON public.review_lawyers TO service_role;
ALTER TABLE public.review_lawyers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved lawyers are public" ON public.review_lawyers FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Lawyer sees own" ON public.review_lawyers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Lawyer applies" ON public.review_lawyers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Lawyer edits own" ON public.review_lawyers FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND status IN ('pending','approved','paused'));
CREATE POLICY "Admins manage lawyers" ON public.review_lawyers FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER review_lawyers_updated_at BEFORE UPDATE ON public.review_lawyers FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();

-- prevent lawyers self-approving
CREATE OR REPLACE FUNCTION public.review_lawyers_guard_status() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status AND NOT public.has_role(auth.uid(),'admin') THEN
    IF NOT (OLD.status IN ('approved','paused') AND NEW.status IN ('approved','paused')) THEN
      RAISE EXCEPTION 'Only admins can change approval status';
    END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER review_lawyers_guard BEFORE UPDATE ON public.review_lawyers FOR EACH ROW EXECUTE FUNCTION public.review_lawyers_guard_status();

CREATE TABLE public.review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  lawyer_id uuid REFERENCES public.review_lawyers(id) ON DELETE SET NULL,
  service text NOT NULL DEFAULT 'severance-review',
  jurisdiction text NOT NULL CHECK (jurisdiction IN ('us','ie')),
  region text,
  client_name text NOT NULL,
  client_email text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  document_path text,
  ai_summary jsonb,
  delivered_path text,
  lawyer_note text,
  status text NOT NULL DEFAULT 'received' CHECK (status IN ('received','ai_ready','with_lawyer','declined','delivered')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.review_requests TO authenticated;
GRANT ALL ON public.review_requests TO service_role;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client reads own" ON public.review_requests FOR SELECT TO authenticated USING (auth.uid() = client_id);
CREATE POLICY "Client creates" ON public.review_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id AND status = 'received');
CREATE POLICY "Client updates own" ON public.review_requests FOR UPDATE TO authenticated USING (auth.uid() = client_id) WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Assigned lawyer reads" ON public.review_requests FOR SELECT TO authenticated USING (lawyer_id IN (SELECT id FROM public.review_lawyers WHERE user_id = auth.uid() AND status = 'approved'));
CREATE POLICY "Assigned lawyer updates" ON public.review_requests FOR UPDATE TO authenticated USING (lawyer_id IN (SELECT id FROM public.review_lawyers WHERE user_id = auth.uid() AND status = 'approved')) WITH CHECK (lawyer_id IN (SELECT id FROM public.review_lawyers WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage requests" ON public.review_requests FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER review_requests_updated_at BEFORE UPDATE ON public.review_requests FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();

-- storage: reviews bucket, paths {client_id}/{request_id}/...
CREATE POLICY "review files client" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'reviews' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'reviews' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "review files lawyer" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'reviews' AND EXISTS (SELECT 1 FROM public.review_requests r JOIN public.review_lawyers l ON l.id = r.lawyer_id WHERE l.user_id = auth.uid() AND l.status='approved' AND r.id::text = (storage.foldername(name))[2]))
  WITH CHECK (bucket_id = 'reviews' AND EXISTS (SELECT 1 FROM public.review_requests r JOIN public.review_lawyers l ON l.id = r.lawyer_id WHERE l.user_id = auth.uid() AND l.status='approved' AND r.id::text = (storage.foldername(name))[2]));
CREATE POLICY "review files admin" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'reviews' AND public.has_role(auth.uid(),'admin'));