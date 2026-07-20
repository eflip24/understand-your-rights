import { Search, ShieldCheck, Sparkles, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocalizedPath } from "@/i18n/paths";
import { Link } from "react-router-dom";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  totalAreas: number;
}

const POPULAR: { slug: string; label: string }[] = [
  { slug: "personal-injury", label: "Personal Injury" },
  { slug: "car-accident", label: "Car Accident" },
  { slug: "workers-compensation", label: "Workers' Comp" },
  { slug: "family-law", label: "Family Law" },
  { slug: "bankruptcy", label: "Bankruptcy" },
  { slug: "employment", label: "Employment" },
];

export default function LawyerDirectoryHero({ query, onQueryChange, totalAreas }: Props) {
  const lp = useLocalizedPath();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-primary/[0.06] via-accent/[0.04] to-transparent px-6 py-10 md:px-10 md:py-14">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />

      <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {totalAreas} practice areas · 50-state coverage
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Find the right lawyer,{" "}
            <span className="relative inline-block text-accent">
              fast
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent/40" aria-hidden />
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Free attorney directory. Browse by practice area or your situation — most lawyers
            here offer a free first consultation with no obligation.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <ShieldCheck className="h-4 w-4 text-accent" /> Attorney-verified listings
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <Sparkles className="h-4 w-4 text-accent" /> Free consultations
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 shadow-sm ring-1 ring-border">
              <Scale className="h-4 w-4 text-accent" /> No referral fees
            </li>
          </ul>
        </div>

        <div className="relative">
          <label htmlFor="lawyer-hero-search" className="sr-only">
            Search practice areas
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lawyer-hero-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search: injury, divorce, bankruptcy…"
              className="h-14 rounded-xl border-accent/30 bg-background pl-12 pr-4 text-base shadow-lg shadow-primary/5 focus-visible:ring-accent"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Most searched
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <Link
                  key={p.slug}
                  to={lp(`/lawyer-near-me/${p.slug}`)}
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
