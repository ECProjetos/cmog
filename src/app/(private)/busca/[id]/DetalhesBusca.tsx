"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { ReRunSearch } from "./actions";

interface DetalhesBuscaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  busca: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  licitacoes: any[];
}

export default function DetalhesBusca({
  busca,
  licitacoes,
}: DetalhesBuscaProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdateButton = () => {
    startTransition(async () => {
      try {
        await ReRunSearch(busca.id_busca);
        toast.success("Busca atualizada com sucesso!");
        router.refresh();
      } catch (err) {
        toast.error("Erro ao atualizar a busca");
        console.error(err);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{busca.titulo}</h1>
          <p className="text-gray-600">{busca.descricao}</p>
        </div>

        <Button onClick={handleUpdateButton} disabled={isPending}>
          <RotateCcw className="mr-2" />
          {isPending ? "Atualizando..." : "Atualizar Busca"}
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Licitações encontradas</h2>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Órgão</th>
                <th className="px-4 py-2 text-left">Objeto</th>
                <th className="px-4 py-2 text-left">Data Abertura</th>
              </tr>
            </thead>
            <tbody>
              {licitacoes?.map((licitacao) => (
                <tr key={licitacao.id_licitacao} className="border-t">
                  <td className="px-4 py-2">{licitacao.id_licitacao}</td>
                  <td className="px-4 py-2">{licitacao.nm_orgao}</td>
                  <td className="px-4 py-2">{licitacao.objeto}</td>
                  <td className="px-4 py-2">{licitacao.dt_abertura}</td>
                </tr>
              ))}
              {licitacoes?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Nenhuma licitação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
