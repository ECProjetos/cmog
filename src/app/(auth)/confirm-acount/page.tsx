"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ConfirmAccountPage() {
  const [loading, setLoading] = useState(false);

  function handleResendEmail() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("E-mail reenviado com sucesso!");
    }, 1500);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute left-0 top-0 w-full h-full -z-10">
        <div className="relative w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full animate-video-fade-10s"
            src="/auth-bg.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 dark:to-black/70" />
        </div>
      </div>

      {/* Conteúdo acima do vídeo */}

      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
        <div className="bg-white  p-8 rounded-lg shadow-lg max-w-md w-full text-center dark:bg-gray-800 dark:text-gray-100">
          <h1 className="text-2xl font-bold mb-4">Confirmação de Conta</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Verifique seu e-mail para confirmar sua conta.
          </p>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Se você não recebeu o e-mail, clique no botão abaixo.
          </p>
          <Button
            className="w-full"
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Reenviar E-mail de Confirmação"}
          </Button>
        </div>
      </div>
    </div>
  );
}
