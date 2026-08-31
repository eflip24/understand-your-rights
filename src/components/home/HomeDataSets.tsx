import { Link } from "react-router-dom";
import { CalendarClock, Landmark, Gavel, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";

const datasets = [
  {
    icon: CalendarClock,
    title: "Settlement & filing deadlines by state",
    desc: "Every US jurisdiction's statute of limitations for 13 claim types, in one sortable table. Free CSV download.",
    href: "/data/settlement-deadlines",
    cta: "Open the deadline index",
  },
  {
    icon: Landmark,
    title: "Court filing fees & small-claims limits",
    desc: "What it costs to file in each state, the small-claims ceiling, and where fee waivers apply. Free CSV download.",
    href: "/data/court-filing-fees",
    cta: "Open the fee index",
  },
  {
    icon: Gavel,
    title: "Court information hub",
    desc: "State and city court pages with filing routes, local rules and where your case actually gets heard.",
    href: "/courts",
    cta: "Browse courts",
  },
];

export default function HomeDataSets() {
  const lp = useLocalizedPath();
  return (
    <section className="bg-secondary/40 border-y py-14 md:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Free legal data sets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Original, source-checked research covering all 51 US jurisdictions — free to read,
            download and cite.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {datasets.map((d) => (
            <Link key={d.href} to={lp(d.href)} className="group">
              <Card className="h-full p-6 hover:shadow-lg hover:border-accent/40 transition-all">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <d.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{d.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {d.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
