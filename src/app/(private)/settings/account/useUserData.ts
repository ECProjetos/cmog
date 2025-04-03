"use client";

import { useEffect, useState } from "react";
import { getUserSession } from "@/app/(auth)/actions";
import { getUserById } from "./actions";
import { UpdateUserProfileInput } from "../zod-types";

export function useUserData() {
    const [user, setUser] = useState<UpdateUserProfileInput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await getUserSession();
                if (!session?.user?.id) {
                    setError("Sessão de usuário não encontrada.");
                    return;
                }

                const userData = await getUserById(session.user.id);
                setUser(userData);
            } catch (err) {
                setError("Erro ao buscar os dados do usuário." + (err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
}
