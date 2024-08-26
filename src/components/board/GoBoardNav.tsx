import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface GoBoardNavProps {
  totalMoves: number
  currentMove: number
  onCurrentMoveChange: (m: number) => void
  player?: string
}

export function GoBoardNav({ totalMoves, currentMove, onCurrentMoveChange, player }: GoBoardNavProps) {
  const [moveInput, setMoveInput] = useState(currentMove.toString())

  const handleCurrentMoveChange = (m: number | string) => {
    const parsedM = Number(m)
    const goodM = Math.max(0, Math.min(!isNaN(parsedM) ? parsedM : totalMoves, totalMoves))
    onCurrentMoveChange(goodM)
    setMoveInput(goodM.toString())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCurrentMoveChange(moveInput)
    }
  }

  const leftPaginationComponents = [
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(0),
      child: <>
        <span className="sr-only">Clear the go board</span>
        <ChevronFirst className="h-5 w-5" />
      </>,
    },
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(currentMove - 5),
      child: <>
        <span className="sr-only">Go back five moves</span>
        <ChevronsLeft className="h-5 w-5" />
      </>,
    },
    {
      disabled: currentMove === 0,
      onClick: () => handleCurrentMoveChange(currentMove - 1),
      child: <>
        <span className="sr-only">Go back one move</span>
        <ChevronLeft className="h-5 w-5" />
      </>,
    },
  ]

  const rightPaginationComponents = [
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(currentMove + 1),
      child: <>
        <span className="sr-only">Go to the next move</span>
        <ChevronRight className="h-5 w-5" />
      </>,
    },
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(currentMove + 5),
      child: <>
        <span className="sr-only">Go forward five moves</span>
        <ChevronsRight className="h-5 w-5" />
      </>,
    },
    {
      disabled: currentMove === totalMoves,
      onClick: () => handleCurrentMoveChange(totalMoves),
      child: <>
        <span className="sr-only">Go to the last move</span>
        <ChevronLast className="h-5 w-5" />
      </>,
    },
  ]

  return (
    <div className="flex items-center justify-center relative my-2">
      <div className="flex items-center space-x-2">
        {leftPaginationComponents.map((c, i) => (
          <Button
            key={`left-pagination-${i}`}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={c.onClick}
            disabled={c.disabled}
          >
            {c.child}
          </Button>
        ))}
        <Input
          className="w-14 h-8 p-0 text-center text-base"
          value={moveInput}
          onChange={(e) => setMoveInput(e.target.value)}
          onBlur={() => handleCurrentMoveChange(moveInput)}
          onKeyDown={handleKeyDown}
        />
        {rightPaginationComponents.map((c, i) => (
          <Button
            key={`right-pagination-${i}`}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={c.onClick}
            disabled={c.disabled}
          >
            {c.child}
          </Button>
        ))}
      </div>
      <div className="absolute text-sm right-0">
        <span className="hidden sm:inline">Move </span>
        {currentMove} of <span className="font-medium">{totalMoves}</span>
      </div>
      {player && <div className="absolute text-sm font-semibold left-0">
        {player}
      </div>}
    </div>
  )
}
