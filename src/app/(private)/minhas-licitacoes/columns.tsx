"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Trash, MoreHorizontal, FolderOpen, Folder } from "lucide-react";

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
import { deleteFolder } from "./actions";
import { FolderType } from "./zod-types";
import Link from "next/link";

const onDelete = (id: string) => {
  deleteFolder(id).then((res) => {
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Pasta excluída com sucesso!");
      setTimeout(() => window.location.reload(), 1500);
    }
  });
};

export const FolderColumns: ColumnDef<FolderType>[] = [
  {
    id: "icon",
    cell: ({ row }) => {
      const id = row.original.id_folder;
      return (
        <Link href={`minhas-licitacoes/${id}`}>
          <Folder className="mr-2 h-4 w-4" />
        </Link>
      );
    },
  },
  {
    accessorKey: "nome_folder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome da pasta" />
    ),
    cell: ({ row }) => {
      const id = row.original.id_folder;

      return (
        <Link href={`minhas-licitacoes/${id}`} className="flex items-center">
          {row.getValue("nome_folder")}
        </Link>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criada em" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div>
          <Link href={`minhas-licitacoes/${row.original.id_folder}`}>
            {date.toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Link>
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
              <Link href={`/busca/${id}`} className="flex items-center">
                <FolderOpen className="mr-2 h-4 w-4" />
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
                      onDelete(id);
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
