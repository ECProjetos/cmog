/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/modle-toggle";
import { LayoutDashboard, LogIn } from "lucide-react";
import { ListItem } from "./ui/list-item";
import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";
type NavBarProps = {
  isLoggedIn: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Busca Inteligente e Rápida",
    href: "/busca-rapida",
    description:
      "Encontre licitações com filtros personalizados por área, localização, órgão e mais.",
  },
  {
    title: "Organização Estratégica",
    href: "/organizacao-estrategica",
    description:
      "Salve licitações em pastas, adicione observações e acompanhe o status.",
  },
  {
    title: "Notificações Relevantes",
    href: "/alertas",
    description:
      "Receba alertas das licitações que realmente importam para o seu negócio.",
  },
  {
    title: "Foco no Sucesso",
    href: "/monitoramento",
    description:
      "Acompanhe todo o ciclo da licitação, da descoberta à entrega da proposta.",
  },
  {
    title: "Feito para Pequenas Empresas",
    href: "/empresas",
    description: "Interface simples, poderosa e pensada para produtividade.",
  },
  {
    title: "Painel com Indicadores",
    href: "/indicadores",
    description:
      "Visualize métricas e indicadores para decisões mais estratégicas.",
  },
];

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-zinc-950 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* MOBILE HEADER */}
        <div className="flex w-full justify-between items-center md:hidden">
          {/* Logo (Mobile) */}
          <Link href="/" className="block md:hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={40}
              className="rounded-full"
            />
          </Link>

          {/* Right Side: Theme Toggle + Menu Toggle */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {isLoggedIn ? (
              <Link
                href="/busca"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-4 py-2 text-sm",
                })}
              >
                <LayoutDashboard />
              </Link>
            ) : (
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-4 py-2 text-sm",
                })}
              >
                <LogIn className="w-4 h-4 mr-1" />
              </Link>
            )}
            <Button
              variant="outline"
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Logo (Desktop) */}
        <Link href="/" className="hidden md:flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={40}
            className="rounded-full"
          />
        </Link>
        {/*
          <Link href="#planos">Planos</Link>
          <Link href="#sobre">Sobre Nós</Link>
          <Link href="#ajuda">Ajuda</Link>
        </nav> */}

        {/* Desktop Navegation Menu */}
        <NavigationMenu className="hidden md:flex w-full justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Como Funciona</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        href="#como-funciona"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={80}
                          height={40}
                          className="rounded-full"
                        />
                        <p className="text-sm leading-tight text-muted-foreground">
                          Transforme oportunidades em contratos reais. Com
                          inteligência, organização e foco
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/register" title="Crie Sua Conta">
                    Crie sua conta gratuitamente e comece a encontrar licitações
                    agora
                  </ListItem>
                  <ListItem href="/busca-rapida" title="Buscas Inteligentes">
                    Encontre licitações relevantes para o seu negócio com nossa
                    tecnologia de busca avançada.
                  </ListItem>
                  <ListItem
                    href="/indicadores"
                    title="Indicadores de Desempenho"
                  >
                    Acompanhe o desempenho de suas propostas e melhore sua
                    estratégia de participação em licitações.{" "}
                    <span className="text-xs text-gray-500">(em breve)</span>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#planos"
                className={navigationMenuTriggerStyle()}
              >
                Planos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LinkPreview
                url={`${BASE_URL}/sobre`}
                className={navigationMenuTriggerStyle()}
              >
                Sobre nós
              </LinkPreview>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contato" className={navigationMenuTriggerStyle()}>
                  Contato
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "default",
                className: "px-4 py-2 text-sm",
              })}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Criar Conta
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 pb-4">
          <nav className="flex flex-col w-full items-center justify-center gap-4 text-gray-700 dark:text-gray-200">
            <Link href="#como-funciona" onClick={() => setIsOpen(false)}>
              Como Funciona
            </Link>
            <Link href="#funcionalidades" onClick={() => setIsOpen(false)}>
              Funcionalidades
            </Link>
            <Link href="#planos" onClick={() => setIsOpen(false)}>
              Planos
            </Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)}>
              Sobre Nós
            </Link>
            <Link href="#ajuda" onClick={() => setIsOpen(false)}>
              Ajuda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
