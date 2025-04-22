"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFolderLicitacoesByFolderId } from "./actions";
import DetalhesFolder from "./detalhes-folder";
import { FolderLicitacoes } from "../zod-types"; // ou o caminho correto
import {
  Breadcrumb,
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
import { useUserStore } from "@/stores/userStore";

export default function DetalhesFolderPage() {
  const user_id = useUserStore((state) => state.user?.id);
  const params = useParams();
  const folderId = params.id as string;
  const [folderLicitacoes, setFolderLicitacoes] = useState<FolderLicitacoes[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!user_id) {
      setLoadingTable(false);
      return;
    }
    const fetchData = async () => {
      setLoadingTable(true);
      const result = await getFolderLicitacoesByFolderId(folderId);
      if (result.error) {
        setError(result.error.message);
        setFolderLicitacoes([]);
      } else {
        setFolderLicitacoes(result.data || []);
        setError(null);
      }
      setLoadingTable(false);
    };

    fetchData();
  }, [folderId, refresh, user_id]);

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
                      <Link href="/minhas-licitacoes">Minhas Licitações</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {folderLicitacoes[0]?.folders.nome_folder}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {loadingTable ? (
              <SkeletonTable />
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : !folderLicitacoes || folderLicitacoes.length === 0 ? (
              <div>Pasta não encontrada ou vazia.</div>
            ) : (
              <>
                <DetalhesFolder
                  folderLicitacoes={folderLicitacoes}
                  onUpdate={() => setRefresh((r) => r + 1)}
                  loading={loadingTable}
                  user_id={user_id}
                />
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
