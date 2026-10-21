import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import SubscribeDialog from "@/components/subscription/SubscribeDialog";
import { LAWYER_LISTING_PRICES, ReviewJurisdiction } from "@/data/lawyerReview";

export default function LawyerListingCard({ jurisdiction }: { jurisdiction: ReviewJurisdiction }) {
  const { user } = useAuth();
  const [active, setActive] = useState<{ status: string; current_period_end: string | null } | null>(null);
  const [open, setOpen] = useState(false);
  const plan = LAWYER_LISTING_PRICES[jurisdiction];

  useEffect(() => {
    if (!user) return;
    supabase.from("subscriptions").select("status, current_period_end")
      .eq("user_id", user.id).like("plan_slug", "lawyer-%")
      .in("status", ["active", "trialing", "past_due"]).limit(1).maybeSingle()
      .then(({ data }) => setActive(data ?? null));
  }, [user]);

  return (
    <Card className="mt-6"><CardContent className="pt-6 flex flex-wrap items-center justify-between gap-3">
      {active ? (
        <p className="text-sm">Panel listing: <strong>active</strong>
          {active.current_period_end && ` — renews ${new Date(active.current_period_end).toLocaleDateString()}`}</p>
      ) : (
        <>
          <div>
            <p className="font-semibold">Panel listing — {plan.label}</p>
            <p className="text-sm text-muted-foreground">Flat monthly fee, cancel anytime. You keep 100% of every fee your clients pay you.</p>
          </div>
          <Button onClick={() => setOpen(true)}>Activate listing</Button>
        </>
      )}
      <SubscribeDialog open={open} onClose={() => setOpen(false)} plan={plan.slug}
        returnUrl={`${window.location.origin}/lawyer-portal?listing=done`} />
    </CardContent></Card>
  );
}
