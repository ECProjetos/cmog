"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  Search,
  ExternalLink,
  MoreHorizontal,
  Trash,
  PlusCircle,
} from "lucide-react";

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
import { deletLicitacaoFromFolder } from "./actions";
import { useState } from "react";
import Link from "next/link";
import { ObservacaoDialog } from "./observacao-dialog";

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
    accessorFn: (row) => row.licitacao?.data_abertura_propostas || "—",
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
    accessorFn: (row) =>
      row.licitacao ? formatDescricao(row.licitacao) : "Descrição indisponível",
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
    accessorFn: (row) =>
      row.licitacao ? valorTotalEstimado(row.licitacao) : "Indisponível",
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

      if (!status)
        return (
          <Button variant="ghost" size="sm" className="w-full">
            <PlusCircle className="h-4 w-4" />
            Status
          </Button>
        );

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
            licitacao_id={Number(id_licitacao)}
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
