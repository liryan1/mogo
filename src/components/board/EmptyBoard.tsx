"use client";

import { useCallback, useEffect, useRef } from "react";
import { Coordinate } from "../../lib/interface";

const boardImage = "/images/go/marble.jpg"
const lineColor = "#555a67"

const resolution = 4;
const starPoints = [
  [3, 3],
  [3, 9],
  [3, 15],
  [9, 3],
  [9, 9],
  [9, 15],
  [15, 3],
  [15, 9],
  [15, 15],
].map((xy) => ({ x: xy[0], y: xy[1] }));

interface EmptyBoardProps {
  size: number;
  lines: number;
  lineWidth: number;
  lineGap: number;
  cellSize: number;
  starPointSize: number;
}

export function EmptyBoard({
  lines,
  size,
  lineWidth,
  cellSize,
  starPointSize,
  lineGap,
}: EmptyBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
      const image = new Image();
      image.src = boardImage;
      image.width = size;
      image.height = size;
      image.onload = () => {
        context.drawImage(image, 0, 0, image.width, image.height);
      };
    },
    [size],
  );

  const drawLine = useCallback(
    (ctx: CanvasRenderingContext2D, c1: Coordinate, c2: Coordinate) => {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(c2.x, c2.y);
      ctx.stroke();
    },
    [lineWidth],
  );

  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, size: number, c: Coordinate) => {
      const x = cellSize * c.x + lineGap;
      const y = cellSize * (lines - 1 - c.y) + lineGap;

      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    },
    [cellSize, lineGap, lines],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";

      canvas.width = size * resolution;
      canvas.height = size * resolution;

      ctx.scale(resolution, resolution);

      for (let i = lineGap; i < size; i += cellSize) {
        // Draw vertical line
        drawLine(ctx, { x: i, y: lineGap }, { x: i, y: size - lineGap });
        // Draw horizontal line
        drawLine(ctx, { x: lineGap, y: i }, { x: size - lineGap, y: i });
      }

      starPoints.forEach((point) => {
        drawCircle(ctx, starPointSize, point);
      });

      // Draw background under all other layers
      ctx.globalCompositeOperation = "destination-over";
      drawBackground(ctx);
    }
  }, [
    lines,
    size,
    cellSize,
    lineGap,
    starPointSize,
    drawCircle,
    drawLine,
    drawBackground,
  ]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}
