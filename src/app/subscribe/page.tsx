"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SubscribePage() {
  const [agreed, setAgreed] = useState(false);
  const paymentLink = "https://buy.stripe.com/8x24gy9vT2bP4EtfRE2VG00";

  const handleRedirect = () => {
    if (agreed) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quase lá! Confirme sua assinatura.
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300 pt-2">
            Você está prestes a iniciar seu teste gratuito de 7 dias.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-200 mt-2">
              R$19,99/mês
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Após 7 dias de teste gratuito
            </p>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Ao clicar em &quot;Iniciar meu teste gratuito&quot;, você concorda
              que, após o período de 7 dias, sua assinatura começará e você será
              cobrado(a) R$19,99 mensalmente.
            </p>
            <p>
              Sua assinatura será renovada automaticamente todos os meses, mas
              você pode cancelar a qualquer momento através do seu painel de
              configurações.
            </p>
            <p>
              Ao clicar em &quot;Iniciar meu teste gratuito&quot;, você sera
              redirecionado(a) para o Stripe, onde poderá inserir suas
              informações de pagamento.
            </p>
          </div>
          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={() => setAgreed(!agreed)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eu li, entendi e concordo com os termos da assinatura.
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleRedirect}
            disabled={!agreed}
            className="w-full"
            size="lg"
          >
            Iniciar meu teste gratuito
          </Button>
          <Link
            href="/"
            className="text-sm text-center text-gray-500 hover:underline"
          >
            Voltar para a página inicial
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
