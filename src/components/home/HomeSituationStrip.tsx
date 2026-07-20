import { Link } from "react-router-dom";
import { Car, Heart, UserPlus, Home, Briefcase, CreditCard, UserX, FileSignature } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

const situations = [
  { icon: Car, label: "I was in an accident", href: "/auto-accident-law" },
  { icon: Heart, label: "I'm getting divorced", href: "/tools/family" },
  { icon: UserPlus, label: "I'm hiring someone", href: "/forms/pack/new-hire-pack" },
  { icon: Home, label: "I'm renting a place", href: "/forms/residential-lease-agreement" },
  { icon: Briefcase, label: "I'm starting a business", href: "/forms/pack/small-business-basics-pack" },
  { icon: CreditCard, label: "I'm dealing with debt", href: "/tools/debt-settlement-calculator" },
  { icon: UserX, label: "I got fired", href: "/employment-law" },
  { icon: FileSignature, label: "I need to sign a contract", href: "/tools/contract" },
];

export default function HomeSituationStrip() {
  const lp = useLocalizedPath();
  return (
    <section className="bg-secondary/40 border-y py-12 md:py-14">
      <div className="container">
        <div className="mb-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Find help by situation
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us what you're dealing with — we'll route you to the right tool, form, or guide.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {situations.map((s) => (
            <Link
              key={s.href}
              to={lp(s.href)}
              className="group flex items-center gap-3 rounded-xl border bg-background px-4 py-3 hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
