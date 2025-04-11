'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLicitacaoIndividualById } from './actions'; // Ajuste o path conforme necessário
import { licitacaoIndividualType } from './zod-types-licitacao';

export default function Page() {
  const params = useParams();
  const id = params.id;

  const [licitacoes, setLicitacoes] = useState<licitacaoIndividualType[]>([]);

  useEffect(() => {
    getLicitacaoIndividualById([Number(id)])
      .then((res) => {
        if (res.error) {
          console.error(typeof res.error === 'string' ? res.error : "Erro desconhecido");
        } else if (res.data) {
          setLicitacoes(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
      });
  }, [id]);

  function valorTotalEstimado(licitacao: licitacaoIndividualType): string {
    const totalEstimado = licitacao.itens.reduce((total, item) => {
      const valorUnitario = parseFloat(item.vl_unitario_estimado || "0");
      const quantidade = parseFloat(item.qt_itens || "0");
      return total + valorUnitario * quantidade;
    }, 0);

    if (isNaN(totalEstimado)) {
      return "Indisponível";
    }

    return totalEstimado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const renderLicitacao = (licitacao: licitacaoIndividualType) => (
    <div key={licitacao.id_licitacao} className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{licitacao.comprador}</h2>
      <div className="mb-4 space-y-2 mt-4">
        <p>
          <strong>Data de Abertura:</strong> {licitacao.data_abertura_propostas} às {licitacao.hora_abertura_propostas}
        </p>
        <p>
          <strong>Municipio:</strong> {licitacao.municipios.nome_municipio} - {licitacao.municipios?.uf_municipio || "Indisponível"}

        </p>
        <p>
          <strong>Valor Total Estimado:</strong> {valorTotalEstimado(licitacao)}
        </p>
          
        {licitacao.grupos_materiais.map((grupo) =>
          grupo.classes_materiais.map((classe) => (
            <p key={classe.id_classe_material}>{classe.nome_classe_material}</p>
          ))
        )}

<a
            href={licitacao.url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar licitação
          </a>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Itens:</h3>
        <ul className="list-inside space-y-2 text-sm">
          {licitacao.itens.map((item) => (
            <li key={item.id_item} className="border rounded p-2">
              <details>
                <summary className="cursor-pointer">
                  <strong>Item:</strong> {item.ds_item}
                </summary>
                <div className="mt-2">
                  <p>
                    <strong>Quantidade:</strong> {item.qt_itens}
                  </p>
                  <p>
                    <strong>Valor Unitário Estimado:</strong> R$ {item.vl_unitario_estimado}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container py-6 px-10">
      <h1 className="text-2xl font-bold">Detalhes da Licitação</h1>
      {licitacoes.length > 0 ? (
        licitacoes.map(renderLicitacao)
      ) : (
        <p className="mt-4 text-gray-600">Erro ao buscar licitação.</p>
      )}
    </div>
  );
}
