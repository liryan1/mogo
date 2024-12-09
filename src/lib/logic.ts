import _ from "lodash";
import { Coordinate } from "./interface";

type Board = string[][];

const y_dir: number[] = [0, 1, 0, -1];
const x_dir: number[] = [1, 0, -1, 0];

function isOutside(coord: Coordinate, size: number = 19) {
  return !(0 <= coord.x && coord.x < size && 0 <= coord.y && coord.y < size);
}

function addNeighbors(coord: Coordinate) {
  const neighbors: Coordinate[] = [];
  for (let i = 0; i < 4; i++) {
    const newCoord: Coordinate = {
      x: coord.x + x_dir[i],
      y: coord.y + y_dir[i],
    };
    neighbors.push(newCoord);
  }
  return neighbors;
}

function changeStatus(board: Board, coord: Coordinate, value: string) {
  const newBoard = _.cloneDeep(board);
  newBoard[coord.y][coord.x] = value;
  return newBoard;
}

function removeDeadGroup(board: Board, group: Coordinate[]) {
  const newBoard = _.cloneDeep(board);
  for (let i = 0; i < group.length; i++) {
    const y = group[i].y,
      x = group[i].x;
    newBoard[y][x] = ".";
  }
  return newBoard;
}

function getDeadGroup(
  board: Board,
  coord: Coordinate,
  color: string,
  opponentColor: string,
): Coordinate[] {
  let newBoard: Board = _.cloneDeep(board);
  const size = board.length;
  let stack: Coordinate[] = [{ x: coord.x, y: coord.y }];
  const deadGroup: Coordinate[] = [];

  let idx = 0;

  while (stack) {
    const c = stack.pop();
    if (!c) {
      break;
    }
    if (isOutside(c, size) || newBoard[c.y][c.x] === opponentColor) {
      continue;
    } else if (newBoard[c.y][c.x] === color) {
      deadGroup.push(c);
      stack = stack.concat(addNeighbors(c));
      newBoard = changeStatus(newBoard, c, opponentColor);
      idx += 1;
    } else {
      return [];
    }
  }

  return deadGroup;
}

export function handleMove(
  board: Board,
  color: string,
  currentMove: Coordinate,
) {
  let boardState = _.cloneDeep(board);
  const opponentColor = color === "b" ? "w" : "b";
  const neighbors = addNeighbors(currentMove);

  if (
    isOutside(currentMove, boardState.length) ||
    boardState[currentMove.y][currentMove.x] !== "."
  ) {
    return board;
  }
  boardState[currentMove.y][currentMove.x] = color;
  let dead: Coordinate[] = [];
  for (let i = 0; i < neighbors.length; i++) {
    dead = dead.concat(
      getDeadGroup(boardState, neighbors[i], opponentColor, color),
    );
  }
  const suicide: Coordinate[] = getDeadGroup(
    boardState,
    currentMove,
    color,
    opponentColor,
  );
  if (dead.length === 0 && suicide.length > 0) {
    return board;
  }
  boardState = removeDeadGroup(boardState, dead);
  return boardState;
}
