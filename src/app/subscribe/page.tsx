"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";


export default function SubscribePage() {
  const [agreed, setAgreed] = useState(false);
  const paymentLink = "https://buy.stripe.com/8x24gy9vT2bP4EtfRE2VG00";

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        userId: user?.id,
      }),
    });

    const subscription = await response.json();

    if (subscription.error) {
      toast.error(subscription.error);
    } else {
      toast.success("Inscrição realizada com sucesso!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? "Carregando..." : "Iniciar teste gratuito"}
      </Button>
    </form>
  );
}

export default function SubscribePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Inscreva-se para um teste gratuito de 7 dias
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}