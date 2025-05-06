"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Search, ExternalLink, MoreHorizontal } from "lucide-react";

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

import { LicitacaoType } from "../zod-types";
import Link from "next/link";
import { useState } from "react";
import { FolderType } from "@/app/(private)/minhas-licitacoes/zod-types";
import { SaveLicitacao } from "./save-licitacao";
import { updateAvaliacaoLicitacao } from "./actions";

function valorTotalEstimado(licitacao: LicitacaoType): string {
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

type LicitacaoColumnsProps = {
  folders: FolderType[];
  onUpdate: () => void;
  buscaId: string;
};

export const licitacaoColumns = ({
  folders,
  onUpdate,
  buscaId,
}: LicitacaoColumnsProps): ColumnDef<LicitacaoType>[] => [
  {
    accessorKey: "comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
  },
  {
    accessorKey: "modalidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modalidade" />
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
    accessorKey: "objeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objeto" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      const descricaoCompleta = licitacao.objeto;
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
    id: "valorEstimado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor Estimado" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      const valorEstimado = valorTotalEstimado(licitacao);
      return (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {valorEstimado}
        </div>
      );
    },
  },
  {
    accessorKey: "avaliacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avaliação" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [avaliacao, setAvaliacao] = useState(licitacao.avaliacao);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState(false);

      const getEstilos = (valor: string) => {
        switch (valor) {
          case "bom":
            return { backgroundColor: "#d1fae5", color: "#065f46" }; // verde claro
          case "ruim":
            return { backgroundColor: "#fee2e2", color: "#991b1b" }; // vermelho claro
          default:
            return { backgroundColor: "#f3f4f6", color: "#374151" }; // cinza claro
        }
      };

      const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const novaAvaliacao = e.target.value as "bom" | "ruim" | "nao_avaliado";
        setLoading(true);
        const result = await updateAvaliacaoLicitacao(
          buscaId, // certifique-se de que esse campo existe no objeto
          licitacao.id_licitacao,
          novaAvaliacao
        );
        if (result.success) {
          setAvaliacao(novaAvaliacao);
        }
        setLoading(false);
      };

      return (
        <div>
          <select
            value={avaliacao}
            onChange={handleChange}
            disabled={loading}
            style={{
              ...getEstilos(avaliacao),
              padding: "4px 8px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <option value="nao_avaliado">Não Avaliado</option>
            <option value="bom">Bom</option>
            <option value="ruim">Ruim</option>
          </select>
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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
              <SaveLicitacao
                licitacao_id={licitacao.id_licitacao}
                folders={folders}
                onUpdate={onUpdate}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/busca/licitacao/${licitacao.id_licitacao}`}
                className="flex items-center  gap-2 px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white"
              >
                <Search className="h-4 w-4 dark:text-white" />
                <span className="ml-2">Ver Detalhes</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={licitacao.url}
                target="_blank"
                className="flex items-center  gap-2 px-2 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white"
              >
                <ExternalLink className="h-4 w-4 dark:text-white" />
                <span className="ml-2">Ir para o edital</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
