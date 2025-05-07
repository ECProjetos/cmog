"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { updateUserAvatar, updateUserProfile } from "./actions";
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateUserPassword } from "./actions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Link from "next/link";

export default function AccountPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Estados para informações de perfil
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Estados para informações de login
  const [loginEmail, setLoginEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user?.user_metadata) {
      const data = user.user_metadata;
      setName(data.name || "");
      setPhone(data.phone || "");
      setCpf(data.cpf || "");
      setCnpj(data.cnpj || "");
      setRazaoSocial(data.razao_social || "");
    }
    if (user?.email) {
      setLoginEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  const passwordMutation = useMutation({
    mutationFn: async (formData: FormData) => updateUserPassword(formData),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Erro ao atualizar senha", {
          description: data.error,
        });
        return;
      }

      toast.success("Senha atualizada com sucesso", {
        description: "Sua senha foi alterada com êxito.",
      });

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    },
  });

  const avatarMutation = useMutation({
    mutationFn: async (formData: FormData) => updateUserAvatar(formData),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Erro ao atualizar o avatar", {
          description: data.error,
        });
        return;
      }

      toast.success("Avatar atualizado com sucesso", {
        description: "Seu avatar foi atualizado com sucesso.",
      });
      if (data.avatar_url && user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            avatar_url: data.avatar_url,
          },
        });
      }

      setAvatarFile(null);
      setPreviewUrl(null);
    },
  });

  const profileMutation = useMutation({
    mutationFn: async (formData: FormData) => updateUserProfile(formData),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Erro ao atualizar usuário", {
          description: data.error,
        });
        return;
      }

      toast.success("Perfil atualizado com sucesso", {
        description: "Seu perfil foi atualizado com sucesso.",
      });

      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            name,
            phone,
            cpf,
            cnpj,
            razao_social: razaoSocial,
          },
        });
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Formato de arquivo inválido", {
        description: "Formato do arquivo deve ser uma imagem.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Tamanho do arquivo muito grande", {
        description: "O tamanho máximo do arquivo é 2MB.",
      });
      return;
    }

    setAvatarFile(file);
  };

  const handleAvatarSubmit = () => {
    if (!user || !avatarFile) return;

    const formData = new FormData();
    formData.append("old_avatar", user.user_metadata.avatar_url || "");
    formData.append("avatar", avatarFile);
    formData.append("user_id", user.id);
    avatarMutation.mutate(formData);
  };

  async function handlePasswordSubmit() {
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        description: "Por favor, verifique se as senhas digitadas são iguais.",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("current_password", currentPassword);
    formData.append("password", password);
    passwordMutation.mutate(formData);
  }

  const handleProfileSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("cpf", cpf);
    formData.append("cnpj", cnpj);
    formData.append("razao_social", razaoSocial);
    profileMutation.mutate(formData);
  };

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 pl-0 dark:bg-[#18181B]">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full min-h-full border dark:bg-[#1c1c20]">
            <div className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Configurações</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Conta</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="login">Informações de login</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="max-w-3xl mx-auto p-6">
                  <h3 className="text-2xl font-bold mb-4">Dados Pessoais</h3>
                  <Separator className="mb-6" />

                  {/* Avatar */}
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Avatar atual
                      </p>
                      <Avatar className="h-25 w-25 ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-800">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback>
                          {name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {previewUrl && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Pré-visualização
                        </p>
                        <Avatar className="h-25 w-25 ring-2 ring-offset-2 ring-primary/50">
                          <AvatarImage src={previewUrl} />
                          <AvatarFallback>
                            {name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <>
                      <Label
                        htmlFor="avatar"
                        className="inline-flex items-center px-4 py-2 bg-muted text-sm text-muted-foreground rounded-md cursor-pointer border hover:bg-accent"
                      >
                        {avatarFile
                          ? "Imagem selecionada ✅"
                          : "Selecionar imagem"}
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </>
                    <Button
                      onClick={handleAvatarSubmit}
                      disabled={!avatarFile || avatarMutation.isPending}
                    >
                      {avatarMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar Avatar"
                      )}
                    </Button>
                  </div>

                  {/* Informações do perfil */}
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label>Nome completo</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Telefone</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {cpf ? (
                      <div className="grid gap-1">
                        <Label>CPF</Label>
                        <Input
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                          placeholder="Somente números"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-1">
                          <Label>CNPJ</Label>
                          <Input
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Somente números"
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label>Razão Social</Label>
                          <Input
                            value={razaoSocial}
                            onChange={(e) => setRazaoSocial(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    className="mt-6"
                    onClick={handleProfileSubmit}
                    disabled={profileMutation.isPending}
                  >
                    {profileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="login">
                <div className="max-w-3xl mx-auto p-6">
                  <h1 className="text-2xl font-bold mb-4">
                    Informações de Login
                  </h1>
                  <Separator className="mb-6" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Para alteração de email entrar em contato com o suporte.
                  </p>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label>Email</Label>
                      <Input
                        value={loginEmail}
                        disabled = {true}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-1 mt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input
                          type="password"
                          id="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>

                      <Label>Nova senha</Label>
                      <Input
                        className="mb-4"
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                      className="mb-4"
                      type="password"
                      placeholder="Confirmar senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handlePasswordSubmit}
                      disabled={passwordMutation.isPending}
                    >
                      {passwordMutation.isPending && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Atualizar Senha
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
