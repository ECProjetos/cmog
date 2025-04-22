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

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  createNewStatus,
  getStatusLicitacoesByUserId,
  updateStatusLicitacao,
  deleteStatusLicitacao,
  addSatatusToLicitacao,
  removeStatusFromLicitacao,
} from "./actions";

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
  status?: {
    id_status: string;
    nome_status: string;
    cor?: string;
  } | null;
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
  const [loading, setLoading] = useState(false);
  const [statusName, setStatusName] = useState(status?.nome_status || "");
  const [color, setColor] = useState(status?.cor || colors[0]);
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {status ? (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium text-white cursor-pointer"
            style={{ backgroundColor: color }}
          >
            {statusName}
          </span>
        ) : (
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <PlusCircle className="h-4 w-4" />
            Status
          </Button>
        )}
      </DialogTrigger>
    </Dialog>
  );
}
