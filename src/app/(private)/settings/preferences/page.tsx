"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { updateUserPreferences } from "./actions";
import { toast } from "sonner";
import Image from "next/image";

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
import { Button } from "@/components/ui/button";

export default function Page() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const userTheme = localStorage.getItem("theme") || "light";
    setTheme(userTheme);
    document
      .querySelector("html")
      ?.classList.toggle("dark", userTheme === "dark");
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document
      .querySelector("html")
      ?.classList.toggle("dark", selectedTheme === "dark");
  };

  const updateUserMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return updateUserPreferences(formData);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error, {
          description: "Please try again later.",
        });
      } else if (data.success) {
        toast.success(data.success, {
          description: "Your preferences have been updated successfully.",
        });
      }
    },
  });

  async function handleSubmit(formData: FormData) {
    formData.append("theme", theme);
    updateUserMutation.mutate(formData);
  }

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
            <div className="flex flex-col justify-start items-start px-10">
              <h1 className="text-2xl font-semibold mb-4 justify-center items-center">
                Tema
              </h1>
              <div className="flex gap-4">
                <div
                  className={`flex items-center justify-center w-24 h-24 rounded-md border-2 cursor-pointer overflow-hidden ${
                    theme === "light" ? "border-primary" : "border-gray-300"
                  }`}
                  onClick={() => handleThemeChange("light")}
                >
                  <Image
                    src="/claro.png"
                    alt="Tema Claro"
                    className="object-cover w-full h-full"
                    width={100}
                    height={100}
                  />
                </div>

                <div
                  className={`flex items-center justify-center w-24 h-24 rounded-md border-2 cursor-pointer overflow-hidden ${
                    theme === "dark" ? "border-primary" : "border-gray-300"
                  }`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <Image
                    src="/escuro.png"
                    alt="Tema Escuro"
                    className="object-cover w-full h-full"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <Button
                className="mt-4 px-4 py-2 left-10 bg-primary text-white rounded-md flex justify-center items-center"
                onClick={() => {
                  const formData = new FormData();
                  handleSubmit(formData);
                }}
              >
                Salvar preferencias
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
