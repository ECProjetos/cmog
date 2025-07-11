"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Footer from "@/components/footer";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, CheckSquare, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OrganizacaoPage() {
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
            <h1 className="text-5xl font-bold mb-4">Organização Estratégica</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mantenha suas licitações organizadas, com pastas personalizadas e
              painéis visuais que te ajudam a priorizar o que realmente importa.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-8"
              )}
            >
              Testar Agora
            </Link>
          </section>
        </motion.div>
      </AuroraBackground>

      <main className="container mx-auto px-8 py-12">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Um painel limpo para suas oportunidades
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Com o CMoG, você visualiza todas as licitações de forma clara.
              Organize suas oportunidades em pastas e etapas, como “Para
              Análise”, “Em Andamento” ou “Finalizadas”.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FolderKanban className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Pastas Inteligentes:</strong> Classifique suas
                  licitações por categoria ou status com um simples clique.
                </span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Visualização Estratégica:</strong> Saiba exatamente em
                  que etapa cada licitação está — sem confusão ou planilhas.
                </span>
              </li>
              <li className="flex items-start">
                <Lightbulb className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Foco no que importa:</strong> Filtre por tipo de
                  oportunidade ou valor estimado e priorize as melhores chances
                  de sucesso.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/lps/status-org.gif"
              alt="Organização de licitações"
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
              Recursos que te dão controle total
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Central de Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Armazene arquivos essenciais como atestados, certidões e
                    propostas, todos acessíveis diretamente pela licitação.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tags Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Crie e aplique etiquetas temáticas para organizar suas
                    oportunidades por nicho, cliente ou estratégia de venda.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Priorização Simples</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Destaque licitações com alto potencial e foque onde há mais
                    chance de resultado positivo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            Menos bagunça. Mais clareza.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Abandone planilhas confusas e centralize tudo em um painel criado
            para o dia a dia das licitações.
          </p>
          <Link href="/register">
            <Button size="lg">Organize suas Licitações</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
