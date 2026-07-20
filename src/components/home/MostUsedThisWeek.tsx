import { Link } from "react-router-dom";
import { FileText, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/i18n/paths";

const topForms = [
  { title: "Form W-9 (Rev. March 2024)", desc: "Request for Taxpayer ID", slug: "w-9" },
  { title: "Simple NDA", desc: "Mutual non-disclosure agreement", slug: "nda-simple" },
  { title: "Residential Lease Agreement", desc: "Standard rental contract", slug: "residential-lease-agreement" },
  { title: "Financial Power of Attorney", desc: "Delegate financial decisions", slug: "financial-power-of-attorney" },
];

const topTools = [
  { title: "Alimony Calculator", desc: "State-specific spousal support estimates", slug: "alimony-calculator" },
  { title: "Child Support Calculator", desc: "Guideline support amounts", slug: "child-support-calculator" },
  { title: "Settlement Estimator", desc: "Personal injury settlement range", slug: "settlement-estimator" },
  { title: "Legal Jargon Translator", desc: "Plain-English legal terms", slug: "jargon-translator" },
];

export default function MostUsedThisWeek() {
  const lp = useLocalizedPath();
  return (
    <section className="container py-14 md:py-16">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Most used this week
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Jump straight to what people need
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Forms column */}
        <Card className="p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold">Top Forms</h3>
            </div>
            <Link to={lp("/forms")} className="text-sm text-accent font-semibold hover:underline">
              All forms →
            </Link>
          </div>
          <ul className="divide-y">
            {topForms.map((f) => (
              <li key={f.slug}>
                <Link
                  to={lp(`/forms/${f.slug}`)}
                  className="flex items-center justify-between py-3 group hover:bg-secondary/40 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Tools column */}
        <Card className="p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Wrench className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold">Top Tools</h3>
            </div>
            <Link to={lp("/tools")} className="text-sm text-accent font-semibold hover:underline">
              All tools →
            </Link>
          </div>
          <ul className="divide-y">
            {topTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  to={lp(`/tools/${tool.slug}`)}
                  className="flex items-center justify-between py-3 group hover:bg-secondary/40 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{tool.title}</p>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Legal Health Check CTA */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-6 md:p-8 text-primary-foreground flex flex-col md:flex-row items-center gap-6 justify-between">
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-1">Not sure where to start?</h3>
          <p className="text-primary-foreground/80">Take the 60-second Legal Health Check — we'll recommend the right tools.</p>
        </div>
        <Link to={lp("/legal-health-check")}>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark gap-2 shrink-0">
            Start the check <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
