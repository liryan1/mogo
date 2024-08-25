"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { GoStoneProps } from "../../lib/interface";

export interface HoverGoStoneProps extends GoStoneProps {
  description: string;
}

export function HoverGoStone({ color, position, className, description, size = 20 }: HoverGoStoneProps) {
  const lines = description.split("\n")
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            className={cn("absolute", className)}
            style={position}
            alt=""
            src={`/images/${color}-stone2.png`}
            width={size}
            height={size}
          />
        </TooltipTrigger>
        <TooltipContent>
          {lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
