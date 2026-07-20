import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Loader2, Lock, RotateCcw, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Head from "@/components/seo/Head";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import FormField from "@/components/forms/FormField";
import AutoSaveIndicator from "@/components/forms/AutoSaveIndicator";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import { useFormDraft } from "@/hooks/useFormDraft";
import { getPackBySlug, getPackFormDefs, type FormPack, type PackSharedField } from "@/data/formPacks";
import { isFieldVisible } from "@/data/forms";
import { generatePackZip } from "@/lib/pdf/generatePackZip";
import { downloadBlob } from "@/lib/pdf/generateFormPdf";
import { uploadDocument } from "@/lib/documents/uploadDocument";
import { toast } from "@/hooks/use-toast";
import { useLocalizedPath } from "@/i18n/paths";
import StripeCheckoutDialog from "@/components/forms/StripeCheckoutDialog";
import { isPaymentsConfigured } from "@/lib/stripe";

/** Group shared fields by their `group` label into wizard steps. */
function groupSharedFields(fields: PackSharedField[]): Array<{ title: string; fields: PackSharedField[] }> {
  const groups: string[] = [];
  const byGroup: Record<string, PackSharedField[]> = {};
  for (const f of fields) {
    if (!byGroup[f.group]) { byGroup[f.group] = []; groups.push(f.group); }
    byGroup[f.group].push(f);
  }
  return groups.map((title) => ({ title, fields: byGroup[title] }));
}

