
CREATE TABLE public.saved_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_slug text NOT NULL,
  tool_name text NOT NULL,
  input_data jsonb NOT NULL DEFAULT '{}',
  result_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.saved_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own analyses" ON public.saved_analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.saved_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON public.saved_analyses FOR DELETE TO authenticated USING (auth.uid() = user_id);
