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
      const width = window.innerWidth;
      // Set board size to viewport width for mobile, and 750px for larger screens
      setBoardSize(width < 768 ? width - 20 : 750); // Adjusts for padding/margins
    };

    const handleResize = () => {
      // Android often needs this to ensure the resize happens smoothly
      setTimeout(updateBoardSize, 30); // Adding a small delay to ensure viewport updates are accounted for
    };

    updateBoardSize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize); // Listen for orientation changes on mobile devices

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <GoBoard size={boardSize} moves={moves} />
  )
}
