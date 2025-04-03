import { validaCNPJ } from "@/utils/valida-cnpj";
import { validaCPF } from "@/utils/valida-cpf";
import { validaTelefone } from "@/utils/valida-telefone";
import { z } from "zod";

export const userProfileSchema = z.object({
    user_id: z.string().uuid(),
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string()
    .refine(
        (val) => !val || validaTelefone(val),
        { message: "Telefone inválido" }
    )
    .optional(),
    cpf: z.string()
    .refine(
        (val) => !val || validaCPF(val),
        { message: "CPF inválido" }
    )
    .optional(),
    cnpj: z.string()
    .refine(
        (val) => !val || validaCNPJ(val),
        { message: "CNPJ inválido" }
    )
    .optional(),
    razao_social: z.string().optional(),
    avatar_url: z.string().url().optional(),
});

export type UpdateUserProfileInput = z.infer<typeof userProfileSchema>;