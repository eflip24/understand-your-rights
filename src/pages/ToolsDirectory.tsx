import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tools, categories, searchTools, getToolsByCategory, type ToolCategory } from "@/data/tools";
import { Button } from "@/components/ui/button";
import Head from "@/components/seo/Head";

export default function ToolsDirectory() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(() => {
    let result = query ? searchTools(query) : tools;
    if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory);
    }
    return result;
  }, [query, activeCategory]);

  return (
    <div className="container py-10">
      <Head
        title="All Legal Tools — Free Calculators & Generators | LegallySpoken"
        description="Browse 70+ free legal tools including contract analyzers, document generators, financial calculators, and more. No signup required."
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Legal Tools</h1>
        <p className="text-muted-foreground">Browse our complete collection of free legal tools.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">No tools found</p>
          <p className="text-sm">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
              <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <tool.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{tool.categoryLabel}</span>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
