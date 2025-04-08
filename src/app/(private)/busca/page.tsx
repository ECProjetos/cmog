"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

import { getAllBuscas } from "./actions";

import { SearchSchemaViewType } from "./zod-types";

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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Minhas Buscas</h1>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && data.length === 0 && (
          <p>Nenhuma busca encontrada.</p>
        )}
        <Link
          href="/busca/nova"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "w-full",
          })}
        >
          Criar nova busca
          <PlusCircleIcon className="ml-2 h-4 w-4" />
        </Link>
        {data.map((busca) => (
          <Link
            key={busca.id_busca}
            href={`/busca/${busca.id_busca}`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full",
            })}
          >
            {busca.titulo}
          </Link>
        ))}
      </div>
    </>
  );
}
