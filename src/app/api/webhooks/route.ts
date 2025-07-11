import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
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
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "customer.subscription.deleted":
      await supabase
        .from("users_profiles")
        .update({
          stripe_subscription_status: "canceled",
        })
        .eq("stripe_subscription_id", event.data.object.id);
      break;
    case "customer.subscription.updated":
      await supabase
        .from("users_profiles")
        .update({
          stripe_subscription_status: event.data.object.status,
        })
        .eq("stripe_subscription_id", event.data.object.id);
      break;
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const stripeSubscriptionId = session.subscription as string;
      const stripeCustomerId = session.customer as string;

      if (userId && stripeSubscriptionId) {
        await supabase
          .from("users_profiles")
          .update({
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            stripe_subscription_status: "active",
          })
          .eq("user_id", userId);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
