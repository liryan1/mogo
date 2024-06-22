import { readFileSync } from "fs";
import path from "path";
import { OneWorldOneGame } from "./oneWorldOneGame";

const sgf = getSgf()
export const oneWorldOneGame = new OneWorldOneGame(sgf)

export function getSgf() {
  const filePath = path.join(process.cwd(), "public", "test_cgoban.sgf")
  return readFileSync(filePath).toString()
}
