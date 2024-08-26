"use client"

import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { OneWorldMove } from "@/lib/interface";
import { useState } from "react";
import { GoBoardNav } from "./GoBoardNav";
import { OwogMove, OwogMoveProps } from "./OwogMove";

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

export function GoBoard({ moves, size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines);
  const { stoneSize } = goBoardSpecs.getAllSpecs();
  const goStonesList: OwogMoveProps[] = moves?.map(move => ({
    ...move,
    position: goBoardSpecs.getPosition(move.coordinate.x, move.coordinate.y)
  })) ?? []

  const [currentMove, setCurrentMove] = useState(goStonesList.length)

  const currPlayer = currentMove ? goStonesList[currentMove - 1].player : undefined
  const player = currPlayer ? `${currPlayer.last}, ${currPlayer.first} ${currPlayer.rank}` : undefined

  return (
    <div>
      <div className={`relative overflow-hidden w-[${size}px] h-[${size}px]`}>
        <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
        {goStonesList.slice(0, currentMove)
          .map((goStone, idx) => (
            <OwogMove
              key={idx}
              {...goStone}
              size={stoneSize}
              className="transform transition duration-500 hover:scale-125 cursor-pointer"
              isCurrentMove={idx === currentMove - 1}
            />
          ))}
      </div>
      <GoBoardNav
        totalMoves={goStonesList.length}
        currentMove={currentMove}
        onCurrentMoveChange={setCurrentMove}
        player={player}
      />
    </div>
  );
}
