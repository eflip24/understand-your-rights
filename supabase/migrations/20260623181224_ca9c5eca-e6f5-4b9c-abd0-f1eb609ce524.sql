CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.tool_translations (
  tool_id text NOT NULL,
  locale text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tool_id, locale)
);

GRANT SELECT ON public.tool_translations TO anon;
GRANT SELECT ON public.tool_translations TO authenticated;
GRANT ALL ON public.tool_translations TO service_role;

ALTER TABLE public.tool_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read of tool translations"
  ON public.tool_translations FOR SELECT
  USING (true);

INSERT INTO public.translation_cron_state (id, next_country, last_run_status, last_filled_count)
VALUES ('tools', 'es', 'pending', 0)
ON CONFLICT (id) DO NOTHING;