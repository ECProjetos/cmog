"use client";

import Image from "next/image";
import LoginForm from "./login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100">
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
            <h1 className="text-2xl font-bold">Boas Vindas ao CMOG</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Entre com sua conta
            </p>
          </div>

          <div className="w-full max-w-sm flex flex-col">
            <LoginForm />

            <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <p>
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 dark:text-blue-400 hover:underline ml-1"
                >
                  Cadastre-se
                </Link>
              </p>
              <p>
                <Link
                  href="/forgot-password"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
