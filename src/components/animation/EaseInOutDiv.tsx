"use client"

import { motion } from "framer-motion";

export function EaseInOutDiv({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 1,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
