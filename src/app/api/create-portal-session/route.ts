import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: profile } = await supabase
    .from("users_profiles")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!profile || !profile.stripe_customer_id) {
    return new NextResponse(JSON.stringify({ error: "Stripe customer not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings/billing`,
    });

    return new NextResponse(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating portal session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
