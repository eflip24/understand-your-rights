CREATE TABLE IF NOT EXISTS public.guide_translations (
  guide_slug TEXT NOT NULL,
  locale TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (guide_slug, locale)
);

GRANT SELECT ON public.guide_translations TO anon;
GRANT SELECT ON public.guide_translations TO authenticated;
GRANT ALL ON public.guide_translations TO service_role;

ALTER TABLE public.guide_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guide translations are public content"
ON public.guide_translations FOR SELECT
USING (true);

INSERT INTO public.translation_cron_state (id, next_country, last_run_status)
VALUES ('guides', 'es', 'noop')
ON CONFLICT (id) DO NOTHING;