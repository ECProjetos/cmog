"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/modle-toggle";
import { LayoutDashboard, LogIn } from "lucide-react";

type NavBarProps = {
  isLoggedIn: boolean;
};

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-gray-950 transition-all">
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
                href="/dashboard"
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link href="#como-funciona">Como Funciona</Link>
          <Link href="#funcionalidades">Funcionalidades</Link>
          <Link href="#planos">Planos</Link>
          <Link href="#sobre">Sobre Nós</Link>
          <Link href="#ajuda">Ajuda</Link>
        </nav>

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
                  className:
                    "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition",
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
