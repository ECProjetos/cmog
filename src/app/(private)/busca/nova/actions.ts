"use server";

import { createClient } from "@/utils/supabase/server";
import { SearchSchemaType } from "../zod-types";

const buildLike = (keywords: string[], fields: string[]) => {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} ILIKE '%${word}%'`)
    ).join(" OR ");
};

const buildNotLike = (keywords: string[], fields: string[]) => {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} NOT ILIKE '%${word}%'`)
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

    const positiveKeywords = goodKeyWord.trim().split(/\s+/);
    const negativeKeywords = badKeyWord.trim().split(/\s+/);

    const positiveClause = buildLike(positiveKeywords, [
        "i.ds_item",
        "gm.nome_grupo_material",
        "cm.nome_classe_material"
    ]);

    const negativeClause = negativeKeywords.length
        ? "AND " + buildNotLike(negativeKeywords, ["i.ds_item"])
        : "";

    const sql = `
        SELECT DISTINCT l.id_licitacao
        FROM licitacoes l
        LEFT JOIN municipios m ON l.id_municipio = m.codigo_ibge
        LEFT JOIN cnaes cnae ON l.id_licitacao = cnae.id_licitacao
        LEFT JOIN grupos_materiais gm ON l.id_licitacao = gm.id_licitacao
        LEFT JOIN classes_materiais cm ON gm.id_grupo_material = cm.id_grupo_material
        LEFT JOIN itens i ON l.id_licitacao = i.id_licitacao
        WHERE
            m.uf_municipio IN (${states.map(s => `'${s}'`).join(", ")})
            AND l.tipo_licitacao IN (${modality.map(m => `'${m}'`).join(", ")})
            AND (${positiveClause})
            ${negativeClause};
    `;

    const { data: results, error } = await supabase.rpc("run_sql", { query: sql });

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
                id_licitacoes: licitacoesIds,
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

    return {
        message: "Busca criada com sucesso",
        quantidadeLicitacoes: licitacoesIds.length,
        id_busca: insertResult?.id_busca,
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

    const positiveKeywords = goodKeyWord.trim().split(/\s+/);
    const negativeKeywords = badKeyWord.trim().split(/\s+/);

    const positiveClause = buildLike(positiveKeywords, [
        "i.ds_item",
        "gm.nome_grupo_material",
        "cm.nome_classe_material"
    ]);

    const negativeClause = negativeKeywords.length
        ? "AND " + buildNotLike(negativeKeywords, ["i.ds_item"])
        : "";

    const sql = `
        SELECT DISTINCT l.id_licitacao
        FROM licitacoes l
        LEFT JOIN municipios m ON l.id_municipio = m.codigo_ibge
        LEFT JOIN cnaes cnae ON l.id_licitacao = cnae.id_licitacao
        LEFT JOIN grupos_materiais gm ON l.id_licitacao = gm.id_licitacao
        LEFT JOIN classes_materiais cm ON gm.id_grupo_material = cm.id_grupo_material
        LEFT JOIN itens i ON l.id_licitacao = i.id_licitacao
        WHERE
            m.uf_municipio IN (${states.map(s => `'${s}'`).join(", ")})
            AND l.tipo_licitacao IN (${modality.map(m => `'${m}'`).join(", ")})
            AND (${positiveClause})
            ${negativeClause};
    `;

    const { data: results, error } = await supabase.rpc("run_sql", { query: sql });

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
            id_licitacoes: licitacoesIds,
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

    return {
        message: "Busca atualizada com sucesso",
        quantidadeLicitacoes: licitacoesIds.length,
        id_busca: updateResult?.id_busca,
    };

}
