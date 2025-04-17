"use client";

import RegisterForm from "./register-form";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Lado esquerdo da tela */}
      <div className="w-1/3 relative">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src="/auth-bg.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-black/70 via-transparent to-white/80 dark:to-black/70" />
      </div>

      {/* Lado direito da tela */}
      <div className="w-2/3 flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 transition-all duration-300">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col gap-4 items-center justify-center mb-6 text-center w-full max-w-sm">
            <Image src="/logo.svg" alt="Logo" width={150} height={100} />
            <h1 className="text-2xl font-bold">Crie sua conta agora!</h1>
          </div>

          <div className="w-full max-w-sm flex flex-col">
            <RegisterForm />
          </div>

          <div className="items-start mt-4">
            <Link
              href="/login"
              className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
            >
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
