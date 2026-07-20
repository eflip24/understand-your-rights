-- Phase 5: form_documents (permanent library with versions)
CREATE TABLE public.form_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('form','pack')),
  variant text NOT NULL CHECK (variant IN ('watermarked','clean')),
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('draft','completed','signed','purchased')),
  storage_path text NOT NULL,
  size_bytes integer,
  sha256 text,
  snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  title text,
  state_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.form_documents TO authenticated;
GRANT ALL ON public.form_documents TO service_role;

ALTER TABLE public.form_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own documents"
  ON public.form_documents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX form_documents_user_slug_idx ON public.form_documents(user_id, slug, version DESC);

-- Storage policies for the (soon-to-be-created) 'documents' private bucket.
-- Objects live under {user_id}/... so we can gate on the first path segment.
CREATE POLICY "Users read their own document objects"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users upload their own document objects"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users delete their own document objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);