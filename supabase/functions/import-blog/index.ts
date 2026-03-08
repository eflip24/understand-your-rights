import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const WP_BASE = "https://legallyspoken.com/wp-json/wp/v2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // 1. Fetch and insert categories
    const catRes = await fetch(`${WP_BASE}/categories?per_page=100`);
    const wpCategories = await catRes.json();

    const categories = wpCategories.map((c: any) => ({
      wp_id: c.id,
      name: c.name,
      slug: c.slug,
      parent_wp_id: c.parent || null,
    }));

    const { error: catError } = await supabase
      .from("blog_categories")
      .upsert(categories, { onConflict: "wp_id" });

    if (catError) throw new Error(`Categories error: ${catError.message}`);

    // Build wp_id -> uuid map
    const { data: dbCats } = await supabase
      .from("blog_categories")
      .select("id, wp_id");
    const catMap = new Map<number, string>();
    dbCats?.forEach((c: any) => catMap.set(c.wp_id, c.id));

    // 2. Fetch posts (paginated)
    let page = 1;
    let allPosts: any[] = [];
    while (true) {
      const postRes = await fetch(
        `${WP_BASE}/posts?per_page=100&page=${page}&_embed`
      );
      if (!postRes.ok) break;
      const posts = await postRes.json();
      if (!posts.length) break;
      allPosts = allPosts.concat(posts);
      const totalPages = parseInt(postRes.headers.get("X-WP-TotalPages") || "1");
      if (page >= totalPages) break;
      page++;
    }

    let imported = 0;

    for (const post of allPosts) {
      // 3. Handle featured image
      let featuredImageUrl: string | null = null;
      const media = post._embedded?.["wp:featuredmedia"]?.[0];
      if (media?.source_url) {
        try {
          const imgRes = await fetch(media.source_url);
          if (imgRes.ok) {
            const imgBlob = await imgRes.blob();
            const ext = media.source_url.split(".").pop()?.split("?")[0] || "jpg";
            const filePath = `${post.slug}.${ext}`;
            const { error: uploadError } = await supabase.storage
              .from("blog-images")
              .upload(filePath, imgBlob, {
                contentType: media.mime_type || "image/jpeg",
                upsert: true,
              });
            if (!uploadError) {
              const { data: urlData } = supabase.storage
                .from("blog-images")
                .getPublicUrl(filePath);
              featuredImageUrl = urlData.publicUrl;
            }
          }
        } catch (e) {
          console.error(`Image error for ${post.slug}:`, e);
        }
      }

      // 4. Clean content - strip Elementor wrappers
      let content = post.content?.rendered || "";
      content = content
        .replace(/<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/gi, "<div>")
        .replace(/<section[^>]*class="[^"]*elementor[^"]*"[^>]*>/gi, "")
        .replace(/<\/section>/gi, "");

      const excerpt = (post.excerpt?.rendered || "")
        .replace(/<[^>]+>/g, "")
        .trim();

      const authorName =
        post._embedded?.author?.[0]?.name || "LegallySpoken";

      // 5. Insert post
      const { data: insertedPost, error: postError } = await supabase
        .from("blog_posts")
        .upsert(
          {
            wp_id: post.id,
            title: post.title?.rendered || "",
            slug: post.slug,
            content,
            excerpt,
            featured_image_url: featuredImageUrl,
            published_at: post.date,
            author_name: authorName,
          },
          { onConflict: "wp_id" }
        )
        .select("id")
        .single();

      if (postError) {
        console.error(`Post error ${post.slug}:`, postError.message);
        continue;
      }

      // 6. Insert category mappings
      const postCatIds = (post.categories || [])
        .map((wpCatId: number) => catMap.get(wpCatId))
        .filter(Boolean);

      if (postCatIds.length && insertedPost) {
        // Delete existing mappings first
        await supabase
          .from("blog_post_categories")
          .delete()
          .eq("post_id", insertedPost.id);

        const mappings = postCatIds.map((catId: string) => ({
          post_id: insertedPost.id,
          category_id: catId,
        }));

        await supabase.from("blog_post_categories").insert(mappings);
      }

      imported++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        categories: categories.length,
        posts: imported,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
