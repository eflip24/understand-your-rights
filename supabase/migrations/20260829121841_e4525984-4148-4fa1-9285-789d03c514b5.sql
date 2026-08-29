CREATE TABLE public.ad_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL CHECK (event_type IN ('impression','click')),
  slot text NOT NULL,
  page_type text NOT NULL,
  path text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX ad_events_created_at_idx ON public.ad_events (created_at DESC);
CREATE INDEX ad_events_page_type_idx ON public.ad_events (page_type, slot);

GRANT INSERT ON public.ad_events TO anon, authenticated;
GRANT SELECT ON public.ad_events TO authenticated;
GRANT ALL ON public.ad_events TO service_role;

ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record ad events"
  ON public.ad_events FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read ad events"
  ON public.ad_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));