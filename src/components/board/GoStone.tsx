import Image from "next/image";
import { StoneColor } from "./interface";
import { cn } from "@/lib/utils";

interface GoStonePosition {
  top: number;
  left: number;
}

export interface GoStoneProps {
  color: StoneColor;
  /**
   * Size of the stone
   * @default 20
   */
  position: GoStonePosition;
  size?: number;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

/**
 * Go Stone component with position absolute, specified by left, top coordinates
 * WARNING: parent div must be relative, otherwise position will be relative to
 * upper parent div
 */
export function GoStone({
  color,
  position,
  className,
  onMouseEnter,
  onMouseLeave,
  size = 20,
}: GoStoneProps) {
  const src = `/images/${color}-stone.png`;
  return (
    <Image
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn("absolute", className)}
      style={position}
      alt=""
      src={src}
      width={size}
      height={size}
    />
  );
}
