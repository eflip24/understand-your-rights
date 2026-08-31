import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLocalizedPath } from "@/i18n/paths";

const PERKS = [
  "Every fillable form and form pack, unlimited downloads",
  "Clean PDFs with no watermark",
  "E-signature and saved version history",
  "Secure document library in your dashboard",
  "Ad-free browsing across the whole site",
];

function formatPrice(cents?: number, currency = "usd") {
  if (cents === undefined) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function HomeMembershipBand() {
  const lp = useLocalizedPath();
  const { isSubscriber } = useSubscription();
  const [prices, setPrices] = useState<Record<string, { amount_cents: number; currency: string }>>({});

  useEffect(() => {
    supabase
      .from("form_prices")
      .select("slug, amount_cents, currency, kind, active")
      .eq("kind", "subscription")
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, { amount_cents: number; currency: string }> = {};
        for (const row of data) {
          if (row.active) map[row.slug] = { amount_cents: row.amount_cents, currency: row.currency };
        }
        setPrices(map);
      });
  }, []);

  if (isSubscriber) return null;

  const monthly = prices["unlimited-monthly"];
  const annual = prices["unlimited-annual"];
  const monthlyLabel = formatPrice(monthly?.amount_cents, monthly?.currency);
  const annualLabel = formatPrice(annual?.amount_cents, annual?.currency);

  return (
    <section className="bg-secondary/40 border-y py-14 md:py-16">
      <div className="container grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-3">
            <Crown className="h-3.5 w-3.5" /> Membership
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Unlimited legal forms, one simple plan
          </h2>
          <p className="text-muted-foreground mb-5">
            Buy a single form when that&apos;s all you need, or unlock every form and pack on the
            site — leases, notices, demand letters, NDAs, employment packs and the EU GDPR packs.
            Most people who need one legal document need three within the month.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to={lp("/pricing")}>
              <Button size="lg" className="gap-2">
                See membership pricing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={lp("/forms")}>
              <Button size="lg" variant="outline">
                Browse the forms library
              </Button>
            </Link>
          </div>
          {(monthlyLabel || annualLabel) && (
            <p className="mt-3 text-sm text-muted-foreground">
              {monthlyLabel && <>{monthlyLabel} a month</>}
              {monthlyLabel && annualLabel && " · "}
              {annualLabel && <>{annualLabel} a year</>} · cancel any time.
            </p>
          )}
        </div>
        <ul className="space-y-3 rounded-xl border bg-background p-6">
          {PERKS.map((p) => (
            <li key={p} className="flex gap-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
