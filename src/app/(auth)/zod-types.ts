import { validaCNPJ } from "@/utils/valida-cnpj";
import { validaCPF } from "@/utils/valida-cpf";
import { validaTelefone } from "@/utils/valida-telefone";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Informe um email válido para acessar sua conta").min(1, "O email é obrigatório para login").max(100, "O email deve ter no máximo 100 caracteres"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres para login").max(100, "A senha deve ter no máximo 100 caracteres"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "Por favor, informe o seu nome.")
            .max(100, "O nome pode ter no máximo 100 caracteres."),

        email: z
            .string()
            .min(1, "O email é obrigatório.")
            .email("Informe um email válido.")
            .max(100, "O email pode ter no máximo 100 caracteres."),

        password: z
            .string()
            .min(8, "A senha precisa ter no mínimo 8 caracteres.")
            .max(100, "A senha pode ter no máximo 100 caracteres."),

        confirmPassword: z
            .string()
            .min(8, "A confirmação de senha é obrigatória.")
            .max(100, "A confirmação de senha pode ter no máximo 100 caracteres."),

        phone: z
            .string()
            .refine(
                (val) => !val || validaTelefone(val),
                { message: "Telefone inválido" }
            )
            .optional(),

        cpf: z
            .string()
            .refine(
                (val) => !val || validaCPF(val),
                { message: "CPF inválido" }
            )
            .optional(),

        cnpj: z
            .string()
            .refine(
                (val) => !val || validaCNPJ(val),
                { message: "CNPJ inválido" }
            )
            .optional(),

        razao_social: z
            .string()
            .optional(),

        avatar_url: z
            .string()
            .optional(),

        theme: z
            .string()
            .default("light")
            .optional(),
        lgpd: z
            .boolean()
            .refine((val) => val === true, { message: "Você deve aceitar os termos de uso e a política de privacidade para continuar." })


    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"], // Aponta erro no campo correto
    });

