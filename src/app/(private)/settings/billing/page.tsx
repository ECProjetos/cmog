"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";

export default function BillingPage() {
  const user = useUserStore((state) => state.user);

  const handleManageSubscription = async () => {
    const response = await fetch("/api/create-portal-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }),
    });

    const { url } = await response.json();

    if (url) {
      window.location.href = url;
    } else {
      toast.error("Erro ao gerenciar assinatura.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Gerenciar Assinatura
        </h1>
        <Button onClick={handleManageSubscription}>Gerenciar Assinatura</Button>
      </div>
    </div>
  );
}