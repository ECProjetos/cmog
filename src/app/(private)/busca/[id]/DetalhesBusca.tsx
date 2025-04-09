"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
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
              <BreadcrumbPage className="truncate max-w-[180px]">
                {busca.titulo}
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
        <div className="flex flex-col gap-4 mt-4">
          <LicitacoesTable data={licitacoes} columns={licitacaoColumns} />
        </div>
      </div>
    </>
  );
}
