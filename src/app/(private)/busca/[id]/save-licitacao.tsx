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
import { Input } from "@/components/ui/input";
import { BookmarkPlus, FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { FolderType } from "../../minhas-licitacoes/zod-types";
import { useUserStore } from "@/stores/userStore";
import { saveLicitacao } from "./actions";
import { createFolder } from "@/app/(private)/minhas-licitacoes/actions";

type SaveLicitacaoProps = {
  licitacao_id: number | undefined;
  folders: FolderType[] | undefined;
  onUpdate: () => void;
};

export function SaveLicitacao({
  licitacao_id,
  folders,
  onUpdate,
}: SaveLicitacaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user_id = useUserStore((state) => state.user?.id);

  const handleSave = async () => {
    if (!licitacao_id || !selectedFolder) return;
    setLoading(true);

    const { error } = await saveLicitacao(licitacao_id, selectedFolder);
    if (error) {
      toast.error("Erro ao salvar a licitação", { description: error.message });
      setError(error.message);
    } else {
      toast.success("Licitação salva com sucesso!");
      setIsOpen(false);
      onUpdate();
    }

    setLoading(false);
  };

  const handleCreateFolder = async () => {
    if (!user_id || !folderName) return;

    const { data, error } = await createFolder(
      folderName,
      user_id,
      folderDescription
    );
    if (error) {
      toast.error("Erro ao criar pasta", { description: error.message });
      return;
    }

    if (!data) {
      toast.error("Erro ao criar pasta", {
        description: "Pasta não foi criada",
      });
      return;
    }

    toast.success("Pasta criada com sucesso!", {
      description: `Pasta ${folderName} criada com sucesso!`,
    });

    onUpdate();
    setFolderName("");
    setFolderDescription("");
    setNewFolderModalOpen(false); // Volta à tela principal
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <p className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white">
          <BookmarkPlus className="h-4 w-4" />
          <span className="ml-2">Salvar Licitação</span>
        </p>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {newFolderModalOpen ? "Criar Nova Pasta" : "Salvar Licitação"}
          </DialogTitle>
          <DialogDescription>
            {newFolderModalOpen
              ? "Insira o nome da nova pasta para organizá-la."
              : "Salve esta licitação em uma pasta para fácil acesso."}
          </DialogDescription>
        </DialogHeader>

        {newFolderModalOpen ? (
          <div className="grid gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folderName">Nome</Label>
                <Input
                  id="folderName"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Nome da pasta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="folderDescription">Descrição</Label>
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
                onClick={() => setNewFolderModalOpen(false)}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={handleCreateFolder}
                disabled={!folderName || !folderDescription}
              >
                Criar Pasta
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="folder" className="block text-sm font-medium">
                Pasta
              </Label>
              <Button
                onClick={() => setNewFolderModalOpen(true)}
                variant="ghost"
                size="sm"
              >
                <FolderPlus className="h-4 w-4 mr-1" />
                Nova pasta
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
