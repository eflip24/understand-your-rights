import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { legalTermPages, getLegalTermCategories } from "@/data/legalTermPages";
import Head from "@/components/seo/Head";

export default function LegalTermsDirectory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getLegalTermCategories();

  const filtered = useMemo(() => {
    let result = legalTermPages;
    if (selectedCategory) result = result.filter((t) => t.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    }
    return result.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedCategory]);

  const letters = useMemo(() => [...new Set(filtered.map((t) => t.term[0].toUpperCase()))].sort(), [filtered]);

  return (
    <div className="container py-8 max-w-5xl">
      <Head
        title="Legal Terms Dictionary — Plain English Definitions | LegallySpoken"
        description={`Browse ${legalTermPages.length}+ legal terms explained in plain English. Understand contracts, court processes, and legal jargon with examples and FAQs.`}
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Legal Terms Dictionary</h1>
        <p className="text-muted-foreground text-lg">Plain-English definitions for {legalTermPages.length}+ legal terms.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search terms..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* A-Z Jump */}
      <div className="flex flex-wrap gap-1 mb-6">
        {letters.map((letter) => (
          <a key={letter} href={`#letter-${letter}`} className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors">
            {letter}
          </a>
        ))}
      </div>

      {/* Terms List */}
      {letters.map((letter) => {
        const termsForLetter = filtered.filter((t) => t.term[0].toUpperCase() === letter);
        return (
          <div key={letter} id={`letter-${letter}`} className="mb-6">
            <h2 className="text-2xl font-bold text-accent mb-3 border-b pb-1">{letter}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {termsForLetter.map((term) => (
                <Link key={term.slug} to={`/legal-terms/${term.slug}`}>
                  <Card className="hover:shadow-md hover:border-accent/30 transition-all h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{term.term}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{term.definition}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">{term.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No terms found matching your search.</p>
      )}
    </div>
  );
}
