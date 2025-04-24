"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon: LucideIcon;
    commingSoon?: boolean;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          rel="noopener noreferrer"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-100 dark:bg-slate-800/[0.8] rounded-3xl shadow-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <CardTitle>
              {item.icon && (
                <item.icon className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
              )}
              <span>{item.title}</span>
              {item.commingSoon && (
                <span className="text-xs text-purple-500 ml-auto">
                  (Em breve)
                </span>
              )}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl min-h-[220px] h-full w-full overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "border border-zinc-100 dark:border-transparent group-hover:border-zinc-200 dark:group-hover:border-slate-700",
        "bg-white dark:bg-black relative z-20 shadow-sm group-hover:shadow-md",
        className
      )}
    >
      <div className="relative z-50 px-6 py-6 flex flex-col justify-between h-full gap-4">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-start justify-between gap-2 flex-wrap w-full">
      <h4
        className={cn(
          "text-zinc-800 dark:text-zinc-100 font-semibold text-base flex items-center gap-2 flex-wrap",
          className
        )}
      >
        {children}
      </h4>
    </div>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};
