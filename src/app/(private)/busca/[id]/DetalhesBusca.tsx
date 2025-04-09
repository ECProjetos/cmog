"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { ReRunSearch, getLicitacoesByIds } from "./actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { SearchSchemaViewType } from "../zod-types";

interface DetalhesBuscaProps {
  busca: SearchSchemaViewType;
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
    <>
      <header className="mb-4 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/busca">Minhas Buscas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {busca.titulo.split(" ").slice(0, 3).join(" ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="px-4 gap-4">
        <div className="flex flex-col justify-between items-center gap-4 mt-2 mb-4">
          <div className="flex w-full gap-4 justify-between items-center">
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
            <table className="min-w-full table-auto border border-gray-300 mt-4 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-2 text-left">Comprador</th>
                  <th className="border px-2 py-2 text-left">UF</th>
                  <th className="border px-2 py-2 text-left">Tipo</th>
                  <th className="border px-2 py-2 text-left">Data Abertura</th>
                  <th className="border px-2 py-2 text-left">Valor Estimado</th>
                  <th className="border px-2 py-2 text-left">Descrição</th>
                  <th className="border px-2 py-2 text-left">Ação</th>
                </tr>
              </thead>
              <tbody>
                {data.map((licitacao: any) => {
                  const valorTotal = licitacao.itens?.reduce(
                    (acc: number, item: any) =>
                      acc +
                      (item.vl_unitario_estimado && item.qt_itens
                        ? item.vl_unitario_estimado * item.qt_itens
                        : 0),
                    0
                  );

                  // Novo resumo descritivo
                  const dsItens = licitacao.itens
                    ?.map((item: any) => item.ds_item)
                    .filter(Boolean)
                    .slice(0, 3)
                    .join(", ");

                  const grupos = licitacao.grupos_materiais
                    ?.map((g: any) => g.nome_grupo_material)
                    .filter(Boolean)
                    .join(", ");

                  const classes = licitacao.grupos_materiais
                    ?.flatMap(
                      (g: any) =>
                        g.classes_materiais?.map(
                          (c: any) => c.nome_classe_material
                        ) ?? []
                    )
                    .filter(Boolean)
                    .join(", ");

                  const descricaoCompleta = [
                    classes && `${classes}`,
                    grupos && `${grupos}`,
                    dsItens && ` ${dsItens}`,
                  ]
                    .filter(Boolean)
                    .join(" — ");

                  return (
                    <tr
                      key={licitacao.id_licitacao}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-2">
                        {licitacao.comprador}
                      </td>
                      <td className="border px-2 py-2">
                        {licitacao.municipios?.uf_municipio}
                      </td>
                      <td className="border px-2 py-2">
                        {licitacao.tipo_licitacao}
                      </td>
                      <td className="border px-2 py-2">
                        {licitacao.data_abertura_propostas} às{" "}
                        {licitacao.hora_abertura_propostas}
                      </td>
                      <td className="border px-2 py-2">
                        R${" "}
                        {valorTotal?.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border px-2 py-2 text-gray-700">
                        {descricaoCompleta.length > 160
                          ? descricaoCompleta.substring(0, 160) + "..."
                          : descricaoCompleta}
                      </td>
                      <td className="border px-2 py-2">
                        <a
                          href={licitacao.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Ver edital
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Nenhuma licitação encontrada.</p>
          )}
        </div>
      </div>
    </>
  );
}
