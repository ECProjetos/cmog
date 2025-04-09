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
    good_keywords: z.array(z.string()),
    bad_keywords: z.array(z.string()),
    states: z.array(z.string()),
    modality: z.array(z.string()),
    id_licitacoes: z.array(z.number()),
});

export const itemSchema = z.object({
    id_item: z.number(),
    ds_item: z.string(),
    qt_itens: z.string(),
    vl_unitario_estimado: z.string().nullable(),
});

export const classeMaterialSchema = z.object({
    id_classe_material: z.number(),
    nome_classe_material: z.string(),
});

export const grupoMaterialSchema = z.object({
    id_grupo_material: z.number(),
    nome_grupo_material: z.string(),
    classes_materiais: z.array(classeMaterialSchema),
});

export const municipioSchema = z.object({
    uf_municipio: z.string(),
});

export const licitacaoSchema = z.object({
    id_licitacao: z.number(),
    comprador: z.string(),
    data_abertura_propostas: z.string(),
    hora_abertura_propostas: z.string(),
    url: z.string(),
    municipios: municipioSchema,
    grupos_materiais: z.array(grupoMaterialSchema),
    itens: z.array(itemSchema),
});

export const LicitacoesArraySchema = z.array(licitacaoSchema);

export type ItemType = z.infer<typeof itemSchema>;

export type LicitacaoType = z.infer<typeof licitacaoSchema>;

export type SearchSchemaType = z.infer<typeof searchSchema>;

export type SearchSchemaViewType = z.infer<typeof searchSchemaView>;