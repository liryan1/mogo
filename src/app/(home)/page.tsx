import { DynamicBoard } from "@/components/board/DynamicBoard";
import { OneWorldOneGame } from "@/lib/oneWorldOneGame";
import { getSgf } from "@/lib/sgf";
import { MuseumHome } from "./MuseumHome";
import { OneGameOneWorldTitle } from "./OneGameOneWorldTitle";

const sgf = getSgf()
const oneWorldOneGame = new OneWorldOneGame(sgf)

export default function Home() {
  return (
    <>
      <MuseumHome />
      <div className="flex flex-col items-center justify-center my-4 sm:my-16">
        <OneGameOneWorldTitle />
        <DynamicBoard moves={oneWorldOneGame.getMoves()} />
      </div>
    </>
  );
}
