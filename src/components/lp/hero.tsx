"use client";

import Link from "next/link";
import { AuroraBackground } from "../ui/aurora-background";
import { motion } from "motion/react";
import { buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center px-6 md:px-12 text-center gap-6 max-w-4xl mx-auto py-24 mt-16"
      >
        <h1 className="text-3xl md:text-6xl font-semibold tracking-tight dark:text-white leading-tight">
          Encontre Licitações Públicas com Mais Facilidade
        </h1>

        <p className="text-base md:text-2xl font-light text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Descubra como nossa plataforma pode transformar a forma como você
          participa licitações públicas.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/register"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Criar Conta Grátis
          </Link>
          <Link
            href="#como-funciona"
            className={buttonVariants({
              variant: "outline",
              className:
                "text-sm px-5 py-2.5 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            })}
          >
            Ver como funciona
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
