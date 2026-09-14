CREATE TABLE public.blog_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  locale text NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, locale)
);

CREATE INDEX blog_translations_locale_idx ON public.blog_translations (locale);

GRANT SELECT ON public.blog_translations TO anon;
GRANT SELECT ON public.blog_translations TO authenticated;
GRANT ALL ON public.blog_translations TO service_role;

ALTER TABLE public.blog_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog translations are public"
  ON public.blog_translations FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins manage blog translations"
  ON public.blog_translations FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER blog_translations_updated_at
  BEFORE UPDATE ON public.blog_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_form_drafts_updated_at();