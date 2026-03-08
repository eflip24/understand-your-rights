
CREATE OR REPLACE VIEW public.blog_posts_with_categories AS
SELECT
  bp.*,
  COALESCE(
    json_agg(
      json_build_object('id', bc.id, 'name', bc.name, 'slug', bc.slug, 'wp_id', bc.wp_id)
    ) FILTER (WHERE bc.id IS NOT NULL),
    '[]'::json
  ) AS categories
FROM public.blog_posts bp
LEFT JOIN public.blog_post_categories bpc ON bpc.post_id = bp.id
LEFT JOIN public.blog_categories bc ON bc.id = bpc.category_id
GROUP BY bp.id;
