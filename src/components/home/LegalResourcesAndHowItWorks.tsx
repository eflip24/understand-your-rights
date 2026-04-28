import { Link } from "react-router-dom";
import { BookOpen, Paperclip, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const resources = [
  {
    title: "Legal Terms Dictionary",
    description: "50+ legal terms explained in plain English with example clauses.",
    badge: "50+ TERMS",
    href: "/legal-terms",
    icon: BookOpen,
  },
  {
    title: "Contract Clauses Guide",
    description: "Understand common clauses, enforceability, and red flags.",
    badge: "20+ CLAUSES",
    href: "/legal-clauses",
    icon: Paperclip,
  },
  {
    title: "Contract Types Explained",
    description: "Different contract types, key clauses, and common risks.",
    badge: "20+ TYPES",
    href: "/contract-types",
    icon: Scale,
  },
] as const;

const steps = [
  {
    number: "1",
    title: "Choose a Tool",
    description: "Browse our collection of 100+ free legal tools.",
  },
  {
    number: "2",
    title: "Enter Your Details",
    description: "Paste text, fill in numbers, or answer questions.",
  },
  {
    number: "3",
    title: "Get Results",
    description: "Instant analysis, calculations, or generated documents.",
  },
] as const;

export default function LegalResourcesAndHowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-secondary/40 py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-navy md:text-5xl">Legal Resources</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Browse our library of plain-English legal guides and references.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <Link key={resource.href} to={resource.href} className="group block h-full">
                <Card className="h-full rounded-2xl border-border/70 bg-card p-7 shadow-[0_18px_55px_-38px_hsl(var(--navy)/0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-teal/30 hover:shadow-[0_28px_80px_-44px_hsl(var(--navy)/0.55)]">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-gold-dark ring-1 ring-accent/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/25">
                      <Icon className="h-7 w-7" strokeWidth={2.1} />
                    </div>
                    <Badge className="rounded-full border-accent/25 bg-accent/15 px-3 py-1 text-[10px] font-bold tracking-wide text-gold-dark shadow-none hover:bg-accent/15">
                      {resource.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-teal-dark">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{resource.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mx-auto my-16 h-px max-w-4xl bg-gradient-to-r from-transparent via-accent/45 to-transparent md:my-20" />

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-navy md:text-5xl">How It Works</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">Get answers in three simple steps.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground shadow-lg shadow-accent/25 ring-8 ring-accent/10">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-bold text-navy">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}