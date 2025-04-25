"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ListItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
  children?: React.ReactNode;
}

export const ListItem = ({
  title,
  href,
  children,
  className,
  ...props
}: ListItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "block p-4 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors",
        "dark:border-gray-700 dark:hover:bg-gray-800",
        className
      )}
      {...props}
    >
      <div className="font-medium text-gray-900 dark:text-gray-100">
        {title}
      </div>
      {children && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {children}
        </p>
      )}
    </Link>
  );
};
