import { useState, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileCheck2, Sparkles, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { tools, categories, searchTools, type ToolCategory } from "@/data/tools";
import Head from "@/components/seo/Head";
import { useLocalizedTools } from "@/i18n/useLocalizedTools";
import { useLocalizedPath } from "@/i18n/paths";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsBySituationTiles from "@/components/tools/ToolsBySituationTiles";
import ToolsCategoryTabs from "@/components/tools/ToolsCategoryTabs";

type CatKey = ToolCategory | "all";

export default function ToolsDirectory() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CatKey>("all");
  const { toolName, toolShortDescription, toolCategoryLabel, catLabel } = useLocalizedTools();
  const lp = useLocalizedPath();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    let result = query ? searchTools(query) : tools;
    if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory);
    }
    return result;
  }, [query, activeCategory]);

  const counts = useMemo(() => {
    const base = query ? searchTools(query) : tools;
    const c: Record<string, number> = { all: base.length };
    for (const cat of categories) c[cat.id] = 0;
    for (const t of base) c[t.category] = (c[t.category] ?? 0) + 1;
    return c;
  }, [query]);

  const handleSituationSelect = (c: ToolCategory) => {
    setActiveCategory(c);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const labelForCat = (id: ToolCategory) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? catLabel(cat) : id;
  };

  return (
    <div className="container py-10">
      <Head
        title="All Legal Tools — Free Calculators & Generators | LegallySpoken"
        description="Browse 70+ free legal tools including contract analyzers, document generators, financial calculators, and more. No signup required."
      />

      <ToolsHero query={query} onQueryChange={setQuery} totalTools={tools.length} />

      <ToolsBySituationTiles onSelectCategory={handleSituationSelect} />

      <div ref={resultsRef} className="mt-12">
        <ToolsCategoryTabs
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
          labelFor={labelForCat}
        />

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="mb-1 text-lg font-semibold">No tools match that search</p>
            <p className="text-sm text-muted-foreground">
              Try a different keyword, or{" "}
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="text-accent underline-offset-2 hover:underline"
              >
                reset filters
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <Link
                key={tool.id}
                to={lp(`/tools/${tool.category}/${tool.slug}`)}
                className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2.5 text-accent ring-1 ring-accent/20 transition-all group-hover:bg-accent/15 group-hover:ring-accent/40">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {toolCategoryLabel(tool)}
                      </span>
                      {tool.popular && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="mt-0.5 font-serif text-base font-bold leading-tight text-foreground">
                      {toolName(tool)}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {toolShortDescription(tool)}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Free · no signup
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground/70 transition-colors group-hover:text-accent">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Trust strip */}
      <section className="mt-14 grid gap-4 rounded-2xl border border-border bg-muted/20 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: ShieldCheck, title: "Always free", desc: "Every tool. No paywalls, no trials." },
          { Icon: Sparkles, title: "Plain-English results", desc: "Written for humans, not lawyers." },
          { Icon: Scale, title: "Attorney-reviewed", desc: "Content reviewed by U.S. attorneys." },
          { Icon: FileCheck2, title: "Save as PDF", desc: "Export results where supported." },
        ].map(({ Icon, title, desc }) => (
          <Card key={title} className="flex items-start gap-3 border-0 bg-background/60 p-4 shadow-none">
            <div className="rounded-lg bg-accent/10 p-2 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
