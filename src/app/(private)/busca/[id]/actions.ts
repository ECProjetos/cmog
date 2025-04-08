"use server";

import { createClient } from "@/utils/supabase/server";



function buildLike(keywords: string[], fields: string[]) {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} ILIKE '%${word}%'`)
    ).join(" OR ");
}

function buildNotLike(keywords: string[], fields: string[]) {
    return keywords.flatMap((word) =>
        fields.map((field) => `${field} NOT ILIKE '%${word}%'`)
    ).join(" AND ");
}

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

    const positiveClause = buildLike(busca.good_keywords, [
        "i.ds_item",
        "gm.nome_grupo_material",
        "cm.nome_classe_material"
    ]);

    const negativeClause = busca.bad_keywords?.length
        ? "AND " + buildNotLike(busca.bad_keywords, ["i.ds_item"])
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
      m.uf_municipio IN (${busca.states.map((s: string) => `'${s}'`).join(", ")})
      AND l.tipo_licitacao IN (${busca.modality.map((m: string) => `'${m}'`).join(", ")})
      AND (${positiveClause})
      ${negativeClause};
  `;

    const { data: results, error: sqlError } = await supabase.rpc("run_sql", { query: sql });

    if (sqlError) throw new Error("Erro ao reexecutar a busca");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const licitacoesIds = results?.map((r: any) => r.id_licitacao) ?? [];

    // Atualiza a busca com os novos resultados
    await supabase.from("buscas")
        .update({ id_licitacoes: licitacoesIds })
        .eq("id_busca", buscaId);

    return licitacoesIds;
}

