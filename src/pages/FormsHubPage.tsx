import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "@/components/seo/Head";
import FormCard from "@/components/forms/FormCard";
import FormPackCard from "@/components/forms/FormPackCard";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import { categoryLabels, legalForms, type FormCategory } from "@/data/forms";
import { formPacks } from "@/data/formPacks";
import { useLocalizedPath } from "@/i18n/paths";

const CATEGORIES: (FormCategory | "all")[] = ["all", "employment", "tax", "business", "realestate", "personal"];

export default function FormsHubPage() {
  const lp = useLocalizedPath();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<FormCategory | "all">("all");

  const filtered = useMemo(() => {
    return legalForms.filter((f) => {
      if (cat !== "all" && f.category !== cat) return false;
      if (q.trim()) {
        const hay = `${f.title} ${f.shortDescription}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [q, cat]);

  return (
    <div className="container max-w-6xl py-10 px-4">
      <Head
        title="Free Fillable Legal Forms | LegallySpoken"
        description="Fill out common legal forms online in minutes. Free watermarked PDF download; upgrade to a clean professional PDF for a small fee."
      />
      <Breadcrumbs items={[{ label: "Home", href: lp("/") }, { label: "Forms" }]} />
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">Free Fillable Legal Forms</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Complete common legal forms with a guided, plain-English wizard. Download a free watermarked draft
          instantly, or upgrade to a clean professional PDF whenever you're ready.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search forms…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="ps-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={cat === c ? "default" : "outline"}
              onClick={() => setCat(c)}
            >
              {c === "all" ? "All" : categoryLabels[c]}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border p-8 text-center text-muted-foreground">
          No forms match your search yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <FormCard key={f.slug} form={f} />
          ))}
        </div>
      )}

      <FormDisclaimer />
    </div>
  );
}
