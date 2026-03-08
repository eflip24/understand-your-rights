import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogPosts";
import { Head } from "@/components/seo/Head";
import { format } from "date-fns";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const { data: posts, isLoading } = useBlogPosts(activeCategory);
  const { data: categories } = useBlogCategories();

  return (
    <>
      <Head
        title="Blog — LegallySpoken"
        description="Legal insights, guides, and analysis from LegallySpoken. Stay informed about your rights and the law."
      />

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Legal Insights & Guides
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Expert articles on laws, contracts, rights, and more — written in plain English.
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Category filters */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(undefined)}
              className="rounded-full"
            >
              All
            </Button>
            {categories
              .filter((c) => !c.parent_wp_id || c.parent_wp_id === 0)
              .map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.slug ? undefined : cat.slug
                    )
                  }
                  className="rounded-full"
                >
                  {cat.name}
                </Button>
              ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !posts?.length ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {post.featured_image_url && (
                    <div className="h-52 overflow-hidden">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-1">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.categories.slice(0, 2).map((cat) => (
                          <Badge
                            key={cat.id}
                            variant="secondary"
                            className="text-xs font-medium"
                          >
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {post.title.replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8211;/g, "–").replace(/&#8220;/g, "\u201c").replace(/&#8221;/g, "\u201d")}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author_name}
                        </span>
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(post.published_at), "MMM d, yyyy")}
                          </span>
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
      </div>
    </>
  );
}
