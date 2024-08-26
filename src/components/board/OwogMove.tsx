"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { GoStoneProps, OneWorldPlayerInfo, StoneColor } from "../../lib/interface";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Circle } from "lucide-react";

export interface OwogMoveProps extends GoStoneProps {
  player: OneWorldPlayerInfo;
  isCurrentMove?: boolean
}

/**
 * One World One Game Move
 */
export function OwogMove({ color, position, className, player, size = 20, isCurrentMove }: OwogMoveProps) {
  // 2 circles of different sizes are touching in the upper left
  // By what distance do we need to shift the smaller circle such that both circles are centered?
  // shift the smaller circle down and right by R(1-r/R)
  // const markerSize = size / 1.6
  // const marker = isCurrentMove ? (
  //   <Circle
  //     className="absolute z-20"
  //     style={{
  //       top: position.top,
  //       left: position.left,
  //       height: markerSize,
  //       width: markerSize,
  //       color: color === StoneColor.BLACK ? StoneColor.WHITE : StoneColor.BLACK
  //     }}
  //   />
  // ) : undefined

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            className={cn("absolute z-10", className)}
            style={position}
            alt=""
            src={`/images/go/${color}-stone.png`}
            width={size}
            height={size}
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-80 space-y-4 px-4 py-4">
          <div className="flex justify-between gap-8">
            <div>
              <p className="text-lg">{player.title ? `${player.title} ` : ""}{player.last}, {player.first}</p>
              <p>{player.rank}</p>
              {player.affiliation && <p>{player.affiliation}</p>}
              {player.worldTitles && <p>World titles: {player.worldTitles}</p>}
            </div>
            <Avatar className="h-16 w-16 text-primary text-4xl">
              <AvatarImage src={`/images/player/${player.imageFileName}`} />
              <AvatarFallback>
                {player.first.at(0)?.toUpperCase()}{player.last.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>{player.bio}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
