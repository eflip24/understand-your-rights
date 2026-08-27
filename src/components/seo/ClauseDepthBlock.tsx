import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, FileText, Scale, ArrowRight } from "lucide-react";
import { getClauseDepth } from "@/data/clauseDepth";
import { getContractTypeBySlug } from "@/data/contractTypes";

interface ClauseDepthBlockProps {
  slug: string;
  title: string;
}

/**
 * Negotiation playbook, three drafted variants, state-by-state enforceability
 * and related contract types for a single clause page.
 */
export default function ClauseDepthBlock({ slug, title }: ClauseDepthBlockProps) {
  const depth = getClauseDepth(slug, title);
  const contractTypes = (depth.contractTypeSlugs ?? [])
    .map((s) => getContractTypeBySlug(s))
    .filter(Boolean);

  return (
    <>
      {/* Negotiation playbook */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Handshake className="h-5 w-5 text-accent" /> How to negotiate this clause
        </h2>
        <p className="text-muted-foreground mb-4">
          What to ask for, and where these negotiations usually land when the other side pushes back.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {depth.negotiation.map((play, i) => (
            <Card key={i} className="border-accent/20">
              <CardContent className="p-5 space-y-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">Ask for</span>
                  <p className="text-sm text-foreground mt-1">{play.ask}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Realistic fallback
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{play.fallback}</p>
                </div>
                {play.rarelyAccepted && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-destructive">
                      Rarely accepted
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">{play.rarelyAccepted}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alternative wording */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" /> Three ways to write it
        </h2>
        <p className="text-muted-foreground mb-4">
          The same clause, drafted to favour each side. Compare your contract's wording against these to see
          where you actually stand.
        </p>
        <div className="space-y-4">
          {depth.alternatives.map((alt, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={alt.stance === "Balanced" ? "default" : "secondary"}>{alt.stance}</Badge>
                  <span className="text-sm text-muted-foreground">Favours: {alt.favors}</span>
                </div>
                <p className="text-sm italic text-muted-foreground leading-relaxed border-l-4 border-accent/40 pl-4">
                  {alt.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* State variation */}
      {depth.stateVariation && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Scale className="h-5 w-5 text-accent" /> {depth.stateVariation.heading}
          </h2>
          <p className="text-muted-foreground mb-4">{depth.stateVariation.note}</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="text-left p-3 font-semibold">Jurisdiction</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">What the law says</th>
                </tr>
              </thead>
              <tbody>
                {depth.stateVariation.rows.map((row) => (
                  <tr key={row.state} className="border-t align-top">
                    <td className="p-3 font-medium whitespace-nowrap">{row.state}</td>
                    <td className="p-3 whitespace-nowrap">
                      <Badge variant="secondary">{row.status}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related contract types */}
      {contractTypes.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contracts that contain this clause</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {contractTypes.map((ct) => (
              <Link
                key={ct!.slug}
                to={`/contract-types/${ct!.slug}`}
                className="group flex items-center justify-between rounded-lg border p-4 hover:border-accent transition-colors"
              >
                <span className="font-medium">{ct!.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
