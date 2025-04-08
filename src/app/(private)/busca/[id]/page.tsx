import { ReRunSearch } from "./actions"; // ajuste o caminho conforme
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PageProps {
  params: { id: string };
}

export default async function DetalhesBuscaPage({ params }: PageProps) {
  const supabase = await createClient();

  const { data: busca } = await supabase
    .from("buscas")
    .select("*")
    .eq("id_busca", params.id)
    .single();

  if (!busca) return <div>Busca não encontrada</div>;

  const { data: licitacoes } = await supabase
    .from("licitacoes")
    .select("*")
    .in("id_licitacao", busca.id_licitacoes || []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{busca.titulo}</h1>
          <p className="text-gray-600">{busca.descricao}</p>
        </div>

        <form action={ReRunSearch.bind(null, params.id)}>
          <Button type="submit">Atualizar Busca</Button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Licitações encontradas</h2>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Órgão</th>
                <th className="px-4 py-2 text-left">Objeto</th>
                <th className="px-4 py-2 text-left">Data Abertura</th>
              </tr>
            </thead>
            <tbody>
              {licitacoes?.map((licitacao) => (
                <tr key={licitacao.id_licitacao} className="border-t">
                  <td className="px-4 py-2">{licitacao.id_licitacao}</td>
                  <td className="px-4 py-2">{licitacao.nm_orgao}</td>
                  <td className="px-4 py-2">{licitacao.objeto}</td>
                  <td className="px-4 py-2">{licitacao.dt_abertura}</td>
                </tr>
              ))}
              {licitacoes?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Nenhuma licitação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
