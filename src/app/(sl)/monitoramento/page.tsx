"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Footer from "@/components/footer";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, BarChart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SucessoPage() {
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
            <h1 className="text-5xl font-bold mb-4">Foco no Sucesso</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mais do que encontrar licitações: o CMOG te ajuda a focar nas
              melhores oportunidades, tomar decisões assertivas e aumentar suas
              chances reais de vencer.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-8"
              )}
            >
              Aumentar Minhas Chances
            </Link>
          </section>
        </motion.div>
      </AuroraBackground>

      <main className="container mx-auto px-8 py-12">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Seu tempo é valioso. Foque onde há retorno.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Em vez de desperdiçar recursos com licitações pouco promissoras,
              use o CMOG para identificar editais com maior aderência ao seu
              perfil e maior potencial de vitória.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Target className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Filtros com Propósito:</strong> Refinamos sua busca
                  para destacar oportunidades que realmente valem a pena.
                </span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Foco Estratégico:</strong> Visualize editais por
                  valor, setor, localização ou tipo de contratação para alinhar
                  com sua capacidade de entrega.
                </span>
              </li>
              <li className="flex items-start">
                <BarChart className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Decisões Inteligentes:</strong> Economize tempo e
                  aumente suas chances concentrando seus esforços nas melhores
                  oportunidades.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/lps/status-org.gif"
              alt="Foco em sucesso de licitações"
              width={600}
              height={200}
              className="w-lg rounded-lg shadow-lg dark:shadow-gray-800 transition-transform transform hover:scale-105"
              loading="lazy"
            />
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Tenha uma visão estratégica do seu desempenho
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Mais Assertividade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ao priorizar as licitações mais compatíveis com sua empresa,
                    suas propostas se tornam mais competitivas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Menos Dispersão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Direcione seu tempo e equipe para o que realmente pode
                    trazer resultado. Menos volume, mais impacto.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rumo às Vitórias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Acompanhe seus progressos, melhore suas escolhas e aumente
                    seu histórico de vitórias com dados concretos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para vencer mais licitações?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Com o CMOG, você transforma intenção em resultado. A hora de crescer
            é agora.
          </p>
          <Link href="/register">
            <Button size="lg">Comece a Vencer Hoje</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
