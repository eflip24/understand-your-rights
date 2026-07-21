import { useMemo, useState } from "react";
import { ShieldCheck, MapPin, Save, FileText, Sparkles } from "lucide-react";
import Head from "@/components/seo/Head";
import FormCard from "@/components/forms/FormCard";
import FormPackCard from "@/components/forms/FormPackCard";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import FormsHero from "@/components/forms/FormsHero";
import LifeEventTiles from "@/components/forms/LifeEventTiles";
import FormsCategoryTabs from "@/components/forms/FormsCategoryTabs";
import { legalForms, type FormCategory } from "@/data/forms";
import { formPacks } from "@/data/formPacks";
import { useLocalizedPath } from "@/i18n/paths";

type CatKey = FormCategory | "all";

const STATE_SECTIONS = [
  { title: "Eviction Notice", prefix: "eviction-notice", blurb: "State-compliant notice to quit / pay-or-quit" },
  { title: "Lease Agreement", prefix: "lease-agreement", blurb: "Deposit caps, disclosures, late-fee rules built in" },
  { title: "Power of Attorney", prefix: "power-of-attorney", blurb: "Notary + witness formalities per state" },
  { title: "Vehicle Bill of Sale", prefix: "vehicle-bill-of-sale", blurb: "DMV-ready, notary block where required" },
];

const STATES: [string, string, string][] = [
  ["california", "California", "CA"],
  ["new-york", "New York", "NY"],
  ["texas", "Texas", "TX"],
  ["florida", "Florida", "FL"],
  ["illinois", "Illinois", "IL"],
  ["pennsylvania", "Pennsylvania", "PA"],
];

export default function FormsHubPage() {
  const lp = useLocalizedPath();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatKey>("all");

  // US hub only: filter out EU forms (they live at /eu-forms).
  const usForms = useMemo(() => legalForms.filter((f) => f.region !== "eu"), []);

  const counts = useMemo(() => {
    const c: Record<CatKey, number> = {
      all: usForms.length,
      employment: 0,
      tax: 0,
      business: 0,
      realestate: 0,
      personal: 0,
    };
    for (const f of usForms) c[f.category]++;
    return c;
  }, [usForms]);

  const filtered = useMemo(() => {
    return usForms.filter((f) => {
      if (cat !== "all" && f.category !== cat) return false;
      if (q.trim()) {
        const hay = `${f.title} ${f.shortDescription} ${f.slug}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [usForms, q, cat]);

  return (
    <div className="container max-w-6xl px-4 py-8">
      <Head
        title="Free Fillable Legal Forms | LegallySpoken"
        description="Fill common legal forms online in minutes. Free watermarked PDF download; upgrade to a clean professional PDF from $4.99. W-9, W-4, I-9, NDA, lease, eviction, POA and more."
      />
      <Breadcrumbs items={[{ label: "Home", href: lp("/") }, { label: "Forms" }]} />

      <FormsHero query={q} onQueryChange={setQ} totalForms={legalForms.length} />

      <LifeEventTiles />

      {/* Trust strip */}
      <section
        aria-label="What you get"
        className="mt-10 grid gap-3 rounded-xl border border-border/70 bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { icon: ShieldCheck, label: "IRS/USCIS latest revisions" },
          { icon: MapPin, label: "6 priority states supported" },
          { icon: Save, label: "Autosave as you type" },
          { icon: FileText, label: "Free draft PDF + clean option" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-sm">
            <div className="rounded-md bg-accent/10 p-1.5 text-accent">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-foreground/80">{label}</span>
          </div>
        ))}
      </section>

      {/* Form Packs */}
      <section className="mt-12" aria-labelledby="packs-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="packs-heading" className="font-serif text-2xl font-bold md:text-3xl">
              Form Packs — save with bundles
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Fill shared info once. Get every document you need for a common life or business event as one clean pack.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" /> One ZIP · one payment
          </span>
        </div>
        <div className="grid gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-4">
          {formPacks.map((p) => (
            <FormPackCard
              key={p.slug}
              pack={p}
              featured={p.slug === "small-business-pack"}
            />
          ))}
        </div>
      </section>

      {/* Browse all forms */}
      <section className="mt-14" aria-labelledby="all-forms-heading">
        <div className="mb-5">
          <h2 id="all-forms-heading" className="font-serif text-2xl font-bold md:text-3xl">
            Browse every fillable form
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {counts.all} forms and counting. Filter by category or search above.
          </p>
        </div>

        <FormsCategoryTabs active={cat} onChange={setCat} counts={counts} />

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">No forms match your search yet.</p>
            <button
              onClick={() => {
                setQ("");
                setCat("all");
              }}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <FormCard key={f.slug} form={f} />
            ))}
          </div>
        )}
      </section>

      {/* Popular state-specific forms */}
      <section className="mt-16" aria-labelledby="state-forms-heading">
        <div className="mb-5">
          <h2 id="state-forms-heading" className="font-serif text-2xl font-bold md:text-3xl">
            Popular state-specific forms
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            State law controls notice periods, deposit caps, and signing formalities — pre-configured for the state you pick.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {STATE_SECTIONS.map((f) => (
            <div key={f.prefix} className="rounded-xl border border-border/70 bg-background/70 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold">{f.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{f.blurb}</p>
                </div>
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {STATES.map(([slug, name, abbr]) => (
                  <a
                    key={slug}
                    href={lp(`/forms/${f.prefix}/${slug}`)}
                    title={`${name} ${f.title}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground/75 transition hover:border-accent/50 hover:text-accent"
                  >
                    <span className="tabular-nums">{abbr}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free fillable — most searched */}
      <section className="mt-14" aria-labelledby="most-searched-heading">
        <h2 id="most-searched-heading" className="font-serif text-2xl font-bold md:text-3xl">
          Free fillable — most searched
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Straight to the fillable version of the forms visitors ask for most.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["w-9-online-free", "Free Fillable W-9 (2024)"],
            ["w-4-online-free", "Free Fillable W-4 (2026)"],
            ["i-9-online-free", "Free Fillable I-9 (2025)"],
            ["nda-online-free", "Free NDA Template"],
            ["demand-letter-online-free", "Free Demand Letter"],
            ["promissory-note-online-free", "Free Promissory Note"],
          ].map(([slug, label]) => (
            <a
              key={slug}
              href={lp(`/forms/${slug}`)}
              className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80 transition hover:border-accent/50 hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <FormDisclaimer />
      </div>
    </div>
  );
}
