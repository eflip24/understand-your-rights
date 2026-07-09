import { ReactNode } from "react";

/**
 * InMarketEntityBlock
 * -------------------
 * Entity-dense contextual block designed to signal to Google's ad
 * auction that this page is squarely inside a high-CPC category
 * (personal injury, auto insurance, disability, mass tort, debt).
 *
 * The block renders:
 *  - A short, human-readable intro paragraph
 *  - A named-entity list (carriers, statutes, medical terms) that
 *    contextual ad targeting can lock onto
 *  - Optional "related coverage terms" internal-link strip
 *
 * Use above the fold on every money page. Do NOT stuff keywords —
 * every entity here must be relevant to the page's actual topic.
 */

export interface EntityLink {
  label: string;
  href?: string;
}

interface Props {
  /** Category label shown as an eyebrow (e.g. "Personal Injury · Auto Insurance"). */
  category: string;
  /** Short paragraph explaining the page's real-world context. Keep to 60–100 words. */
  intro: ReactNode;
  /** Named entities: insurance carriers, statutes, medical/legal terms. */
  entities: string[];
  /** Optional internal-link strip for related coverage terms. */
  relatedTerms?: EntityLink[];
  className?: string;
}

export default function InMarketEntityBlock({
  category,
  intro,
  entities,
  relatedTerms,
  className = "",
}: Props) {
  return (
    <aside
      className={`rounded-lg border bg-muted/30 p-4 md:p-5 mb-8 ${className}`}
      aria-label={`${category} context`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">
        {category}
      </p>
      <div className="text-sm text-muted-foreground leading-relaxed mb-3">
        {intro}
      </div>

      {entities.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-foreground mb-1.5">
            Key terms on this page
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {entities.map((e) => (
              <li
                key={e}
                className="text-xs bg-background border rounded-full px-2 py-0.5 text-muted-foreground"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedTerms && relatedTerms.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-foreground mb-1.5">
            Related coverage terms
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {relatedTerms.map((t) =>
              t.href ? (
                <li key={t.label}>
                  <a
                    href={t.href}
                    className="text-accent hover:underline"
                  >
                    {t.label}
                  </a>
                </li>
              ) : (
                <li key={t.label} className="text-muted-foreground">
                  {t.label}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </aside>
  );
}
