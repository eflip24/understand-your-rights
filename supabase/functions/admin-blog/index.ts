import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    // Use service role for admin operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check admin role
    const { data: hasRole } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!hasRole) {
      return new Response(JSON.stringify({ error: "Forbidden: admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "create" || action === "update") {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const slug = formData.get("slug") as string;
      const content = formData.get("content") as string;
      const excerpt = formData.get("excerpt") as string;
      const authorName = formData.get("author_name") as string;
      const status = formData.get("status") as string;
      const publishedAt = formData.get("published_at") as string | null;
      const categoryIds = JSON.parse((formData.get("category_ids") as string) || "[]");
      const imageFile = formData.get("featured_image") as File | null;
      const postId = formData.get("id") as string | null;

      let featuredImageUrl: string | null = null;

      // Handle image upload
      if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const path = `${slug}.${ext}`;

        // Delete old image if updating
        if (action === "update") {
          await supabase.storage.from("blog-images").remove([path]);
        }

        const arrayBuffer = await imageFile.arrayBuffer();
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(path, arrayBuffer, {
            contentType: imageFile.type,
            upsert: true,
          });

        if (uploadError) {
          return new Response(JSON.stringify({ error: "Image upload failed: " + uploadError.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { data: publicUrl } = supabase.storage
          .from("blog-images")
          .getPublicUrl(path);
        featuredImageUrl = publicUrl.publicUrl;
      }

      const postData: Record<string, unknown> = {
        title,
        slug,
        content,
        excerpt,
        author_name: authorName || "LegallySpoken",
        status: status || "draft",
        published_at: publishedAt || null,
      };

      if (featuredImageUrl) {
        postData.featured_image_url = featuredImageUrl;
      }

      let resultPostId: string;

      if (action === "create") {
        postData.wp_id = Date.now(); // Use timestamp as unique wp_id for new posts
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select("id")
          .single();
        if (error) throw error;
        resultPostId = data.id;
      } else {
        if (!postId) throw new Error("Post ID required for update");
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", postId);
        if (error) throw error;
        resultPostId = postId;
      }

      // Update category mappings
      await supabase
        .from("blog_post_categories")
        .delete()
        .eq("post_id", resultPostId);

      if (categoryIds.length > 0) {
        const mappings = categoryIds.map((catId: string) => ({
          post_id: resultPostId,
          category_id: catId,
        }));
        await supabase.from("blog_post_categories").insert(mappings);
      }

      return new Response(JSON.stringify({ id: resultPostId, success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { id } = await req.json();
      await supabase.from("blog_post_categories").delete().eq("post_id", id);
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create-category") {
      const { name, slug: catSlug, parent_wp_id } = await req.json();
      const { data, error } = await supabase
        .from("blog_categories")
        .insert({ name, slug: catSlug, wp_id: Date.now(), parent_wp_id })
        .select()
        .single();
      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update-category") {
      const { id, name, slug: catSlug, parent_wp_id } = await req.json();
      const { error } = await supabase
        .from("blog_categories")
        .update({ name, slug: catSlug, parent_wp_id })
        .eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete-category") {
      const { id } = await req.json();
      await supabase.from("blog_post_categories").delete().eq("category_id", id);
      const { error } = await supabase.from("blog_categories").delete().eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
