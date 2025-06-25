"use client";

import { useState, useEffect } from "react";
import { updateAvaliacaoLicitacao } from "./actions";

interface AvaliacaoCellProps {
  buscaId: string;
  licitacaoId: string;
  avaliacaoInicial: "bom" | "ruim" | "nao_avaliado";
}

export const AvaliacaoCell = ({
  buscaId,
  licitacaoId,
  avaliacaoInicial,
}: AvaliacaoCellProps) => {
  const [avaliacao, setAvaliacao] = useState(avaliacaoInicial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAvaliacao(avaliacaoInicial);
  }, [avaliacaoInicial]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const novaAvaliacao = e.target.value as "bom" | "ruim" | "nao_avaliado";
    setLoading(true);
    const result = await updateAvaliacaoLicitacao(
      buscaId,
      licitacaoId,
      novaAvaliacao
    );

    if (result.success) {
      setAvaliacao(novaAvaliacao);
    } else {
      alert(`Erro ao atualizar avaliação: ${result.error}`);
    }
    setLoading(false);
  };

  const getEstilos = () => {
    switch (avaliacao) {
      case "bom":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "ruim":
        return { backgroundColor: "#C8C8C8", color: "#374151" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" };
    }
  };

  return (
    <select
      value={avaliacao}
      onChange={handleChange}
      disabled={loading}
      style={{
        ...getEstilos(),
        padding: "4px 8px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      <option value="nao_avaliado">Não Avaliado</option>
      <option value="bom">Bom</option>
      <option value="ruim">Sem interesse</option>
    </select>
  );
};
