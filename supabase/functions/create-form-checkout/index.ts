import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Prices live in the public.form_prices table (admin-editable).
// Read via service role so RLS is bypassed and inactive rows can also be
// rejected explicitly with a clearer error than "not found".

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  opts: { email?: string; userId?: string },
): Promise<string> {
  if (opts.userId && !/^[a-zA-Z0-9_-]+$/.test(opts.userId)) throw new Error("Invalid userId");
  if (opts.userId) {
    const found = await stripe.customers.search({
      query: `metadata['userId']:'${opts.userId}'`,
      limit: 1,
    });
    if (found.data.length) return found.data[0].id;
  }
  if (opts.email) {
    const existing = await stripe.customers.list({ email: opts.email, limit: 1 });
    if (existing.data.length) {
      const c = existing.data[0];
      if (opts.userId && c.metadata?.userId !== opts.userId) {
        await stripe.customers.update(c.id, { metadata: { ...c.metadata, userId: opts.userId } });
      }
      return c.id;
    }
  }
  const created = await stripe.customers.create({
    ...(opts.email && { email: opts.email }),
    ...(opts.userId && { metadata: { userId: opts.userId } }),
  });
  return created.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const { slug, environment, returnUrl } = await req.json();
    if (!slug || typeof slug !== "string") throw new Error("Missing slug");
    if (environment !== "sandbox" && environment !== "live") throw new Error("Invalid environment");

    const { data: priceRow, error: priceErr } = await supabase
      .from("form_prices")
      .select("slug, title, kind, amount_cents, currency, active")
      .eq("slug", slug)
      .maybeSingle();
    if (priceErr) throw new Error(`Price lookup failed: ${priceErr.message}`);
    if (!priceRow) throw new Error(`Unknown form slug: ${slug}`);
    if (!priceRow.active) throw new Error(`This item is not currently available for purchase.`);
    const priceEntry = {
      amount: priceRow.amount_cents as number,
      title: priceRow.title as string,
      kind: priceRow.kind as "form" | "pack",
      currency: (priceRow.currency as string) || "usd",
    };

    // Auth (optional — anonymous purchases allowed, but we prefer to link userId)
    const authHeader = req.headers.get("Authorization");
    let userId: string | undefined;
    let email: string | undefined;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabase.auth.getUser(token);
      if (data?.user) {
        userId = data.user.id;
        email = data.user.email ?? undefined;
      }
    }

    const stripe = createStripeClient(environment as StripeEnv);
    const customerId = (userId || email)
      ? await resolveOrCreateCustomer(stripe, { userId, email })
      : undefined;

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: priceEntry.currency,
          product_data: {
            name: priceEntry.title,
            metadata: { form_slug: slug, kind: priceEntry.kind },
          },
          unit_amount: priceEntry.amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(customerId && { customer: customerId }),
      payment_intent_data: { description: priceEntry.title },
      automatic_tax: { enabled: true },
      metadata: {
        form_slug: slug,
        kind: priceEntry.kind,
        ...(userId && { userId }),
      },
    } as any);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-form-checkout error:", e);
    return new Response(JSON.stringify({ error: String((e as Error).message || e) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
