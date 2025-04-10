"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";

import { CreateNewFolder } from "./create-new-folder";
import { FolderColumns } from "./columns";
import { getAllFolders } from "./actions";
import { FolderType } from "./zod-types";
import { FolderTable } from "./table";

export default function MinhasLicitacoesPage() {
  const user = useUserStore((state) => state.user);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }
    getAllFolders(user.id)
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
  }, [user]); // Adicione user.id como dependência

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Minhas Licitações</h1>
        <CreateNewFolder user_id={user?.id} />
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <FolderTable data={folders} columns={FolderColumns} />
      )}
    </div>
  );
}
