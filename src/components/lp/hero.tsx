"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-28 md:pt-36 pb-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Encontre e Vença Licitações Públicas com Facilidade
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Uma plataforma inteligente que ajuda você a localizar, organizar e
          ganhar licitações públicas no Brasil.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
          >
            Criar Conta Grátis
          </Link>
          <Link
            href="#como-funciona"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Ver como funciona
          </Link>
        </div>
      </div>
    </section>
  );
}
