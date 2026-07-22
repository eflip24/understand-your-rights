import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, Globe2, Save, FileText, Sparkles, ArrowRight, PackageCheck } from "lucide-react";
import Head from "@/components/seo/Head";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import FormCard from "@/components/forms/FormCard";
import FormPackCard from "@/components/forms/FormPackCard";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import EuCountrySelector from "@/components/forms/EuCountrySelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { legalForms } from "@/data/forms";
import { formPacks } from "@/data/formPacks";
import { euCategoryLabels, type EuCategoryKey } from "@/data/euForms";
import { useLocalizedPath } from "@/i18n/paths";

type CatKey = EuCategoryKey | "all";

const SITE = "https://legallyspoken.com";

export default function EuFormsHubPage() {
  const lp = useLocalizedPath();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatKey>("all");
  const [country, setCountry] = useState<string>(() =>
    (typeof window !== "undefined" && localStorage.getItem("euCountry")) || "generic"
  );

  const forms = useMemo(() => legalForms.filter((f) => f.region === "eu"), []);

  const counts = useMemo(() => {
    const c: Record<CatKey, number> = { all: forms.length, gdpr: 0, employment: 0, consumer: 0, business: 0, realestate: 0, personal: 0, tax: 0 };
    for (const f of forms) if (f.euCategory) c[f.euCategory]++;
    return c;
  }, [forms]);

  const filtered = useMemo(() => {
    return forms.filter((f) => {
      if (cat !== "all" && f.euCategory !== cat) return false;
      if (q.trim()) {
        const hay = `${f.title} ${f.shortDescription} ${f.slug}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [forms, q, cat]);

  const featured = forms.filter((f) => f.isFeatured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "European Legal Forms — GDPR, Employment, VAT & More",
        url: `${SITE}/eu-forms`,
        description:
          "Free fillable European legal forms: GDPR consent, DPA, EU employment contract, 14-day withdrawal, EU VAT invoice, EU NDA and more. Instant PDF download.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "EU Forms", item: `${SITE}/eu-forms` },
        ],
      },
    ],
  };

  return (
    <div className="container max-w-6xl px-4 py-8">
      <Head
        title="Free EU Legal Forms — GDPR, Employment, VAT | LegallySpoken"
        description="Fill European legal forms online free: GDPR consent & DPA, EU employment contract, 14-day withdrawal, EU VAT invoice, EU NDA. Instant PDF, e-signature ready."
      />
      <link rel="canonical" href={`${SITE}/eu-forms`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs items={[{ label: "Home", href: lp("/") }, { label: "EU Forms" }]} />

      {/* EU-flavoured hero (subtle EU-blue accent, no flag) */}
      <header className="mt-4 rounded-2xl border border-[#003399]/20 bg-gradient-to-br from-[#003399]/5 via-background to-accent/5 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#003399]/10 px-2.5 py-1 text-[#003399] dark:text-[#8ea6ff]">
            <Globe2 className="h-3.5 w-3.5" /> European Union
          </span>
          <span className="text-muted-foreground">GDPR · Directive 2011/83 · VAT Directive 2006/112</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
          Free EU Legal Forms — GDPR, Employment, VAT & Consumer Rights
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          European-jurisdiction templates, kept separate from our US forms so the clauses,
          statutes, and terminology stay right. Fill online for free, download a clean PDF
          when you need it.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search EU forms (GDPR, VAT, employment…)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="ps-9"
            />
          </div>
          <EuCountrySelector
            value={country}
            onChange={(c) => {
              setCountry(c);
              try { localStorage.setItem("euCountry", c); } catch { /* ignore */ }
            }}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> GDPR-aware clauses</span>
          <span className="inline-flex items-center gap-1.5"><Save className="h-3.5 w-3.5" /> Autosave as you type</span>
          <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Free watermarked PDF · clean upgrade from €1.99</span>
        </div>
      </header>

      {/* EU Form Packs — bundled multi-doc wizards */}
      <section className="mt-10" aria-labelledby="eu-packs-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="eu-packs-heading" className="font-serif text-2xl font-bold md:text-3xl">
              EU Form Packs
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill shared company or personal info once. Get every document you need — GDPR, employment, business, or consumer — as one clean ZIP.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <PackageCheck className="h-3.5 w-3.5" /> One ZIP · one payment
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {formPacks.filter((p) => p.region === "eu").map((p) => (
            <FormPackCard key={p.slug} pack={p} featured={p.slug === "gdpr-pack"} />
          ))}
        </div>
      </section>

      {/* Featured (Batch 5 highlights) */}
      {featured.length > 0 && (
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold md:text-3xl">Most-used EU forms</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Where our EU visitors start — GDPR consent, DPA, employment contracts, and VAT invoices.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" /> New
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((f) => <FormCard key={f.slug} form={f} />)}
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="mt-14">
        <div className="mb-5">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Browse every EU form</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {counts.all} European forms · categorised by legal area.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5 rounded-lg border border-border/60 bg-muted/30 p-1.5">
          {([
            ["all", "All"],
            ["gdpr", euCategoryLabels.gdpr],
            ["employment", euCategoryLabels.employment],
            ["consumer", euCategoryLabels.consumer],
            ["business", euCategoryLabels.business],
            ["personal", euCategoryLabels.personal],
            ["tax", euCategoryLabels.tax],
          ] as [CatKey, string][])
            .filter(([k]) => k === "all" || counts[k] > 0)
            .map(([k, label]) => (
              <button
                key={k}
                onClick={() => setCat(k)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  cat === k
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]">
                  {counts[k]}
                </Badge>
              </button>
            ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">No EU forms match your search yet.</p>
            <button
              onClick={() => { setQ(""); setCat("all"); }}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => <FormCard key={f.slug} form={f} />)}
          </div>
        )}
      </section>

      {/* US separation callout */}
      <section className="mt-16 rounded-xl border border-border/70 bg-secondary/30 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold">Working under US law instead?</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              W-9, W-4, I-9, US NDAs, leases and state-specific forms live in a separate hub — different
              statutes, different terminology, different SEO.
            </p>
          </div>
          <Link
            to={lp("/forms")}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/85 transition hover:border-accent/50 hover:text-accent"
          >
            Go to US Forms <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mt-14">
        <FormDisclaimer />
      </div>
    </div>
  );
}
