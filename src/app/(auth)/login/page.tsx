// app/login/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de autenticação com Supabase aqui
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo */}
      <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-[#0D1E57] to-[#3A2B77] text-white p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Podcast
          <br /> <span className="text-green-400">Roda da Prospecção</span>
        </h2>
        <p className="text-lg mb-4">
          Aprenda com os{" "}
          <span className="text-green-400">maiores especialistas</span> do
          mercado em Vendas B2B
        </p>
        <div className="flex gap-4 mt-4">
          {/* Coloque imagens reais depois */}
          <div className="w-20 h-20 bg-white rounded shadow-md" />
          <div className="w-20 h-20 bg-white rounded shadow-md" />
          <div className="w-20 h-20 bg-white rounded shadow-md" />
        </div>
        <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Inscreva-se
        </button>
      </div>

      {/* Lado direito */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          </div>

          <h1 className="text-2xl font-bold text-center text-blue-900">
            Boas-vindas à [SUA PLATAFORMA]
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Entre para acessar a plataforma
          </p>

          <div>
            <Label htmlFor="email" className="text-red-600">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-red-500"
              required
            />
            <p className="text-xs text-red-600 mt-1">Adicione seu e-mail</p>
          </div>

          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline mt-2 inline-block"
            >
              Esqueceu sua senha?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
