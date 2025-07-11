import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const { data: subscription, error: subError } = await supabase
    .from("")
    .select("stripe_subscription_status")
    .eq("id", data?.user?.id)
    .single();

  if (
    subError ||
    !subscription ||
    (subscription.stripe_subscription_status !== "active" &&
      subscription.stripe_subscription_status !== "trialing")
  ) {
    redirect("/subscribe");
  }
  if (error || !data?.user) {
    redirect("/login");
  }
  return <>{children}</>;
}
