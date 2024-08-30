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
      <div className="flex flex-col items-center justify-center gap-6 my-10 mb-[250px] h-[100vh]">
        <h1 className="text-4xl">
          One World, One Game
        </h1>
        <h3 className="text-muted-foreground">
          Click on the stones to reveal the player!
        </h3>
        <GoBoard size={750} moves={oneWorldOneGame.getMoves()} />
      </div>
    </main>
  );
}
