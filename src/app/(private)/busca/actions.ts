"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { searchSchemaView } from "./zod-types";

export async function getAllBuscas(user_id: string) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("buscas")
            .select("id_busca, id_user, titulo, descricao")
            .eq("id_user", user_id)

        if (error) {
            console.error("Erro dentro do try", error);
            return { error: { message: "Erro ao buscar informações" } };
        }
        if (!data) {
            return { error: { message: "Nenhum dado encontrado" } };
        }
        const buscas = z.array(searchSchemaView).parse(data);
        return { data: buscas };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro no catch", error);
        return { error: { message: "Erro no servidor" } };
    }
}