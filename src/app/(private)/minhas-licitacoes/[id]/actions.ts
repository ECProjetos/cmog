"use server"

import { createClient } from "@/utils/supabase/server";
import { folderLicitacoesSchema } from "../zod-types";
import { getLicitacoesByIds } from "@/app/(private)/busca/[id]/actions";

import { z } from "zod";

export async function getFolderLicitacoesByFolderId(
    folderId: string
) {
    try {
        const supabase = await createClient();

        const { data: folderLicitacoesData, error } = await supabase
            .from("folders_licitacoes")
            .select(`
                        *,
                        folders (
                            id_folder,
                            user_id,
                            nome_folder,
                            descricao,
                            created_at
                        ),
                        status_licitacoes (
                            id_status,
                            user_id,
                            nome_status,
                            cor,
                            created_at
                        )
                    `)
            .eq("id_folder", folderId);

        if (error || !folderLicitacoesData) {
            console.error("Erro ao buscar licitações da pasta:", error);
            return { data: [], error: { message: "Erro ao buscar informações" } };
        }

        if (folderLicitacoesData.length === 0) {
            return { data: [], error: { message: "Sem licitações salvas" } };
        }


        try {
            const parsedFolderLicitacoes = z.array(folderLicitacoesSchema).parse(folderLicitacoesData);
            const licitacaoIds = parsedFolderLicitacoes.map((item) => item.id_licitacao);

            const validLicitacaoIds = licitacaoIds.filter((id): id is number => id !== undefined);
            const { data: licitacoes, error: licitacoesError } = await getLicitacoesByIds(validLicitacaoIds);

            if (licitacoesError || !licitacoes) {
                return { data: [], error: { message: "Erro ao buscar licitações" } };
            }

            // Juntar os dados
            const mergedData = parsedFolderLicitacoes.map((folderLicitacao) => {
                const licitacao = licitacoes.find(l => l.id_licitacao === folderLicitacao.id_licitacao);
                return {
                    ...folderLicitacao,
                    licitacao: licitacao || null,
                };
            });

            return { data: mergedData };

        } catch (validateError) {
            console.error("Erro ao validar os dados:", validateError);
            return { data: [], error: { message: "Erro ao processar validação dos dados" } };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro inesperado:", error.message || error);
        return { data: [], error: { message: "Erro inesperado" } };
    }
};

export async function deletLicitacaoFromFolder(
    folderId: string,
    licitacaoId: string
) {
    try {
        if (!folderId || !licitacaoId) {
            return { error: { message: "ID da pasta ou da licitação não fornecido" } };
        }
        const supabase = await createClient();

        const { error } = await supabase
            .from("folders_licitacoes")
            .delete()
            .eq("id_folder", folderId)
            .eq("id_licitacao", licitacaoId)

        if (error) {
            console.error("Erro ao deletar licitação da pasta:", error);
            return { error: { message: "Erro ao deletar licitação da pasta" } };
        }

        return { success: true };
    } catch (err) {
        console.error("Erro inesperado ao deletar licitação da pasta:", err);
        return { error: { message: "Erro interno do servidor" } };
    }
}

export async function addObservacaoToLicitacao(
    folderLicitacaoId: string,
    folderId: string,
    licitacaoId: number,
    observacao: string
) {
    try {
        if (!folderLicitacaoId || !folderId || !licitacaoId) {
            return { error: { message: "ID da pasta, da licitação ou observação não fornecido" } };
        }
        const supabase = await createClient();

        const { error } = await supabase
            .from("folders_licitacoes")
            .update({ observacao: observacao || null })
            .eq("id_folders_licitacoes", folderLicitacaoId)
            .eq("id_folder", folderId)
            .eq("id_licitacao", licitacaoId)

        if (error) {
            console.error("Erro ao adicionar observação à licitação:", error);
            return { error: { message: "Erro ao adicionar observação à licitação" } };
        }

        return { success: true };
    } catch (err) {
        console.error("Erro inesperado ao adicionar observação:", err);
        return { error: { message: "Erro interno do servidor" } };
    }
}
