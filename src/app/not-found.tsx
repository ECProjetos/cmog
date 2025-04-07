"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
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
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="w-24 h-1 bg-indigo-500 mx-auto my-4"></div>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está tentando acessar não existe ou foi
          removida.
        </p>
        <Button variant="outline" asChild>
          <Link href="/busca">Voltar para a página inicial</Link>
        </Button>
      </div>
    </div>
  );
}
