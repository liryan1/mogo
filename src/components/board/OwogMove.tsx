"use client"

import { cn } from "@/lib/utils";
import { FaRegCircle } from "react-icons/fa";
import Image from "next/image";
import { GoStoneProps, OneWorldPlayerInfo, StoneColor } from "../../lib/interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const maxNameLengthForSmallerFont = 16

export interface OwogMoveProps extends GoStoneProps {
  player: OneWorldPlayerInfo;
  isCurrentMove?: boolean
}

/**
 * One World One Game Move
 */
export function OwogMove({ color, position, className, player, size = 20, isCurrentMove }: OwogMoveProps) {
  const defaultPlayerImageFileName = `${player.last.toLowerCase()}_${player.first.toLowerCase()}.jpg`
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

  const name = `${player.title ? `${player.title} ` : ""}${player.last}, ${player.first}`

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
        <div className="flex justify-between gap-4">
          <div>
            <p style={{
              fontSize: `${name.length < maxNameLengthForSmallerFont ? 18 : 14}px`,
              lineHeight: `${name.length < maxNameLengthForSmallerFont ? 28 : 20}px`,
            }}>{name}</p>
            <p className="text-xs">{player.rank}</p>
            {player.affiliation && (
              <p className="text-xs text-muted-foreground overflow-clip whitespace-nowrap">
                {player.affiliation}
              </p>
            )}
          </div>
          <Avatar className="h-16 w-16 text-primary text-3xl">
            <AvatarImage src={`/images/player/${player.imageFileName ?? defaultPlayerImageFileName}`} />
            <AvatarFallback>
              {player.last.at(0)?.toUpperCase()}{player.first.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="text-xs text-justify">{player.bio}</p>
      </PopoverContent>
    </Popover>
  );
}
