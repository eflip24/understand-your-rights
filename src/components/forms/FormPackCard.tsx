import { Link } from "react-router-dom";
import { PackageCheck, ArrowRight } from "lucide-react";
import type { FormPack } from "@/data/formPacks";
import { useLocalizedPath } from "@/i18n/paths";

interface Props {
  pack: FormPack;
}

export default function FormPackCard({ pack }: Props) {
  const lp = useLocalizedPath();
  return (
    <Link
      to={lp(`/forms/${pack.slug}`)}
      className="group block rounded-lg border border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-5 transition hover:border-accent/60 hover:shadow-md"
    >
      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
        <PackageCheck className="h-3 w-3" /> Pack · ${pack.priceUsd}
      </div>
      <h3 className="font-serif text-lg font-bold leading-tight">{pack.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{pack.overview}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {pack.members.slice(0, 4).map((m) => (
          <span
            key={m.formSlug}
            className="rounded bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {m.formSlug.replace(/-/g, " ")}
          </span>
        ))}
        {pack.members.length > 4 && (
          <span className="rounded bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground">
            +{pack.members.length - 4} more
          </span>
        )}
      </div>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Start pack <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
