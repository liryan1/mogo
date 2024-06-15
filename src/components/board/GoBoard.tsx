import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoStone } from "./GoStone";
import { MoveData, StoneColor } from "./interface";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { HoverGoStoneProps, HoverGoStone } from "./HoverGoStone";

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
}

export function GoBoard({ size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines);
  const { stoneSize } = goBoardSpecs.getAllSpecs();
  const goStonesList: HoverGoStoneProps[] = [
    {
      color: StoneColor.BLACK,
      position: goBoardSpecs.getPosition(15, 3),
      size: stoneSize,
      tooltipText: "Black stone",
    },
    {
      color: StoneColor.WHITE,
      position: goBoardSpecs.getPosition(2, 3),
      size: stoneSize,
      tooltipText: "White stone",
    },
  ];

  return (
    <div className={`relative overflow-hidden w-[${size}px] h-[${size}px]`}>
      <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
      {goStonesList.map((goStone, idx) => (
        <HoverGoStone key={idx} {...goStone} />
      ))}
    </div>
  );
}
