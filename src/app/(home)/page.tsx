import { GoBoard } from "@/components/board/GoBoard";
import { Navbar } from "@/components/nav/Navbar";
import { OneWorldOneGame } from "@/lib/oneWorldOneGame";
import { getSgf } from "@/lib/sgf";
import { MuseumHome } from "./MuseumHome";

const sgf = getSgf()
const oneWorldOneGame = new OneWorldOneGame(sgf)

export default function Home() {
  return (
    <main className="">
      <Navbar>
        <MuseumHome />
      </Navbar>
      <div className="flex items-center justify-center my-10">
        <GoBoard size={800} moves={oneWorldOneGame.getMoves()} />
      </div>
    </main>
  );
}
