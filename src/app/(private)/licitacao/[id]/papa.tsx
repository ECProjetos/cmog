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
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const licitacoesIds = await ReRunSearch(busca.id_busca);
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
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-bold text-gray-800">{busca.titulo}</h1>
          <Button onClick={handleUpdateButton} disabled={isPending}>
            <RotateCcw className="mr-2" />
            {isPending ? "Atualizando..." : "Atualizar Busca"}
          </Button>
        </div>
        <p className="text-gray-600">{busca.descricao}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Licitações encontradas</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data && data.length > 0 ? (
          data.map((licitacao: any) => (
            <div
              key={licitacao.id_licitacao}
              className="border border-gray-300 rounded-lg p-5 mb-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-blue-800 mb-1">
                Licitação Nº {licitacao.numero}
              </h2>

              <p className="text-gray-700">
                <strong>Comprador:</strong> {licitacao.comprador}
              </p>

              <p className="text-gray-700">
                <strong>Tipo:</strong> {licitacao.tipo_licitacao}
              </p>

              <p className="text-gray-700">
                <strong>Local:</strong> {licitacao.municipios?.nome_municipio} /{" "}
                {licitacao.municipios?.uf_municipio}
              </p>

              <p className="text-gray-700">
                <strong>Abertura:</strong> {licitacao.data_abertura_propostas}{" "}
                às {licitacao.hora_abertura_propostas}
              </p>

              {/* GRUPOS E CLASSES */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Grupos e Classes:
                </h3>
                {licitacao.grupos_materiais?.map((grupo: any) => (
                  <div
                    key={grupo.id_grupo_material}
                    className="ml-4 mb-2 text-sm"
                  >
                    <p className="font-medium">{grupo.nome_grupo_material}</p>
                    <ul className="list-disc ml-6 text-gray-600">
                      {grupo.classes_materiais?.map((classe: any) => (
                        <li key={classe.id_classe_material}>
                          {classe.nome_classe_material}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ITENS */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-1">Itens:</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                  {licitacao.itens?.map((item: any) => (
                    <li key={item.id_item}>
                      <span className="font-medium">{item.ds_item}</span>
                      <div className="text-gray-600 ml-2 text-xs">
                        Quantidade: {item.qt_itens ?? "—"} | Valor Estimado: R${" "}
                        {item.vl_unitario_estimado
                          ? Number(item.vl_unitario_estimado).toFixed(2)
                          : "—"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <a
                  href={licitacao.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver edital completo
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma licitação encontrada.</p>
        )}
      </div>
    </div>
  );
}
