"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowDown, ArrowUp, ChevronsUpDown, ExternalLink } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";

import { LicitacaoType } from "../zod-types";
import Link from "next/link";
import { SaveLicitacao } from "./save-licitacao";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { AvaliacaoCell } from "./AvaliacaoCell";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

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
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Avaliação</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDown />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUp />
              ) : (
                <ChevronsUpDown />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            

            {/* Filtro de Avaliação */}
            <DropdownMenuLabel>Filtrar Avaliação</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={(column.getFilterValue() as string) ?? ""}
              onValueChange={(value) =>
                column.setFilterValue(value || undefined)
              }
            >
              <DropdownMenuRadioItem value="">
                Todas Avaliações
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bom">Bom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ruim">
                Sem interesse
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="nao_avaliado">
                Não Avaliado
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    cell: ({ row }) => (
      <AvaliacaoCell
        buscaId={buscaId}
        licitacaoId={row.original.id_licitacao}
        avaliacaoInicial={row.original.avaliacao}
      />
    ),
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
