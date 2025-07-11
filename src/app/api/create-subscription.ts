import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { paymentMethodId, userId } = req.body;

    try {
      const supabase = await createClient();

      // Create a Stripe customer
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: (await supabase.auth.getUser()).data.user?.email,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Create a subscription with a 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_PRICE_ID }],
        trial_period_days: 7,
      });

      // Update the user's profile in Supabase
      await supabase
        .from("users_profiles")
        .update({
          stripe_customer_id: customer.id,
          stripe_subscription_id: subscription.id,
          stripe_subscription_status: subscription.status,
        })
        .eq("id", userId);

      res.status(200).json(subscription);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
