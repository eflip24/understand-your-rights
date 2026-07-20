import { Search, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocalizedPath } from "@/i18n/paths";
import { Link } from "react-router-dom";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  totalTools: number;
}

const POPULAR: { path: string; label: string }[] = [
  { path: "/tools/ai/legal-jargon-translator", label: "Jargon Translator" },
  { path: "/tools/contract/contract-reading-time", label: "Reading Time" },
  { path: "/tools/generators/nda-generator", label: "NDA Generator" },
  { path: "/tools/employment/non-compete-checker", label: "Non-Compete Checker" },
  { path: "/tools/consumer/late-fee-calculator", label: "Late Fee" },
  { path: "/tools/family/alimony-calculator", label: "Alimony" },
];

export default function ToolsHero({ query, onQueryChange, totalTools }: Props) {
  const lp = useLocalizedPath();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-primary/[0.06] via-accent/[0.04] to-transparent px-6 py-10 md:px-10 md:py-14">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />

      <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {totalTools}+ tools · always free · no signup
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Free legal calculators &{" "}
            <span className="relative inline-block text-accent">
              instant answers
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent/40" aria-hidden />
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Translate legalese, check deadlines, estimate settlements, and generate documents —
            plain-English results in seconds. Nothing to install, nothing to sign up for.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <ShieldCheck className="h-4 w-4 text-accent" /> Attorney-reviewed content
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <Wand2 className="h-4 w-4 text-accent" /> AI-powered analysis
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <Sparkles className="h-4 w-4 text-accent" /> Save results as PDF
            </li>
          </ul>
        </div>

        <div className="relative">
          <label htmlFor="tools-hero-search" className="sr-only">
            Search tools
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="tools-hero-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search: alimony, NDA, late fee, non-compete…"
              className="h-14 rounded-xl border-accent/30 bg-background pl-12 pr-4 text-base shadow-lg shadow-primary/5 focus-visible:ring-accent"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Popular right now
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <Link
                  key={p.path}
                  to={lp(p.path)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 shadow-sm transition hover:border-accent/50 hover:text-accent"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
