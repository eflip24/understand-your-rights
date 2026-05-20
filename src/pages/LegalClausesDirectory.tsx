import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { legalClauses, getLegalClauseCategories } from "@/data/legalClauses";
import Head from "@/components/seo/Head";

export default function LegalClausesDirectory() {
  const { t } = useTranslation(["clauses", "common"]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getLegalClauseCategories();

  const localized = useMemo(
    () =>
      legalClauses.map((c) => ({
        ...c,
        title: t(`clauses:${c.slug}.title`, { defaultValue: c.title }) as string,
        explanation: t(`clauses:${c.slug}.explanation`, { defaultValue: c.explanation }) as string,
      })),
    [t],
  );

  const filtered = useMemo(() => {
    let result = localized;
    if (selectedCategory) result = result.filter((c) => c.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.explanation.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => a.title.localeCompare(b.title));
  }, [search, selectedCategory, localized]);

  return (
    <div className="container py-8 max-w-5xl">
      <Head
        title="Legal Clauses Guide — Common Contract Clauses Explained | LegallySpoken"
        description={`Explore ${legalClauses.length} common contract clauses with examples, enforceability notes, and red flags. Understand what each clause means before you sign.`}
        titleKey="common:legalClausesDirectory.metaTitle"
        descriptionKey="common:legalClausesDirectory.metaDescription"
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("common:legalClausesDirectory.title", { defaultValue: "Legal Clauses Guide" })}</h1>
        <p className="text-muted-foreground text-lg">
          {t("common:legalClausesDirectory.subtitle", { defaultValue: "{{count}} common contract clauses explained with examples and red flags.", count: legalClauses.length }) as string}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("common:legalClausesDirectory.searchPlaceholder", { defaultValue: "Search clauses..." }) as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant={selectedCategory === null ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
          {t("common:legalClausesDirectory.all", { defaultValue: "All" })}
        </Badge>
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
                  {t("common:legalClausesDirectory.stats", {
                    defaultValue: "{{examples}} examples • {{flags}} red flags",
                    examples: clause.exampleClauses.length,
                    flags: clause.redFlags.length,
                  }) as string}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          {t("common:legalClausesDirectory.empty", { defaultValue: "No clauses found matching your search." })}
        </p>
      )}
    </div>
  );
}
