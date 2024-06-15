"use client"

import React, { useEffect, useRef, useState } from "react";
import { GoStone, GoStoneProps } from "./GoStone";

export interface HoverGoStoneProps extends GoStoneProps {
  tooltipText: string;
}

export function HoverGoStone({ color, position, className, size = 20, tooltipText }: HoverGoStoneProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [isTooltipVisible]);

  return (
    <>
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute text-white text-xs z-10"
          style={{ top: position.top - size, left: position.left - tooltipWidth / 2, transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="rounded bg-gray-700 p-2">{tooltipText}</div>
            {/* Tooltip upside down triangle */}
            <svg
              className="h-4 w-4 text-gray-700"
              viewBox="0 0 255 255"
              xmlSpace="preserve"
            >
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
      )}

      <GoStone
        color={color}
        position={position}
        className={className}
        size={size}
        onMouseEnter={() => setIsTooltipVisible(true)}
        // onMouseLeave={() => setIsTooltipVisible(false)}
      />
    </>
  );
}
