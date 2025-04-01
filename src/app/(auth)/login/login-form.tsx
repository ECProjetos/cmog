"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Eye, EyeOff } from "lucide-react"; // 👈 Certifique-se de que tem isso instalado

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

import { toast } from "sonner";
import { loginSchema } from "../zod-types";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    if (data.password !== data.confirmPassword) {
      toast.error("Senhas não coincidem", {
        description:
          "As senhas fornecidas não coincidem. Por favor, tente novamente.",
      });
      return;
    }

    if (!data.cpf && !data.cnpj) {
      toast.error("CPF ou CNPJ obrigatório", {
        description: "Você deve fornecer pelo menos um CPF ou CNPJ.",
      });
      return;
    }

    toast.success("Cadastro realizado com sucesso!", {
      description: (
        <span className="text-zinc-700 dark:text-zinc-200">
          Redirecionando você para o painel...
        </span>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite  o seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
