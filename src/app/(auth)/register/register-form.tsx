"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { signup } from "../actions";
import { toast } from "sonner";
import { registerSchema } from "../zod-types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pessoa, setPessoa] = useState("fisica");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      cnpj: "",
      razao_social: "",
      phone: "",
      avatar_url: "",
      lgpd: false,
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (formData: FormData) => signup(formData),
    onSuccess: (data) => {
      if (data.error) {
        toast("Erro", { description: data.error });
      } else {
        toast("Sucesso", {
          description: "Usuário registrado com sucesso!",
        });
        router.push("/confirm-acount");
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(data: any) {
    signupMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o seu nome"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">Email</FormLabel>
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
              <FormLabel className="dark:text-gray-200">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a sua senha"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">
                Confirmar Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme a sua senha"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
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

        {/* Radio Pessoa */}
        <RadioGroup
          value={pessoa}
          onValueChange={(val) => setPessoa(val)}
          className="flex gap-4"
        >
          {["fisica", "juridica"].map((tipo) => (
            <FormItem key={tipo}>
              <FormLabel htmlFor={tipo}>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-all duration-300 ${
                    pessoa === tipo
                      ? "bg-blue-100 border-blue-400 dark:bg-blue-200/20 dark:border-blue-300"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <RadioGroupItem id={tipo} value={tipo} />
                  <span
                    className={`font-semibold ${
                      pessoa === tipo
                        ? "text-black dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Pessoa {tipo === "fisica" ? "Física" : "Jurídica"}
                  </span>
                </div>
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>

        {pessoa === "fisica" && (
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o seu CPF"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {pessoa === "juridica" && (
          <>
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o seu CNPJ"
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
              name="razao_social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">
                    Razão Social
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a sua razão social"
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o seu telefone"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo LGPD */}
        <FormField
          control={form.control}
          name="lgpd"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id="lgpd"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex-1">
                <FormLabel
                  htmlFor="lgpd"
                  className="font-normal text-sm text-gray-700 dark:text-gray-300"
                >
                  Aceito os termos de uso e a{" "}
                  <Link
                    href="/lgpd"
                    className="text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    política de privacidade.
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Registrar
        </Button>
      </form>
    </Form>
  );
}
