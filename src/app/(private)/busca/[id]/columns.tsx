"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  Search,
  BookmarkPlus,
  ExternalLink,
  MoreHorizontal,
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

import { toast } from "sonner";

import { LicitacaoType } from "../zod-types";
import Link from "next/link";
import { useState } from "react";

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

const SalvarLicitacao = () => {
  toast.success("Implementar Salvar Licitação", {
    description: "Licitação X Salva no Folder Y",
  });
};

export const licitacaoColumns: ColumnDef<LicitacaoType>[] = [
  {
    accessorKey: "comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
  },
  {
    accessorKey: "municipios.uf_municipio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UF" />
    ),
  },
  {
    accessorKey: "data_abertura_propostas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Abertura" />
    ),
    cell: ({ row }) => {
      const horas = row.original.hora_abertura_propostas;
      return (
        <div style={{ whiteSpace: "balance", wordWrap: "break-word" }}>
          {row.getValue("data_abertura_propostas")} às {horas}
        </div>
      );
    },
  },

  {
    id: "descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      const descricaoCompleta = formatDescricao(licitacao);
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
      const licitacao = row.original;
      return (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {valorTotalEstimado(licitacao)}
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
      const licitacao = row.original;
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
            <DropdownMenuItem onClick={SalvarLicitacao}>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Salvar Licitação
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/busca/licitacao/${licitacao.id_licitacao}`}
                className="flex items-center"
              >
                <Search className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={licitacao.url}
                target="_blank"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ir para o edital
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
