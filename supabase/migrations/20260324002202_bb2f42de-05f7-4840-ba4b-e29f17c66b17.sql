DROP VIEW IF EXISTS public.blog_posts_with_categories;

ALTER TABLE public.blog_posts ALTER COLUMN wp_id TYPE bigint;
ALTER TABLE public.blog_categories ALTER COLUMN wp_id TYPE bigint;

CREATE OR REPLACE VIEW public.blog_posts_with_categories AS
SELECT bp.id,
    bp.wp_id,
    bp.title,
    bp.slug,
    bp.content,
    bp.excerpt,
    bp.featured_image_url,
    bp.published_at,
    bp.author_name,
    bp.created_at,
    bp.status,
    COALESCE(json_agg(json_build_object('id', bc.id, 'name', bc.name, 'slug', bc.slug, 'wp_id', bc.wp_id)) FILTER (WHERE bc.id IS NOT NULL), '[]'::json) AS categories
   FROM blog_posts bp
     LEFT JOIN blog_post_categories bpc ON bpc.post_id = bp.id
     LEFT JOIN blog_categories bc ON bc.id = bpc.category_id
  GROUP BY bp.id;