"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { Button } from "@/components/ui/button";
import { ListRestart } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LicitacoesTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function LicitacoesTable<TData, TValue>({
  columns,
  data,
}: LicitacoesTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleResetFiltersButtonClick = () => {
    setColumnFilters([]);
    setSorting([]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
    state: { sorting, columnFilters },
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 gap-2">
        <Input
          placeholder="Pesquisar em objeto..."
          value={(table.getColumn("objeto")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("objeto")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 flex items-center gap-2"
            onClick={handleResetFiltersButtonClick}
          >
            <ListRestart className="w-4 h-4" />
            Resetar Filtros
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto px-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
