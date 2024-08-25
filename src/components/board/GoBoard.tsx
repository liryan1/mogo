"use client"

import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { OneWorldMove } from "@/lib/interface";
import { GoBoardNav } from "./GoBoardNav";
import { HoverGoStone, HoverGoStoneProps } from "./HoverGoStone";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface GoBoardProps {
  /**
   * Board size in pixels
   * @default 600
   */
  size?: number;
  /**
   * number of lines the board has, e.g., 19x19, 13x13, etc.
   * @default 19
   */
  lines?: number;

  moves?: OneWorldMove[]
}

/**
 * The search parameter move=123 gives the current move of the board
 */
export function GoBoard({ moves, size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines);
  const { stoneSize } = goBoardSpecs.getAllSpecs();
  const goStonesList: HoverGoStoneProps[] = moves?.map(move => ({
    ...move,
    position: goBoardSpecs.getPosition(move.coordinate.x, move.coordinate.y)
  })) ?? []

  const [currentMove, setCurrentMove] = useState(goStonesList.length)

  return (
    <div>
      <div className={`relative overflow-hidden w-[${size}px] h-[${size}px]`}>
        <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
        {goStonesList.slice(0, currentMove)
          .map((goStone, idx) => (
            <HoverGoStone key={idx} {...goStone} size={stoneSize} />
          ))}
      </div>
      <GoBoardNav totalMoves={goStonesList.length} currentMove={currentMove} onCurrentMoveChange={setCurrentMove} />
    </div>
  );
}
