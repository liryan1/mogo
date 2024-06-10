import { GoBoard } from "@/components/board/GoBoard";
import { Navbar } from "@/components/nav/Navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar>
        <div className="text-center">Museum of Go</div>
      </Navbar>
      <div className="flex items-center justify-center my-10">
        <GoBoard size={800} />
      </div>
    </main>
  );
}
