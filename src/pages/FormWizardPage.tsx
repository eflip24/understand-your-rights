import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getPackBySlug } from "@/data/formPacks";
const FormPackWizardPage = lazy(() => import("@/pages/FormPackWizardPage"));
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Head from "@/components/seo/Head";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import FormField from "@/components/forms/FormField";
import AutoSaveIndicator from "@/components/forms/AutoSaveIndicator";
import PdfActionBar from "@/components/forms/PdfActionBar";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import FormCard from "@/components/forms/FormCard";
import { useFormDraft } from "@/hooks/useFormDraft";
import { categoryLabels, getFormBySlug, getFormByCountrySlug, isFieldVisible, legalForms } from "@/data/forms";
import { toast } from "@/hooks/use-toast";
import { useLocalizedPath } from "@/i18n/paths";
import StateSelector from "@/components/forms/StateSelector";
import SignaturePad, { type SignatureValue } from "@/components/forms/SignaturePad";
import StripeCheckoutDialog from "@/components/forms/StripeCheckoutDialog";
import { isPaymentsConfigured } from "@/lib/stripe";
import { EU_COUNTRY_META } from "@/data/euCountryForms";

export default function FormWizardPage() {
  const { slug = "", country } = useParams();
  const lp = useLocalizedPath();
  const { user } = useAuth();

  // If this slug matches a form pack, hand off to the pack wizard.
  if (getPackBySlug(slug)) {
    return (
      <Suspense fallback={null}>
        <FormPackWizardPage />
      </Suspense>
    );
  }

  // Legacy slug redirects → canonical SEO-friendly URLs.
  const SLUG_ALIASES: Record<string, string> = {
    "power-of-attorney": "power-of-attorney-financial",
    "residential-lease": "residential-lease-agreement",
    "bill-of-sale": "vehicle-bill-of-sale",
  };
  if (SLUG_ALIASES[slug]) {
    return <Navigate to={lp(`/forms/${SLUG_ALIASES[slug]}`)} replace />;
  }

  const form = country ? getFormByCountrySlug(country, slug) : getFormBySlug(slug);

  if (!form) return <Navigate to={lp(country ? "/eu-forms" : "/forms")} replace />;

  const totalSteps = form.steps.length;
  const {
    data,
    setField,
    step,
    setStep,
    status,
    lastSavedAt,
    reset,
    progressPct,
  } = useFormDraft({ slug, totalSteps });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (!user) { setHasPurchased(false); return; }
    let cancelled = false;
    (async () => {
      const { data: row } = await supabase
        .from("form_purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("form_slug", slug)
        .maybeSingle();
      if (!cancelled) setHasPurchased(Boolean(row));
    })();
    return () => { cancelled = true; };
  }, [user, slug]);

  const current = form.steps[step];

  const validateCurrent = () => {
    const errs: Record<string, string> = {};
    for (const field of current.fields) {
      if (!field.required) continue;
      if (!isFieldVisible(field, data)) continue;
      const v = data[field.id];
      if (v === undefined || v === null || v === "" || v === false) {
        errs[field.id] = "This field is required.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrent()) return;
    setStep(Math.min(step + 1, totalSteps - 1));
  };

  const refetchPurchase = async () => {
    if (!user) return;
    const { data: row } = await supabase
      .from("form_purchases").select("id").eq("user_id", user.id).eq("form_slug", slug).maybeSingle();
    if (row) setHasPurchased(true);
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Create a free account so we can attach the purchase to your dashboard.",
      });
      return;
    }
    if (!isPaymentsConfigured()) {
      toast({
        title: "Payments not yet live",
        description: "Checkout is being finalized. Please use the free watermarked PDF for now.",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    // Poll a few times — webhook may take a moment.
    let n = 0;
    const iv = setInterval(async () => {
      n += 1;
      await refetchPurchase();
      if (n >= 6) clearInterval(iv);
    }, 2000);
  };

  const related = useMemo(() => {
    return (form.relatedForms || [])
      .map((s) => legalForms.find((f) => f.slug === s))
      .filter(Boolean) as typeof legalForms;
  }, [form.relatedForms]);

  const isLast = step === totalSteps - 1;

  return (
    <div className="container max-w-4xl py-8 px-4">
      <Head
        title={`${form.title} — Free Fillable PDF Online (${new Date().getFullYear()}) | LegallySpoken`}
        description={`Fill out ${form.title} online free in minutes. Guided wizard, instant PDF download, e-signature ready. ${form.shortDescription}`}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                name: `How to fill out ${form.title} online`,
                description: form.shortDescription,
                totalTime: "PT10M",
                step: form.steps.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.description || s.title,
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://legallyspoken.com/" },
                  { "@type": "ListItem", position: 2, name: "Legal Forms", item: "https://legallyspoken.com/forms" },
                  { "@type": "ListItem", position: 3, name: form.title, item: `https://legallyspoken.com/forms/${form.slug}` },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: `Is the ${form.title} free to fill out on LegallySpoken?`,
                    acceptedAnswer: { "@type": "Answer", text: "Yes. The guided wizard and watermarked PDF download are always free. A clean, professional PDF is available as an optional one-time upgrade." },
                  },
                  {
                    "@type": "Question",
                    name: `Can I e-sign ${form.title} online?`,
                    acceptedAnswer: { "@type": "Answer", text: "Yes. You can draw or type your signature in the final step. The signed PDF downloads instantly." },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Breadcrumbs
        items={
          form.country
            ? [
                { label: "Home", href: lp("/") },
                { label: "EU Forms", href: lp("/eu-forms") },
                {
                  label: `${EU_COUNTRY_META[form.country].flag} ${EU_COUNTRY_META[form.country].name}`,
                  href: lp(`/eu-forms#country-${form.country}`),
                },
                { label: form.title.split("—")[0].trim() },
              ]
            : form.region === "eu"
            ? [
                { label: "Home", href: lp("/") },
                { label: "EU Forms", href: lp("/eu-forms") },
                { label: form.title.split("—")[0].trim() },
              ]
            : [
                { label: "Home", href: lp("/") },
                { label: "Forms", href: lp("/forms") },
                { label: categoryLabels[form.category] },
                { label: form.title.split("–")[0].trim() },
              ]
        }
      />

      <header className="mb-6">
        <h1 className="font-serif text-2xl md:text-3xl font-bold">{form.title}</h1>
        <p className="mt-2 text-muted-foreground">{form.shortDescription}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated {new Date(form.lastUpdated).toLocaleDateString()}
        </p>
      </header>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Step {step + 1} of {totalSteps}: {current.title}</span>
            <span>{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
        <AutoSaveIndicator status={status} lastSavedAt={lastSavedAt} />
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-5">
          {step === 0 && form.stateAware && (
            <StateSelector
              value={(data.__stateCode as string) || undefined}
              onChange={(code) => setField("__stateCode", code)}
            />
          )}
          {current.description && (
            <p className="text-sm text-muted-foreground">{current.description}</p>
          )}
          {current.note && (
            <div className="rounded-md border border-border/60 bg-secondary/40 p-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {current.note}
            </div>
          )}
          {current.fields
            .filter((field) => isFieldVisible(field, data))
            .map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={data[field.id]}
                onChange={(v) => {
                  setField(field.id, v);
                  if (errors[field.id]) setErrors((e) => ({ ...e, [field.id]: "" }));
                }}
                error={errors[field.id]}
              />
            ))}

          {isLast && (
            <SignaturePad
              value={(data.__signature as SignatureValue) || undefined}
              onChange={(v) => setField("__signature", v as unknown as string)}
            />
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={reset} className="gap-1 text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
              {!isLast ? (
                <Button onClick={handleNext} className="gap-1">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      {isLast && (
        <div className="mt-6">
          <h2 className="mb-3 font-serif text-lg font-bold">Download</h2>
          {form.officialLink && (
            <p className="mb-3 rounded-md border border-accent/30 bg-accent/5 p-3 text-xs leading-relaxed text-foreground/80">
              This is a free fillable helper tool created by legallyspoken.com. It is <strong>not</strong> an
              official government form. Before submitting to any agency or employer, verify the current version at{" "}
              <a href={form.officialLink.href} target="_blank" rel="noreferrer" className="text-accent underline">
                {form.officialLink.label}
              </a>
              . LegallySpoken is not a law firm and does not provide legal, tax, or immigration advice.
            </p>
          )}

          <PdfActionBar
            form={form}
            data={data}
            hasPurchased={hasPurchased}
            onCheckout={handleCheckout}
            stateCode={(data.__stateCode as string) || null}
            signature={(data.__signature as SignatureValue) || null}
          />
          {!user && (
            <p className="mt-3 text-xs text-muted-foreground">
              <Link to={lp("/signup")} className="text-accent hover:underline">Create a free account</Link>{" "}
              to save your progress across devices and keep purchased PDFs in your dashboard forever.
            </p>
          )}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 font-serif text-lg font-bold">Related forms</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <FormCard key={r.slug} form={r} />)}
          </div>
        </div>
      )}

      <FormDisclaimer />

      <StripeCheckoutDialog
        open={checkoutOpen}
        onClose={handleCheckoutClose}
        slug={slug}
        title={form.title}
        returnUrl={`${window.location.origin}${lp(`/checkout/return`)}?slug=${slug}&session_id={CHECKOUT_SESSION_ID}`}
      />
    </div>
  );
}
