"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { useUserStore } from "@/stores/userStore";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { STATES, STATES_BY_REGION } from "@/constants/states";
import { MODALITY } from "@/constants/licitacao-modality";

import { CreateNewShearch, updateSearch } from "./actions";
import {
  searchSchema,
  SearchSchemaType,
  SearchSchemaViewType,
} from "../zod-types";
import { zodResolver } from "@hookform/resolvers/zod";

import InfoTooltip from "@/components/info-toolip";
import { redirect } from "next/navigation";

type SearchFormProps = {
  busca?: SearchSchemaViewType;
  setFormModalOpen?: (open: boolean) => void;
};

export default function SearchForm({
  busca,
  setFormModalOpen,
}: SearchFormProps) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: busca
      ? {
          title: busca.titulo,
          description: busca.descricao,
          goodKeyWord: busca.good_keywords.join("; "),
          badKeyWord: busca.bad_keywords.join("; "),
          states: busca.states,
          modality: busca.modality,
        }
      : {
          title: "",
          description: "",
          goodKeyWord: "",
          badKeyWord: "",
          states: [],
          modality: [],
        },
  });
  const allStates = STATES.map((state) => state.value);
  const allModality = MODALITY.map((modality) => modality.value).flat();
  const user = useUserStore((state) => state.user);
  const hasBusca = !!busca?.id_busca;

  const mutation = useMutation({
    mutationFn: async (data: SearchSchemaType) => {
      if (!user) throw new Error("Usuário não autenticado.");

      if (busca) {
        return await updateSearch(data, user.id, busca.id_busca);
      } else {
        return await CreateNewShearch(data, user.id);
      }
    },
    onSuccess: (res) => {
      if (res.error) {
        toast.error(`Erro ao ${hasBusca ? "criar" : "atualizar"} busca.`, {
          description: res.error,
        });
        return;
      }

      toast.success(
        `Busca ${hasBusca ? "criada" : "atualizada"} com sucesso!`,
        {
          description: `Encontramos ${res.quantidadeLicitacoes} licitações!`,
        }
      );
      if (hasBusca && setFormModalOpen) {
        setFormModalOpen(false);
      } else {
        setTimeout(() => {
          redirect(`/busca/${res.id_busca}`);
        }, 2000);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(`Erro ao ${hasBusca ? "criar" : "atualizar"} busca.`, {
        description: err.message,
      });
    },
  });

  const onSubmit = (data: SearchSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Título</FormLabel>
                <InfoTooltip text="Título da licitação. Ex: Licitações para Vendas" />
              </div>
              <FormControl>
                <Input placeholder="Título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Descrição</FormLabel>
                <InfoTooltip text="Descrição da licitação. Ex: Licitações para Vendas de Produtos de Uso Doméstico" />
              </div>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goodKeyWord"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Palavras Chaves Positivas</FormLabel>
                <InfoTooltip text="Escreva Palavras que você gostaria que buscassemos em suas licitações, varie entre plural e singular. Separe cada palavra ou expressão com ';'. Ex: prato; garfo; talher descartável" />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Ex: prato; garfo; talher descartável"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="badKeyWord"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Palavras Chaves Negativas</FormLabel>
                <InfoTooltip text="Escreva Palavras que você não gostaria que buscassemos em suas licitações. Separe com ';' as palavras que você quer evitar. Ex: caneca; pano de prato" />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Ex: caneca; garrafa térmica; pano de prato"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Nos seguintes estados:</FormLabel>

          <div className="grid grid-cols-6 gap-2">
            {STATES.map((state) => (
              <FormField
                key={state.value}
                control={form.control}
                name="states"
                render={({ field }) => {
                  const isChecked = field.value?.includes(state.value);
                  return (
                    <FormItem
                      key={state.value}
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Switch
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), state.value]
                              : field.value?.filter(
                                  (v: string) => v !== state.value
                                );
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">{state.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", allStates)}
            >
              Marcar tudo
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", [])}
            >
              Desmarcar tudo
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", STATES_BY_REGION.norte)}
            >
              Norte
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", STATES_BY_REGION.nordeste)}
            >
              Nordeste
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                form.setValue("states", STATES_BY_REGION.centroOeste)
              }
            >
              Centro-Oeste
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", STATES_BY_REGION.sudeste)}
            >
              Sudeste
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("states", STATES_BY_REGION.sul)}
            >
              Sul
            </Button>
          </div>

          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Modalidade:</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            {MODALITY.map((modality) => (
              <FormField
                key={typeof modality.value === "string" ? modality.value : modality.value.join("-")}
                control={form.control}
                name="modality"
                render={({ field }) => {
                  const isChecked = Array.isArray(modality.value)
                    ? modality.value.some((val) => field.value?.includes(val))
                    : field.value?.includes(modality.value);

                  return (
                    <FormItem
                      key={typeof modality.value === "string" ? modality.value : modality.value.join("-")}
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Switch
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), modality.value]
                              : field.value?.filter(
                                  (v: string) => v !== modality.value
                                );
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">
                        {modality.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("modality", allModality)}
            >
              Marcar tudo
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.setValue("modality", [])}
            >
              Desmarcar tudo
            </Button>
          </div>
        </FormItem>

        <div className="flex items-center space-x-2">
          {hasBusca ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormModalOpen?.(false)}
            >
              Voltar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => redirect("/busca")}
            >
              Voltar
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Resetar
          </Button>

          <Button type="submit">Buscar</Button>
        </div>
      </form>
    </Form>
  );
}
