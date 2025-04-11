import { z } from 'zod';




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
    nome_municipio: z.string(),
});



export const licitacaoSchemaIndividual = z.object({
    id_licitacao: z.number(),
    comprador: z.string(),
    data_abertura_propostas: z.string(),
    hora_abertura_propostas: z.string(),
    url: z.string(),
    municipios:z.object({
        uf_municipio: z.string(),
        nome_municipio: z.string()
    }),

    grupos_materiais: z.array(grupoMaterialSchema),
    itens: z.array(itemSchema),
    tipo_licitacao: z.string(),
});

export type licitacaoIndividualType = z.infer<typeof licitacaoSchemaIndividual>;


export type ItemType = z.infer<typeof itemSchema>;


