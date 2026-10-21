import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

export type PlanSlug = "unlimited-monthly" | "unlimited-annual" | "lawyer-listing-ie" | "lawyer-listing-us";

const PLAN_TITLES: Record<PlanSlug, string> = {
  "unlimited-monthly": "Unlimited Forms — Monthly",
  "unlimited-annual": "Unlimited Forms — Annual",
  "lawyer-listing-ie": "Solicitor Panel Listing — €39/month",
  "lawyer-listing-us": "Lawyer Panel Listing — $49/month",
};

interface Props {
  open: boolean;
  onClose: () => void;
  plan: PlanSlug;
  returnUrl: string;
}

export default function SubscribeDialog({ open, onClose, plan, returnUrl }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-subscription-checkout", {
      body: { plan, environment: getStripeEnvironment(), returnUrl },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || data?.error || "Failed to start membership checkout");
    }
    return data.clientSecret;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {PLAN_TITLES[plan]}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {open && (
            <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
