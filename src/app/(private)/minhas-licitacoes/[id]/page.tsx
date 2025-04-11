"use client";

import { useEffect, useState } from "react";
import { getFolderLicitacoesByFolderId } from "./actions";
import DetalhesFolder from "./detalhes-folder";
import { FolderLicitacoes } from "../zod-types"; // ou o caminho correto

interface PageProps {
  params: { id: string };
}

export default function DetalhesFolderPage({ params }: PageProps) {
  const [folderLicitacoes, setFolderLicitacoes] = useState<FolderLicitacoes[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getFolderLicitacoesByFolderId(params.id);
      if (result.error) {
        setError(result.error.message);
        setFolderLicitacoes([]);
      } else {
        setFolderLicitacoes(result.data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id, refresh]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!folderLicitacoes || folderLicitacoes.length === 0)
    return <div>Pasta não encontrada ou vazia.</div>;

  return (
    <DetalhesFolder
      folderLicitacoes={folderLicitacoes}
      onUpdate={() => setRefresh((r) => r + 1)}
      loading={loading}
    />
  );
}
