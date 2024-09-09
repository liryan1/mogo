"use client"

import { EaseInOutDiv } from "@/components/animation/EaseInOutDiv"

export function MuseumHome() {
  return (
    <EaseInOutDiv className="flex flex-col items-center justify-center px-4 py-8" >
      <div className="text-4xl md:text-7xl font-semibold dark:text-white text-center">
        Museum of Go
      </div>
      <div className="text-base font-thin text-muted-foreground md:text-3xl dark:text-neutral-200 mt-1">
        The Legacy of Go, for Generations to Come
      </div>
    </EaseInOutDiv >
  )
}
