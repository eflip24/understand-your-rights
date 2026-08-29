import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function upsertSubscription(sub: any) {
  const userId = sub.metadata?.userId;
  if (!userId) {
    console.log("subscription event missing userId metadata — skipping", sub.id);
    return;
  }
  const periodEnd = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
  const { error } = await getSupabase().from("subscriptions").upsert(
    {
      user_id: userId,
      plan_slug: sub.metadata?.plan_slug || "unlimited-monthly",
      status: sub.status,
      stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null,
      stripe_subscription_id: sub.id,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: Boolean(sub.cancel_at_period_end),
    },
    { onConflict: "stripe_subscription_id" },
  );
  if (error) console.error("subscriptions upsert error", error);
}

async function handleCheckoutCompleted(session: any) {
  if (session.mode === "subscription") {
    console.log("subscription checkout completed", session.id);
    return; // subscription.* events carry the authoritative state
  }
  const md = session.metadata || {};
  const formSlug = md.form_slug;
  const userId = md.userId;
  const formTitle = md.form_title || "your document";
  const kind = md.kind || "form";
  const recipient =
    session.customer_details?.email ||
    session.customer_email ||
    null;

  if (!formSlug || !userId) {
    console.log("checkout.session.completed missing form_slug or userId — skipping", { formSlug, userId });
  } else {
    const { error } = await getSupabase().from("form_purchases").upsert(
      {
        user_id: userId,
        form_slug: formSlug,
        stripe_session_id: session.id,
        amount_cents: session.amount_total ?? null,
      },
      { onConflict: "user_id,form_slug" },
    );
    if (error) console.error("form_purchases upsert error", error);
  }

  // Fire purchase receipt (idempotent via idempotencyKey on session id).
  if (recipient) {
    try {
      const amountCents = session.amount_total ?? 0;
      const currency = (session.currency || "usd").toUpperCase();
      const amount =
        amountCents > 0
          ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amountCents / 100)
          : "";
      const dateStr = new Date(
        (session.created ?? Math.floor(Date.now() / 1000)) * 1000,
      ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      const dashboardUrl = "https://legallyspoken.com/dashboard/documents";
      const { error: sendErr } = await getSupabase().functions.invoke(
        "send-transactional-email",
        {
          body: {
            templateName: "purchase-receipt",
            recipientEmail: recipient,
            idempotencyKey: `receipt-${session.id}`,
            templateData: {
              formTitle,
              amount,
              currency,
              orderId: session.id,
              purchaseDate: dateStr,
              downloadUrl: dashboardUrl,
              dashboardUrl,
              kind,
            },
          },
        },
      );
      if (sendErr) console.error("receipt send error", sendErr);
    } catch (e) {
      console.error("receipt send exception", e);
    }
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;
  try {
    const event = await verifyWebhook(req, env);
    switch (event.type) {
      case "checkout.session.completed":
      case "transaction.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await upsertSubscription(event.data.object);
        break;
      default:
        console.log("Unhandled event:", event.type);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
