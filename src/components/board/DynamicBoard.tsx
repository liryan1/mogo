"use client"

import { OneWorldMove } from "@/lib/interface"
import { GoBoard } from "./GoBoard"
import { useEffect, useState } from "react";

interface DynamicBoardProps {
  moves: OneWorldMove[]
}

export function DynamicBoard({ moves }: DynamicBoardProps) {
  const [boardSize, setBoardSize] = useState(750);

  useEffect(() => {
    const updateBoardSize = () => {
      const width = document.documentElement.clientWidth;
      // Set board size to viewport width for mobile, and 750px for larger screens
      setBoardSize(width < 768 ? width - 20 : 750); // Adjusts for padding/margins
    };
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);

    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  return (
    <GoBoard size={boardSize} moves={moves} />
  )
}
