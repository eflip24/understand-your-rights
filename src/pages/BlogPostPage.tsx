import { useMemo } from "react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBlogPost, useRelatedPosts } from "@/hooks/useBlogPosts";
import Head from "@/components/seo/Head";
import { JsonLdGraph, blogPostingSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import blogDefaultImage from "@/assets/blog-default.jpg";
import { linkifyLegalContent } from "@/lib/linkifyContent";
import { tools } from "@/data/tools";

function decodeHtml(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8220;/g, "\u201c")
    .replace(/&#8221;/g, "\u201d")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function cleanContent(html: string): string {
  let cleaned = html;
  cleaned = cleaned.replace(/data-elementor[^=]*="[^"]*"/gi, "");
  cleaned = cleaned.replace(/data-widget_type="[^"]*"/gi, "");
  cleaned = cleaned.replace(/data-id="[^"]*"/gi, "");
  cleaned = cleaned.replace(/data-element_type="[^"]*"/gi, "");
  cleaned = cleaned.replace(/data-settings='[^']*'/gi, "");
  cleaned = cleaned.replace(/class="elementor[^"]*"/gi, "");
  cleaned = cleaned.replace(/<div\s*>\s*<\/div>/gi, "");
  cleaned = cleaned.replace(/<section\s*>\s*<\/section>/gi, "");
  cleaned = cleaned.replace(/<span\s*>\s*<\/span>/gi, "");
  return cleaned;
}

function extractHeadings(html: string) {
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
  const results: Array<{ level: number; text: string; id: string }> = [];
  let match;
  let i = 0;
  while ((match = regex.exec(html)) !== null) {
    results.push({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]+>/g, ""),
      id: "heading-" + i,
    });
    i++;
  }
  return results;
}

function addHeadingIds(html: string) {
  let counter = 0;
  return html.replace(/<h([23])([^>]*)>/gi, function (_match, level, attrs) {
    return "<h" + level + attrs + ' id="heading-' + counter++ + '">';
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: related = [] } = useRelatedPosts(post?.id);

  const processedContent = useMemo(() => {
    if (!post?.content) return "";
    return linkifyLegalContent(addHeadingIds(cleanContent(post.content)));
  }, [post?.content]);

  const headings = useMemo(() => {
    if (!post?.content) return [];
    return extractHeadings(post.content);
  }, [post?.content]);

  const categoryNames = useMemo(() => {
    if (!post?.categories) return [];
    return (post.categories as { name: string }[]).map(c => c.name.toLowerCase());
  }, [post?.categories]);

  const suggestedTools = useMemo(() => {
    const keywords: Record<string, string[]> = {
      "accident": ["settlement-estimator", "accident-damage", "attorney-fee-calculator"],
      "injury": ["settlement-estimator", "attorney-fee-calculator"],
      "insurance": ["insurance-premium", "insurance-quote-comparison"],
      "contract": ["red-flag-scanner", "reading-time-calculator", "clause-finder"],
      "employment": ["non-compete-checker", "freelance-rate-calculator", "overtime-calculator"],
      "real estate": ["security-deposit-calculator", "rent-increase-calculator", "lease-analyzer"],
      "finance": ["compound-interest-calculator", "loan-payment-calculator"],
    };
    const matched = new Set<string>();
    for (const cat of categoryNames) {
      for (const [key, ids] of Object.entries(keywords)) {
        if (cat.includes(key)) ids.forEach(id => matched.add(id));
      }
    }
    if (matched.size === 0) return tools.filter(t => t.popular).slice(0, 3);
    return tools.filter(t => matched.has(t.id)).slice(0, 4);
  }, [categoryNames]);

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-64 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Post not found</h1>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const title = decodeHtml(post.title);
  const postUrl = `https://legallyspoken.com/blog/${post.slug}`;
  const wordCount = post.content ? post.content.replace(/<[^>]+>/g, "").split(/\s+/).length : 0;
  const readingTime = Math.max(3, Math.ceil(wordCount / 238));

  return (
    <>
      <Head
        title={`${title} — LegallySpoken`}
        description={post.excerpt}
        ogImage={post.featured_image_url || undefined}
        ogType="article"
      />
      <JsonLdGraph schemas={[
        blogPostingSchema({
          headline: title,
          description: post.excerpt,
          url: postUrl,
          datePublished: post.published_at || undefined,
          author: post.author_name,
          image: post.featured_image_url || undefined,
        }),
        breadcrumbSchema([
          { name: "Home", url: "https://legallyspoken.com" },
          { name: "Blog", url: "https://legallyspoken.com/blog" },
          { name: title, url: postUrl },
        ]),
      ]} />

      {/* Hero */}
      <div className="relative">
        {post.featured_image_url && (
          <div className="h-[320px] md:h-[420px] overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}
        {!post.featured_image_url && (
          <div className="h-[320px] md:h-[420px] overflow-hidden">
            <img
              src={blogDefaultImage}
              alt="LegallySpoken Blog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}
      </div>

      <div className="container max-w-[1350px] -mt-24 relative z-10 pb-16">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Post header card */}
        <Card className="mb-8">
          <CardContent className="p-8 md:p-10">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat) => (
                  <Link key={cat.id} to={`/blog/category/${cat.slug}`}>
                    <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                      {cat.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author_name}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-8">
          {/* Table of Contents - desktop sidebar */}
          {headings.length > 3 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Table of Contents
                </h3>
                <nav className="space-y-1.5">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                        h.level === 3 ? "pl-3" : ""
                      }`}
                    >
                      {decodeHtml(h.text)}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Content */}
          <article className="flex-1 min-w-0">
            <Card>
              <CardContent className="p-8 md:p-10">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-accent prose-blockquote:bg-muted/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-strong:text-foreground prose-li:text-foreground/85"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </CardContent>
            </Card>
          </article>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-all h-full">
                    {rp.featured_image_url && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={rp.featured_image_url}
                          alt={decodeHtml(rp.title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <h3 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {decodeHtml(rp.title)}
                      </h3>
                      {rp.published_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(rp.published_at), "MMM d, yyyy")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {suggestedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedTools.map((tool) => (
                <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
                  <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <tool.icon className="h-4 w-4 text-accent" />
                        <CardTitle className="text-sm">{tool.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{tool.shortDescription}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Button variant="outline" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
