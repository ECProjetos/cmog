import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      const supabase = await createClient();

      const { data: user, error } = await supabase
        .from("users")
        .select("stripe_customer_id")
        .eq("id", userId)
        .single();

      if (error || !user) {
        throw new Error("User not found");
      }

      const { url } = await stripe.billingPortal.sessions.create({
        customer: user.stripe_customer_id,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings/billing`,
      });

      res.status(200).json({ url });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
