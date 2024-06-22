import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { HoverGoStone, HoverGoStoneProps } from "./HoverGoStone";
import { OneWorldMove } from "@/lib/interface";

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
  const goStonesList: HoverGoStoneProps[] = moves?.map(move => ({
    ...move,
    position: goBoardSpecs.getPosition(move.coordinate.x, move.coordinate.y)
  })) ?? []

  return (
    <div className={`relative overflow-hidden w-[${size}px] h-[${size}px]`}>
      <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
      {goStonesList.map((goStone, idx) => (
        <HoverGoStone key={idx} {...goStone} size={stoneSize} />
      ))}
    </div>
  );
}
