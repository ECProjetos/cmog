"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  createNewStatus,
  getStatusLicitacoesByUserId,
  addSatatusToLicitacao,
  deleteStatusLicitacao,
  updateStatusLicitacao,
} from "./actions";

import { StatusLicitacoes } from "@/app/(private)/minhas-licitacoes/zod-types";

// Cores disponíveis
const colors = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
];

type StatusDialogProps = {
  folderLicitacao: string;
  licitacao_id: number;
  folder_id: string;
  status?: StatusLicitacoes | null;
  onUpdate?: () => void;
  user_id?: string;
};

export function StatusDialog({
  folderLicitacao,
  licitacao_id,
  folder_id,
  status,
  onUpdate,
  user_id,
}: StatusDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [statusName, setStatusName] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [statusList, setStatusList] = useState<StatusLicitacoes[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    status?.id_status || null
  );
  const [loading, setLoading] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStatusName("");
      setColor(colors[0]);
      setSelectedStatus(status?.id_status || null);
      setEditingStatusId(null);
      setEditedName("");
    }
  }, [isOpen, status]);

  useEffect(() => {
    if (isOpen && user_id) {
      fetchStatuses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user_id]);

  async function fetchStatuses() {
    const { data, error } = await getStatusLicitacoesByUserId(user_id!);
    if (error) {
      toast.error(error.message);
      return;
    }
    setStatusList(
      data
        .map((item) => ({
          ...item,
          user_id: user_id!, // Ensure user_id is added to each item
        }))
        .sort((a, b) => a.nome_status.localeCompare(b.nome_status))
    );
  }

  async function handleCreateStatus() {
    if (!statusName || !color) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (statusList.some((s) => s.nome_status === statusName)) {
      toast.error("Esse status já existe");
      return;
    }

    setLoading(true);
    const { error } = await createNewStatus(user_id!, statusName, color);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Status criado com sucesso");
    setStatusName("");
    setColor(colors[0]);
    await fetchStatuses();
  }

  async function handleSaveStatus() {
    if (!selectedStatus) return;

    setLoading(true);
    const res = await addSatatusToLicitacao(
      folderLicitacao,
      folder_id,
      licitacao_id,
      selectedStatus
    );
    setLoading(false);

    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    toast.success("Status salvo com sucesso!");
    onUpdate?.();
    setIsOpen(false);
  }

  async function handleDeleteStatus(id: string) {
    setLoading(true);
    const { error } = await deleteStatusLicitacao(id);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Status excluído com sucesso!");
    await fetchStatuses();
    onUpdate?.();
  }

  async function handleEditStatus(id: string) {
    const trimmed = editedName.trim();
    if (!trimmed) {
      toast.error("Nome não pode ser vazio.");
      return;
    }

    if (trimmed.length > 26) {
      toast.error("Máximo de 26 caracteres.");
      return;
    }

    const color = statusList.find((s) => s.id_status === id)?.cor || colors[0];

    const { error } = await updateStatusLicitacao(id, trimmed, color);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Status atualizado com sucesso!");
    setEditingStatusId(null);
    setEditedName("");
    await fetchStatuses();
    onUpdate?.();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {status ? (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium text-white cursor-pointer"
            style={{ backgroundColor: status.cor }}
          >
            {status.nome_status}
          </span>
        ) : (
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <PlusCircle className="h-4 w-4" />
            Status
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Status da Licitação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Lista de Status existentes */}
          <div className="space-y-2">
            <Label>Status existente</Label>
            <div className="flex flex-wrap gap-2">
              {statusList.map((st) => (
                <div
                  key={st.id_status}
                  className={`flex items-center rounded-full text-sm text-white px-2 py-1 ${
                    selectedStatus === st.id_status
                      ? "ring-2 ring-white ring-offset-2"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: st.cor }}
                >
                  {editingStatusId === st.id_status ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onBlur={() => handleEditStatus(st.id_status)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditStatus(st.id_status);
                        }
                      }}
                      maxLength={26}
                      className="bg-transparent border-none text-white text-sm focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedStatus(st.id_status);
                        setEditingStatusId(st.id_status);
                        setEditedName(st.nome_status);
                      }}
                      className="text-left pr-1"
                    >
                      {st.nome_status}
                    </button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="ml-1 text-white text-xs hover:text-red-300"
                        title="Excluir status"
                      >
                        ×
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Status</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este status? Esta ação
                          não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleDeleteStatus(st.id_status)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          </div>

          {/* Criar novo status */}
          <div className="space-y-2">
            <Label>Criar novo status</Label>
            <Input
              placeholder="Nome do status"
              value={statusName}
              onChange={(e) => setStatusName(e.target.value)}
              maxLength={26}
            />
            <div className="text-right text-xs text-muted-foreground">
              {statusName.length} / 26
            </div>
            <div className="flex gap-2 mt-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    color === c ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <Button onClick={handleCreateStatus} size="sm" disabled={loading}>
                {loading ? "Criando..." : "Criar"}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveStatus}
            disabled={!selectedStatus || loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
