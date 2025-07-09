"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SubscribePage() {
  const paymentLink = "https://buy.stripe.com/test_aFa14p2widaR3Vnc1rgQE00";

  useEffect(() => {
    window.location.href = paymentLink;
  }, []);

  const handleRedirect = () => {
    window.location.href = paymentLink;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Você está sendo redirecionado para a página de pagamento
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Se você não for redirecionado automaticamente, clique no botão abaixo.
        </p>
        <Button
          onClick={handleRedirect}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Ir para a página de pagamento
        </Button>
      </div>
    </div>
  );
}