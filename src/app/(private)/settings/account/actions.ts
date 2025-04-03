"use server";

import { createClient } from "@/utils/supabase/server";
import { UpdateUserProfileInput, userProfileSchema } from "../zod-types";

export async function getUserById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users_profiles")
        .select("*")
        .eq("user_id", id)
        .single();

    if (error) throw new Error("Failed to fetch user data");

    return data;
}

export async function updateUserProfile(data: UpdateUserProfileInput) {
    const supabase = await createClient();
    const parsed = userProfileSchema.safeParse(data);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { error: "Erro de validação: " + JSON.stringify(errors) };
    }

    const { user_id, ...newData } = parsed.data;

    // Buscar dados atuais
    const { data: currentData, error: fetchError } = await supabase
        .from("users_profiles")
        .select("*")
        .eq("user_id", user_id)
        .single();

    if (fetchError) {
        console.error("Erro ao buscar perfil atual:", fetchError);
        return { error: "Erro ao buscar perfil atual" };
    }

    // Comparar campos para atualizar apenas os que mudaram
    const updates: Partial<UpdateUserProfileInput> = {};
    for (const key in newData) {
        if (newData[key as keyof typeof newData] !== currentData[key]) {
            updates[key as keyof typeof newData] = newData[key as keyof typeof newData];
        }
    }

    if (Object.keys(updates).length === 0) {
        return { success: true }; // Nada para atualizar
    }

    const { error } = await supabase
        .from("users_profiles")
        .update(updates)
        .eq("user_id", user_id);

    if (error) {
        console.error("Erro ao atualizar perfil:", error);
        return { error: "Erro ao atualizar perfil" };
    }

    return { success: true };
}
