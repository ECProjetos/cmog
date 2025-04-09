"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { updateUserAvatar, updateUserProfile, updateUserLogin } from "./actions";
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [loginPassword, setLoginPassword] = useState("");
  const [loginConfirmPassword, setLoginConfirmPassword] = useState("");

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

  const loginMutation = useMutation({
    mutationFn: async (formData: FormData) => updateUserLogin(formData),
    onSuccess: (data) => {
      if (data.error) {
        toast.error("Erro ao atualizar informações de login", {
          description: data.error,
        });
        return;
      }

      toast.success("Informações de login atualizadas com sucesso", {
        description: "Seu e-mail e senha foram atualizados com sucesso.",
      });
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

  const handleLoginSubmit = () => {
    const formData = new FormData();
    formData.append("email", loginEmail);
    formData.append("password", loginPassword);
    loginMutation.mutate(formData);
  };

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
    <>
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
                  {avatarFile ? "Imagem selecionada ✅" : "Selecionar imagem"}
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
                <Input value={name} onChange={(e) => setName(e.target.value)} />
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
              Você pode alterar seu e-mail ou senha aqui.
            </p>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label>Email</Label>
                <Input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              </div>
              <div className="grid gap-1 mt-4">
              

                <Label>Nova senha</Label>
                <Input
                className="mb-4"
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <Label>Confirmar senha</Label>
              <Input
                type="password"
                placeholder="Confirme sua nova senha"
                value={loginConfirmPassword}
                onChange={(e) => setLoginConfirmPassword(e.target.value)}
              />
              {loginPassword !== loginConfirmPassword && loginConfirmPassword && (
                  <p className="text-sm text-red-500 mt-1">As senhas não coincidem.</p>
                )}

              </div>
              <Button
              className="mt-6"
              onClick={handleLoginSubmit}
              disabled={
                loginMutation.isPending ||
                !loginPassword ||
                loginPassword !== loginConfirmPassword
              }
            >
              {loginMutation.isPending ? (
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
      </Tabs>
    </>
  );
}
