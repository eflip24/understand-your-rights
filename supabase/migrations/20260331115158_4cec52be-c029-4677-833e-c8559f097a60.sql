
-- Fix 1: Recreate view with SECURITY INVOKER
CREATE OR REPLACE VIEW public.blog_posts_with_categories
  WITH (security_invoker = true) AS
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
     COALESCE(json_agg(json_build_object('id', bc.id, 'name', bc.name, 'slug', bc.slug, 'wp_id', bc.wp_id)) FILTER (WHERE (bc.id IS NOT NULL)), '[]'::json) AS categories
    FROM ((blog_posts bp
      LEFT JOIN blog_post_categories bpc ON ((bpc.post_id = bp.id)))
      LEFT JOIN blog_categories bc ON ((bc.id = bpc.category_id)))
   GROUP BY bp.id;

-- Fix 2: Add admin write policies on user_roles
CREATE POLICY "Admins can insert user roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update user roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete user roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
