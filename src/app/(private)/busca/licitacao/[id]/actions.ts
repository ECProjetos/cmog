'use server';

import { createClient } from "@/utils/supabase/server";
import { licitacaoIndividualType } from './zod-types-licitacao';
import { licitacaoSchemaIndividual } from "./zod-types-licitacao";
import { z } from "zod";


export async function getLicitacaoIndividualById(ids: number[]): Promise<{ data?: licitacaoIndividualType[]; error?: string }> {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('licitacoes')
    .select(`
        id_licitacao,
        comprador,
        data_abertura_proposta,
        hora_abertura_proposta,
        url,
        tipo_licitacao,
        municipios (
            uf_municipio,
            nome_municipio
        ),
        itens (
            id_item,
            ds_item,
            qt_itens,
            vl_unitario_estimado
        )
       
    `)
    .in('id_licitacao', ids);


    if (error) {
        console.error('Erro ao buscar licitações:', error);
        return { error: error.message };
    }

    if (!data) {
        return { error: "Nenhuma licitação encontrada" };
    }

    try {
        const parsedData = z.array(licitacaoSchemaIndividual).parse(data);
        return { data: parsedData };
    }
    catch (parseError) {
        console.error('Erro ao analisar os dados:', parseError);
        return { error: "Erro ao processar os dados da licitação" };
    }
}