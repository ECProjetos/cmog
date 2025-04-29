"use server";

import { getLicitacoesByIds } from "./actions";
import DetalhesBusca from "./DetalhesBusca";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetalhesBuscaPage({ params }: PageProps) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: busca } = await supabase
    .from("buscas")
    .select("*")
    .eq("id_busca", id)
    .single();

  const licitacoes = await getLicitacoesByIds(busca.id_licitacoes);
  if (!busca) return <div>Busca não encontrada</div>;
  

  return <DetalhesBusca busca={busca} licitacoes={licitacoes.data ?? []} />;
}
