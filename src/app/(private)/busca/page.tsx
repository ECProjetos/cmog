"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

import { getAllBuscas } from "./actions";

import { SearchSchemaViewType } from "./zod-types";
import { BuscaTable } from "./table";
import { buscaColumns } from "./columns";
import { SkeletonTable } from "@/components/skeleton-table";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function BuscasPage() {
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState<SearchSchemaViewType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }
    getAllBuscas(user.id)
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]); // Adicione user.id como dependência

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
                    <BreadcrumbPage>Minhas Buscas</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {loading ? (
              <SkeletonTable />
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">{error}</h1>
                <p className="text-gray-500">Tente novamente mais tarde.</p>
              </div>
            ) : (
              <div className="flex flex-col px-4 gap-4">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-2xl font-bold">Minhas Buscas</h1>
                  <Link
                    href="/busca/nova"
                    className={buttonVariants({ variant: "default" })}
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Criar Busca
                  </Link>
                </div>
                <div className="w-full">
                  <BuscaTable data={data} columns={buscaColumns} />
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
