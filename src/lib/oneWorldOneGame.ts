import { OneWorldMove, StoneColor } from "./interface";

export class OneWorldOneGame {
  /**
   * Index of the current move
   */
  private currentMove: number;
  /**
   * All moves of the One World Game
   */
  private readonly moves: OneWorldMove[];

  private readonly moveRegex = /[BW]\[[a-z]{2}\]/;
  private readonly commentRegex = /C\[[\s\S]*?\]/;

  constructor(sgf: string) {
    this.moves = this.getMovesFromSgf(sgf);
    this.currentMove = this.moves.length;
  }

  /**
   * Get moves up to the current move.
   */
  getMoves() {
    if (this.currentMove === 0) return []
    return this.moves.slice(0, this.currentMove);
  }

  nextMove() {
    if (!this.isLastMove()) {
      this.currentMove++;
    } else {
      throw Error("Game is on the last move. Cannot play the next move.")
    }
  }

  isLastMove() {
    return this.currentMove === this.moves.length;
  }

  move(i: number) {
    this.currentMove = i;
  }

  /**
   * Parses an sgf string and returns the One World Moves
   * @param sgf string
   * @returns array of OneWorldMoves
   */
  private getMovesFromSgf(sgf: string): OneWorldMove[] {
    const moves = sgf.split(";").slice(2) // skip board info part in the beginning
    return moves.map(move => this.parseOneMove(move))
  }

  private parseOneMove(s: string) {
    const moveMatch = s.match(this.moveRegex);
    const colorAndCoordString = moveMatch ? moveMatch[0] : ""; // example: 'B[ab]'

    const color = colorAndCoordString[0]
    const coord = colorAndCoordString.slice(2, 4) // skip beginning B[

    const descriptionMatch = s.match(this.commentRegex);
    const descriptionString = descriptionMatch ? descriptionMatch[0] : ""

    return {
      color: this.parseColor(color),
      coordinate: this.parseCoordinate(coord),
      description: this.parseDescription(descriptionString),
    }
  }

  private parseColor(color: string) {
    if (color === "B") {
      return StoneColor.BLACK
    } else if (color === "W") {
      return StoneColor.WHITE
    } else {
      throw Error(`Failed to recognize color ${color}.`)
    }
  }

  private parseCoordinate(coord: string) {
    const cx = coord.charCodeAt(0)
    const cy = coord.charCodeAt(1)
    if (coord.length !== 2 || cx > 122 || cx < 97 || cy < 97 || cy > 122) {
      throw Error(`Invalid coordinate ${coord}`)
    }

    return {
      x: cx - 97, // a is 97 and z is 122
      y: cy - 97,
    }
  }

  private parseDescription(d: string) {
    return d.slice(2, d.length - 1)
  }
}
