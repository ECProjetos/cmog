"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ExternalLink } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";

import { LicitacaoType } from "../zod-types";
import Link from "next/link";
import { useState } from "react";
import { SaveLicitacao } from "./save-licitacao";
import { updateAvaliacaoLicitacao } from "./actions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type LicitacaoColumnsProps = {
  buscaId: string;
};

export const licitacaoColumns = ({
  buscaId,
}: LicitacaoColumnsProps): ColumnDef<LicitacaoType>[] => [
  {
    accessorKey: "comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprador" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/busca/licitacao/${row.original.id_licitacao}`}
        target="_blank"
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {row.getValue("comprador")}
      </Link>
    ),
    size: 220,
    minSize: 180,
    maxSize: 300,
  },

  {
    accessorKey: "tipo_licitacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modalidade" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/busca/licitacao/${row.original.id_licitacao}`}
        target="_blank"
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {row.getValue("tipo_licitacao")}
      </Link>
    ),
    size: 160,
    minSize: 120,
    maxSize: 200,
  },
  {
    accessorKey: "municipios",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UF" />
    ),
    cell: ({ row }) => {
      const uf = row.original.municipios?.uf_municipio as string | "";

      return (
        <Link
          href={`/busca/licitacao/${row.original.id_licitacao}`}
          target="_blank"
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {uf}
        </Link>
      );
    },
  },

  {
    accessorKey: "data_abertura_proposta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Abertura" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("data_abertura_proposta");
      const horas = row.original.hora_abertura_proposta;

      return (
        <Link
          href={`/busca/licitacao/${row.original.id_licitacao}`}
          target="_blank"
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            textAlign: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {data as string}
          <br />
          às {horas}
        </Link>
      );
    },
    size: 135,
    minSize: 120,
    maxSize: 150,
  },

  {
    accessorKey: "objeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objeto" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      const descricaoCompleta = licitacao.objeto;
      const limiteCaracteres = 250;
      if (!descricaoCompleta) {
        return (
          <Link
            href={`/busca/licitacao/${licitacao.id_licitacao}`}
            target="_blank"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Descrição não disponível
          </Link>
        );
      }
      const textoExibido =
        descricaoCompleta.length > limiteCaracteres
          ? descricaoCompleta.slice(0, limiteCaracteres) + "..."
          : descricaoCompleta;

      return (
        <Link
          href={`/busca/licitacao/${licitacao.id_licitacao}`}
          target="_blank"
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {textoExibido}
        </Link>
      );
    },
    size: 400,
    minSize: 300,
    maxSize: 600,
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
            return { backgroundColor: "#d1fae5", color: "#065f46" };
          case "ruim":
            return { backgroundColor: "#C8C8C8", color: "#374151" };
          default:
            return { backgroundColor: "#f3f4f6", color: "#374151" };
        }
      };

      const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const novaAvaliacao = e.target.value as "bom" | "ruim" | "nao_avaliado";
        setLoading(true);
        const result = await updateAvaliacaoLicitacao(
          buscaId,
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
            <option value="ruim">Sem interesse</option>
          </select>
        </div>
      );
    },
    size: 140,
    minSize: 120,
    maxSize: 180,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => {
      const licitacao = row.original;
      return (
        <div className="flex flex-col gap-2">
          <SaveLicitacao licitacao_id={licitacao.id_licitacao} />
          <Link
            href={`/busca/licitacao/${licitacao.id_licitacao}`}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              })
            )}
          >
            <ExternalLink className="h-4 w-4 dark:text-white" />
          </Link>
        </div>
      );
    },
  },
];
