/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useTransition } from "react";
import { Trash, MoreHorizontal, FolderOpen, Folder, Pen } from "lucide-react";

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
import { deleteFolder, updateFolder } from "./actions";
import { FolderType } from "./zod-types";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FolderColumnsProps = {
  onUpdate: () => void;
};

export const FolderColumns = ({
  onUpdate,
}: FolderColumnsProps): ColumnDef<FolderType>[] => [
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
    accessorKey: "descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      const id = row.original.id_folder;
      return (
        <Link href={`minhas-licitacoes/${id}`} className="flex items-center">
          <div
            style={{
              maxWidth: "500px",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {row.getValue("descricao")}
          </div>
          ;
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
      const [name, setName] = useState<string>(
        row.getValue("nome_folder") as string
      );
      const [description, setDescription] = useState<string>(
        row.getValue("descricao") as string
      );
      const [isPending, startTransition] = useTransition();
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
                href={`minhas-licitacoes/${id}`}
                className="flex items-center cursor-pointer"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Ver
              </Link>
            </DropdownMenuItem>

            {/* AlertDialog para Editar nome e descrição do folder pela id_folder */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Pen className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Editar Pasta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Insira o novo nome e descrição da pasta.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4">
                  <div className="flex flex-col gap-4">
                    {/* Campo Nome */}
                    <div className="space-y-2">
                      <Label htmlFor={`folderName-${id}`}>Nome:</Label>
                      <Input
                        id={`folderName-${id}`}
                        // 2) Agora `value` é string, sem erro
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da pasta"
                        className="border p-2 rounded"
                      />
                    </div>
                    {/* Campo Descrição */}
                    <div className="space-y-2">
                      <Label htmlFor={`folderDesc-${id}`}>Descrição:</Label>
                      <Input
                        id={`folderDesc-${id}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição da pasta"
                        className="border p-2 rounded"
                      />
                    </div>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-blue-800 text-white hover:bg-blue-600"
                    onClick={() => {
                      startTransition(async () => {
                        // 3) Chama updateFolder com id, name e description (todos strings)
                        const res = await updateFolder(id, name, description);
                        if (res.error) {
                          toast.error(res.error.message);
                        } else {
                          toast.success("Pasta atualizada com sucesso!");
                          onUpdate();
                        }
                      });
                    }}
                    disabled={isPending}
                  >
                    {isPending ? "Salvando..." : "Salvar"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                    onClick={async () => {
                      const res = await deleteFolder(id);
                      if (res.error) {
                        toast.error(res.error.message);
                      } else {
                        toast.success("Pasta excluída com sucesso!");
                        onUpdate(); // <- Chama atualização aqui
                      }
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
