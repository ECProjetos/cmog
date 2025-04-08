import { z } from 'zod';

export const searchSchema = z.object({
    title: z.string().min(1, { message: "Título é obrigatório" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    goodKeyWord: z.string().min(1, { message: "Palavras chaves possitivas são obrigatória" }),
    badKeyWord: z.string().min(1, { message: "Palavras chaves negativas são obrigatória" }),
    states: z.array(z.string()).min(1, { message: "Selecione pelo menos um estado" }),
    modality: z.array(z.string().min(1, { message: "Selecione pelo menos uma modalidade" })),
    sites: z.array(z.string()).min(1, { message: "Selecione pelo menos um portal" }),
})

export const searchSchemaView = z.object({
    id_busca: z.string(),
    id_user: z.string(),
    titulo: z.string(),
    descricao: z.string(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;

export type SearchSchemaViewType = z.infer<typeof searchSchemaView>;