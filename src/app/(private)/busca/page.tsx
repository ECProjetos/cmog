"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
export default function NovaPage() {
  return (
    <div>
      <div className="flex felx-col items-center justify-between mb-4">
        <div className="flex flex-col">
          <h1>Nova Página</h1>
          <p>Esta é uma nova página de exemplo.</p>
        </div>
        <Link
          href="/busca/nova"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "flex items-center justify-center",
          })}
        >
          <PlusCircleIcon className="mr-2" /> Nova Busca
        </Link>
      </div>
    </div>
  );
}
