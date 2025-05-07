"use server";

import { createClient } from "@/utils/supabase/server";
import { SearchSchemaType } from "../zod-types";

const buildLike = (keywords: string[], fields: string[]) => {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} ~* '\\m${word}\\M'`)
    ).join(" OR ");
};

const buildNotLike = (keywords: string[], fields: string[]) => {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} !~* '\\m${word}\\M'`)
    ).join(" AND ");
};

export async function CreateNewShearch(
    data: SearchSchemaType,
    userId: string
) {
    const supabase = await createClient();

    const {
        title,
        description,
        goodKeyWord,
        badKeyWord,
        states,
        modality,
    } = data;

    const positiveKeywords = goodKeyWord
        .split(";")
        .map(s => s.trim())
        .filter(Boolean);

    const negativeKeywords = badKeyWord
        .split(";")
        .map(s => s.trim())
        .filter(Boolean);

    const positiveClause = buildLike(positiveKeywords, ["l.objeto"]);
    const negativeClause = negativeKeywords.length
        ? "AND " + buildNotLike(negativeKeywords, ["l.objeto"])
        : "";

    const sql = `
        SELECT DISTINCT l.id_licitacao::TEXT AS id_licitacao
    FROM licitacoes l
    JOIN municipios m ON l.id_municipio = m.codigo_ibge
    WHERE
        m.uf_municipio IN (${states.map(s => `'${s}'`).join(", ")})
        AND l.tipo_licitacao IN (${modality.map(m => `'${m}'`).join(", ")})
        AND (${positiveClause})
        ${negativeClause};
    `;

    const { data: results, error } = await supabase.rpc("run_sql", {
        query: sql
    });

    if (error) {
        console.error("Erro na execução da query:", error);
        return { error: "Erro ao executar a busca" };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licitacoesIds = results?.map((r: any) => r.id_licitacao) ?? [];

    const { data: insertResult, error: insertError } = await supabase
        .from("buscas")
        .insert([
            {
                id_user: userId,
                titulo: title,
                descricao: description,
                good_keywords: positiveKeywords,
                bad_keywords: negativeKeywords,
                states,
                modality,
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error("Erro ao salvar busca:", insertError);
        return { error: "Erro ao salvar busca" };
    }

    const id_busca = insertResult.id_busca;

    const { error: relationError } = await supabase
        .from("buscas_licitacoes")
        .insert(
            licitacoesIds.map((id_licitacao: string) => ({
                id_busca,
                id_licitacao,
            }))
        );

    if (relationError) {
        console.error("Erro ao salvar relação busca/licitação:", relationError);
        return { error: "Erro ao relacionar licitações com a busca" };
    }

    return {
        message: "Busca criada com sucesso",
        quantidadeLicitacoes: licitacoesIds.length,
        id_busca,
    };
}

export async function updateSearch(
    data: SearchSchemaType,
    userId: string,
    busca_id: string
) {
    const supabase = await createClient();

    const {
        title,
        description,
        goodKeyWord,
        badKeyWord,
        states,
        modality,
    } = data;

    const positiveKeywords = goodKeyWord
        .split(";")
        .map(s => s.trim())
        .filter(Boolean);

    const negativeKeywords = badKeyWord
        .split(";")
        .map(s => s.trim())
        .filter(Boolean);

    const positiveClause = buildLike(positiveKeywords, ["l.objeto"]);
    const negativeClause = negativeKeywords.length
        ? "AND " + buildNotLike(negativeKeywords, ["l.objeto"])
        : "";

    const sql = `
        SELECT DISTINCT l.id_licitacao::TEXT AS id_licitacao
        FROM licitacoes l
        JOIN municipios m ON l.id_municipio = m.codigo_ibge
        WHERE
            m.uf_municipio IN (${states.map(s => `'${s}'`).join(", ")})
            AND l.tipo_licitacao IN (${modality.map(m => `'${m}'`).join(", ")})
            AND (${positiveClause})
            ${negativeClause};
    `;

    const { data: results, error } = await supabase.rpc("run_sql", {
        query: sql
    });

    if (error) {
        console.error("Erro na execução da query:", error);
        return { error: "Erro ao executar a busca" };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licitacoesIds = results?.map((r: any) => r.id_licitacao) ?? [];

    const { data: updateResult, error: updateError } = await supabase
        .from("buscas")
        .update({
            id_user: userId,
            titulo: title,
            descricao: description,
            good_keywords: positiveKeywords,
            bad_keywords: negativeKeywords,
            states,
            modality,
        })
        .eq("id_busca", busca_id)
        .select()
        .single();

    if (updateError) {
        console.error("Erro ao atualizar busca:", updateError);
        return { error: "Erro ao atualizar busca" };
    }

    // Remove antigas relações
    const { error: deleteError } = await supabase
        .from("buscas_licitacoes")
        .delete()
        .eq("id_busca", busca_id);

    if (deleteError) {
        console.error("Erro ao remover antigas relações:", deleteError);
        return { error: "Erro ao atualizar relações da busca" };
    }

    // Insere novas
    const { error: insertRelationError } = await supabase
        .from("buscas_licitacoes")
        .insert(
            licitacoesIds.map((id_licitacao: string) => ({
                id_busca: busca_id,
                id_licitacao,
            }))
        );

    if (insertRelationError) {
        console.error("Erro ao inserir novas relações:", insertRelationError);
        return { error: "Erro ao atualizar relações da busca" };
    }

    return {
        message: "Busca atualizada com sucesso",
        quantidadeLicitacoes: licitacoesIds.length,
        id_busca: updateResult?.id_busca,
    };
}

