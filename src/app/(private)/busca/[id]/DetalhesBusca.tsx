"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { ReRunSearch, getLicitacoesByIds } from "./actions";

interface DetalhesBuscaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  busca: any;
}

export default function DetalhesBusca({ busca }: DetalhesBuscaProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // 1. Reexecuta a busca e retorna os IDs de licitação
        const licitacoesIds = await ReRunSearch(busca.id_busca);

        // 2. Com os IDs em mãos, busca as licitações
        const res = await getLicitacoesByIds(licitacoesIds);

        if (res?.error) {
          setError(res.error);
        } else {
          setData(res.data);
        }
      } catch (err) {
        console.error("Erro ao buscar licitações:", err);
        setError("Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [busca.id_busca]);
  const handleUpdateButton = () => {
    startTransition(async () => {
      try {
        await ReRunSearch(busca.id_busca);
        toast.success("Busca atualizada com sucesso!");
        router.refresh();
      } catch (err) {
        toast.error("Erro ao atualizar a busca");
        console.error(err);
      }
    });
  };

  return (
    <div className="px-4 gap-4">
      <div className="flex flex-col justify-between items-center gap-4 mt-2 mb-4">
        <div className="flex ">
          <h1 className="text-2xl font-bold text-gray-800">{busca.titulo}</h1>
          <Button onClick={handleUpdateButton} disabled={isPending}>
            <RotateCcw className="mr-2" />
            {isPending ? "Atualizando..." : "Atualizar Busca"}
          </Button>
        </div>
        <p className="text-gray-600">{busca.descricao}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Licitações encontradas</h2>
        <div className="border rounded-md overflow-hidden"></div>
        <div className="overflow-x-auto">
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : data && data.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">ID</th>
                  <th className="border border-gray-200 p-2">Estado</th>
                  <th className="border border-gray-200 p-2">Numero</th>
                </tr>
              </thead>
              <tbody>
                {data.map((licitacao) => (
                  <tr key={licitacao.id_licitacao}>
                    <td className="border border-gray-200 p-2">
                      {licitacao.id_licitacao}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {licitacao.id_municipio}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {licitacao.numero}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma licitação encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
