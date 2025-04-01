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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { toast } from "sonner";
import { registerSchema } from "../zod-types";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/esconder

  const [pessoa, setPessoa] = useState("fisica"); // Estado para mostrar/esconder
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
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    if (data.password !== data.confirmPassword) {
      <Alert>
        <AlertTitle>Senhas não coincidem</AlertTitle>{" "}
        <AlertDescription>
          As senhas fornecidas não coincidem. Por favor, tente novamente.
        </AlertDescription>
        return;
      </Alert>;
    }
    if (!data.cpf && !data.cnpj) {
      <Alert>
        <AlertTitle>CPF ou CNPJ obrigatório</AlertTitle>{" "}
        <AlertDescription>
          Você deve fornecer pelo menos um CPF ou CNPJ.
        </AlertDescription>
        return;
      </Alert>;
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o seu nome" {...field} />
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
                    placeholder="Digite a sua senha"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme a sua senha"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1} // Evita focar no botão ao tabular
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

        {/* Campos adicionais para CPF, CNPJ e Telefone */}
        <RadioGroup
          value={pessoa}
          onValueChange={(val) => setPessoa(val)}
          className="flex gap-4"
        >
          <FormItem>
            <FormLabel htmlFor="fisica">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-all duration-300 ${
                  pessoa === "fisica"
                    ? "bg-blue-100 border-blue-400"
                    : "border-gray-300"
                }`}
              >
                <RadioGroupItem id="fisica" value="fisica" />
                <span
                  className={`font-semibold ${
                    pessoa === "fisica" ? "text-black" : "text-gray-700"
                  }`}
                >
                  Pessoa Física
                </span>
              </div>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="juridica">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-all duration-300 ${
                  pessoa === "juridica"
                    ? "bg-blue-100 border-blue-400"
                    : "border-gray-300"
                }`}
              >
                <RadioGroupItem id="juridica" value="juridica" />
                <span
                  className={`font-semibold ${
                    pessoa === "juridica" ? "text-black" : "text-gray-700"
                  }`}
                >
                  Pessoa Jurídica
                </span>
              </div>
            </FormLabel>
          </FormItem>
        </RadioGroup>
        {pessoa === "fisica" && (
          <>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o seu CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {pessoa === "juridica" && (
          <>
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o seu CNPJ" {...field} />
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
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a sua razão social" {...field} />
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
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Digite o seu telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botão de envio */}
        <Button className="w-full" type="submit">
          Registrar
        </Button>
      </form>
    </Form>
  );
}
