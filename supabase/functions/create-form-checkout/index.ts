import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Server-authoritative price map. Amounts in cents (USD).
const FORM_PRICES_CENTS: Record<string, { amount: number; title: string; kind: "form" | "pack" }> = {
  // Individual forms
  "w-9": { amount: 499, title: "Form W-9 (Clean PDF)", kind: "form" },
  "w-4": { amount: 499, title: "Form W-4 (Clean PDF)", kind: "form" },
  "i-9": { amount: 499, title: "Form I-9 (Clean PDF)", kind: "form" },
  "nda": { amount: 999, title: "Non-Disclosure Agreement (Clean PDF)", kind: "form" },
  "residential-lease-agreement": { amount: 1499, title: "Residential Lease Agreement (Clean PDF)", kind: "form" },
  "power-of-attorney-financial": { amount: 1499, title: "Financial Power of Attorney (Clean PDF)", kind: "form" },
  "vehicle-bill-of-sale": { amount: 999, title: "Vehicle Bill of Sale (Clean PDF)", kind: "form" },
  "eviction-notice": { amount: 999, title: "Eviction Notice (Clean PDF)", kind: "form" },
  "demand-letter": { amount: 999, title: "Demand Letter (Clean PDF)", kind: "form" },
  "promissory-note": { amount: 1499, title: "Promissory Note (Clean PDF)", kind: "form" },
  "release-of-liability": { amount: 999, title: "Release of Liability (Clean PDF)", kind: "form" },
  "offer-letter": { amount: 499, title: "Employment Offer Letter (Clean PDF)", kind: "form" },
  "independent-contractor-agreement": { amount: 699, title: "Independent Contractor Agreement (Clean PDF)", kind: "form" },
  "direct-deposit-authorization": { amount: 399, title: "Direct Deposit Authorization (Clean PDF)", kind: "form" },
  "notice-to-vacate": { amount: 399, title: "Notice to Vacate (Clean PDF)", kind: "form" },
  "move-in-move-out-checklist": { amount: 399, title: "Move-In / Move-Out Checklist (Clean PDF)", kind: "form" },
  "security-deposit-receipt": { amount: 399, title: "Security Deposit Receipt (Clean PDF)", kind: "form" },
  "late-rent-notice": { amount: 399, title: "Late Rent Notice (Clean PDF)", kind: "form" },
  "llc-operating-agreement": { amount: 999, title: "LLC Operating Agreement (Clean PDF)", kind: "form" },
  "healthcare-power-of-attorney": { amount: 699, title: "Healthcare Power of Attorney (Clean PDF)", kind: "form" },
  "simple-will": { amount: 999, title: "Simple Will (Clean PDF)", kind: "form" },
  "living-will": { amount: 699, title: "Living Will (Clean PDF)", kind: "form" },
  "hipaa-authorization": { amount: 499, title: "HIPAA Authorization (Clean PDF)", kind: "form" },
  // Packs
  "new-hire-pack": { amount: 3400, title: "New Hire Forms Pack (Clean ZIP)", kind: "pack" },
  "landlord-starter-pack": { amount: 2900, title: "Landlord Starter Pack (Clean ZIP)", kind: "pack" },
  "small-business-pack": { amount: 3900, title: "Small Business Basics Pack (Clean ZIP)", kind: "pack" },
  "personal-planning-pack": { amount: 3400, title: "Personal Planning Pack (Clean ZIP)", kind: "pack" },
};

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

    const priceEntry = FORM_PRICES_CENTS[slug];
    if (!priceEntry) throw new Error(`Unknown form slug: ${slug}`);

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
          currency: "usd",
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
