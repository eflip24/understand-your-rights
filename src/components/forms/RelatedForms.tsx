import { useMemo } from "react";
import FormCard from "@/components/forms/FormCard";
import { legalForms, type LegalFormDef } from "@/data/forms";
import { formRelationships } from "@/data/formRelationships";

interface RelatedFormsProps {
  /** Current form slug — its own entries are excluded from the list. */
  slug: string;
  /** Explicit override — when provided, curated map + fallback are ignored. */
  slugs?: string[];
  heading?: string;
  /** Cap the number of cards rendered. Defaults to 3. */
  limit?: number;
  /** When true, only return forms with the same region as the source form.
   *  Defaults to true so US and EU form pages don't cross-link automatically. */
  sameRegion?: boolean;
}

/**
 * Reusable "Related forms" grid. Drop-in for form wizards, SEO landings,
 * hub pages, and blog posts.
 *
 * Selection priority:
 * 1. `slugs` prop (explicit)
 * 2. `formRelationships[slug]` curated map
 * 3. Fallback: same category (+ optionally same region), excluding self
 */
export default function RelatedForms({
  slug,
  slugs,
  heading = "Related forms",
  limit = 3,
  sameRegion = true,
}: RelatedFormsProps) {
  const items = useMemo<LegalFormDef[]>(() => {
    const source = legalForms.find((f) => f.slug === slug);
    const region = source?.region;

    const pickBySlugs = (list: string[]) =>
      list
        .map((s) => legalForms.find((f) => f.slug === s))
        .filter((f): f is LegalFormDef => Boolean(f) && f!.slug !== slug);

    let picked: LegalFormDef[] = [];
    if (slugs && slugs.length) {
      picked = pickBySlugs(slugs);
    } else if (formRelationships[slug]?.length) {
      picked = pickBySlugs(formRelationships[slug]);
    }

    if (picked.length < limit && source) {
      const need = limit - picked.length;
      const already = new Set(picked.map((p) => p.slug).concat(slug));
      const fallback = legalForms
        .filter((f) => !already.has(f.slug))
        .filter((f) => f.category === source.category)
        .filter((f) => (sameRegion ? (f.region ?? "us") === (region ?? "us") : true))
        .slice(0, need);
      picked = picked.concat(fallback);
    }

    return picked.slice(0, limit);
  }, [slug, slugs, limit, sameRegion]);

  if (!items.length) return null;

  return (
    <section aria-label={heading} className="mt-10">
      <h2 className="mb-3 font-serif text-lg font-bold">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <FormCard key={f.slug} form={f} />
        ))}
      </div>
    </section>
  );
}
