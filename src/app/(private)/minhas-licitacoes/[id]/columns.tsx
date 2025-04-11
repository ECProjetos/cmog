"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Search, ExternalLink, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/components/data-table/column-header";

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

import { toast } from "sonner";

import { FolderLicitacoes } from "../zod-types";
import { LicitacaoType } from "@/app/(private)/busca/zod-types";
import { useState } from "react";
import Link from "next/link";

function valorTotalEstimado(licitacao: LicitacaoType): string {
  const totalEstimado = licitacao.itens.reduce((total, item) => {
    const valorUnitario = parseFloat(item.vl_unitario_estimado || "0");
    const quantidade = parseFloat(item.qt_itens || "0");
    return total + valorUnitario * quantidade;
  }, 0);

  if (isNaN(totalEstimado)) {
    return "Indisponível";
  }

  return totalEstimado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDescricao(licitacao: LicitacaoType): string {
  const dsItens = licitacao.itens
    .map((i) => i.ds_item)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  const grupos = licitacao.grupos_materiais
    .map((g) => g.nome_grupo_material)
    .join(", ");

  const classes = licitacao.grupos_materiais
    .flatMap((g) => g.classes_materiais.map((c) => c.nome_classe_material))
    .join(", ");

  return [classes, grupos, dsItens].filter(Boolean).join(" — ");
}

type FolderDetailColumnsProps = {
  onUpdate: () => void;
};

export const FolderDetailColumns = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate,
}: FolderDetailColumnsProps): ColumnDef<FolderLicitacoes>[] => [
  {
    id: "comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
    accessorFn: (row) => row.licitacao?.comprador || "—",
    cell: ({ row }) => (
      <div
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          maxWidth: "150px",
        }}
      >
        {row.original.licitacao?.comprador || "—"}
      </div>
    ),
  },

  {
    accessorKey: "licitacao.municipios.uf_municipio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UF" />
    ),
  },
  {
    id: "data_abertura_propostas", // Define o id manualmente
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Abertura" />
    ),
    cell: ({ row }) => {
      const data = row.original.licitacao?.data_abertura_propostas || "—";
      const hora = row.original.licitacao?.hora_abertura_propostas || "—";
      return (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          <div>{data}</div>
          <div>às {hora}</div>
        </div>
      );
    },
  },
  {
    id: "descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objeto" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original.licitacao;
      const descricaoCompleta = licitacao
        ? formatDescricao(licitacao)
        : "Descrição indisponível";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [expanded, setExpanded] = useState(false);
      const limiteCaracteres = 250; // ajuste conforme necessário

      const textoExibido = expanded
        ? descricaoCompleta
        : descricaoCompleta.slice(0, limiteCaracteres) +
          (descricaoCompleta.length > limiteCaracteres ? "..." : "");

      return (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {textoExibido}
          <br />
          {descricaoCompleta.length > limiteCaracteres && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                color: "GrayText",
                border: "none",
                cursor: "pointer",
              }}
            >
              {expanded ? "Mostrar menos" : "Mostrar mais"}
            </button>
          )}
        </div>
      );
    },
  },
  {
    id: "valor_estimado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Estimado" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original.licitacao;
      return (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {licitacao ? valorTotalEstimado(licitacao) : "Indisponível"}
        </div>
      );
    },
  },
  {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status_licitacoes;

      if (!status) return <span className="text-gray-400">Sem status</span>;

      return (
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: status.cor || "#6B7280" }} // fallback: gray-500
          />
          <span>{status.nome_status}</span>
        </div>
      );
    },
  },

  {
    id: "observacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observação" />
    ),
    cell: ({ row }) => {
      const obs = row.original.observacao;

      return (
        <div
          className="text-sm text-gray-600"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {obs || "—"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original.licitacao;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/busca/licitacao/${licitacao?.id_licitacao}`}
                className="flex items-center px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={licitacao?.url || "#"}
                target="_blank"
                className="flex items-center px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ir para o edital
              </Link>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash className="mr-2 h-4 w-4" />
                  Remover da pasta
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remover da pasta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você tem certeza que deseja remover esta licitação da pasta?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      toast("implementar a remoção da licitação da pasta", {
                        description: "Aguarde...",
                      });
                    }}
                    className="bg-red-800 text-white hover:bg-red-600"
                  >
                    Remover
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
