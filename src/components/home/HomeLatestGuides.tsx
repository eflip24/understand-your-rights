import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";

const guides = [
  {
    tag: "New",
    title: "Health insurance claim denied",
    desc: "Internal appeals, ERISA deadlines, medical-necessity rebuttals and external review.",
    href: "/health-insurance-claim-denied",
  },
  {
    tag: "New",
    title: "Data breach compensation",
    desc: "What US class settlements actually pay, and how GDPR Article 82 claims work in the EU.",
    href: "/data-breach-claim-compensation",
  },
  {
    tag: "New",
    title: "English-speaking lawyer in Spain",
    desc: "Fees, the five checks before you hire, key deadlines, and summaries in Danish, Swedish, Norwegian and Dutch.",
    href: "/english-speaking-lawyer-in-spain",
  },
  {
    tag: "Article",
    title: "How to dispute an insurance claim denial",
    desc: "The step-by-step appeal route, deadlines and the evidence insurers find hardest to ignore.",
    href: "/blog/how-to-dispute-an-insurance-claim-denial",
  },
  {
    tag: "Article",
    title: "How to negotiate a severance package",
    desc: "What is negotiable, typical weeks-per-year offers, and the release terms to check before signing.",
    href: "/blog/how-to-negotiate-a-severance-package",
  },
  {
    tag: "Article",
    title: "Are deepfakes illegal?",
    desc: "The federal Take It Down Act and state deepfake laws, explained in plain English.",
    href: "/blog/are-deepfakes-illegal-take-it-down-act-state-laws",
  },
];

export default function HomeLatestGuides() {
  const lp = useLocalizedPath();
  return (
    <section className="container py-14 md:py-16">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Latest in-depth guides
        </h2>
        <p className="text-muted-foreground">
          Long-form, source-checked explainers for the situations that cost people the most money.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.href} to={lp(g.href)} className="group">
            <Card className="h-full p-6 hover:shadow-lg hover:border-accent/40 transition-all">
              <span className="inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent mb-3">
                {g.tag}
              </span>
              <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                {g.title}
              </h3>
              <p className="text-sm text-muted-foreground">{g.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to={lp("/guides")}>
          <Button variant="outline" className="gap-2">
            Browse all guides <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
