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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { useState } from "react";

import { createFolder } from "./actions";
import { toast } from "sonner";

type CreateNewFolderProps = {
  user_id: string | undefined;
};

export function CreateNewFolder({ user_id }: CreateNewFolderProps) {
  const [folderName, setFolderName] = useState<string>("");
  const [folderDescription, setFolderDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false); // Começa como false (não aberto)

  const handleCreateFolder = async () => {
    if (!user_id || !folderName) return;

    const { data, error } = await createFolder(
      folderName,
      user_id,
      folderDescription
    );

    if (error) {
      toast.error("Erro ao criar pasta:", {
        description: error.message,
      });
      return;
    }

    if (!data) {
      toast.error("Erro ao criar pasta:", {
        description: "Pasta não foi criada",
      });
      return;
    }

    toast.success("Pasta criada com sucesso!", {
      description: `Pasta ${folderName} criada com sucesso!`,
    });

    setFolderName("");
    setIsOpen(false); // Fecha o dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <FolderPlus className="h-4 w-4 mr-2" />
          Nova Pasta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Pasta</DialogTitle>
          <DialogDescription>
            Insira o nome da nova pasta para organizá-la.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4">
            <div className="space-y-2 items-center">
              <Label htmlFor="folderName" className="text-right">
                Nome:
              </Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
                placeholder="Nome da pasta"
              />
            </div>
            <div className="space-y-2 items-center">
              <Label htmlFor="folderDescription" className="text-right">
                Descrição:
              </Label>
              <Input
                id="folderDescription"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                className="col-span-3"
                placeholder="Descrição da pasta"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
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
  );
}
