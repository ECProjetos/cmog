"use client";

import Footer from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BuscaRapidaPage() {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center justify-center px-6 md:px-12 text-center gap-6 max-w-4xl mx-auto py-24 mt-16"
        >
          <section className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Busca Rápida e Poderosa</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Encontre qualquer licitação no Brasil em segundos. Nossa
              ferramenta de busca foi desenhada para ser intuitiva, rápida e
              extremamente eficaz.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Digite o que você procura: objeto, modalidade, órgão..."
                  className="w-full p-4 text-lg"
                />
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "absolute right-2 top-1/2 -translate-y-1/2"
                  )}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Buscar
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </AuroraBackground>
      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            <Image
              src="/lps/new-search.gif"
              alt="Busca Rápida"
              width={600}
              height={200}
              className="w-lg rounded-lg shadow-lg dark:shadow-gray-800 transition-transform transform hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Resultados precisos em segundos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nossa tecnologia de busca analisa automaticamente as licitações
              mais recentes com base no seu perfil e suas palavras-chave.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                ✓ Busque por área de atuação, estado, modalidade ou termos
                técnicos
              </li>
              <li>✓ Elimine resultados irrelevantes com filtros negativos</li>
              <li>✓ Receba apenas oportunidades compatíveis com seu negócio</li>
              <li>✓ Acompanhe tudo em um painel unificado</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16 my-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Palavras-Chave: o poder da personalização
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Use palavras-chave positivas e negativas para garantir que você
              veja somente o que interessa — e evite ruídos nas suas buscas.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                  Palavras-Chave Positivas
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Inclua licitações que contenham <strong>qualquer um</strong>{" "}
                  destes termos. Ideal para abranger todas as oportunidades
                  relevantes.
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p className="font-mono text-sm">
                    <strong>Exemplo:</strong>
                  </p>
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                    manutenção elétrica, instalação de sistema solar, geradores
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
                  Palavras-Chave Negativas
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Exclua licitações que contenham <strong>qualquer um</strong>{" "}
                  destes termos. Perfeito para limpar sua busca de resultados
                  irrelevantes.
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p className="font-mono text-sm">
                    <strong>Exemplo:</strong>
                  </p>
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                    medicamentos, transporte escolar, automotivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para encontrar as melhores oportunidades?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Deixe o CMOG buscar por você. Resultados relevantes, em tempo real,
            com zero complicação.
          </p>
          <Link href="/register">
            <Button size="lg">Comece agora, é grátis</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
