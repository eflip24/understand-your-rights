import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Crown, Loader2 } from "lucide-react";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { isPaymentsConfigured, getStripeEnvironment } from "@/lib/stripe";
import SubscribeDialog, { PlanSlug } from "@/components/subscription/SubscribeDialog";
import { toast } from "@/hooks/use-toast";

const PERKS = [
  "Every fillable form and form pack, unlimited downloads",
  "Clean PDFs with no watermark",
  "E-signature and saved version history",
  "Secure document library in your dashboard",
  "Ad-free browsing across the whole site",
  "State-specific clauses for CA, NY, TX, FL, IL and PA",
];

function formatPrice(cents?: number, currency = "usd") {
  if (cents === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function PricingPage() {
  const { user } = useAuth();
  const { isSubscriber, subscription, refresh } = useSubscription();
  const [prices, setPrices] = useState<Record<string, { amount_cents: number; currency: string }>>({});
  const [plan, setPlan] = useState<PlanSlug | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("form_prices")
      .select("slug, amount_cents, currency, kind, active")
      .eq("kind", "subscription")
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, { amount_cents: number; currency: string }> = {};
        for (const row of data) {
          if (!row.active) continue;
          map[row.slug] = { amount_cents: row.amount_cents, currency: row.currency };
        }
        setPrices(map);
      });
  }, []);

  const monthly = prices["unlimited-monthly"];
  const annual = prices["unlimited-annual"];

  const savings = useMemo(() => {
    if (!monthly || !annual) return null;
    const full = monthly.amount_cents * 12;
    if (annual.amount_cents >= full) return null;
    return Math.round(((full - annual.amount_cents) / full) * 100);
  }, [monthly, annual]);

  const startCheckout = (p: PlanSlug) => {
    if (!user) {
      toast({
        title: "Sign in first",
        description: "Create a free account so your membership attaches to your dashboard.",
      });
      return;
    }
    if (!isPaymentsConfigured()) {
      toast({ title: "Payments not yet live", description: "Membership checkout is being finalized." });
      return;
    }
    setPlan(p);
  };

  const closeCheckout = () => {
    setPlan(null);
    let n = 0;
    const iv = setInterval(async () => {
      n += 1;
      await refresh();
      if (n >= 6) clearInterval(iv);
    }, 2000);
  };

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-subscription", {
        body: { environment: getStripeEnvironment(), returnUrl: window.location.href },
      });
      if (error || !data?.url) throw new Error(error?.message || data?.error || "Could not open billing portal");
      window.location.href = data.url as string;
    } catch (e) {
      toast({ title: "Billing portal unavailable", description: String((e as Error).message) });
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl px-4 py-12">
      <Head
        title="Unlimited Legal Forms Membership — Pricing | LegallySpoken"
        description="One membership for every fillable legal form and pack: unlimited watermark-free PDFs, e-signature, saved documents and an ad-free site. Monthly or annual."
        englishOnly
      />

      <header className="text-center mb-10">
        <Badge variant="secondary" className="mb-3">Membership</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Unlimited forms, one simple plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Buy forms one at a time, or unlock every form and pack on the site. Most people who need one
          legal document need three within the month — landlords, new hires and small businesses especially.
        </p>
      </header>

      {isSubscriber && (
        <Card className="mb-8 border-accent">
          <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
            <div>
              <p className="font-semibold flex items-center gap-2">
                <Crown className="h-4 w-4 text-accent" /> You're a member
              </p>
              <p className="text-sm text-muted-foreground">
                Plan: {subscription?.plan_slug === "unlimited-annual" ? "Annual" : "Monthly"}
                {subscription?.current_period_end &&
                  ` · ${subscription.cancel_at_period_end ? "Ends" : "Renews"} ${new Date(
                    subscription.current_period_end,
                  ).toLocaleDateString()}`}
              </p>
            </div>
            <Button variant="outline" onClick={openPortal} disabled={portalLoading}>
              {portalLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Manage billing
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-baseline gap-2">
              Monthly
              <span className="text-3xl font-bold">{formatPrice(monthly?.amount_cents, monthly?.currency)}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => startCheckout("unlimited-monthly")} disabled={isSubscriber}>
              {isSubscriber ? "Active membership" : "Start monthly"}
            </Button>
            <p className="text-xs text-muted-foreground">Cancel any time from your dashboard.</p>
          </CardContent>
        </Card>

        <Card className="border-accent shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-baseline gap-2">
              Annual
              <span className="text-3xl font-bold">{formatPrice(annual?.amount_cents, annual?.currency)}</span>
              <span className="text-sm text-muted-foreground">/year</span>
            </CardTitle>
            {savings !== null && <Badge className="w-fit">Save {savings}% vs monthly</Badge>}
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Priority support on document questions</span>
              </li>
            </ul>
            <Button className="w-full" onClick={() => startCheckout("unlimited-annual")} disabled={isSubscriber}>
              {isSubscriber ? "Active membership" : "Start annual"}
            </Button>
            <p className="text-xs text-muted-foreground">Billed once a year. Cancel any time.</p>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h2>What a membership covers</h2>
        <p>
          Every guided form wizard on <Link to="/forms">the forms library</Link> and every bundled pack —
          leases, eviction notices, demand letters, NDAs, promissory notes, employment onboarding packs and
          the EU GDPR packs — download as clean, watermark-free PDFs for as long as your membership is active.
          Documents you generate stay in your library even after you cancel.
        </p>
        <h2>Prefer a single document?</h2>
        <p>
          One-off purchases are still available on each form page. If you buy a single form and upgrade within
          the same session, the membership simply unlocks everything else — nothing is lost.
        </p>
        <p className="text-sm text-muted-foreground">
          LegallySpoken provides self-help document tools and legal information, not legal advice, and using
          this site does not create an attorney-client relationship.
        </p>
      </section>

      {plan && (
        <SubscribeDialog
          open={!!plan}
          plan={plan}
          onClose={closeCheckout}
          returnUrl={`${window.location.origin}/pricing`}
        />
      )}
    </div>
  );
}
