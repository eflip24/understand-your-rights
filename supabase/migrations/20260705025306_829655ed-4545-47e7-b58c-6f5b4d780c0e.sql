
-- Growth pipeline tables
CREATE TABLE public.growth_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  function_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'running',
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  error TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ
);

CREATE TABLE public.keyword_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  database TEXT NOT NULL DEFAULT 'us',
  cpc NUMERIC(10,2),
  volume INTEGER,
  kd NUMERIC(5,2),
  competition NUMERIC(4,2),
  intent TEXT,
  cluster TEXT,
  serp_snapshot JSONB,
  source_run UUID REFERENCES public.growth_runs(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new',
  priority_score NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (keyword, database)
);
CREATE INDEX idx_keyword_candidates_cluster ON public.keyword_candidates(cluster);
CREATE INDEX idx_keyword_candidates_status ON public.keyword_candidates(status);
CREATE INDEX idx_keyword_candidates_priority ON public.keyword_candidates(priority_score DESC);

CREATE TABLE public.content_clusters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  seed_keywords TEXT[] NOT NULL DEFAULT '{}',
  target_tools TEXT[] NOT NULL DEFAULT '{}',
  target_blogs TEXT[] NOT NULL DEFAULT '{}',
  priority_score NUMERIC(10,2) DEFAULT 0,
  auto_publish BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.sprint_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cluster_id UUID REFERENCES public.content_clusters(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('tool','blog','state_hub','lawyer_page','refresh')),
  title TEXT NOT NULL,
  spec JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'awaiting_review',
  generated_asset_id TEXT,
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_sprint_queue_status ON public.sprint_queue(status);
CREATE INDEX idx_sprint_queue_cluster ON public.sprint_queue(cluster_id);

CREATE TABLE public.growth_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  keyword TEXT,
  impressions INTEGER,
  clicks INTEGER,
  rpm NUMERIC(10,2),
  avg_position NUMERIC(5,2),
  snapshot_date DATE NOT NULL DEFAULT current_date,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_url, keyword, snapshot_date)
);
CREATE INDEX idx_growth_metrics_url ON public.growth_metrics(page_url);
CREATE INDEX idx_growth_metrics_date ON public.growth_metrics(snapshot_date DESC);

-- GRANTs (admin-only reads via RLS; service_role for edge functions)
GRANT SELECT ON public.growth_runs TO authenticated;
GRANT ALL ON public.growth_runs TO service_role;

GRANT SELECT, UPDATE ON public.keyword_candidates TO authenticated;
GRANT ALL ON public.keyword_candidates TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_clusters TO authenticated;
GRANT ALL ON public.content_clusters TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sprint_queue TO authenticated;
GRANT ALL ON public.sprint_queue TO service_role;

GRANT SELECT ON public.growth_metrics TO authenticated;
GRANT ALL ON public.growth_metrics TO service_role;

-- RLS: admin-only
ALTER TABLE public.growth_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprint_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins view runs" ON public.growth_runs FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "admins view keywords" ON public.keyword_candidates FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update keywords" ON public.keyword_candidates FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "admins manage clusters" ON public.content_clusters FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "admins manage sprints" ON public.sprint_queue FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "admins view metrics" ON public.growth_metrics FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Seed the 6 starter clusters from the plan
INSERT INTO public.content_clusters (name, description, seed_keywords) VALUES
('personal_injury', 'Settlements, timelines, PI calculators', ARRAY['personal injury settlement','slip and fall settlement','car accident settlement','pain and suffering calculator','medical lien']),
('family_law', 'Child support, alimony, divorce costs', ARRAY['child support calculator','alimony calculator','divorce cost','divorce buyout','spousal support']),
('employment', 'Overtime, severance, wrongful termination', ARRAY['overtime pay calculator','severance pay','wrongful termination settlement','unpaid wages','flsa overtime']),
('housing_tenant', 'Eviction, security deposit, lease break', ARRAY['eviction notice','security deposit return','lease break penalty','tenant rights','rent increase limit']),
('statute_limitations', 'Time limits by claim type and state', ARRAY['statute of limitations','how long to sue','time limit to file lawsuit','statute of limitations personal injury']),
('legal_fees', 'Attorney fee estimators and comparisons', ARRAY['lawyer cost','attorney fees','contingency fee','how much does a lawyer cost','flat fee attorney']);
