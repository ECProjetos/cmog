"use client";

import React from "react";
import { FolderLicitacoes } from "../zod-types";

interface FolderLicitacoesProps {
  folderLicitacoes: FolderLicitacoes[];
}

export default function DetalhesFolder({
  folderLicitacoes,
}: FolderLicitacoesProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Detalhes da Pasta {folderLicitacoes[0]?.folders?.nome_folder ?? ""}
      </h2>
      <div className="overflow-hidden rounded-md border bg-white shadow-md">
        <table className="w-full table-auto border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">ID Licitação</th>
              <th className="px-6 py-3">Comprador</th>
              <th className="px-6 py-3">Data Abertura</th>
              <th className="px-6 py-3">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {folderLicitacoes.map((item) => (
              <tr key={item.id_licitacao}>
                <td className="px-6 py-4">{item.id_licitacao}</td>
                <td className="px-6 py-4">
                  {item.licitacao?.comprador ?? "—"}
                </td>
                <td className="px-6 py-4">
                  {item.licitacao?.data_abertura_propostas ?? "—"}
                </td>
                <td className="px-6 py-4">
                  {item.licitacao?.url ? (
                    <a
                      href={item.licitacao.url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Acessar
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
