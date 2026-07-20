import { Link } from "react-router-dom";
import {
  Car,
  HardHat,
  ShieldAlert,
  HeartHandshake,
  Wallet,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

const SITUATIONS: {
  icon: LucideIcon;
  title: string;
  desc: string;
  slug: string;
}[] = [
  { icon: Car, title: "I was in an accident", desc: "Car, truck, or motorcycle crash", slug: "car-accident" },
  { icon: HardHat, title: "I was hurt on the job", desc: "Workplace injury or denied benefits", slug: "workers-compensation" },
  { icon: ShieldAlert, title: "My insurance claim was denied", desc: "Bad faith, coverage disputes", slug: "insurance-dispute" },
  { icon: HeartHandshake, title: "I'm getting divorced", desc: "Custody, support, property division", slug: "family-law" },
  { icon: Wallet, title: "I'm drowning in debt", desc: "Bankruptcy, creditor lawsuits", slug: "bankruptcy" },
  { icon: Briefcase, title: "I was fired unfairly", desc: "Wrongful termination, discrimination", slug: "employment" },
];

export default function LawyerSituationTiles() {
  const lp = useLocalizedPath();
  return (
    <section aria-labelledby="lawyer-situation-heading" className="mt-10">
      <div className="mb-5">
        <h2 id="lawyer-situation-heading" className="font-serif text-2xl font-bold md:text-3xl">
          What happened?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick the situation that fits — we'll match you to the right kind of lawyer.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              to={lp(`/lawyer-near-me/${s.slug}`)}
              className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/70 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold leading-tight">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:right-3 group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
