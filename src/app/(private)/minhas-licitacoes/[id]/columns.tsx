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
import { licitacaoIndividualType } from "@/app/(private)/busca/zod-types";
import { deletLicitacaoFromFolder } from "./actions";
import { useState } from "react";
import Link from "next/link";
import { ObservacaoDialog } from "./observacao-dialog";
import { StatusDialog } from "./status-dialog";

function valorTotalEstimado(licitacao: licitacaoIndividualType): string {
  const totalEstimado = licitacao.itens.reduce((total, item) => {
    const valorUnitario = parseFloat(item.vl_unitario_estimado || "0");
    const quantidade = parseFloat(item.qt_itens || "0");
    return total + valorUnitario * quantidade;
  }, 0);

  if (isNaN(totalEstimado) || totalEstimado <= 0 || !licitacao.itens.length) {
    return "Indisponível";
  }

  return totalEstimado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

type FolderDetailColumnsProps = {
  onUpdate: () => void;
  user_id?: string;
};

export const FolderDetailColumns = ({
  onUpdate,
  user_id,
}: FolderDetailColumnsProps): ColumnDef<FolderLicitacoes>[] => [
  {
    accessorKey: "licitacao.comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
    cell: ({ row }) => (
      <div
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {row.original.licitacao?.comprador}
      </div>
    ),
    size: 220,
    minSize: 180,
    maxSize: 300,
  },

  {
    accessorKey: "licitacao.tipo_licitacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modalidade" />
    ),
    cell: ({ row }) => (
      <div
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {row.original.licitacao?.tipo_licitacao}
      </div>
    ),
    size: 160,
    minSize: 120,
    maxSize: 200,
  },

  {
    accessorKey: "licitacao.municipios.uf_municipio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UF" />
    ),
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "licitacao.data_abertura_proposta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Abertura" />
    ),
    cell: ({ row }) => {
      const data = row.original.licitacao?.data_abertura_proposta;
      const horas = row.original.licitacao?.hora_abertura_proposta;
      return (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            textAlign: "center",
          }}
        >
          {data as string}
          <br />
          às {horas}
        </div>
      );
    },
    size: 135,
    minSize: 120,
    maxSize: 150,
  },

  {
    id: "licitacao.objeto",
    accessorKey: "licitacao.objeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objeto" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original.licitacao?.objeto;
      const descricaoCompleta = licitacao;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [expanded, setExpanded] = useState(false);
      const limiteCaracteres = 250;

      const textoExibido = expanded
        ? descricaoCompleta
        : (descricaoCompleta ?? "").slice(0, limiteCaracteres) +
          ((descricaoCompleta ?? "").length > limiteCaracteres ? "..." : "");

      return (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          {textoExibido}
          <br />
          {descricaoCompleta && descricaoCompleta.length > limiteCaracteres && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                color: "GrayText",
                border: "none",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              {expanded ? "Mostrar menos" : "Mostrar mais"}
            </button>
          )}
        </div>
      );
    },
    size: 400,
    minSize: 300,
    maxSize: 600,
  },
  {
    id: "valorEstimado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Estimado" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original.licitacao;
      const valorEstimado = licitacao
        ? valorTotalEstimado(licitacao)
        : "Indisponível";
      return (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {valorEstimado}
        </div>
      );
    },
    size: 160,
    minSize: 120,
    maxSize: 200,
  },
  {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { id_folders_licitacoes, id_licitacao, id_folder } = row.original;
      const status = row.original.status_licitacoes;
      console.log("status", status);

      return (
        <StatusDialog
          status={status}
          folderLicitacao={String(id_folders_licitacoes)}
          licitacao_id={String(id_licitacao)}
          folder_id={String(id_folder)}
          onUpdate={onUpdate}
          user_id={user_id}
        />
      );
    },
  },

  {
    id: "observacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observação" />
    ),
    cell: ({ row }) => {
      const { id_folders_licitacoes, id_licitacao, id_folder, observacao } =
        row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [expanded, setExpanded] = useState(false);
      const maxLength = 150;
      const hasLongText = observacao && observacao.length > maxLength;
      const textToDisplay =
        observacao && !expanded
          ? observacao.slice(0, maxLength) + (hasLongText ? "..." : "")
          : observacao;

      return (
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          {/* Botão editar sempre visível no topo */}
          <ObservacaoDialog
            folderLicitacao={String(id_folders_licitacoes)}
            licitacao_id={String(id_licitacao)}
            folder_id={String(id_folder)}
            existingObservacao={observacao}
            onUpdate={onUpdate}
          />

          {/* Texto da observação */}
          <div
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {textToDisplay || null}
          </div>

          {/* Mostrar mais/menos se necessário */}
          {hasLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-muted-foreground hover:underline w-fit"
            >
              {expanded ? "Mostrar menos" : "Mostrar mais"}
            </button>
          )}
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
      const id = row.original.id_folder;

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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
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
                    className="bg-red-800 text-white hover:bg-red-600"
                    onClick={async () => {
                      const res = await deletLicitacaoFromFolder(
                        id,
                        String(licitacao?.id_licitacao || "")
                      );
                      if (res.error) {
                        toast.error(res.error.message);
                      } else {
                        toast.success("Licitação removida com sucesso!");
                        onUpdate();
                      }
                    }}
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
