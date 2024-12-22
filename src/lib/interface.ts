export interface Coordinate {
  x: number;
  y: number;
}

export enum StoneColor {
  BLACK = "black",
  WHITE = "white",
}

export interface GoMove {
  color: StoneColor;
  coordinate: Coordinate;
}

export interface OneWorldMove extends GoMove {
  player: OneWorldPlayerInfo;
}

export interface GoStoneProps {
  color: StoneColor;
  /**
   * Size of the stone
   * @default 20
   */
  position: StonePosition;
  size?: number;
  className?: string;
}

export interface StonePosition {
  top: number;
  left: number;
}

export interface OneWorldPlayerInfo {
  title?: string;
  first: string;
  last: string;
  rank: string;
  country: string; // 2-letter country code
  imageFileName?: string;
  affiliation?: string;
  bio: string;
}

export type Board = string[][];
