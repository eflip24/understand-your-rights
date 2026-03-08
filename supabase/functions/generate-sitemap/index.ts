import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://legallyspoken.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Fetch blog categories
  const { data: categories } = await supabase
    .from("blog_categories")
    .select("slug");

  const staticUrls = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/tools", priority: "0.9", changefreq: "weekly" },
    { loc: "/legal-terms", priority: "0.8", changefreq: "monthly" },
    { loc: "/legal-clauses", priority: "0.8", changefreq: "monthly" },
    { loc: "/contract-types", priority: "0.8", changefreq: "monthly" },
    { loc: "/blog", priority: "0.8", changefreq: "daily" },
  ];

  const urlEntries = staticUrls.map(
    (u) =>
      `  <url>
    <loc>${SITE}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  );

  // Blog posts
  if (posts) {
    for (const post of posts) {
      const lastmod = post.published_at
        ? new Date(post.published_at).toISOString().split("T")[0]
        : "";
      urlEntries.push(
        `  <url>
    <loc>${SITE}/blog/${post.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
      );
    }
  }

  // Blog categories
  if (categories) {
    for (const cat of categories) {
      urlEntries.push(
        `  <url>
    <loc>${SITE}/blog/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
