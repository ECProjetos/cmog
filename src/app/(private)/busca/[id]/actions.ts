"use server";

import { createClient } from "@/utils/supabase/server";

export async function ReRunSearch(buscaId: string) {
    const supabase = await createClient();

    const { data: busca, error } = await supabase
        .from("buscas")
        .select("*")
        .eq("id_busca", buscaId)
        .single();

    if (error || !busca) {
        throw new Error("Busca não encontrada");
    }

    const buildLike = (keywords: string[], fields: string[]) =>
        keywords.flatMap((word) =>
            fields.map((field) => `${field} ILIKE '%${word}%'`)
        ).join(" OR ");

    const buildNotLike = (keywords: string[], fields: string[]) =>
        keywords.flatMap((word) =>
            fields.map((field) => `${field} NOT ILIKE '%${word}%'`)
        ).join(" AND ");

    const positiveKeywords = busca.good_keywords ?? [];
    const negativeKeywords = busca.bad_keywords ?? [];

    const positiveClause = buildLike(positiveKeywords, ["l.objeto"]);

    const negativeClause = negativeKeywords.length
        ? "AND " + buildNotLike(negativeKeywords, ["l.objeto"])
        : "";

    const sql = `
        SELECT DISTINCT l.id_licitacao
        FROM licitacoes l
        JOIN municipios m ON l.id_municipio = m.codigo_ibge
        WHERE
            m.uf_municipio IN (${busca.states.map((s: string) => `'${s}'`).join(", ")})
            AND l.tipo_licitacao IN (${busca.modality.map((m: string) => `'${m}'`).join(", ")})
            AND (${positiveClause})
            ${negativeClause};
    `;

    const { data: results, error: sqlError } = await supabase.rpc("run_sql", { query: sql });

    if (sqlError) {
        console.error("Erro ao executar SQL:", sqlError);
        throw new Error("Erro ao reexecutar a busca");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licitacoesIds = results?.map((r: any) => r.id_licitacao) ?? [];

    // Remove relações antigas
    const { error: deleteError } = await supabase
        .from("buscas_licitacoes")
        .delete()
        .eq("id_busca", buscaId);

    if (deleteError) {
        console.error("Erro ao remover relações antigas:", deleteError);
        throw new Error("Erro ao atualizar as licitações da busca");
    }

    // Insere novas relações
    const { error: insertError } = await supabase
        .from("buscas_licitacoes")
        .insert(
            licitacoesIds.map((id_licitacao: string) => ({
                id_busca: buscaId,
                id_licitacao,
            }))
        );

    if (insertError) {
        console.error("Erro ao inserir novas relações:", insertError);
        throw new Error("Erro ao salvar as novas licitações da busca");
    }

    return licitacoesIds;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLicitacoesByBusca(buscaId: string): Promise<{ data?: any[]; error?: string }> {
    const supabase = await createClient();

    // Buscar as licitações com avaliação
    const { data, error } = await supabase
        .from("buscas_licitacoes")
        .select(`
    avaliacao,
    licitacao:licitacoes (
      id_licitacao,
      comprador,
      data_abertura_proposta,
      hora_abertura_proposta,
      url,
      tipo_licitacao,
      objeto,
      municipios (
        nome_municipio,
        uf_municipio
      ),
      itens (
        id_item,
        ds_item,
        qt_itens,
        vl_unitario_estimado
      )
    )
  `)
        .eq("id_busca", buscaId);

    if (error) {
        console.error("Erro ao buscar licitações com avaliação:", error);
        return { error: "Erro ao buscar dados" };
    }

    // Normaliza estrutura para facilitar o uso no front
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = data.map((entry: any) => ({
        ...entry.licitacao,
        avaliacao: entry.avaliacao ?? "nao_avaliado",
    }));


    return { data: result };
}

export async function updateAvaliacaoLicitacao(
    buscaId: string,
    licitacaoId: string,
    avaliacao: "bom" | "ruim" | "nao_avaliado"
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("buscas_licitacoes")
        .update({ avaliacao })
        .eq("id_busca", buscaId)
        .eq("id_licitacao", licitacaoId);

    if (error) {
        console.error("Erro ao atualizar avaliação:", error);
        return { success: false, error: "Erro ao atualizar avaliação" };
    }

    return { success: true };
}

export async function saveLicitacao(
    licitacao_id: string,
    folder_id: string
) {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from("folders_licitacoes")
            .insert([{ id_licitacao: licitacao_id, id_folder: folder_id }])

        if (error) {
            console.error("Erro ao salvar licitação:", error);
            return { error: { message: error.message } };
        }

        return { data: { message: "Licitação salva com sucesso!" } };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro inesperado ao salvar licitação:", error);
        return { error: { message: "Erro interno do servidor" } };
    }
}

