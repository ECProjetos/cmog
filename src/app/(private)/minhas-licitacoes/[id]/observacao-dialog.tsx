"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, PlusCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";

import { addObservacaoToLicitacao } from "./actions";

type ObservacaoDialogProps = {
  folderLicitacao: string;
  licitacao_id: string;
  folder_id: string;
  existingObservacao?: string | null;
  onUpdate: () => void;
};

export function ObservacaoDialog({
  folderLicitacao,
  licitacao_id,
  folder_id,
  existingObservacao,
  onUpdate,
}: ObservacaoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [observacao, setObservacao] = useState(existingObservacao || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);

    const { error } = await addObservacaoToLicitacao(
      folderLicitacao, // string
      folder_id, // string
      licitacao_id, // string
      observacao // string
    );

    if (error) {
      setError(error.message);
      toast.error("Erro ao salvar a observação", {
        description: error.message,
      });
    } else {
      toast.success("Observação salva com sucesso!");
      setIsOpen(false);
      onUpdate();
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {existingObservacao ? (
          <Button variant="ghost" size="sm" className="justify-start">
            <Pencil className="h-1 w-1" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="justify-start">
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Observação
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingObservacao ? "Editar observação" : "Nova observação"}
          </DialogTitle>
          <DialogDescription>
            Essa observação ficará salva para essa licitação dentro da pasta.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Label htmlFor="observacao">Observação</Label>
        <Textarea
          id="observacao"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Digite sua observação aqui..."
          className="resize-none"
        />

        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>

            <div className="flex gap-2">
              {/* Botão de deletar só aparece se houver uma observação */}
              {existingObservacao && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    setLoading(true);
                    const { error } = await addObservacaoToLicitacao(
                      folderLicitacao,
                      folder_id,
                      licitacao_id,
                      "" // 👈 direto
                    );

                    if (error) {
                      toast.error("Erro ao remover observação", {
                        description: error.message,
                      });
                    } else {
                      toast.success("Observação removida com sucesso!");
                      setObservacao("");
                      setIsOpen(false);
                    }

                    setLoading(false);
                    onUpdate();
                  }}
                  disabled={loading}
                >
                  Remover
                </Button>
              )}
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
