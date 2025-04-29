"use server";

import { createClient } from "@/utils/supabase/server";
import { folderSchema } from "./zod-types";
import { z } from "zod";

export async function createFolder(nome_folder: string, user_id: string, descricao: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("folders")
            .insert([{ nome_folder, user_id, descricao }])
            .select("*");

        if (error) {
            console.error("Erro ao criar a pasta:", error);
            return { error: { message: error.message } };
        }

        if (!data || data.length === 0) {
            return { error: { message: "Pasta não foi criada" } };
        }

        try {
            const parsedData = folderSchema.parse(data[0]);
            return { data: parsedData };
        } catch (validationError) {
            console.error("Erro de validação:", validationError);
            return { error: { message: "Erro ao validar os dados retornados" } };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Erro inesperado ao criar pasta:", err);
        return { error: { message: "Erro interno do servidor" } };
    }
}


export async function getAllFolders(user_id: string) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("folders")
            .select("*")
            .eq("user_id", user_id);

        if (error) {
            console.error("Error fetching folders:", error);
            return { error: { message: "Erro ao buscar informações" } };
        }
        if (!data || data.length === 0) {
            return { error: { message: "Nenhum dado encontrado" } };
        }

        try {
            const folders = z.array(folderSchema).parse(data);
            return { data: folders };
        } catch (validationError) {
            console.error("Erro de validação:", validationError);
            return { error: { message: "Erro ao validar os dados do servidor" } };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro interno:", error);
        return { error: { message: "Erro interno do servidor" } };
    }
}

export async function deleteFolder(folder_id: string) {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from("folders")
            .delete()
            .eq("id_folder", folder_id)

        if (error) {
            console.error("Erro ao deletar pasta:", error);
            return { error: { message: "Erro ao deletar pasta" } };
        }

        return { data: { message: "Pasta deletada com sucesso" } };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro ao deletar pasta:", error);
        return { error: { message: "Erro interno do servidor" } };
    }
}
