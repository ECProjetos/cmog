"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

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
import { login, loginWithToken } from "../actions";
import { loginSchema } from "../zod-types";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const tokenMutation = useMutation({
    mutationFn: async (code: string) => loginWithToken(code),
    onSuccess: (data) => {
      if (!data.error) {
        location.reload();
      }
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      tokenMutation.mutate(code);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      return login(formData);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Erro ao fazer login", {
          description: (
            <span className="text-gray-500 dark:text-gray-300">
              {data.error}
            </span>
          ),
        });
      } else if (data.success) {
        toast.success("Login realizado com sucesso", {
          description: (
            <span className="text-gray-500 dark:text-gray-300">
              Redirecionando você para a plataforma
            </span>
          ),
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-gray-200">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o seu email"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  {...field}
                />
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
              <FormLabel className="text-gray-700 dark:text-gray-200">
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    tabIndex={-1}
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
