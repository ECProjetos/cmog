"use client";

import { FolderDetailColumns } from "./columns";
import { FolderDetailTable } from "./table";
import { SkeletonTable } from "@/components/skeleton-table";

import { FolderLicitacoes } from "../zod-types";

interface FolderLicitacoesProps {
  folderLicitacoes: FolderLicitacoes[];
  onUpdate: () => void;
  loading: boolean;
}

export default function DetalhesFolder({
  folderLicitacoes,
  onUpdate,
  loading,
}: FolderLicitacoesProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full mb-4 ml-4">
        <h1 className="text-2xl font-bold">
          Detalhes da Pasta: {folderLicitacoes[0]?.folders.nome_folder}
        </h1>
        <p className="text-sm text-gray-500">
          {folderLicitacoes[0]?.folders?.descricao}
        </p>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : (
        <FolderDetailTable
          columns={FolderDetailColumns({ onUpdate })}
          data={folderLicitacoes}
        />
      )}
    </div>
  );
}
