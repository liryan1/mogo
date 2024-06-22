"use client"

import { motion } from "framer-motion"

export function MuseumHome() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative pt-20 flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        The Museum of Go
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        One World, One Game
      </div>
    </motion.div>
  )
}
