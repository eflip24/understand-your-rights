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

      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold">Form Packs — Save with Bundles</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill shared info once. Get every document you need for a common life or business event as one clean pack.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formPacks.map((p) => (
            <FormPackCard key={p.slug} pack={p} />
          ))}
        </div>
      </section>



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

      {/* Popular state-specific forms — SEO internal linking */}
      <section className="mt-14">
        <h2 className="font-serif text-2xl font-bold mb-2">Popular state-specific forms</h2>
        <p className="text-sm text-muted-foreground mb-5">
          State law controls notice periods, deposit caps, and signing formalities. These are pre-configured for the state you pick.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Eviction Notice", prefix: "eviction-notice", blurb: "State-compliant notice to quit / pay-or-quit" },
            { title: "Lease Agreement", prefix: "lease-agreement", blurb: "Deposit caps, disclosures, late-fee rules built in" },
            { title: "Power of Attorney", prefix: "power-of-attorney", blurb: "Notary + witness formalities handled per state" },
            { title: "Vehicle Bill of Sale", prefix: "vehicle-bill-of-sale", blurb: "DMV-ready, notary block where required" },
          ].map((f) => (
            <div key={f.prefix} className="rounded-lg border p-4">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">{f.blurb}</p>
              <ul className="text-sm space-y-1">
                {[
                  ["california", "California"],
                  ["new-york", "New York"],
                  ["texas", "Texas"],
                  ["florida", "Florida"],
                  ["illinois", "Illinois"],
                  ["pennsylvania", "Pennsylvania"],
                ].map(([slug, name]) => (
                  <li key={slug}>
                    <a href={lp(`/forms/${f.prefix}/${slug}`)} className="text-primary hover:underline">
                      {name} {f.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Free fillable landings */}
      <section className="mt-14">
        <h2 className="font-serif text-2xl font-bold mb-2">Free fillable — most searched</h2>
        <div className="flex flex-wrap gap-2">
          {[
            ["w-9-online-free", "Free Fillable W-9 (2024)"],
            ["w-4-online-free", "Free Fillable W-4 (2026)"],
            ["i-9-online-free", "Free Fillable I-9 (2025)"],
            ["nda-online-free", "Free NDA Template"],
            ["demand-letter-online-free", "Free Demand Letter"],
            ["promissory-note-online-free", "Free Promissory Note"],
          ].map(([slug, label]) => (
            <a key={slug} href={lp(`/forms/${slug}`)} className="rounded-full border px-3 py-1 text-sm hover:bg-accent">
              {label}
            </a>
          ))}
        </div>
      </section>

      <FormDisclaimer />
    </div>
  );
}
