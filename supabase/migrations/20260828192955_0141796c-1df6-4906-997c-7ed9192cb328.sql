CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source_path TEXT,
  tool_id TEXT,
  claim_type TEXT,
  state_code TEXT,
  estimate JSONB,
  deadline_date DATE,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,
  consent BOOLEAN NOT NULL DEFAULT false,
  locale TEXT NOT NULL DEFAULT 'en',
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX subscribers_email_idx ON public.subscribers (email);
CREATE INDEX subscribers_reminder_idx ON public.subscribers (deadline_date) WHERE reminder_sent_at IS NULL;

GRANT SELECT ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view subscribers" ON public.subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.case_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  state_code TEXT,
  city TEXT,
  claim_type TEXT NOT NULL,
  incident_date DATE,
  description TEXT,
  estimated_value_cents BIGINT,
  sol_open BOOLEAN,
  quality_score INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'standard',
  status TEXT NOT NULL DEFAULT 'new',
  source_path TEXT,
  tool_id TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX case_leads_status_idx ON public.case_leads (status, created_at DESC);

GRANT SELECT, UPDATE ON public.case_leads TO authenticated;
GRANT ALL ON public.case_leads TO service_role;
ALTER TABLE public.case_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view case leads" ON public.case_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update case leads" ON public.case_leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER case_leads_updated_at BEFORE UPDATE ON public.case_leads
FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();