import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const totalRows = table.getFilteredRowModel().rows.length;

  // Verifica se está em modo "Mostrar todos"
  const isShowingAll = table.getState().pagination.pageSize === totalRows;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de {totalRows}{" "}
        linha(s) selecionada(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={
              isShowingAll
                ? `${totalRows}`
                : `${table.getState().pagination.pageSize}`
            }
            onValueChange={(value) => {
              const pageSize = Number(value);
              table.setPageSize(pageSize === -1 ? totalRows : pageSize);
            }}
          >
            <SelectTrigger className="h-8 w-[90px]">
              <SelectValue
                placeholder={
                  isShowingAll
                    ? `${totalRows}`
                    : `${table.getState().pagination.pageSize}`
                }
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20, 25].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
              <SelectItem key={"all"} value="-1">
                Mostrar todos
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {isShowingAll ? 1 : table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Va para a primeira página</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Va para a página anterior</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Va para a próxima página</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Va para a última página</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
