import { Link } from "react-router-dom";
import { ChevronRight, Scale, MapPin } from "lucide-react";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { statuteTopics, allStateSlugs, allStateNames } from "@/data/statutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StatuteLibraryDirectory() {
  const url = "https://legallyspoken.com/laws";
  return (
    <div className="container py-10 max-w-5xl">
      <Head
        title="Statute Library — State-by-State Plain-English Legal Guides | LegallySpoken"
        description="Browse plain-English summaries of state laws on security deposits, eviction notice periods, minimum wage, and more — for all 50 states."
      />
      <JsonLdGraph
        schemas={[
          breadcrumbSchema([
            { name: "Home", url: "https://legallyspoken.com/" },
            { name: "Statute Library", url },
          ]),
          itemListSchema(
            "Statute Library Topics",
            statuteTopics.map((t) => ({ url: `${url}/${allStateSlugs[0]}/${t.slug}`, name: t.shortLabel }))
          ),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Statute Library</span>
      </nav>

      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">All 50 States</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Statute Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Plain-English summaries of state laws across the U.S. Pick a topic and a state to see the rules that apply to you.
        </p>
      </div>

      <div className="space-y-10">
        {statuteTopics.map((topic) => (
          <section key={topic.slug}>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">{topic.shortLabel}</h2>
              <Badge variant="outline">{topic.category}</Badge>
            </div>
            <p className="text-muted-foreground mb-4 max-w-3xl">{topic.intro}</p>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" /> Choose your state
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {allStateSlugs.map((slug) => (
                    <Link
                      key={slug}
                      to={`/laws/${slug}/${topic.slug}`}
                      className="text-sm px-3 py-1.5 rounded border border-border hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                      {allStateNames[slug]}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-12 border-t pt-6">
        <strong>Disclaimer:</strong> Information on this page is general and may not reflect the most recent statutory changes. Always confirm with the official state statute or a licensed attorney.
      </p>
    </div>
  );
}
