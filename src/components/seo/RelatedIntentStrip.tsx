import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/i18n/paths";

export interface RelatedIntentLink {
  label: string;
  href: string;
  blurb?: string;
}

interface Props {
  /** Cluster label shown as an eyebrow (e.g. "Personal injury cluster"). */
  cluster: string;
  /** Short heading for the strip. */
  heading?: string;
  links: RelatedIntentLink[];
  className?: string;
}

/**
 * RelatedIntentStrip
 * ------------------
 * Standardized cross-linking block used on money pages to keep in-market
 * users inside the same intent cluster (PI, insurance, debt, disability,
 * family, housing). Every money page ships with one — it raises
 * pages/session, dwell time, and internal-link equity for the cluster's
 * pillar page.
 */
export default function RelatedIntentStrip({
  cluster,
  heading = "Continue in this cluster",
  links,
  className = "",
}: Props) {
  const localePath = useLocalizedPath();
  return (
    <aside
      className={`rounded-lg border bg-muted/30 p-5 md:p-6 my-10 ${className}`}
      aria-label={`${cluster} — related content`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">
        {cluster}
      </p>
      <h2 className="text-xl font-bold mb-4">{heading}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href} className="rounded-md border bg-background p-3">
            <Link
              to={localePath(l.href)}
              className="font-semibold text-accent hover:underline"
            >
              {l.label} →
            </Link>
            {l.blurb && (
              <p className="text-xs text-muted-foreground mt-1">{l.blurb}</p>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
