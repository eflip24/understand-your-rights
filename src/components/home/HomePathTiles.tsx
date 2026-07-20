import { Link } from "react-router-dom";
import { Wrench, FileText, Scale, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";

const paths = [
  {
    icon: Wrench,
    title: "Free Legal Tools",
    desc: "100+ calculators, checkers, and translators — instant answers, no signup.",
    badge: "100+ tools",
    href: "/tools",
  },
  {
    icon: FileText,
    title: "Fillable Legal Forms",
    desc: "W-9, NDA, Lease, POA and more. Autosave, e-sign, and clean PDF output.",
    badge: "23 forms + packs",
    href: "/forms",
  },
  {
    icon: Scale,
    title: "Find a Lawyer",
    desc: "Browse attorneys by state and practice area — free consultations available.",
    badge: "50-state coverage",
    href: "/lawyer-near-me",
  },
];

export default function HomePathTiles() {
  const lp = useLocalizedPath();
  return (
    <section className="container py-12 md:py-16">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Where would you like to start?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Three ways in — pick the one that matches what you need right now.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {paths.map((p) => (
          <Link key={p.href} to={lp(p.href)} className="group">
            <Card className="h-full p-7 border-2 hover:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <p.icon className="h-7 w-7 text-accent" />
                </div>
                <div className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {p.badge}
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground mb-4">{p.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Get started <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
