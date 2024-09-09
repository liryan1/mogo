"use client"

import { motion } from "framer-motion"
const ONE_GAME_ONE_WORLD = "One Game, One World"
const DESCRIPTION = "by world's most distinguished Go professionals"

export function OneGameOneWorldTitle() {
  return (
    <>
      <div>
        {ONE_GAME_ONE_WORLD.split(" ").map((el, i) => (
          <motion.span
            className="text-xl sm:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1 + i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
      <div>
        {DESCRIPTION.split(" ").map((el, i) => (
          <motion.span
            className="text-sm sm:text-lg font-thin text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1 + i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
    </>
  )
}
