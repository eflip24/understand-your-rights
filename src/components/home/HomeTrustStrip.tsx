import { Link } from "react-router-dom";
import { ShieldCheck, RefreshCw, UserCheck, Globe2 } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

const items = [
  { icon: UserCheck, title: "Attorney-reviewed", desc: "Human-edited against primary sources." },
  { icon: RefreshCw, title: "Latest revisions", desc: "IRS, USCIS & state updates tracked." },
  { icon: ShieldCheck, title: "No signup required", desc: "Free tools run in your browser." },
  { icon: Globe2, title: "50-state + EU coverage", desc: "US + DE, FR, ES, IT, PT guides." },
];

export default function HomeTrustStrip() {
  const lp = useLocalizedPath();
  return (
    <section className="container py-12">
      <div className="rounded-2xl border bg-background p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <it.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{it.title}</p>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 pt-6 border-t text-sm text-muted-foreground text-center">
          LegallySpoken is not a law firm and nothing here is legal advice. See our{" "}
          <Link to={lp("/editorial-standards")} className="text-accent hover:underline font-medium">
            editorial standards
          </Link>{" "}
          and{" "}
          <Link to={lp("/about")} className="text-accent hover:underline font-medium">
            about page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
