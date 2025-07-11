import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  console.log("WEBHOOK: Received a request.");
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
    console.log("WEBHOOK: Constructing event...");
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`WEBHOOK: Event constructed successfully: ${event.type}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(`WEBHOOK_ERROR: Error constructing event: ${err.message}`);
    return new NextResponse(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient();

  switch (event.type) {
    case "customer.subscription.deleted":
      console.log("WEBHOOK: Handling customer.subscription.deleted");
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      const { error: deleteError } = await (await supabase)
        .from("users_profiles")
        .update({
          stripe_subscription_status: "canceled",
        })
        .eq("stripe_subscription_id", subscriptionDeleted.id);
      if (deleteError) {
        console.error(`WEBHOOK_DB_ERROR (delete): ${deleteError.message}`);
      } else {
        console.log(`WEBHOOK_DB_SUCCESS (delete): Subscription ${subscriptionDeleted.id} marked as canceled.`);
      }
      break;
    case "customer.subscription.updated":
      console.log("WEBHOOK: Handling customer.subscription.updated");
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      const { error: updateError } = await (await supabase)
        .from("users_profiles")
        .update({
          stripe_subscription_status: subscriptionUpdated.status,
        })
        .eq("stripe_subscription_id", subscriptionUpdated.id);
      if (updateError) {
        console.error(`WEBHOOK_DB_ERROR (update): ${updateError.message}`);
      } else {
        console.log(`WEBHOOK_DB_SUCCESS (update): Subscription ${subscriptionUpdated.id} status updated to ${subscriptionUpdated.status}.`);
      }
      break;
    case "checkout.session.completed": {
      console.log("WEBHOOK: Handling checkout.session.completed");
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const stripeSubscriptionId = session.subscription as string;
      const stripeCustomerId = session.customer as string;

      console.log(`WEBHOOK_DATA: userId: ${userId}, stripeSubscriptionId: ${stripeSubscriptionId}, stripeCustomerId: ${stripeCustomerId}`);

      if (userId && stripeSubscriptionId) {
        console.log(`WEBHOOK_DB: Updating profile for user_id: ${userId}`);
        const { error: checkoutError } = await (await supabase)
          .from("users_profiles")
          .update({
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            stripe_subscription_status: "active",
          })
          .eq("user_id", userId);
        
        if (checkoutError) {
          console.error(`WEBHOOK_DB_ERROR (checkout): ${checkoutError.message}`);
        } else {
          console.log(`WEBHOOK_DB_SUCCESS (checkout): Profile for user_id ${userId} updated.`);
        }
      } else {
        console.error("WEBHOOK_DATA_ERROR: Missing userId or stripeSubscriptionId in checkout session.");
      }
      break;
    }
    default:
      console.log(`WEBHOOK: Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
