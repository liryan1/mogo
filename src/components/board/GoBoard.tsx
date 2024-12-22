"use client";

import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { OneWorldMove } from "@/lib/interface";
import { Fragment, useState } from "react";
import { GoBoardNav } from "./GoBoardNav";
import { GoMove } from "./GoMove";
import { GoGame } from "@/lib/goGame";

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

  moves?: OneWorldMove[];
}

export function GoBoard({ moves = [], size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines);
  const { stoneSize } = goBoardSpecs.getAllSpecs();

  const game = GoGame.fromMoves(moves);
  const [board, setBoard] = useState(game.getBoard());

  const [currentMove, setCurrentMove] = useState(moves.length);

  const handleCurrentMoveChange = (currentMove: number) => {
    setCurrentMove(currentMove);
    game.goToSpecified(currentMove);
    setBoard(game.getBoard());
  };

  const currPlayer = currentMove ? moves[currentMove - 1].player : undefined;
  const player = currPlayer
    ? `${currPlayer.last}, ${currPlayer.first} ${currPlayer.rank}`
    : undefined;

  return (
    // Extra div needed here to prevent outside styles spilling into board styles
    <div className="my-4">
      <div
        className={`inset-0 relative overflow-hidden w-[${size}px] h-[${size}px]`}
      >
        <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
        {moves
          .slice(0, currentMove)
          .map((move, idx) =>
            board[move.coordinate.y][move.coordinate.x] === "." ? (
              <Fragment key={idx}></Fragment>
            ) : (
              <GoMove
                key={idx}
                color={move.color}
                position={goBoardSpecs.getPosition(
                  move.coordinate.x,
                  move.coordinate.y,
                )}
                player={move.player}
                size={stoneSize}
                className="transform transition duration-500 hover:scale-125 cursor-pointer hover:z-30"
                isCurrentMove={idx === currentMove - 1}
              />
            ),
          )}
      </div>
      <GoBoardNav
        totalMoves={moves.length}
        currentMove={currentMove}
        onCurrentMoveChange={handleCurrentMoveChange}
        player={player}
      />
    </div>
  );
}
