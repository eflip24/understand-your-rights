import { Link } from "react-router-dom";
import { BookOpen, Scale, AlertTriangle, ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";
import { getTermDepth } from "@/data/termDepth";

/**
 * Depth layer for glossary term pages: statutory grounding, elements,
 * a worked example, a state comparison table and disambiguation.
 */
export default function TermDepthBlock({ slug, term }: { slug: string; term: string }) {
  const lp = useLocalizedPath();
  const depth = getTermDepth(slug);
  if (!depth) return null;

  return (
    <div className="space-y-8 mb-8">
      <section>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Scale className="h-5 w-5 text-accent" /> Where {term} comes from in law
        </h2>
        <p className="text-muted-foreground leading-relaxed">{depth.legalBasis}</p>
      </section>

      {depth.elements && (
        <section>
          <h2 className="text-2xl font-bold mb-3">The elements a court actually applies</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {depth.elements.map((el) => (
              <div key={el.label} className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-1">{el.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{el.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" /> Worked example
        </h2>
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Scenario</p>
            <p className="text-sm text-foreground leading-relaxed">{depth.workedExample.scenario}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Analysis</p>
            <p className="text-sm text-foreground leading-relaxed">{depth.workedExample.analysis}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Outcome</p>
            <p className="text-sm text-foreground leading-relaxed">{depth.workedExample.outcome}</p>
          </div>
        </div>
      </section>

      {depth.comparison && (
        <section>
          <h2 className="text-2xl font-bold mb-3">{depth.comparison.title}</h2>
          <div className="rounded-lg border bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">{depth.comparison.columns[0]}</th>
                  <th className="text-left p-3 font-semibold">{depth.comparison.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {depth.comparison.rows.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-muted/20" : ""}>
                    <td className="p-3 font-medium text-foreground align-top">{row[0]}</td>
                    <td className="p-3 text-muted-foreground">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {depth.confusedWith && (
        <section>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" /> Commonly confused with
          </h2>
          <ul className="space-y-2">
            {depth.confusedWith.map((c) => (
              <li key={c.term} className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  {c.slug ? (
                    <Link to={lp(`/legal-terms/${c.slug}`)} className="text-accent hover:underline">{c.term}</Link>
                  ) : (
                    c.term
                  )}
                </strong>{" "}
                — {c.difference}
              </li>
            ))}
          </ul>
        </section>
      )}

      {depth.relatedLinks && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Put it to work</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {depth.relatedLinks.map((l) => (
              <Link
                key={l.href}
                to={lp(l.href)}
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <ArrowRight className="h-3.5 w-3.5" /> {l.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
