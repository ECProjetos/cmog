"use client";

import Footer from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Building, TrendingUp, Target } from "lucide-react";
import Link from "next/link";

export default function EmpresasPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Soluções Completas para Empresas de Todos os Portes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Seja você um microempreendedor ou uma grande corporação, nossa
            plataforma oferece as ferramentas certas para você dominar o mercado
            de licitações e expandir seus negócios com o governo.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <img
              src="/images/company-growth.svg"
              alt="Gráfico de crescimento empresarial"
              className="w-full max-w-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Inteligência de Mercado para Decisões Estratégicas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vá além da simples busca de editais. Nossa plataforma transforma
              dados brutos em insights valiosos para sua empresa.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Análise de Concorrência:</strong> Monitore seus
                  concorrentes, entenda suas estratégias de preço e áreas de
                  atuação.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Inteligência de Órgãos Públicos:</strong> Descubra
                  quais órgãos mais compram seus produtos/serviços e histórico
                  de compras.
                </span>
              </li>
              <li className="flex items-start">
                <Check className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  <strong>Precificação Inteligente:</strong> Analise resultados
                  de licitações passadas para otimizar suas propostas e aumentar
                  suas chances de vitória.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Ferramentas para Cada Etapa do Processo
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Building className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Gestão de Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Mantenha toda a documentação da sua empresa organizada e
                    pronta para qualquer licitação, com alertas de vencimento.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Análise de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Acompanhe sua taxa de sucesso, volume de propostas e
                    resultados para identificar pontos de melhoria.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Target className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>Equipe Colaborativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Adicione membros da sua equipe, distribua tarefas e gerencie
                    todo o fluxo de trabalho de licitações em um só lugar.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            Transforme a maneira como sua empresa participa de licitações.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Descubra um plano que se encaixa perfeitamente nas suas
            necessidades.
          </p>
          <Link href="/pricing">
            <Button size="lg" variant="default">
              Ver Planos e Preços
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
