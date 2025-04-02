"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/use-logout";

export default function MinhasLicitacoesPage() {
  return (
    <div>
      <h1>Minhas Licitações</h1>
      <p>Esta página lista as licitações do usuário.</p>
      <Button onClick={() => logout()}>Sair</Button>
    </div>
  );
}
