import _ from "lodash";
import { Board, Coordinate, GoMove } from "./interface";
import { handleMove } from "./logic";

export function makeEmptyBoard(size: number = 19) {
  const emptyBoard: Board = Array.from({ length: size }, () =>
    Array(size).fill("."),
  );
  return emptyBoard;
}

type BoardInfo = {
  board: Board;
  color: string;
  lastMove: Coordinate;
};

export class GoGame {
  private board: Board;
  private color: string;
  private history: BoardInfo[];
  private historyIndex: number;
  private lastMove: Coordinate;

  constructor(board: Board = makeEmptyBoard(), color: string = "b") {
    this.board = board;
    this.color = color;
    this.historyIndex = 0;
    const initialLastMove = {
      x: -1,
      y: -1,
    };
    this.lastMove = initialLastMove;
    const initialBoardInfo: BoardInfo = {
      board: board,
      color: color,
      lastMove: initialLastMove,
    };
    this.history = [initialBoardInfo];
  }

  static fromMoves(moves?: GoMove[]) {
    const game = new GoGame();
    moves?.map((move) => {
      game.playMove(move.coordinate);
    });
    return game;
  }

  public getBoard() {
    return this.board;
  }

  public playMove(coord: Coordinate) {
    const newBoard = handleMove(this.board, this.color, coord);
    if (_.isEqual(this.board, newBoard)) {
      return;
    }
    const nextColor = this.color === "b" ? "w" : "b";
    const newBoardInfo: BoardInfo = {
      board: newBoard,
      color: nextColor,
      lastMove: coord,
    };
    this.board = newBoard;
    this.color = nextColor;
    this.history.push(newBoardInfo);
    this.historyIndex += 1;
    return;
  }

  public isEmpty(coord: Coordinate) {
    return this.board[coord.y][coord.x] === ".";
  }

  private setup(boardInfo: BoardInfo) {
    this.board = boardInfo.board;
    this.color = boardInfo.color;
    this.lastMove = boardInfo.lastMove;
  }

  public goToSpecified(index: number) {
    if (index >= this.history.length) {
      return;
    }
    this.historyIndex = index;
    this.setup(this.history[index]);
  }
}
