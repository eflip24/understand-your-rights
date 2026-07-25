import { Link } from "react-router-dom";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema } from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";
import { keywordClusters } from "@/data/keywordClusters";

const SITE = "https://legallyspoken.com";

export default function KeywordClusterHub() {
  const lp = useLocalizedPath();
  const byCategory = keywordClusters.reduce<Record<string, typeof keywordClusters>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <div className="container py-8 max-w-5xl">
      <Head
        title="Legal Answers — Quick Guides + Free Calculators"
        description="Straight answers to the legal questions people search most: settlements, bankruptcy, alimony, evictions, workers' comp. Each answer links to a free tool."
      />
      <JsonLdGraph
        schemas={[
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Answers", url: `${SITE}/answers` },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Answers</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Legal answers, straight to the point</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          The exact answers to the most-searched legal questions — with the calculator or free form
          that actually solves the problem.
        </p>
      </header>

      {Object.entries(byCategory).map(([cat, items]) => (
        <section key={cat} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{cat}</Badge>
            <span className="text-sm text-muted-foreground">{items.length} answers</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((c) => (
              <Link key={c.slug} to={lp(`/answers/${c.slug}`)}>
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
                  <CardContent className="p-5">
                    <p className="font-semibold text-base leading-snug mb-2 group-hover:text-accent transition-colors">
                      {c.title}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {c.metaDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                      Read answer <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
