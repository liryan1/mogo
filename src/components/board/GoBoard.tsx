"use client";

import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { OneWorldMove } from "@/lib/interface";
import { useEffect, useState } from "react";
import { GoBoardNav } from "./GoBoardNav";
import { GoMove } from "./GoMove";
import { GoGame, makeEmptyBoard } from "@/lib/goGame";

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

export function GoBoard({ moves, size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines);
  const { stoneSize } = goBoardSpecs.getAllSpecs();
  const allMoves = moves ?? [];

  const [game, setGame] = useState(new GoGame());
  const [board, setBoard] = useState(makeEmptyBoard());

  const [currentMove, setCurrentMove] = useState(allMoves.length);

  useEffect(() => {
    if (!moves) {
      return;
    }
    const newGame = game;
    moves.map((move) => {
      newGame.playMove(move.coordinate);
    });
    setGame(newGame);
    setBoard(newGame.getBoard());
  }, [moves]);

  useEffect(() => {
    game.goToSpecified(currentMove);
    setBoard(game.getBoard());
  }, [currentMove]);

  const currPlayer = currentMove ? allMoves[currentMove - 1].player : undefined;
  const player = currPlayer
    ? `${currPlayer.last}, ${currPlayer.first} ${currPlayer.rank}`
    : undefined;

  return (
    <div className="my-4">
      {" "}
      {/** Extra div needed here to prevent outside styles spilling into board styles */}
      <div
        className={`inset-0 relative overflow-hidden w-[${size}px] h-[${size}px]`}
      >
        <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
        {allMoves.slice(0, currentMove).map((move, idx) =>
          board[move.coordinate.y][move.coordinate.x] === "." ? (
            "" // You can create a component for dead stones instead of "".
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
        totalMoves={allMoves.length}
        currentMove={currentMove}
        onCurrentMoveChange={setCurrentMove}
        player={player}
      />
    </div>
  );
}
