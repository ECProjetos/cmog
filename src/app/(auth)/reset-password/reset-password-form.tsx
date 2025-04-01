"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPassword } from "../actions"; // Importa a função de ação para redefinir a senha
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ResetPasswordFormValues {
  password: string;
  password_confirmation: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setLoading(true);

    // Cria um FormData com os valores do formulário
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);

    // Obtém o token (ou code) dos parâmetros da URL
    const token = searchParams.get("token") || searchParams.get("code");

    if (!token) {
      form.setError("password", { message: "Token inválido ou ausente." });
      setLoading(false);
      return;
    }

    const response = await resetPassword(formData, token);

    if (response.status === "success") {
      toast.success("Senha redefinida", {
        description: "Sua senha foi redefinida com sucesso.",
      });
      // Opcionalmente, redireciona para a página de login
      router.push("/login");
    } else {
      form.setError("password", { message: response.status });
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Nova senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="Digite sua nova senha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password_confirmation">
                Confirmação da nova senha
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  id="password_confirmation"
                  placeholder="Confirme sua nova senha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <Button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Redefinir senha"}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}
