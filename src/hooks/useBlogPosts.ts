import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  wp_id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string | null;
  author_name: string;
  created_at: string | null;
  ai_generated?: boolean;
  categories?: BlogCategory[];
}

export interface BlogCategory {
  id: string;
  wp_id: number;
  name: string;
  slug: string;
  parent_wp_id: number | null;
}

export function useBlogPosts(categorySlug?: string) {
  return useQuery({
    queryKey: ["blog-posts", categorySlug],
    queryFn: async () => {
      // Use the view for single-query fetch with categories
      let query = supabase
        .from("blog_posts_with_categories")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (categorySlug) {
        // Filter posts that have this category — use containment on the JSON array
        const { data: cat } = await supabase
          .from("blog_categories")
          .select("id")
          .eq("slug", categorySlug)
          .single();

        if (!cat) return [];

        // Get post IDs for this category
        const { data: mappings } = await supabase
          .from("blog_post_categories")
          .select("post_id")
          .eq("category_id", cat.id);

        const postIds = mappings?.map((m) => m.post_id) || [];
        if (postIds.length === 0) return [];
        query = query.in("id", postIds);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map((row) => ({
        ...row,
        categories: (row.categories as unknown as BlogCategory[]) || [],
      })) as BlogPost[];
    },
  });
}

// Lightweight query for related posts — no categories needed, limit 4
export function useRelatedPosts(currentPostId?: string) {
  return useQuery({
    queryKey: ["related-posts", currentPostId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, featured_image_url, published_at")
        .eq("status", "published")
        .neq("id", currentPostId!)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data as Pick<BlogPost, "id" | "title" | "slug" | "featured_image_url" | "published_at">[];
    },
    enabled: !!currentPostId,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts_with_categories")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      return {
        ...data,
        categories: (data.categories as unknown as BlogCategory[]) || [],
      } as BlogPost;
    },
    enabled: !!slug,
  });
}

export interface BlogTranslation {
  title: string;
  excerpt: string;
  content: string;
}

/**
 * Locale overlay for a blog post. Returns null when the article has no
 * translation in this locale (caller falls back to the English original).
 */
export function useBlogPostTranslation(postId: string | undefined, locale: string) {
  return useQuery({
    queryKey: ["blog-translation", postId, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_translations")
        .select("title, excerpt, content")
        .eq("post_id", postId!)
        .eq("locale", locale)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return (data as BlogTranslation | null) ?? null;
    },
    enabled: !!postId && locale !== "en",
  });
}

/** Slugs that have a published translation in the given locale (for list pages). */
export function useTranslatedPostTitles(locale: string) {
  return useQuery({
    queryKey: ["blog-translated-titles", locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_translations")
        .select("post_id, title, excerpt")
        .eq("locale", locale)
        .eq("status", "published");
      if (error) throw error;
      const map: Record<string, { title: string; excerpt: string }> = {};
      for (const row of data || []) {
        map[(row as { post_id: string }).post_id] = {
          title: (row as { title: string }).title,
          excerpt: (row as { excerpt: string }).excerpt,
        };
      }
      return map;
    },
    enabled: locale !== "en",
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as BlogCategory[];
    },
  });
}
