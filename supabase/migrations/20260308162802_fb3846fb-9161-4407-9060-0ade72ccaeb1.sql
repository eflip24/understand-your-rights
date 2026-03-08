
-- Blog categories table
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wp_id integer UNIQUE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_wp_id integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog categories"
  ON public.blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wp_id integer UNIQUE NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  featured_image_url text,
  published_at timestamptz,
  author_name text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog post categories join table
CREATE TABLE public.blog_post_categories (
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, category_id)
);

ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog post categories"
  ON public.blog_post_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Public can read blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');
