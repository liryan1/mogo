import { GoStoneProps } from "./GoStone";

export interface Coordinate {
  x: number;
  y: number;
}

export enum StoneColor {
  BLACK = "black",
  WHITE = "white",
}

export interface MoveData {
  name: string;
  desc: string;
  goStone: GoStoneProps;
}
