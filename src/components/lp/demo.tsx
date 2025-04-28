/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

const Demo: React.FC = () => {
  return (
    <div className="text-center p-8 md:p-16 bg-neutral-50 dark:bg-zinc-950">
      <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
        Conheça a plataforma
      </h1>
      <h2 className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-prose mx-auto">
        Explore as principais funcionalidades e veja como é simples navegar pela
        plataforma.
      </h2>
      <div className="flex justify-center items-center h-[300px] w-full max-w-[600px] mx-auto rounded-lg overflow-hidden shadow-md bg-neutral-100 mt-8">
        <img
          src="/saas.gif"
          alt="Demo Gif"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          className={buttonVariants({
            variant: "default",
            size: "lg",
          })}
          href="/login"
        >
          Experimente agora
        </Link>
      </div>
    </div>
  );
};

export default Demo;
