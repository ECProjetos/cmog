-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.buscas (
  id_busca uuid NOT NULL DEFAULT gen_random_uuid(),
  id_user uuid,
  titulo text,
  descricao text,
  good_keywords ARRAY,
  bad_keywords ARRAY,
  states ARRAY,
  modality ARRAY,
  CONSTRAINT buscas_pkey PRIMARY KEY (id_busca),
  CONSTRAINT buscas_id_user_fkey FOREIGN KEY (id_user) REFERENCES auth.users(id)
);
CREATE TABLE public.buscas_licitacoes (
  id_busca uuid NOT NULL,
  id_licitacao text NOT NULL,
  avaliacao USER-DEFINED,
  CONSTRAINT buscas_licitacoes_pkey PRIMARY KEY (id_busca, id_licitacao),
  CONSTRAINT buscas_licitacoes_id_busca_fkey FOREIGN KEY (id_busca) REFERENCES public.buscas(id_busca),
  CONSTRAINT buscas_licitacoes_id_licitacao_fkey FOREIGN KEY (id_licitacao) REFERENCES public.licitacoes(id_licitacao)
);
CREATE TABLE public.folders (
  id_folder uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  nome_folder text,
  created_at timestamp with time zone DEFAULT now(),
  descricao text,
  CONSTRAINT folders_pkey PRIMARY KEY (id_folder),
  CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.folders_licitacoes (
  id_folders_licitacoes uuid NOT NULL DEFAULT gen_random_uuid(),
  id_folder uuid,
  id_licitacao text,
  id_status uuid,
  observacao text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT folders_licitacoes_pkey PRIMARY KEY (id_folders_licitacoes),
  CONSTRAINT folders_licitacoes_id_status_fkey FOREIGN KEY (id_status) REFERENCES public.status_licitacoes(id_status),
  CONSTRAINT folders_licitacoes_id_licitacao_fkey FOREIGN KEY (id_licitacao) REFERENCES public.licitacoes(id_licitacao),
  CONSTRAINT folders_licitacoes_id_folder_fkey FOREIGN KEY (id_folder) REFERENCES public.folders(id_folder)
);
CREATE TABLE public.itens (
  id_item text NOT NULL,
  nr_item text,
  ds_item text,
  qt_itens text,
  vl_unitario_estimado text,
  id_licitacao text,
  CONSTRAINT itens_pkey PRIMARY KEY (id_item),
  CONSTRAINT itens_id_licitacao_fkey FOREIGN KEY (id_licitacao) REFERENCES public.licitacoes(id_licitacao)
);
CREATE TABLE public.licitacoes (
  id_licitacao text NOT NULL,
  numero text,
  data_abertura_proposta text,
  hora_abertura_proposta text,
  tipo_licitacao text,
  comprador text,
  url text,
  id_municipio text,
  created_at timestamp with time zone,
  objeto text,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT licitacoes_pkey PRIMARY KEY (id_licitacao),
  CONSTRAINT fk_municipio FOREIGN KEY (id_municipio) REFERENCES public.municipios(codigo_ibge)
);
CREATE TABLE public.log_execucoes_buscas (
  id integer NOT NULL DEFAULT nextval('log_execucoes_buscas_id_seq'::regclass),
  id_busca uuid NOT NULL,
  id_usuario uuid,
  horario_execucao timestamp without time zone DEFAULT now(),
  total_antes integer,
  total_encontrado integer,
  CONSTRAINT log_execucoes_buscas_pkey PRIMARY KEY (id),
  CONSTRAINT fk_log_busca FOREIGN KEY (id_busca) REFERENCES public.buscas(id_busca)
);
CREATE TABLE public.municipios (
  codigo_ibge text NOT NULL,
  nome_municipio text,
  uf_municipio text,
  CONSTRAINT municipios_pkey PRIMARY KEY (codigo_ibge)
);
CREATE TABLE public.status_licitacoes (
  id_status uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  nome_status text,
  cor text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT status_licitacoes_pkey PRIMARY KEY (id_status),
  CONSTRAINT status_licitacoes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.users_profiles (
  user_id uuid NOT NULL,
  name text,
  phone text,
  cpf text,
  cnpj text,
  razao_social text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  avatar_url text,
  theme text,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_subscription_status text,
  CONSTRAINT users_profiles_pkey PRIMARY KEY (user_id),
  CONSTRAINT users_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);