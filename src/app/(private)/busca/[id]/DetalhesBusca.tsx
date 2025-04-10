"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ClipboardEditIcon, RotateCcw } from "lucide-react";
import { ReRunSearch } from "./actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { LicitacaoType, SearchSchemaViewType } from "../zod-types";
import { LicitacoesTable } from "./table";
import { licitacaoColumns } from "./columns";
import SearchForm from "../nova/new-search-form";
import { FolderType } from "@/app/(private)/minhas-licitacoes/zod-types";
import { getAllFolders } from "@/app/(private)/minhas-licitacoes/actions";

interface DetalhesBuscaProps {
  busca: SearchSchemaViewType;
  licitacoes: LicitacaoType[];
}

export default function DetalhesBusca({
  busca,
  licitacoes,
}: DetalhesBuscaProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const user_id = busca.id_user;
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!user_id) {
      setLoading(false);
      return;
    }
    getAllFolders(user_id)
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setFolders(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]); // Adicione user.id como dependência
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
      {formModalOpen ? (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/busca">Minhas Buscas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-[180px]">
                  Atualizar Busca
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <br className="mb-4" />
          <SearchForm busca={busca} setFormModalOpen={setFormModalOpen} />
        </>
      ) : (
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
                  <BreadcrumbPage className="truncate max-w-[180px]">
                    {busca.titulo}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="px-4 gap-4">
            <div className="flex flex-col gap-4 mt-2 mb-4">
              <div className="flex w-full gap-4 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {busca.titulo}
                  </h1>
                </div>
                <div className="flex gap-2 items-center">
                  <Button onClick={() => setFormModalOpen(true)}>
                    <ClipboardEditIcon className="h-4 w-4" />
                    Editar Filtros
                  </Button>
                  <Button onClick={handleUpdateButton} disabled={isPending}>
                    <RotateCcw className="h-4 w-4" />
                    {isPending ? "Atualizando..." : "Refazer Busca"}
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 justify-start">{busca.descricao}</p>
            </div>
            <div>
              {loading ? (
                <p>Carregando...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <LicitacoesTable
                  data={licitacoes}
                  columns={licitacaoColumns(folders)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
