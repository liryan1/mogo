import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface GoBoardNavProps {
  totalMoves: number
  currentMove: number
  onCurrentMoveChange: (m: number) => void
  player?: string
}

export function GoBoardNav({ totalMoves, currentMove, onCurrentMoveChange, player }: GoBoardNavProps) {
  const [moveInput, setMoveInput] = useState(currentMove.toString())
  const navIconClassName = "w-4 sm:w-5 h-4 sm:h-5"
  const navButtonClassName = "h-6 sm:h-8 w-6 sm:w-8 p-0"

  const handleCurrentMoveChange = useCallback((m: number | string) => {
    const parsedM = Number(m)
    const goodM = Math.max(0, Math.min(!isNaN(parsedM) ? parsedM : totalMoves, totalMoves))
    onCurrentMoveChange(goodM)
    setMoveInput(goodM.toString())
  }, [onCurrentMoveChange, totalMoves])

  // when user changes the move number and presses the enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCurrentMoveChange(moveInput)
    }
  }

  // This lifecycle method is for allowing left and right arrow key strokes
  // to navigate the go board
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleCurrentMoveChange(Number(moveInput) - 1)
      } else if (event.key === "ArrowRight") {
        handleCurrentMoveChange(Number(moveInput) + 1)
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCurrentMoveChange, moveInput]);

  const leftPaginationComponents = [
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(0),
      child: <>
        <span className="sr-only">Clear the go board</span>
        <ChevronFirst className={navIconClassName} />
      </>,
    },
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(currentMove - 5),
      child: <>
        <span className="sr-only">Go back five moves</span>
        <ChevronsLeft className={navIconClassName} />
      </>,
    },
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(currentMove - 1),
      child: <>
        <span className="sr-only">Go back one move</span>
        <ChevronLeft className={navIconClassName} />
      </>,
    },
  ]

  const rightPaginationComponents = [
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(currentMove + 1),
      child: <>
        <span className="sr-only">Go to the next move</span>
        <ChevronRight className={navIconClassName} />
      </>,
    },
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(currentMove + 5),
      child: <>
        <span className="sr-only">Go forward five moves</span>
        <ChevronsRight className={navIconClassName} />
      </>,
    },
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(totalMoves),
      child: <>
        <span className="sr-only">Go to the last move</span>
        <ChevronLast className={navIconClassName} />
      </>,
    },
  ]

  return (
    <>
      {/* Mobile player name and move number */}
      <div className="sm:hidden flex items-center justify-between">
        <div className="text-sm font-medium italic">
          {player ? player : ""}
        </div>
        <div className="text-xs">
          Move {currentMove} of {totalMoves}
        </div>
      </div>
      {/* END Mobile player name and move number */}
      <div className="flex items-center justify-center relative mt-2 mb-1">
        <div className="flex items-center space-x-2">
          {leftPaginationComponents.map((c, i) => (
            <Button
              key={`left-pagination-${i}`}
              variant="outline"
              className={navButtonClassName}
              onClick={c.onClick}
              disabled={c.disabled}
            >
              {c.child}
            </Button>
          ))}
          <Input
            className="w-10 sm:w-14 h-6 sm:h-8 p-0 text-center text-xs sm:text-base"
            value={moveInput}
            onChange={(e) => setMoveInput(e.target.value)}
            onBlur={() => handleCurrentMoveChange(moveInput)}
            onKeyDown={handleKeyDown}
          />
          {rightPaginationComponents.map((c, i) => (
            <Button
              key={`right-pagination-${i}`}
              variant="outline"
              className={navButtonClassName}
              onClick={c.onClick}
              disabled={c.disabled}
            >
              {c.child}
            </Button>
          ))}
        </div>
        <div className="hidden sm:block absolute text-sm right-0">
          Move {currentMove} of {totalMoves}
        </div>
        {player && <div className="hidden sm:block absolute text-sm font-medium italic left-0">
          {player}
        </div>}
      </div>
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Info className="w-3 h-3" />
        Click the stones to reveal the player
      </div>
    </>
  )
}
