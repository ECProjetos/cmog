"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  BarChart2,
  BellRing,
  Briefcase,
  FolderOpen,
  Search,
  Target,
} from "lucide-react";

export function WhyUseIt() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Busca Inteligente e Rápida",
    description:
      "Encontre licitações com filtros personalizados por área, localização, órgão e muito mais.",
    link: "/busca-rapida",
    icon: Search,
  },
  {
    title: "Organização Estratégica",
    description:
      "Salve licitações em pastas, adicione observações e acompanhe o status de cada processo.",
    link: "/organizacao-estrategica",
    icon: FolderOpen,
  },
  {
    title: "Notificações Relevantes",
    description:
      "Receba alertas das licitações que realmente importam para o seu negócio.",
    link: "/alertas",
    icon: BellRing,
  },
  {
    title: "Foco no Sucesso",
    description:
      "Acompanhe todo o ciclo da licitação, desde a descoberta até a entrega da proposta.",
    link: "/monitoramento",
    icon: Target,
  },
  {
    title: "Feito para Pequenas Empresas e Escritórios de Licitação",
    description: "Interface simples, poderosa e pensada para produtividade.",
    link: "/",
    icon: Briefcase,
  },
  {
    title: "Painel com Indicadores de Desempenho",
    description:
      "Visualize métricas e indicadores sobre suas licitações salvas, status de propostas e histórico de atuação — tome decisões com mais embasamento.",
    link: "/#",
    icon: BarChart2,
    commingSoon: true,
  },
];
