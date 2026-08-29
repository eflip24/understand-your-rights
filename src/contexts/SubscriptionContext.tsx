import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SubscriptionRow {
  id: string;
  plan_slug: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

interface SubscriptionContextValue {
  subscription: SubscriptionRow | null;
  isSubscriber: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ACTIVE_STATUSES = ["active", "trialing", "past_due"];

const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  isSubscriber: false,
  loading: true,
  refresh: async () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("subscriptions")
      .select("id, plan_slug, status, current_period_end, cancel_at_period_end")
      .eq("user_id", user.id)
      .in("status", ACTIVE_STATUSES)
      .maybeSingle();
    setSubscription((data as SubscriptionRow) ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    setLoading(true);
    void refresh();
  }, [authLoading, refresh]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isSubscriber: Boolean(subscription),
        loading,
        refresh,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
