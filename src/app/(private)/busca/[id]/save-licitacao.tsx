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
import { BookmarkPlus} from "lucide-react";
import { toast } from "sonner";
import { FolderType } from "../../minhas-licitacoes/zod-types";
import { useUserStore } from "@/stores/userStore";
import { saveLicitacao } from "./actions";
import { CreateNewFolder } from "../../minhas-licitacoes/create-new-folder";

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
  const [selectedFolder, setSelectedFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user_id = useUserStore((state) => state.user?.id);

  console.log("user_id", user_id);

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
          <CreateNewFolder user_id={user_id} onUpdate={onUpdate} />
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
  );
}
