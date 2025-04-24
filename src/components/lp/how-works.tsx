import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export default function HowWorks() {
  const data = [
    {
      title: "Crie sua conta",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Cadastre-se rapidamente usando seu e-mail ou acesso social. O
            onboarding é direto: você informa o que procura e nós cuidamos do
            resto.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            A partir do primeiro acesso, você já tem uma visão clara das
            licitações mais recentes, separadas por relevância e área de
            interesse.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Sem burocracia: em poucos cliques, você está pronto para buscar
            oportunidades com potencial real de vitória.
          </p>
          <div className="flex justify-center mb-8">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Encontre licitações certeiras",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Use filtros avançados para localizar licitações públicas por órgão,
            região, tipo de objeto, datas, e palavras-chave. Cada resultado vem
            detalhado, com acesso direto ao edital.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Você pode salvar suas buscas favoritas, automatizar consultas
            recorrentes e criar uma base de oportunidades personalizada.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            O algoritmo aprende com suas preferências e melhora as recomendações
            a cada acesso.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: " Gerencie e vença",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Organize licitações em pastas inteligentes, registre observações,
            acompanhe prazos e status de propostas — tudo em um painel claro e
            interativo.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Receba lembretes antes dos prazos finais e saiba exatamente quais
            editais merecem sua atenção naquele dia.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Com esse controle, você dedica menos tempo ao caos e mais à
            estratégia para ganhar.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/saas.gif"
              alt="saas animation"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
