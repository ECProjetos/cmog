"use client";

import { useState, useTransition } from "react";
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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import { LicitacaoType, SearchSchemaViewType } from "../zod-types";
import { LicitacoesTable } from "./table";
import { licitacaoColumns } from "./columns";
import SearchForm from "../nova/new-search-form";

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

  const relodPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 pl-0 dark:bg-[#18181B]">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full min-h-full border dark:bg-[#1c1c20]">
            {formModalOpen ? (
              <>
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
                        <BreadcrumbPage className="truncate max-w-[180px]">
                          Atualizar Busca
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <br className="mb-4" />
                <SearchForm
                  busca={busca}
                  setFormModalOpen={setFormModalOpen}
                  relodPage={relodPage}
                />
              </>
            ) : (
              <>
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
                        <BreadcrumbPage className="truncate max-w-[180px]">
                          {busca.titulo}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="px-4 gap-4">
                  <div className="flex flex-col gap-4 mt-2 mb-4">
                    <div className="flex w-full gap-4 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {busca.titulo}
                        </h1>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button onClick={() => setFormModalOpen(true)}>
                          <ClipboardEditIcon className="h-4 w-4" />
                          Editar Filtros
                        </Button>
                        <Button
                          onClick={handleUpdateButton}
                          disabled={isPending}
                        >
                          <RotateCcw className="h-4 w-4" />
                          {isPending ? "Atualizando..." : "Refazer Busca"}
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 justify-start dark:text-white/80">
                      {busca.descricao}
                    </p>
                  </div>
                  <div>
                    <LicitacoesTable
                      data={licitacoes}
                      columns={licitacaoColumns({
                        buscaId: busca.id_busca,
                      })}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
