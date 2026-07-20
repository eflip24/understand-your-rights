import { Link } from "react-router-dom";
import {
  Briefcase,
  Home,
  Building2,
  HeartHandshake,
  Wallet,
  Car,
  ArrowRight,
} from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

const EVENTS = [
  {
    icon: Briefcase,
    title: "Hiring an employee",
    desc: "W-4, I-9, offer letter, NDA — all-in-one",
    to: "/forms/new-hire-pack",
  },
  {
    icon: Home,
    title: "Renting out property",
    desc: "Lease, deposit receipt, move-in checklist",
    to: "/forms/landlord-starter-pack",
  },
  {
    icon: Building2,
    title: "Starting a business",
    desc: "LLC agreement, contractor, NDA, bill of sale",
    to: "/forms/small-business-basics-pack",
  },
  {
    icon: HeartHandshake,
    title: "Life &amp; family planning",
    desc: "POA, living will, healthcare directive",
    to: "/forms/personal-planning-pack",
  },
  {
    icon: Wallet,
    title: "Getting paid what you're owed",
    desc: "Demand letter + promissory note",
    to: "/forms/demand-letter",
  },
  {
    icon: Car,
    title: "Buying or selling something",
    desc: "Vehicle or general bill of sale",
    to: "/forms/vehicle-bill-of-sale",
  },
];

export default function LifeEventTiles() {
  const lp = useLocalizedPath();
  return (
    <section aria-labelledby="life-events-heading" className="mt-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 id="life-events-heading" className="font-serif text-2xl font-bold md:text-3xl">
            Find your form by situation
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Not sure what you need? Start with what's happening in your life.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e) => {
          const Icon = e.icon;
          return (
            <Link
              key={e.to}
              to={lp(e.to)}
              className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/70 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold leading-tight"
                  dangerouslySetInnerHTML={{ __html: e.title }}
                />
                <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
              </div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:right-3 group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
