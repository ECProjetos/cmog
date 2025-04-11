"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { saveLicitacao } from "./actions";
import { toast } from "sonner";
import { FolderType } from "../../minhas-licitacoes/zod-types";

type SaveLicitacaoProps = {
  licitacao_id: number | undefined;
  folders: FolderType[] | undefined;
};

export function SaveLicitacao({ licitacao_id, folders }: SaveLicitacaoProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Começa como false (não aberto)
  const [selectedFolder, setSelectedFolder] = useState<string>(""); // Estado para armazenar a pasta selecionada
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar o carregamento

  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

  const handleSave = async () => {
    if (!licitacao_id || !selectedFolder) return; // Verifica se os IDs estão disponíveis

    setLoading(true); // Inicia o carregamento

    const { error } = await saveLicitacao(licitacao_id, selectedFolder); // Chama a função de salvar

    if (error) {
      setError(error.message); // Define o erro se houver
      toast.error("Erro ao salvar a licitação", {
        description: error.message,
      }); // Exibe mensagem de erro
    } else {
      toast.success("Licitação salva com sucesso!"); // Exibe mensagem de sucesso
      setIsOpen(false); // Fecha o modal
    }

    setLoading(false); // Finaliza o carregamento
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <p className="flex items-center px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
          <BookmarkPlus className="mr-2 h-4 w-4" />
          <span className="ml-2">Salvar Licitação</span>
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Salvar Licitação</DialogTitle>
          <DialogDescription>
            Salve esta licitação em uma pasta para fácil acesso.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p> // Exibe mensagem de erro se houver
        )}

        <Label htmlFor="folder" className="block text-sm font-medium mb-2">
          Pasta
        </Label>
        <select
          id="folder"
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)} // Atualiza a pasta selecionada
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Selecione uma pasta</option>
          {folders?.map((folder) => (
            <option key={folder.id_folder} value={folder.id_folder}>
              {folder.nome_folder}
            </option>
          ))}
        </select>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)} // Fecha o modal ao cancelar
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave} // Chama a função de salvar ao clicar no botão
            disabled={loading} // Desabilita o botão se estiver carregando
          >
            {loading ? "Salvando..." : "Salvar"} {/* Exibe texto dinâmico */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
