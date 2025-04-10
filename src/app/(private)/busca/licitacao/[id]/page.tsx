'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLicitacoesByIds } from '../../[id]/actions';
import { LicitacaoType } from '../../zod-types';
// Removed unused import

export default function Page() {
  const params = useParams();
  const id = params.id;

  const [licitacoes, setLicitacoes] = useState<LicitacaoType[]>([]);


  
  useEffect(() => {
    getLicitacoesByIds([parseInt(id)])
      .then((res) => {
        if (res.error) {
          console.error(typeof res.error === 'string' ? res.error : res.error.message);
        } else if (res.data) {
          setLicitacoes(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
      });
  }, [id]);
  
  function valorTotalEstimado(licitacao: LicitacaoType): string {
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
  

  const renderLicitacao = (licitacao: LicitacaoType) => (
    <div key={licitacao.id_licitacao} className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{licitacao.comprador}</h2>
      <p><strong>Data de Abertura:</strong> {licitacao.data_abertura_propostas} às {licitacao.hora_abertura_propostas}</p>
      <p><strong>Estado:</strong> {licitacao.municipios.uf_municipio}</p>
      <p>
        <strong>Link:</strong>{' '}
        <a href={licitacao.url} className="text-blue-600 underline" target="_blank">
          Acessar licitação
        </a>
      </p>
      <p> Descrição aqui
</p>


      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Itens:</h3>
        <ul className="list-disc list-inside space-y-2">
          {licitacao.itens.map((item) => (
            <li key={item.id_item}>
              <p><strong>Descrição:</strong> {item.ds_item}</p>
              <p><strong>Quantidade:</strong> {item.qt_itens}</p>
              <p><strong>Valor Unitário Estimado:</strong> R$ {item.vl_unitario_estimado}</p>
            </li>
        
          ))}
        </ul>
        <br/>
        <div className='text-2xl'>
        <p><strong>Valor Total Estimado:</strong> R$ {valorTotalEstimado(licitacao)}</p>
        </div>
      </div>
    </div>
  );

  

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Detalhes da Licitação</h1>
      {licitacoes.length > 0 ? (
        licitacoes.map(renderLicitacao)
      ) : (
        <p className="mt-4 text-gray-600">Nenhuma licitação encontrada.</p>
      )}
    </div>
  );
}