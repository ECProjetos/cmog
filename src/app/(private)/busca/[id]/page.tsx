// app/(private)/busca/[id]/page.tsx

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

  if (!busca) return <div>Busca não encontrada</div>;

  const { data: licitacoes } = await supabase
    .from("licitacoes")
    .select("*")
    .in("id_licitacao", busca.id_licitacoes || []);

  return <DetalhesBusca busca={busca} licitacoes={licitacoes || []} />;
}
