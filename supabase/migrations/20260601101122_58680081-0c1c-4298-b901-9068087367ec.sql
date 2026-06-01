-- Translations produced by the daily cron
CREATE TABLE public.region_intros_runtime (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country text NOT NULL,
  region_canonical text NOT NULL,
  locale text NOT NULL,
  text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (country, region_canonical, locale)
);

GRANT SELECT ON public.region_intros_runtime TO anon;
GRANT SELECT ON public.region_intros_runtime TO authenticated;
GRANT ALL ON public.region_intros_runtime TO service_role;

ALTER TABLE public.region_intros_runtime ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read region intros"
  ON public.region_intros_runtime
  FOR SELECT
  USING (true);

-- Round-robin cron state (single row, id='singleton')
CREATE TABLE public.translation_cron_state (
  id text NOT NULL PRIMARY KEY,
  next_country text NOT NULL,
  last_run_at timestamp with time zone,
  last_run_status text,
  last_filled_count integer,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.translation_cron_state TO authenticated;
GRANT ALL ON public.translation_cron_state TO service_role;

ALTER TABLE public.translation_cron_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read cron state"
  ON public.translation_cron_state
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.translation_cron_state (id, next_country) VALUES ('singleton', 'de');

-- Schedule extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;