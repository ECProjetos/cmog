import { z } from 'zod';


const keywordRefine = (value: string) => {
    const hasSemicolon = value.includes(";");

    const parts = value
        .split(";")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

    // Se tem ponto e vírgula, mas alguma parte está vazia
    if (hasSemicolon && parts.length === 0) return false;

    // Se não tem ponto e vírgula e tem espaços, assume erro de separador
    if (!hasSemicolon && value.trim().includes(" ")) return false;

    // Está ok
    return parts.length > 0;
};


export const searchSchema = z.object({
    title: z.string().min(1, { message: "Título é obrigatório" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),

    goodKeyWord: z
        .string()
        .min(1, { message: "Palavras chaves positivas são obrigatórias" })
        .refine(keywordRefine, {
            message:
                "Use ponto e vírgula (;) para separar as palavras. Ex: prato; garfo; talher descartável",
        }),

    badKeyWord: z
        .string()
        .min(1, { message: "Palavras chaves negativas são obrigatórias" })
        .refine(keywordRefine, {
            message:
                "Use ponto e vírgula (;) para separar as palavras. Ex: caneca; garrafa térmica",
        }),

    states: z.array(z.string()).min(1, { message: "Selecione pelo menos um estado" }),
    modality: z.array(z.string()).min(1, { message: "Selecione pelo menos uma modalidade" }),
    sites: z.array(z.string()).min(1, { message: "Selecione pelo menos um portal" }),
});



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

export const cnaeSchema = z.object({
    cnae: z.string(),
    descricao: z.string()
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

export const licitacaoSchemaIndividual = z.object({
    id_licitacao: z.number(),
    comprador: z.string(),
    data_abertura_propostas: z.string(),
    hora_abertura_propostas: z.string(),
    url: z.string(),
    municipios: municipioSchema,
    grupos_materiais: z.array(grupoMaterialSchema),
    itens: z.array(itemSchema),
    cnae: z.array(cnaeSchema),
    tipo_licitacao: z.string(),
});

export const licitacaoIndividual = z.object({ licitacaoSchemaIndividual });

export const LicitacoesArraySchema = z.array(licitacaoSchema);

export type ItemType = z.infer<typeof itemSchema>;

export type LicitacaoType = z.infer<typeof licitacaoSchema>;

export type SearchSchemaType = z.infer<typeof searchSchema>;

export type SearchSchemaViewType = z.infer<typeof searchSchemaView>;