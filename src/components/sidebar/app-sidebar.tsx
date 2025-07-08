"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { BookOpen, BookOpenCheckIcon, Settings2 } from "lucide-react";
import { getUserSession } from "@/app/(auth)/actions";
import { User } from "@supabase/supabase-js";
import { NavGeneral } from "./nav-general";

export const createData = (pathname: string) => ({
  navMain: [
    {
      title: "Minhas Buscas",
      icon: BookOpenCheckIcon,
      url: "/busca",
      isActive: pathname.startsWith("/busca"),
    },
    {
      title: "Minhas Licitações",
      icon: BookOpen,
      url: "/minhas-licitacoes",
      isActive: pathname.startsWith("/minhas-licitacoes"),
    },
  ],
  navGeneral: [
    {
      title: "Configurações",
      icon: Settings2,
      url: "#",
      isActive: pathname.startsWith("/settings"),
      items: [
        {
          title: "Conta",
          url: "/settings/account",
          isActive: pathname.startsWith("/settings/account"),
        },
        {
          title: "Preferências",
          url: "/settings/preferences",
          isActive: pathname.startsWith("/settings/preferences"),
        },
        {
          title: "Cobrança",
          url: "/settings/billing",
          isActive: pathname.startsWith("/settings/billing"),
        },
      ],
    },
  ],
});

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const pathname = usePathname();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getUserSession()
      .then((response) => {
        if (response?.user) {
          setUser(response.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user session:", error);
      });
  }, []);

  const data = createData(pathname!);
  const navData = {
    ...data,
    navGeneral: data.navGeneral.map((item) => ({
      ...item,
      isActive: pathname!.startsWith("/settings"),
      items: item.items?.map((subItem) => ({
        ...subItem,
        isActive: pathname === subItem.url,
      })),
    })),
  };

  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Image src="/logo.png" alt="logo" width={96} height={32} />
          {open && (
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">Basic</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavGeneral items={navData.navGeneral} />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
