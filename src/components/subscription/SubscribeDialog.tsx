import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

export type PlanSlug = "unlimited-monthly" | "unlimited-annual";

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
            {plan === "unlimited-annual" ? "Unlimited Forms — Annual" : "Unlimited Forms — Monthly"}
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
