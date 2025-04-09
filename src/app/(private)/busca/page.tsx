"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Loading from "@/app/loading";

import { getAllBuscas } from "./actions";

import { SearchSchemaViewType } from "./zod-types";
import { BuscaTable } from "./table";
import { buscaColumns } from "./columns";

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
    <>
      {loading ? (
        <Loading />
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
    </>
  );
}
