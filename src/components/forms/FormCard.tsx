import { Link } from "react-router-dom";
import { FileText, ArrowRight, Clock, MapPin, PenLine, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabels, type LegalFormDef } from "@/data/forms";
import { useLocalizedPath } from "@/i18n/paths";

// Rough per-form time estimate based on step count.
function estimateMinutes(form: LegalFormDef): number {
  const steps = form.steps?.length ?? 3;
  return Math.max(3, Math.min(15, Math.round(steps * 1.2)));
}

// Forms wired with state-specific rules.
const STATE_AWARE = new Set([
  "eviction-notice",
  "lease-agreement",
  "power-of-attorney",
  "vehicle-bill-of-sale",
  "bill-of-sale",
  "residential-lease-agreement",
  "notice-to-vacate",
  "late-rent-notice",
  "security-deposit-receipt",
]);

export default function FormCard({ form }: { form: LegalFormDef }) {
  const lp = useLocalizedPath();
  const minutes = estimateMinutes(form);
  const stateAware = STATE_AWARE.has(form.slug);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg">
      {form.isFeatured && (
        <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground shadow">
          <Flame className="h-3 w-3" /> Popular
        </div>
      )}

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-lg bg-accent/10 p-2.5 text-accent">
            <FileText className="h-5 w-5" />
          </div>
          <div className="text-right">
            <div className="text-[11px] font-medium text-muted-foreground">
              Free draft · <span className="text-foreground">${form.price.toFixed(2)}</span> clean PDF
            </div>
            <Badge variant="secondary" className="mt-1 text-[10px]">
              {categoryLabels[form.category]}
            </Badge>
          </div>
        </div>

        <h3 className="font-serif text-lg font-bold leading-tight">{form.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{form.shortDescription}</p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          <li className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" /> ~{minutes} min
          </li>
          {stateAware && (
            <li className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> 50-state
            </li>
          )}
          <li className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground">
            <PenLine className="h-3 w-3" /> e-sign
          </li>
        </ul>

        <div className="mt-auto pt-3">
          <Button
            asChild
            size="sm"
            className="w-full justify-center gap-1.5 bg-accent text-accent-foreground hover:bg-gold-dark"
          >
            <Link
              to={lp(
                form.country
                  ? `/eu-forms/${form.country}/${form.slug}`
                  : form.region === "eu"
                  ? `/eu-forms/${form.slug}`
                  : `/forms/${form.slug}`,
              )}
            >
              Fill for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
