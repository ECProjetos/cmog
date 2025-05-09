"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { FolderType } from "../../minhas-licitacoes/zod-types";
import { useUserStore } from "@/stores/userStore";
import { saveLicitacao } from "./actions";
import { Input } from "@/components/ui/input";
import { createFolder, getAllFolders } from "../../minhas-licitacoes/actions";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";

type SaveLicitacaoProps = {
  licitacao_id: string | undefined;
};

export function SaveLicitacao({ licitacao_id }: SaveLicitacaoProps) {
  const [isOpen, setIsOpen] = useState(false); // Modal: Salvar Licitação
  const [selectedFolder, setSelectedFolder] = useState("");
  const [addFolderOpen, setAddFolderOpen] = useState(false); // Modal: Criar Pasta
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string>("");
  const [folderDescription, setFolderDescription] = useState<string>("");
  const user_id = useUserStore((state) => state.user?.id);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [isPending, startTransition] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!user_id) {
      setLoading(false);
      return;
    }
    getAllFolders(user_id)
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
  }, [user_id, refresh]); // Adicione user.id como dependência

  const handleCreateFolder = async () => {
    if (!user_id || !folderName || !folderDescription) {
      toast.error("Preencha todos os campos para criar a pasta.");
      return;
    }
    startTransition(true);
    setError(null);

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
    setAddFolderOpen(false); // Fecha o modal de criar pasta
    startTransition(false);
    setRefresh((prev) => prev + 1); // Atualiza lista de pastas
  };

  const handleSave = async () => {
    if (!licitacao_id || !selectedFolder) return;

    startTransition(true);
    setError(null);

    const { error } = await saveLicitacao(licitacao_id, selectedFolder);
    if (error) {
      toast.error("Erro ao salvar a licitação", {
        description: error.message,
      });
      setError(error.message);
    } else {
      toast.success("Licitação salva com sucesso!", {
        description: (
          <Link
            href={`/minhas-licitacoes/${selectedFolder}`}
            target="_blank"
            className="text-blue-500 dark:text-blue-400"
          >
            Clique aqui para ver a pasta
          </Link>
        ),
      });
      setIsOpen(false);
    }

    startTransition(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <BookmarkPlus />
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Salvar Licitação</DialogTitle>
          <DialogDescription>
            Selecione uma pasta para salvar a licitação ou crie uma nova pasta.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">
              {addFolderOpen ? "Criar Pasta" : "Selecionar Pasta"}
            </Label>
            <Button
              variant="ghost"
              onClick={() => setAddFolderOpen(!addFolderOpen)}
            >
              {addFolderOpen ? "← Voltar" : "+ Nova Pasta"}
            </Button>
          </div>

          {addFolderOpen ? (
            <div className="space-y-2">
              <Input
                id="folderName"
                placeholder="Nome da Pasta"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <Input
                id="folderDescription"
                placeholder="Descrição da Pasta"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
              />
              <Button
                onClick={handleCreateFolder}
                disabled={isPending || !folderName || !folderDescription}
                size="sm"
                className="justify-end"
              >
                {isPending ? "Criando..." : "Criar Pasta"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {loading ? (
                <p>Carregando pastas...</p>
              ) : (
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione uma pasta</option>
                  {folders.map((folder) => (
                    <option key={folder.id_folder} value={folder.id_folder}>
                      {folder.nome_folder}
                    </option>
                  ))}
                </select>
              )}
              <Button
                type="button"
                onClick={handleSave}
                disabled={isPending || !selectedFolder}
              >
                {isPending ? "Salvando..." : "Salvar Licitação"}
              </Button>
            </div>
          )}
        </div>
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
