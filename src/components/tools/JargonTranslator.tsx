import { useState } from "react";
import { Input } from "@/components/ui/input";
import { legalTerms, searchTerms } from "@/data/legalTerms";
import { Card, CardContent } from "@/components/ui/card";

export default function JargonTranslator() {
  const [query, setQuery] = useState("");

  const results = query.trim() ? searchTerms(query) : legalTerms.slice(0, 12);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search for a legal term (e.g., indemnification, arbitration)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-base"
      />
      <p className="text-sm text-muted-foreground">
        {query ? `${results.length} result${results.length !== 1 ? "s" : ""} found` : `Showing 12 of ${legalTerms.length} terms. Search to find more.`}
      </p>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {results.map((term) => (
          <Card key={term.term} className="border-l-4 border-l-accent">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-serif font-bold text-foreground">{term.term}</h3>
                <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded shrink-0">{term.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{term.definition}</p>
              {term.example && (
                <p className="text-xs italic text-muted-foreground/70 bg-secondary/50 p-2 rounded">{term.example}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
