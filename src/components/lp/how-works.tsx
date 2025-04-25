/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function HowWorks() {
  const data = [
    {
      title: "Crie sua conta",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-5 pr-2 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
            <p>
              Cadastre-se rapidamente usando seu e-mail ou acesso social. O
              onboarding é direto: você informa o que procura e nós cuidamos do
              resto.
            </p>
            <p>
              A partir do primeiro acesso, você já tem uma visão clara das
              licitações mais recentes, separadas por relevância e área de
              interesse.
            </p>
            <p>
              Sem burocracia: em poucos cliques, você está pronto para buscar
              oportunidades com potencial real de vitória.
            </p>
          </div>
          <div className="w-full md:w-[45%] lg:w-[40%] max-w-md">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="w-full h-auto max-h-60 md:max-h-72 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Encontre licitações certeiras",
      content: (
        <div className="flex flex-col md:flex-row-reverse items-center gap-6">
          <div className="flex-1 space-y-5 pr-2 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
            <p>
              Use filtros avançados para localizar licitações públicas por
              órgão, região, tipo de objeto, datas, e palavras-chave. Cada
              resultado vem detalhado, com acesso direto ao edital.
            </p>
            <p>
              Você pode salvar suas buscas favoritas, automatizar consultas
              recorrentes e criar uma base de oportunidades personalizada.
            </p>
            <p>
              O algoritmo aprende com suas preferências e melhora as
              recomendações a cada acesso.
            </p>
          </div>
          <div className="w-full md:w-[45%] lg:w-[40%] max-w-md">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="w-full h-auto max-h-60 md:max-h-72 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Gerencie e vença",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-5 pr-2 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
            <p>
              Organize licitações em pastas inteligentes, registre observações,
              acompanhe prazos e status de propostas — tudo em um painel claro e
              interativo.
            </p>
            <p>
              Receba lembretes antes dos prazos finais e saiba exatamente quais
              editais merecem sua atenção naquele dia.
            </p>
            <p>
              Com esse controle, você dedica menos tempo ao caos e mais à
              estratégia para ganhar.
            </p>
          </div>
          <div className="w-full md:w-[45%] lg:w-[40%] max-w-md">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="w-full h-auto max-h-60 md:max-h-72 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      id="como-funciona"
      className="relative w-full overflow-clip px-4 sm:px-6 md:px-0"
    >
      <Timeline data={data} />
    </div>
  );
}
