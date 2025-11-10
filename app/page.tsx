"use client";

import { motion } from "framer-motion";
import { generateHexCode } from "./lib/generateHexCode";

export default function Home() {
  const color = generateHexCode();
  console.log(color);

  return (
    <main className="flex flex-col justify-center items-center">
      <motion.h1
        animate={{ scale: [1, 1.05, 1] }} // pulse effect
        transition={{
          duration: 1, // 1 second for one pulse
          repeat: Infinity, // loop forever
          repeatType: "loop",
          ease: "easeInOut", // smooth animation
        }}
        className="text-5xl"
      >
        Color Palette Creator
      </motion.h1>
    </main>
  );
}
