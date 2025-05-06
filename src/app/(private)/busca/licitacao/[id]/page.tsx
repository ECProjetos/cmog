"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getLicitacaoIndividualById } from "./actions";
import { licitacaoIndividualType } from "../../zod-types";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Link from "next/link";
import { SkeletonTable } from "@/components/skeleton-table";
import { SaveLicitacao } from "./save-licitacao";
import { getUserSession } from "@/app/(auth)/actions";
import { getAllFolders } from "@/app/(private)/minhas-licitacoes/actions";
import { FolderType } from "@/app/(private)/minhas-licitacoes/zod-types";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [licitacoes, setLicitacoes] = useState<licitacaoIndividualType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserSession()
      .then((response) => {
        if (response?.user) {
          setUserId(response.user.id);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar sessão do usuário:", error);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    getAllFolders(userId)
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setFolders(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar pastas:", err);
        setError("Erro ao buscar pastas");
      });
  }, [userId]);

  useEffect(() => {
    if (!idParam) return;

    setIsLoading(true);
    getLicitacaoIndividualById([String(idParam)])
      .then((res) => {
        if (res.error) {
          console.error(
            typeof res.error === "string" ? res.error : "Erro desconhecido"
          );
          setError("Erro ao buscar licitação.");
        } else if (res.data) {
          setLicitacoes(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar licitação:", err);
        setError("Erro ao buscar licitação.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idParam]);

  const valorTotalEstimado = useCallback(
    (licitacao: licitacaoIndividualType): string => {
      const totalEstimado = licitacao.itens.reduce((total, item) => {
        const valorUnitario = parseFloat(item.vl_unitario_estimado || "0");
        const quantidade = parseFloat(item.qt_itens || "0");
        return total + valorUnitario * quantidade;
      }, 0);

      if (isNaN(totalEstimado)) {
        return "Indisponível";
      }

      return totalEstimado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    []
  );

  const renderLicitacao = useCallback(
    (licitacao: licitacaoIndividualType) => (
      <div
        key={licitacao.id_licitacao}
        className="mt-6 p-4 border rounded shadow"
      >
        <h2 className="text-xl font-semibold">{licitacao.comprador}</h2>
        <div className="mb-4 space-y-2 mt-4">
          <p>
            <strong>Data de Abertura:</strong>{" "}
            {licitacao.data_abertura_proposta} às{" "}
            {licitacao.hora_abertura_proposta}
          </p>
          <p>
            <strong>Municipio:</strong> {licitacao.municipios.nome_municipio} -{" "}
            {licitacao.municipios?.uf_municipio || "Indisponível"}
          </p>
          <p>
            <strong>Valor Total Estimado:</strong>{" "}
            {valorTotalEstimado(licitacao)}
          </p>

          <p>
            <strong>Objeto:</strong>: {licitacao.objeto}
          </p>

          <a
            href={licitacao.url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar licitação
          </a>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Itens:</h3>
          <ul className="list-inside space-y-2 text-sm">
            {licitacao.itens.map((item) => (
              <li key={item.id_item} className="border rounded p-2">
                <details>
                  <summary className="cursor-pointer">
                    <strong>Item:</strong> {item.ds_item}
                  </summary>
                  <div className="mt-2">
                    <p>
                      <strong>Quantidade:</strong> {item.qt_itens}
                    </p>
                    <p>
                      <strong>Valor Unitário Estimado:</strong> R${" "}
                      {item.vl_unitario_estimado}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [valorTotalEstimado]
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 pl-0 dark:bg-[#18181B]">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full min-h-full border dark:bg-[#1c1c20]">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/busca">Minhas Buscas</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="truncate max-w-[180px]">
                      Detalhes da Licitação
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="container py-6 px-10">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Detalhes da Licitação</h1>
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.back();
                    }}
                  >
                    Voltar
                  </Button>
                  <SaveLicitacao
                    licitacao_id={String(idParam)}
                    folders={folders}
                  />
                </div>
              </div>

              {isLoading ? (
                <SkeletonTable />
              ) : licitacoes.length > 0 ? (
                licitacoes.map(renderLicitacao)
              ) : error ? (
                <p className="mt-4 text-red-500">{error}</p>
              ) : (
                <p className="mt-4 text-gray-600">
                  Nenhuma licitação encontrada.
                </p>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
