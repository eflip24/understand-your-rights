import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { legalClauses, getLegalClauseCategories } from "@/data/legalClauses";

export default function LegalClausesDirectory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getLegalClauseCategories();

  useEffect(() => {
    document.title = "Legal Clauses Guide — Common Contract Clauses Explained | LegallySpoken";
  }, []);

  const filtered = useMemo(() => {
    let result = legalClauses;
    if (selectedCategory) result = result.filter((c) => c.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.explanation.toLowerCase().includes(q));
    }
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [search, selectedCategory]);

  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Legal Clauses Guide</h1>
        <p className="text-muted-foreground text-lg">{legalClauses.length} common contract clauses explained with examples and red flags.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clauses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant={selectedCategory === null ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(null)}>All</Badge>
        {categories.map((cat) => (
          <Badge key={cat} variant={selectedCategory === cat ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(cat)}>{cat}</Badge>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((clause) => (
          <Link key={clause.slug} to={`/legal-clauses/${clause.slug}`}>
            <Card className="hover:shadow-md hover:border-accent/30 transition-all h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{clause.title}</h3>
                  <Badge variant="secondary" className="shrink-0 text-xs">{clause.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{clause.explanation}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                  {clause.exampleClauses.length} examples • {clause.redFlags.length} red flags
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No clauses found matching your search.</p>
      )}
    </div>
  );
}
