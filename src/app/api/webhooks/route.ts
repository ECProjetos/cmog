import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("WEBHOOK_ERROR: Missing signature or secret.");
    return new NextResponse(
      JSON.stringify({ error: "Webhook Error: Missing signature or secret" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      const { error: deleteError } = await supabase
        .from("users_profiles")
        .update({
          stripe_subscription_status: "canceled",
        })
        .eq("stripe_subscription_id", subscriptionDeleted.id);
      if (deleteError) {
        console.error(`WEBHOOK_DB_ERROR (delete): ${deleteError.message}`);
      }
      break;
    case "customer.subscription.updated":
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      const { error: updateError } = await supabase
        .from("users_profiles")
        .update({
          stripe_subscription_status: subscriptionUpdated.status,
        })
        .eq("stripe_subscription_id", subscriptionUpdated.id);
      if (updateError) {
        console.error(`WEBHOOK_DB_ERROR (update): ${updateError.message}`);
      }
      break;
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const stripeSubscriptionId = session.subscription as string;
      const stripeCustomerId = session.customer as string;


      if (userId && stripeSubscriptionId) {
        const { error: checkoutError } = await supabase
          .from("users_profiles")
          .update({
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            stripe_subscription_status: "active",
          })
          .eq("user_id", userId);

        if (checkoutError) {
          console.error(`WEBHOOK_DB_ERROR (checkout): ${checkoutError.message}`);
        }
      } else {
        console.error("WEBHOOK_DATA_ERROR: Missing userId or stripeSubscriptionId in checkout session.");
      }
      break;
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
