"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Trash, MoreHorizontal, Search } from "lucide-react";

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
import { deleteBusca } from "./actions";
import { SearchSchemaViewType } from "./zod-types";
import Link from "next/link";

const DeleteBusca = (id: string) => {
  deleteBusca(id).then((res) => {
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Busca excluída com sucesso!");
      setTimeout(() => window.location.reload(), 1500);
    }
  });
};

export const buscaColumns: ColumnDef<SearchSchemaViewType>[] = [
  {
    accessorKey: "titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => (
      <div
        style={{
          maxWidth: "500px",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {row.getValue("titulo")}
      </div>
    ),
  },
  {
    accessorKey: "descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => (
      <div
        style={{
          maxWidth: "600px",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {row.getValue("titulo")}
      </div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => {
      const id = row.original.id_busca;
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
              <Link href={`/busca/${id}`} className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Ver
              </Link>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir busca</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir esta busca? Esta ação não
                    pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-800 text-white hover:bg-red-600"
                    onClick={() => {
                      DeleteBusca(id);
                    }}
                  >
                    Excluir
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
