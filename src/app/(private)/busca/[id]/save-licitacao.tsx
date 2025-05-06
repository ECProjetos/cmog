"use client";

import { useState } from "react";
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
import { BookmarkPlus, FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { FolderType } from "../../minhas-licitacoes/zod-types";
import { useUserStore } from "@/stores/userStore";
import { saveLicitacao } from "./actions";
import { Input } from "@/components/ui/input";
import { createFolder } from "../../minhas-licitacoes/actions";

type SaveLicitacaoProps = {
  licitacao_id: string | undefined;
  folders: FolderType[] | undefined;
  onUpdate: () => void;
};

export function SaveLicitacao({
  licitacao_id,
  folders,
  onUpdate,
}: SaveLicitacaoProps) {
  const [isOpen, setIsOpen] = useState(false); // Modal: Salvar Licitação
  const [isOpen2, setIsOpen2] = useState(false); // Modal: Criar Pasta
  const [selectedFolder, setSelectedFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const user_id = useUserStore((state) => state.user?.id);

  const handleCreateFolder = async () => {
    if (!user_id || !folderName || !folderDescription) {
      toast.error("Preencha todos os campos para criar a pasta.");
      return;
    }

    const { data, error } = await createFolder(
      folderName,
      user_id,
      folderDescription
    );

    if (error || !data) {
      toast.error("Erro ao criar pasta", {
        description: error?.message || "Erro desconhecido",
      });
      return;
    }

    toast.success("Pasta criada com sucesso!", {
      description: `Pasta ${folderName} criada com sucesso!`,
    });

    setFolderName("");
    setFolderDescription("");
    setIsOpen2(false); // Fecha o modal de criar pasta
    setIsOpen(true); // Reabre o modal de salvar licitação
    onUpdate(); // Atualiza lista de pastas
  };

  const handleSave = async () => {
    if (!licitacao_id || !selectedFolder) return;

    setLoading(true);
    setError(null);

    const { error } = await saveLicitacao(licitacao_id, selectedFolder);
    if (error) {
      toast.error("Erro ao salvar a licitação", {
        description: error.message,
      });
      setError(error.message);
    } else {
      toast.success("Licitação salva com sucesso!");
      setIsOpen(false);
      onUpdate();
    }

    setLoading(false);
  };

  return (
    <>
      {/* Modal: Salvar Licitação */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <p className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white">
            <BookmarkPlus className="h-4 w-4" />
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

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="folder" className="block text-sm font-medium">
              Pasta
            </Label>

            <Button
              aria-label="Criar nova pasta"
              onClick={() => {
                setIsOpen(false); // Fecha modal principal
                setIsOpen2(true); // Abre modal de nova pasta
              }}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Nova Pasta
            </Button>
          </div>

          <select
            id="folder"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
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
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading || !selectedFolder}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Criar Nova Pasta */}
      <Dialog
        open={isOpen2}
        onOpenChange={(open) => {
          setIsOpen2(open);
          if (!open) setIsOpen(true); // Reabre modal principal ao fechar este
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Pasta</DialogTitle>
            <DialogDescription>
              Insira o nome e a descrição da nova pasta.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">Nome:</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Nome da pasta"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="folderDescription">Descrição:</Label>
              <Input
                id="folderDescription"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                placeholder="Descrição da pasta"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsOpen2(false); // Fechar este modal
                setIsOpen(true); // Reabrir o modal principal
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleCreateFolder}
              disabled={!folderName || !folderDescription}
            >
              Criar Pasta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
