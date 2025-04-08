// components/InfoTooltip.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer">
            <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
