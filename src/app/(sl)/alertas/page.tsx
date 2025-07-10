"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Footer from "@/components/footer";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NotificacoesPage() {
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
            <h1 className="text-5xl font-bold mb-4">Notificações Relevantes</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Receba alertas instantâneos sobre novas licitações compatíveis com
              seu perfil. Acompanhe tudo em tempo real e saia na frente da
              concorrência.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-8"
              )}
            >
              Ativar Minhas Notificações
            </Link>
          </section>
        </motion.div>
      </AuroraBackground>

      <main className="container mx-auto px-8 py-12">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Nunca mais perca uma oportunidade
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              O CMOG monitora editais de todo o Brasil e envia notificações
              sempre que uma nova licitação corresponde aos seus critérios.
              Chegue antes, prepare sua proposta com calma e aumente suas
              chances de vitória.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <BellRing className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Alertas Personalizados:</strong> Você escolhe os
                  filtros, nós avisamos quando algo relevante surgir.
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Tempo Real:</strong> Receba as notificações assim que
                  a licitação for publicada. Nada de ficar revisando portais
                  manualmente.
                </span>
              </li>
              <li className="flex items-start">
                <Eye className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Foco total:</strong> Elimine o excesso de informação e
                  visualize apenas editais que fazem sentido para você.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/lps/new-search.gif"
              alt="Notificações de licitações"
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
              Como as notificações ajudam no seu dia a dia?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Mais Agilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Fique sabendo primeiro. Você ganha tempo para montar
                    propostas com calma e aumentar suas chances de sucesso.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Menos Esforço</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Chega de revisar dezenas de portais diariamente. Nós te
                    avisamos sempre que algo bom aparecer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Resultados Mais Relevantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Cada alerta é baseado em palavras-chave, localização,
                    modalidade e muito mais. Personalize tudo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            A oportunidade certa na hora certa
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ative suas notificações inteligentes agora e receba as licitações
            mais relevantes diretamente no seu painel.
          </p>
          <Link href="/register">
            <Button size="lg">Quero Receber Notificações</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
