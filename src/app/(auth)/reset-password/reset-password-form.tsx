"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPassword } from "../actions"; // Importa a função de ação para redefinir a senha
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false); // Estado
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false); // Estado para mostrar/esconder a confirmação da senha

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setLoading(true);

    if (values.password !== values.password_confirmation) {
      form.setError("password_confirmation", {
        message: "As senhas não coincidem",
      });
      setLoading(false);
      return;
    }

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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1} // Evita focar no botão ao tabular
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          rules={{
            validate: (value) =>
              value === form.getValues("password") || "As senhas não coincidem",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPasswordConfirmation ? "text" : "password"}
                    placeholder="Confirme a sua senha"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
