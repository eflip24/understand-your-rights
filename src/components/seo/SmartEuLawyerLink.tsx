import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { buildEuPath } from "@/lib/eu/resolveRoute";
import type { EuCountryCode } from "@/data/eu/countries";
import type { EuAreaCanonicalSlug } from "@/data/eu/practiceAreas";

interface SmartEuLawyerLinkProps {
  country: EuCountryCode;
  area?: EuAreaCanonicalSlug;
  city?: string;
  label?: string;
}

/**
 * Phase B1 scaffold — cross-link card pointing to an EU lawyer directory page.
 * No usages wired in B1; introduced in B3+ for in-content cross-linking.
 */
export default function SmartEuLawyerLink({ country, area, city, label }: SmartEuLawyerLinkProps) {
  const locale = useLocaleFromUrl();
  const href = buildEuPath(locale, { country, area, city });

  return (
    <Link to={href}>
      <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 hover:shadow-md transition-all group">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{label ?? "Find a lawyer in your area"}</p>
            <p className="text-sm text-muted-foreground">View directory</p>
          </div>
          <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
        </CardContent>
      </Card>
    </Link>
  );
}
