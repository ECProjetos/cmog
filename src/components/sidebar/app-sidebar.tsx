"use client";

import Image from "next/image";

import * as React from "react";
import { BookOpen } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { useUserStore } from "@/stores/userStore";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Minhas Licitações",
      url: "/minhas-licitacoes",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserStore((state) => state.user);
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-5 p-2">
          <Image src="/logo.png" alt="logo" width={45} height={45} />
          {open && (
            <div className="flex flex-col">
              <h1 className="text-sm font-bold">CMOG</h1>
              <p className="text-xs text-gray-500">Basic</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
