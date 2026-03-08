import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogPosts";
import Head from "@/components/seo/Head";
import { format } from "date-fns";

function decodeHtml(html: string) {
  return html.replace(/&amp;/g, "&").replace(/&#8217;/g, "\u2019").replace(/&#8211;/g, "\u2013").replace(/&#8220;/g, "\u201c").replace(/&#8221;/g, "\u201d");
}

export default function BlogCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, isLoading } = useBlogPosts(slug);
  const { data: categories } = useBlogCategories();

  const category = categories?.find((c) => c.slug === slug);
  const categoryName = category?.name || slug || "Category";

  return (
    <>
      <Head
        title={`${categoryName} — Blog — LegallySpoken`}
        description={`Read articles about ${categoryName} on LegallySpoken.`}
      />

      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/70">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/blog" className="text-primary-foreground/70">Blog</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">{categoryName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">{categoryName}</h1>
        </div>
      </section>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !posts?.length ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-4">No posts in this category yet.</p>
            <Button asChild><Link to="/blog">View all posts</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {post.featured_image_url && (
                    <div className="h-52 overflow-hidden">
                      <img src={post.featured_image_url} alt={decodeHtml(post.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {decodeHtml(post.title)}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author_name}</span>
                        {post.published_at && (
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Button variant="outline" asChild>
            <Link to="/blog" className="gap-2"><ArrowLeft className="h-4 w-4" />All Posts</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
