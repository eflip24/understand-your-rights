import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Clock, FileText, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "contract" | "consumer" | "employment" | "ai" | "generators";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "contract", label: "Contract" },
  { key: "consumer", label: "Consumer" },
  { key: "employment", label: "Employment" },
  { key: "ai", label: "AI" },
  { key: "generators", label: "Document Generators" },
];

const featuredTools = [
  {
    title: "Contract Reading Time Calculator",
    description: "Estimate how long it takes to read a contract.",
    category: "contract",
    label: "CONTRACT",
    href: "/tools/contract/reading-time-calculator",
    icon: Clock,
    iconClass: "bg-blue-50 text-blue-600",
    badgeClass: "border-teal/20 bg-teal-light text-teal-dark",
  },
  {
    title: "Contract Word Counter",
    description: "Get detailed word and character statistics.",
    category: "contract",
    label: "CONTRACT",
    href: "/tools/contract/word-counter",
    icon: Calculator,
    iconClass: "bg-blue-50 text-blue-600",
    badgeClass: "border-teal/20 bg-teal-light text-teal-dark",
  },
  {
    title: "Legal Jargon Translator",
    description: "Translate legal terms to plain English.",
    category: "contract",
    label: "CONTRACT",
    href: "/tools/contract/jargon-translator",
    icon: Search,
    iconClass: "bg-blue-50 text-blue-600",
    badgeClass: "border-teal/20 bg-teal-light text-teal-dark",
  },
  {
    title: "NDA Template Generator",
    description: "Generate a basic NDA from a form.",
    category: "generators",
    label: "DOCUMENT GENERATORS",
    href: "/tools/generators/nda-generator",
    icon: FileText,
    iconClass: "bg-accent/15 text-gold-dark",
    badgeClass: "border-accent/25 bg-accent/15 text-gold-dark",
  },
] as const;

export default function QuizAndPopularToolsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const visibleTools = useMemo(() => {
    if (activeFilter === "all") return featuredTools;
    return featuredTools.filter((tool) => tool.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="bg-gradient-to-b from-background via-secondary/20 to-background py-14 md:py-20">
      <div className="container">
        <Card className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border-border/70 bg-gradient-to-br from-card via-accent/5 to-secondary/70 p-7 text-center shadow-[0_24px_80px_-48px_hsl(var(--navy)/0.55)] md:p-11">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <Badge className="mb-5 gap-2 border-accent/25 bg-accent/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-dark hover:bg-accent/15">
            <Sparkles className="h-3.5 w-3.5" />
            60-Second Quiz
          </Badge>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-navy md:text-5xl">
            Not sure which legal tool you need?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Take our Legal Health Check and get personalized tool recommendations instantly — 100% free, no signup required.
          </p>
          <div className="mt-7 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-xl bg-navy px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:scale-[1.02] hover:bg-navy-dark sm:w-auto"
            >
              <Link to="/legal-health-check">
                Start Legal Health Check <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        <div className="mt-16 text-center md:mt-20">
          <h2 className="text-4xl font-bold tracking-tight text-navy md:text-5xl">Popular Tools</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
            The most used legal tools on our platform.
          </p>
        </div>

        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterKey)} className="mt-8">
          <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsList className="mx-auto flex h-auto w-max min-w-full justify-start gap-2 rounded-full bg-card/80 p-1.5 shadow-sm ring-1 ring-border/70 md:min-w-0 md:justify-center">
              {filters.map((filter) => (
                <TabsTrigger
                  key={filter.key}
                  value={filter.key}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 data-[state=active]:bg-teal data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-teal/20"
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} to={tool.href} className="group block h-full">
                <Card className="flex h-full flex-col rounded-2xl border-border/70 bg-card p-6 shadow-[0_18px_50px_-34px_hsl(var(--navy)/0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/35 hover:shadow-[0_28px_70px_-38px_hsl(var(--teal)/0.55)]">
                  <div className={cn("mb-5 flex h-14 w-14 items-center justify-center rounded-full", tool.iconClass)}>
                    <Icon className="h-7 w-7" strokeWidth={2.1} />
                  </div>
                  <Badge variant="outline" className={cn("mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold tracking-wide", tool.badgeClass)}>
                    {tool.label}
                  </Badge>
                  <h3 className="text-xl font-bold leading-snug text-navy">{tool.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                  <div className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal px-4 text-sm font-bold text-primary-foreground transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-teal-dark">
                    Use Tool <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}