export default function FormPackWizardPage() {
  const { slug = "" } = useParams();
  const lp = useLocalizedPath();
  const { user } = useAuth();

  const pack = getPackBySlug(slug);
  if (!pack) return <Navigate to={lp("/forms")} replace />;

  const groupSteps = useMemo(() => groupSharedFields(pack.sharedFields), [pack]);
  // Steps: [0] select docs → [1..N] shared field groups → [N+1] review & download
  const totalSteps = 1 + groupSteps.length + 1;

  const {
    data,
    setField,
    step,
    setStep,
    status,
    lastSavedAt,
    reset,
    progressPct,
  } = useFormDraft({ slug: pack.slug, totalSteps });

  // Initialize default selections once, after the draft has hydrated.
  useEffect(() => {
    if (data.__selectedSlugs === undefined) {
      const defaults = pack.members.filter((m) => m.defaultSelected).map((m) => m.formSlug);
      setField("__selectedSlugs", defaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack.slug]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasPurchased, setHasPurchased] = useState(false);
  const [busyFree, setBusyFree] = useState(false);
  const [busyClean, setBusyClean] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (!user) { setHasPurchased(false); return; }
    let cancelled = false;
    (async () => {
      const { data: row } = await supabase
        .from("form_purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("form_slug", pack.slug)
        .maybeSingle();
      if (!cancelled) setHasPurchased(Boolean(row));
    })();
    return () => { cancelled = true; };
  }, [user, pack.slug]);

  const selectedSlugs: string[] = Array.isArray(data.__selectedSlugs) ? (data.__selectedSlugs as string[]) : [];
  const isSelectStep = step === 0;
  const isReviewStep = step === totalSteps - 1;
  const sharedGroupIndex = step - 1; // 0-based within groupSteps

  const toggleMember = (formSlug: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...selectedSlugs, formSlug]))
      : selectedSlugs.filter((s) => s !== formSlug);
    setField("__selectedSlugs", next);
  };

  const validateCurrent = () => {
    const errs: Record<string, string> = {};
    if (isSelectStep) {
      if (selectedSlugs.length === 0) errs.__selectedSlugs = "Select at least one document.";
    } else if (!isReviewStep) {
      const group = groupSteps[sharedGroupIndex];
      for (const field of group.fields) {
        if (!field.required) continue;
        if (!isFieldVisible(field, data)) continue;
        const v = data[field.id];
        if (v === undefined || v === null || v === "" || v === false) {
          errs[field.id] = "This field is required.";
        }
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrent()) return;
    setStep(Math.min(step + 1, totalSteps - 1));
  };

  const buildAndDownload = async (watermark: boolean) => {
    const setBusy = watermark ? setBusyFree : setBusyClean;
    setBusy(true);
    try {
      const blob = await generatePackZip({
        pack,
        sharedData: data,
        selectedSlugs,
        watermark,
      });
      downloadBlob(blob, `${pack.slug}${watermark ? "-free-draft" : "-clean"}.zip`);
      if (user) {
        uploadDocument({
          userId: user.id, slug: pack.slug, kind: "pack",
          variant: watermark ? "watermarked" : "clean",
          status: watermark ? "completed" : "purchased",
          blob, title: pack.title, snapshot: data, extension: "zip", contentType: "application/zip",
        }).catch(() => {});
      }
      toast({
        title: watermark ? "Free pack downloaded" : "Clean pack downloaded",
        description: watermark
          ? "Each PDF is watermarked. Upgrade for a clean professional pack."
          : `${selectedSlugs.length} documents delivered as one ZIP.`,
      });
    } catch (e) {
      toast({ title: "Couldn't build the pack", description: String(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const refetchPurchase = async () => {
    if (!user) return;
    const { data: row } = await supabase
      .from("form_purchases").select("id").eq("user_id", user.id).eq("form_slug", pack.slug).maybeSingle();
    if (row) setHasPurchased(true);
  };

  const handleCheckout = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Create a free account so we can attach the purchase to your dashboard." });
      return;
    }
    if (!isPaymentsConfigured()) {
      toast({ title: "Payments not yet live", description: "Checkout is being finalized. Please use the free watermarked ZIP for now." });
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    let n = 0;
    const iv = setInterval(async () => {
      n += 1;
      await refetchPurchase();
      if (n >= 6) clearInterval(iv);
    }, 2000);
  };

  const packMembers = getPackFormDefs(pack);
  const currentGroup = !isSelectStep && !isReviewStep ? groupSteps[sharedGroupIndex] : null;

  return (
    <div className="container max-w-4xl py-8 px-4">
      <Head title={`${pack.seoTitle} | LegallySpoken`} description={pack.seoDescription} />
      <Breadcrumbs
        items={[
          { label: "Home", href: lp("/") },
          { label: "Forms", href: lp("/forms") },
          { label: "Packs" },
          { label: pack.title },
        ]}
      />

      <header className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <PackageCheck className="h-3.5 w-3.5" /> Bundled forms pack
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold">{pack.title}</h1>
        <p className="mt-2 text-muted-foreground">{pack.overview}</p>
      </header>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {step + 1} of {totalSteps}:{" "}
              {isSelectStep ? "Select documents" : isReviewStep ? "Review & download" : currentGroup?.title}
            </span>
            <span>{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
        <AutoSaveIndicator status={status} lastSavedAt={lastSavedAt} />
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-5">
          {isSelectStep && (
            <>
              <p className="text-sm text-muted-foreground">
                Choose the documents you want in this pack. Fill shared information once — each document is
                generated with the right fields populated.
              </p>
              <div className="space-y-3">
                {packMembers.map(({ member, def }) => {
                  const checked = selectedSlugs.includes(def.slug);
                  return (
                    <label
                      key={def.slug}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/60 bg-secondary/20 p-4 hover:bg-secondary/40"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(v) => toggleMember(def.slug, Boolean(v))}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{def.title}</span>
                          {member.optional && (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{def.shortDescription}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.__selectedSlugs && (
                <p className="text-sm text-destructive">{errors.__selectedSlugs}</p>
              )}
            </>
          )}

          {currentGroup && (
            <>
              <p className="text-sm text-muted-foreground">
                This information appears across the {selectedSlugs.length} document
                {selectedSlugs.length === 1 ? "" : "s"} you selected.
              </p>
              {currentGroup.fields
                .filter((f) => isFieldVisible(f, data))
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
            </>
          )}

          {isReviewStep && (
            <>
              <p className="text-sm text-muted-foreground">
                You've filled the shared information for {selectedSlugs.length} document
                {selectedSlugs.length === 1 ? "" : "s"}. Download a free watermarked pack now to preview, or
                unlock the clean professional pack.
              </p>
              <div className="rounded-md border border-border/60 bg-secondary/30 p-4">
                <h3 className="mb-2 text-sm font-semibold">Documents in this pack</h3>
                <ul className="space-y-1 text-sm">
                  {packMembers
                    .filter(({ def }) => selectedSlugs.includes(def.slug))
                    .map(({ def }) => (
                      <li key={def.slug}>• {def.title}</li>
                    ))}
                </ul>
              </div>
              {pack.disclaimer && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs leading-relaxed text-foreground/80">
                  <strong>Important:</strong> {pack.disclaimer}
                </div>
              )}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => buildAndDownload(true)}
                  disabled={busyFree || selectedSlugs.length === 0}
                >
                  {busyFree ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  Download Free Pack (ZIP, watermarked)
                </Button>
                <Button
                  className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-gold-dark"
                  onClick={hasPurchased ? () => buildAndDownload(false) : handleCheckout}
                  disabled={busyClean || selectedSlugs.length === 0}
                >
                  {busyClean ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : hasPurchased ? (
                    <Download className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  {hasPurchased ? "Download Clean Pack" : `Get Clean Pack — $${pack.priceUsd}`}
                </Button>
              </div>
              {!user && (
                <p className="text-xs text-muted-foreground">
                  <Link to={lp("/signup")} className="text-accent hover:underline">Create a free account</Link>{" "}
                  to save your progress across devices and keep purchased packs in your dashboard.
                </p>
              )}
            </>
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
              {!isReviewStep && (
                <Button onClick={handleNext} className="gap-1">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <FormDisclaimer />

      <StripeCheckoutDialog
        open={checkoutOpen}
        onClose={handleCheckoutClose}
        slug={pack.slug}
        title={pack.title}
        returnUrl={`${window.location.origin}${lp(`/checkout/return`)}?slug=${pack.slug}&session_id={CHECKOUT_SESSION_ID}`}
      />
    </div>
  );
}
