import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const PLAN_INTERVAL: Record<string, "month" | "year"> = {
  "unlimited-monthly": "month",
  "unlimited-annual": "year",
};

async function resolveCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  opts: { email?: string; userId: string },
): Promise<string> {
  if (!/^[a-zA-Z0-9_-]+$/.test(opts.userId)) throw new Error("Invalid userId");
  const found = await stripe.customers.search({
    query: `metadata['userId']:'${opts.userId}'`,
    limit: 1,
  });
  if (found.data.length) return found.data[0].id;
  if (opts.email) {
    const existing = await stripe.customers.list({ email: opts.email, limit: 1 });
    if (existing.data.length) {
      const c = existing.data[0];
      await stripe.customers.update(c.id, { metadata: { ...c.metadata, userId: opts.userId } });
      return c.id;
    }
  }
  const created = await stripe.customers.create({
    ...(opts.email && { email: opts.email }),
    metadata: { userId: opts.userId },
  });
  return created.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const { plan, environment, returnUrl } = await req.json();
    const interval = PLAN_INTERVAL[plan];
    if (!interval) throw new Error("Unknown plan");
    if (environment !== "sandbox" && environment !== "live") throw new Error("Invalid environment");
    if (!returnUrl || typeof returnUrl !== "string") throw new Error("Missing returnUrl");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Sign in required to start a membership");
    const { data: userData } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    const user = userData?.user;
    if (!user) throw new Error("Sign in required to start a membership");

    const { data: priceRow, error: priceErr } = await supabase
      .from("form_prices")
      .select("slug, title, amount_cents, currency, active, kind")
      .eq("slug", plan)
      .maybeSingle();
    if (priceErr) throw new Error(`Price lookup failed: ${priceErr.message}`);
    if (!priceRow || priceRow.kind !== "subscription") throw new Error("Unknown plan");
    if (!priceRow.active) throw new Error("This plan is not currently available.");

    // Already a member? Don't let them buy a second subscription.
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("id, status")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .maybeSingle();
    if (existing) throw new Error("You already have an active membership.");

    const stripe = createStripeClient(environment as StripeEnv);
    const customerId = await resolveCustomer(stripe, { userId: user.id, email: user.email ?? undefined });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      customer: customerId,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: (priceRow.currency as string) || "usd",
          unit_amount: priceRow.amount_cents as number,
          recurring: { interval },
          product_data: {
            name: priceRow.title as string,
            metadata: { plan_slug: plan },
          },
        },
      }],
      subscription_data: {
        metadata: { plan_slug: plan, userId: user.id },
      },
      metadata: { plan_slug: plan, userId: user.id },
    } as any);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-subscription-checkout error:", e);
    return new Response(JSON.stringify({ error: String((e as Error).message || e) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
