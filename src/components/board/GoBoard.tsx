import { EmptyBoard } from "@/components/board/EmptyBoard";
import { GoStone } from "./GoStone";
import { MoveData, StoneColor } from "./interface";
import { GoBoardSpecs } from "@/lib/goBoardSpecs";
import { HoverStone } from "./HoverStone";

interface GoBoardProps {
  /**
   * Board size in pixels
   * @default 600
   */
  size?: number
  /**
   * number of lines the board has, e.g., 19x19, 13x13, etc.
   * @default 19
   */
  lines?: number
}

export function GoBoard({ size = 600, lines = 19 }: GoBoardProps) {
  const goBoardSpecs = new GoBoardSpecs(size, lines)
  const { stoneSize } = goBoardSpecs.getAllSpecs()
  const moveDataList: MoveData[] = [
    {
      name: "Ke Jie",
      desc: "Chinese Professional Go Player",
      goStone: {
        color: StoneColor.BLACK,
        position: goBoardSpecs.getPosition(15, 3),
        size: stoneSize
      }
    }
  ]

  return (
    <div className={`relative overflow-hidden w-[${size}px] h-[${size}px]`}>
      <EmptyBoard {...goBoardSpecs.getAllSpecs()} />
      {moveDataList.map((moveData, idx) => (
        <HoverStone
          key={idx}
          move={moveData}
        />
      ))}
      <GoStone position={goBoardSpecs.getPosition(3, 3)} color={StoneColor.BLACK} size={stoneSize} />
    </div>
  )
}
