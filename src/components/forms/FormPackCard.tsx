import { Link } from "react-router-dom";
import { PackageCheck, ArrowRight, Star, FileStack } from "lucide-react";
import type { FormPack } from "@/data/formPacks";
import { getFormBySlug } from "@/data/forms";
import { useLocalizedPath } from "@/i18n/paths";
import { cn } from "@/lib/utils";

interface Props {
  pack: FormPack;
  featured?: boolean;
}

// Prefer the real form title over the slug; fall back to a Title-cased slug.
function memberLabel(slug: string): string {
  const f = getFormBySlug(slug);
  if (f?.title) {
    // Compact: keep the piece before an em/en dash or " – " for chip use.
    return f.title.split(/\s[–—-]\s/)[0];
  }
  return slug
    .split("-")
    .map((s) => (s.length <= 3 ? s.toUpperCase() : s[0].toUpperCase() + s.slice(1)))
    .join(" ");
}

function savingsCents(pack: FormPack): number {
  const total = pack.members.reduce((sum, m) => {
    const f = getFormBySlug(m.formSlug);
    return sum + (f?.price ?? 0);
  }, 0);
  const savings = total - pack.priceUsd;
  return savings > 0 ? Math.round(savings) : 0;
}

export default function FormPackCard({ pack, featured }: Props) {
  const lp = useLocalizedPath();
  const savings = savingsCents(pack);

  return (
    <Link
      to={lp(`${pack.region === "eu" ? "/eu-forms" : "/forms"}/${pack.slug}`)}
      className="group relative flex h-full flex-col rounded-xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] via-background to-background p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
    >
      {featured && (
        <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full border border-accent bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground shadow-sm">
          <Star className="h-3 w-3 fill-current" /> Most popular
        </span>
      )}

      <div className="mb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
          <PackageCheck className="h-3 w-3" /> Pack · ${pack.priceUsd}
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <FileStack className="h-3.5 w-3.5" /> {pack.members.length} docs
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold leading-tight">{pack.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{pack.overview}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {pack.members.slice(0, 4).map((m) => (
          <span
            key={m.formSlug}
            className="rounded-md bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-foreground/70"
          >
            {memberLabel(m.formSlug)}
          </span>
        ))}
        {pack.members.length > 4 && (
          <span className="rounded-md bg-secondary/70 px-2 py-0.5 text-[11px] text-muted-foreground">
            +{pack.members.length - 4} more
          </span>
        )}
      </div>

      {savings > 0 && (
        <p className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          Save ${savings} vs. buying each form individually
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Start pack <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
