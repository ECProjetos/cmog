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

export default function AccountPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user_metadata) {
      const data = user.user_metadata;
      setName(data.name || "");
      setPhone(data.phone || "");
      setCpf(data.cpf || "");
      setCnpj(data.cnpj || "");
      setRazaoSocial(data.razao_social || "");
    }
  }, [user]);

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

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
        toast.error("Erro ao atualizar usuário",{
            description: data.error,
        });
        return;
      }

      toast.success("Perfil atualizado com sucesso",{ 
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>
      <Separator className="mb-6" />

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Avatar atual</p>
          <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-800">
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        {previewUrl && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Pré-visualização
            </p>
            <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-primary/50">
              <AvatarImage src={previewUrl} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
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
      </div>

      {/* Informações do perfil */}
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label>Nome completo</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label>Telefone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label>CPF</Label>
          <Input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Somente números"
          />
        </div>
        <div className="grid gap-1">
          <Label>CNPJ</Label>
          <Input
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="Somente números"
          />
        </div>
        {cnpj && (
          <div className="grid gap-1">
            <Label>Razão Social</Label>
            <Input
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
            />
          </div>
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
  );
}
