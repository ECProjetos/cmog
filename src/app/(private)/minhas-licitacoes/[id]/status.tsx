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

import { addObservacaoToLicitacao } from "./actions";

type ObservacaoDialogProps = {
  licitacao_id: string | undefined;
  folder_id: string | undefined;
  onSuccess: () => void;
};

const colors = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
];

export function ObservacaoDialog({
  licitacao_id,
  folder_id,
  onSuccess,
}: ObservacaoDialogProps) {
  const [isOpen, setIdOpen] = useState<boolean>(false);
  const [nomeStatus, setNomeStatus] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!licitacao_id || !folder_id || !nomeStatus || !selectedColor) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const { error } = await addObservacaoToLicitacao(
      licitacao_id,
      folder_id,
      nomeStatus,
      selectedColor
    );
  };
}
