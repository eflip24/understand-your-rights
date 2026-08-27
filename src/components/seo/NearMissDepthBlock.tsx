import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";
import type { NearMissDepth } from "@/data/nearMissDepth";

interface Props {
  depth: NearMissDepth;
  stateName: string;
}

export default function NearMissDepthBlock({ depth, stateName }: Props) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-accent" />
        <h2 className="text-2xl font-bold">{stateName} filing detail, deadlines and venues</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6">{depth.summary}</p>

      <div className="space-y-6">
        {depth.sections.map((section, i) => (
          <Card key={i} className="border-accent/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{section.heading}</h3>
              {section.intro && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{section.intro}</p>
              )}

              {section.facts && (
                <dl className="grid gap-3 sm:grid-cols-2 mb-4">
                  {section.facts.map((f, j) => (
                    <div key={j} className="rounded-md border bg-muted/30 p-3">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="text-sm text-foreground mt-1">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.table && (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        {section.table.columns.map((c) => (
                          <th key={c} className="text-left font-semibold py-2 pr-4 whitespace-nowrap">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, r) => (
                        <tr key={r} className="border-b last:border-0">
                          {row.map((cell, c) => (
                            <td key={c} className="py-2 pr-4 text-muted-foreground align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.bullets && (
                <ul className="space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sources</span>
        {depth.sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
            <Badge variant="outline" className="gap-1 hover:bg-accent/10 transition-colors">
              {s.label}
              <ExternalLink className="h-3 w-3" />
            </Badge>
          </a>
        ))}
      </div>
    </section>
  );
}
