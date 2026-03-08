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
      let postIds: string[] | null = null;

      if (categorySlug) {
        const { data: cat } = await supabase
          .from("blog_categories")
          .select("id")
          .eq("slug", categorySlug)
          .single();

        if (cat) {
          const { data: mappings } = await supabase
            .from("blog_post_categories")
            .select("post_id")
            .eq("category_id", cat.id);
          postIds = mappings?.map((m) => m.post_id) || [];
        } else {
          return [];
        }
      }

      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (postIds) {
        if (postIds.length === 0) return [];
        query = query.in("id", postIds);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch categories for each post
      const posts = data as BlogPost[];
      const allPostIds = posts.map((p) => p.id);

      const { data: allMappings } = await supabase
        .from("blog_post_categories")
        .select("post_id, category_id")
        .in("post_id", allPostIds);

      const catIds = [...new Set(allMappings?.map((m) => m.category_id) || [])];
      const { data: cats } = catIds.length
        ? await supabase.from("blog_categories").select("*").in("id", catIds)
        : { data: [] };

      const catLookup = new Map((cats || []).map((c) => [c.id, c as BlogCategory]));

      return posts.map((post) => ({
        ...post,
        categories: (allMappings || [])
          .filter((m) => m.post_id === post.id)
          .map((m) => catLookup.get(m.category_id)!)
          .filter(Boolean),
      }));
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      const post = data as BlogPost;

      const { data: mappings } = await supabase
        .from("blog_post_categories")
        .select("category_id")
        .eq("post_id", post.id);

      const catIds = mappings?.map((m) => m.category_id) || [];
      const { data: cats } = catIds.length
        ? await supabase.from("blog_categories").select("*").in("id", catIds)
        : { data: [] };

      return { ...post, categories: (cats || []) as BlogCategory[] };
    },
    enabled: !!slug,
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
