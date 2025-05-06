import { z } from 'zod';
import { licitacaoSchemaIndividual } from "@/app/(private)/busca/zod-types";

export const folderSchema = z.object({
    id_folder: z.string().uuid(),
    user_id: z.string().uuid(),
    nome_folder: z.string().min(1, { message: 'Nome da pasta é obrigatório' }),
    descricao: z.string().min(1, { message: 'Descrição da pasta é obrigatória' }),
    created_at: z.string()
});

export const statusLicitacoesSchema = z.object({
    id_status: z.string().uuid(),
    user_id: z.string().uuid(),
    nome_status: z.string().min(1, { message: 'Nome do status é obrigatório' }),
    cor: z.string().optional(),
    created_at: z.string().optional(),
});

export const folderLicitacoesSchema = z.object({
    id_folders_licitacoes: z.string().uuid(),
    id_folder: z.string().uuid(),
    id_licitacao: z.string().optional(),
    id_status: z.string().uuid().nullable().optional(),
    observacao: z.string().nullable().optional(),
    created_at: z.string(),
    licitacao: licitacaoSchemaIndividual.optional().nullable(),
    folders: folderSchema,
    status_licitacoes: statusLicitacoesSchema.optional().nullable()
});

export type FolderType = z.infer<typeof folderSchema>;

export type StatusLicitacoes = z.infer<typeof statusLicitacoesSchema>;

export type FolderLicitacoes = z.infer<typeof folderLicitacoesSchema>;