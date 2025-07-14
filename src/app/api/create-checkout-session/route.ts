import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/minhas-licitacoes`,
      cancel_url: `${req.headers.get("origin")}/subscribe`,
      client_reference_id: user.id,
      customer_email: user.email,
      subscription_data: {
        trial_period_days: 7,

      },
      allow_promotion_codes: true,
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
