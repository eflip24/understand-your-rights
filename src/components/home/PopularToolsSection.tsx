import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getToolBySlug, type Tool, type ToolCategory } from "@/data/tools";

const FEATURED_SLUGS = [
  "reading-time-calculator",
  "word-counter",
  "jargon-translator",
  "nda-generator",
  "cancellation-deadline",
  "late-fee-calculator",
  "contract-red-flag-scanner",
  "terms-summarizer",
];

type FilterKey = "all" | ToolCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "contract", label: "Contract" },
  { key: "consumer", label: "Consumer" },
  { key: "employment", label: "Employment" },
  { key: "ai", label: "AI" },
  { key: "generators", label: "Document Generators" },
];

const CATEGORY_STYLES: Record<ToolCategory, { tile: string; icon: string; badge: string }> = {
  contract: { tile: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-50 text-blue-700" },
  consumer: { tile: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  employment: { tile: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-50 text-purple-700" },
  generators: { tile: "bg-amber-50", icon: "text-amber-600", badge: "bg-amber-50 text-amber-700" },
  ai: { tile: "bg-rose-50", icon: "text-rose-600", badge: "bg-rose-50 text-rose-700" },
  realestate: { tile: "bg-teal-light", icon: "text-teal-dark", badge: "bg-teal-light text-teal-dark" },
  business: { tile: "bg-indigo-50", icon: "text-indigo-600", badge: "bg-indigo-50 text-indigo-700" },
  finance: { tile: "bg-cyan-50", icon: "text-cyan-700", badge: "bg-cyan-50 text-cyan-700" },
  energy: { tile: "bg-lime-50", icon: "text-lime-700", badge: "bg-lime-50 text-lime-700" },
};

export default function PopularToolsSection() {
  const [active, setActive] = useState<FilterKey>("all");

  const featured = useMemo(
    () => FEATURED_SLUGS.map((s) => getToolBySlug(s)).filter((t): t is Tool => Boolean(t)),
    []
  );

  const visible = useMemo(() => {
    if (active === "all") return featured;
    const inCat = featured.filter((t) => t.category === active);
    if (inCat.length >= 8) return inCat.slice(0, 8);
    const fillers = featured.filter((t) => t.category !== active);
    return [...inCat, ...fillers].slice(0, 8);
  }, [active, featured]);

  return (
    <section className="bg-gradient-to-b from-background to-secondary/40 py-20 md:py-24">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-3 tracking-tight">
            Popular Tools
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            The most used legal tools on our platform.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none max-w-full px-1" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  aria-pressed={isActive}
                  className={[
                    "shrink-0 snap-start rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-teal text-white border-teal shadow-sm"
                      : "bg-white text-navy border-border/60 hover:border-teal/40 hover:text-teal-dark",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div key={active} className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in">
          {visible.map((tool) => {
            const styles = CATEGORY_STYLES[tool.category];
            const ctaLabel = tool.category === "ai" ? "Try for Free" : "Use Tool";
            return (
              <Link
                key={tool.id}
                to={`/tools/${tool.category}/${tool.slug}`}
                className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-5 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal/30 transition-all duration-300"
              >
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${styles.tile}`}>
                  <tool.icon className={`h-7 w-7 ${styles.icon}`} strokeWidth={2} />
                </div>

                <span className={`mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles.badge}`}>
                  {tool.categoryLabel.replace(" Tools", "").replace(" Analysis", "")}
                </span>

                <h3 className="font-serif text-lg font-bold text-navy leading-snug mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">
                  {tool.shortDescription}
                </p>

                <div className="mt-auto pt-4 border-t border-border/60">
                  <div className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-teal-dark transition-colors">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Browse all CTA */}
        <div className="text-center mt-12">
          <Link to="/tools">
            <Button
              size="lg"
              className="rounded-xl bg-navy text-white hover:bg-navy-dark px-8 h-12 text-base font-semibold gap-2 shadow-md"
            >
              Browse All Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">Explore 100+ free legal tools</p>
        </div>
      </div>
    </section>
  );
}
