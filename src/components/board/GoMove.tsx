"use client"

import { cn } from "@/lib/utils";
import { FaRegCircle } from "react-icons/fa";
import Image from "next/image";
import { GoStoneProps, OneWorldPlayerInfo, StoneColor } from "../../lib/interface";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MovePlayerInfo } from "./MovePlayerInfo";

export interface GoMoveProps extends GoStoneProps {
  player: OneWorldPlayerInfo;
  isCurrentMove?: boolean
}

/**
 * One World One Game Move
 */
export function GoMove({ color, position, className, player, size = 20, isCurrentMove }: GoMoveProps) {

  const markerSize = size / 1.8
  const marker = isCurrentMove ? (
    <FaRegCircle
      style={{
        top: position.top,
        left: position.left,
        height: markerSize,
        width: markerSize,
        color: color === StoneColor.BLACK ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
      }}
    />
  ) : undefined

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn("absolute z-10", className)} style={position}>
          <div className="relative">
            <Image
              className=" aspect-square object-contain"
              alt={`${color}-stone`}
              src={`/images/go/${color}-stone.png`}
              width={size}
              height={size}
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {marker}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-120 space-y-4 px-4 py-4">
        <MovePlayerInfo player={player} />
      </PopoverContent>
    </Popover>
  );
}
