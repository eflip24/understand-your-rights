import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";
import { workersCompStates } from "@/data/workersCompStates";
import { wrongfulTerminationStates } from "@/data/wrongfulTerminationStates";
import { carInsuranceDenialStates } from "@/data/carInsuranceDenialStates";

/**
 * Discovery grid linking a Phase-8 pillar to its 51-jurisdiction fan-out
 * (Phase 11). Rendered only for pillars that actually have state pages.
 */
const REGISTRY: Record<
  string,
  { heading: string; blurb: string; states: { slug: string; name: string }[] }
> = {
  "workers-comp-denied-what-next": {
    heading: "Workers' comp appeal rules by state",
    blurb:
      "Appeal boards, filing deadlines and benefit caps differ in every jurisdiction. Pick your state for the exact process.",
    states: workersCompStates.map((s) => ({ slug: s.slug, name: s.name })),
  },
  "wrongful-termination-settlements": {
    heading: "Wrongful termination rules by state",
    blurb:
      "At-will exceptions, the state fair-employment agency and the filing window all vary. Pick your state.",
    states: wrongfulTerminationStates.map((s) => ({ slug: s.slug, name: s.name })),
  },
  "car-insurance-claim-denied": {
    heading: "Car insurance denial rules by state",
    blurb:
      "Fault vs no-fault, prompt-payment deadlines and bad-faith remedies are state law. Pick your state.",
    states: carInsuranceDenialStates.map((s) => ({ slug: s.slug, name: s.name })),
  },
};

export function hasStateFanout(slug: string) {
  return slug in REGISTRY;
}

export default function PillarStateChooser({ slug }: { slug: string }) {
  const lp = useLocalizedPath();
  const cfg = REGISTRY[slug];
  if (!cfg) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-bold">{cfg.heading}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{cfg.blurb}</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {cfg.states.map((s) => (
          <li key={s.slug}>
            <Link
              to={lp(`/${slug}/${s.slug}`)}
              className="block rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
