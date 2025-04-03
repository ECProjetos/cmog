"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateUserProfile } from "./actions";
import { UpdateUserProfileInput, userProfileSchema } from "../zod-types";
import { toast } from "sonner";

interface AccountFormProps {
  profile: UpdateUserProfileInput;
}

export default function AccountForm({ profile }: AccountFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      user_id: profile.user_id,
      name: profile.name,
      phone: profile.phone,
      cpf: profile.cpf,
      cnpj: profile.cnpj,
      razao_social: profile.razao_social,
    },
  });

  async function onSubmit(data: z.infer<typeof userProfileSchema>) {
    setLoading(true);
    const res = await updateUserProfile(data);

    if (res?.error) {
      toast.error("Erro ao atualizar perfil", { description: res.error });
    } else {
      toast.success("Perfil atualizado com sucesso!");
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Adicione outros campos conforme necessário */}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
      </form>
    </Form>
  );
}
