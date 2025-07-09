import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!signature || Array.isArray(signature)) {
      res.status(400).send("Webhook Error: Missing or invalid stripe signature");
      return;
    }
    if (!webhookSecret) {
      res.status(500).send("Webhook Error: Missing webhook secret configuration");
      return;
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const supabase = await createClient();

    switch (event.type) {
      case "customer.subscription.deleted":
        await supabase
          .from("users")
          .update({
            stripe_subscription_status: "canceled",
          })
          .eq("stripe_subscription_id", event.data.object.id);
        break;
      case "customer.subscription.updated":
        await supabase
          .from("users")
          .update({
            stripe_subscription_status: event.data.object.status,
          })
          .eq("stripe_subscription_id", event.data.object.id);
        break;
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email;
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId = session.subscription as string;

        if (customerEmail && stripeSubscriptionId) {
          const { data: user, error } = await supabase
            .from("users")
            .select("id")
            .eq("email", customerEmail)
            .single();

          if (user) {
            await supabase
              .from("users")
              .update({
                stripe_customer_id: stripeCustomerId,
                stripe_subscription_id: stripeSubscriptionId,
                stripe_subscription_status: "active",
              })
              .eq("id", user.id);
          } else if (error) {
            console.error("Error fetching user by email:", error);
          }
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
