"use client";

import Footer from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function IndicadoresPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Indicadores e Análise de Dados
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transforme dados em decisões. Visualize o mercado de licitações como
            nunca antes com nossos dashboards interativos e relatórios
            detalhados.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Inteligência de Mercado ao seu Alcance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nossa plataforma coleta, organiza e apresenta dados complexos de
              forma simples e intuitiva, permitindo que você foque no que
              realmente importa: a estratégia.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <BarChart className="text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Análise de Mercado:</strong> Entenda o volume de
                  licitações por região, modalidade e setor.
                </span>
              </li>
              <li className="flex items-start">
                <PieChart className="text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Market Share de Concorrentes:</strong> Saiba quem são
                  os maiores players em seu segmento e qual a sua fatia de
                  mercado.
                </span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Tendências e Sazonalidade:</strong> Identifique
                  padrões de compra do governo e antecipe-se às melhores
                  oportunidades.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            {/* <img
              src="/images/dashboard-analytics.svg"
              alt="Dashboard com gráficos e indicadores"
              className="w-full max-w-lg"
            /> */}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Relatórios que Geram Valor
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho Interno</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Analise sua própria performance: taxa de vitória, propostas
                    enviadas, economia gerada e muito mais.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Preços</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Compare preços de itens adjudicados em todo o país para
                    basear suas propostas em dados sólidos.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Personalizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Crie e exporte relatórios com os dados e filtros que você
                    precisa para suas apresentações e análises.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para tomar decisões baseadas em dados?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Experimente o poder da nossa plataforma de análise e saia na frente.
          </p>
          <Link href="/register">
            <Button size="lg">Explorar Indicadores</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
