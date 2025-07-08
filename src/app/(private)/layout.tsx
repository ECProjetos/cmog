import { getUser } from "@/hooks/use-user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const supabase = await createClient();

  if (user) {
    const { data: subscription, error } = await supabase
      .from("users")
      .select("stripe_subscription_status")
      .eq("id", user.id)
      .single();

    if (error || !subscription || (subscription.stripe_subscription_status !== 'active' && subscription.stripe_subscription_status !== 'trialing')) {
      redirect("/subscribe");
    }
  }

  return <>{children}</>;
}