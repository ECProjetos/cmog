"use server";

import { getFolderLicitacoesByFolderId } from "./actions";
import DetalhesFolder from "./detalhes-folder";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetalhesFolderPage({ params }: PageProps) {
  const { id } = await params;
  const folderLicitacoes = await getFolderLicitacoesByFolderId(id);
  if (!folderLicitacoes) return <div>Pasta não encontrada</div>;
  return <DetalhesFolder folderLicitacoes={folderLicitacoes.data} />;
}
