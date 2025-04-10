import { z } from 'zod';

export const folderSchema = z.object({
    id_folder: z.string().uuid(),
    user_id: z.string().uuid(),
    nome_folder: z.string().min(1, { message: 'Nome da pasta é obrigatório' }),
    created_at: z.string()
});

export const statusLicitacoesSchema = z.object({
    id_status: z.string().uuid(),
    user_id: z.string().uuid(),
    nome_status: z.string().min(1, { message: 'Nome do status é obrigatório' }),
    cor: z.string().optional(),
    created_at: z.date()
});

export const folderLicitacoesSchema = z.object({
    id_folders_licitacoes: z.string().uuid(),
    id_folder: z.string().uuid(),
    id_licitacao: z.string().uuid(),
    id_status: z.string().uuid(),
    observacao: z.string().optional(),
    created_at: z.date()
});

export type FolderType = z.infer<typeof folderSchema>;

export type StatusLicitacoes = z.infer<typeof statusLicitacoesSchema>;

export type FolderLicitacoes = z.infer<typeof folderLicitacoesSchema>;