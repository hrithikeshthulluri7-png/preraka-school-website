"use client";

import { motion } from "framer-motion";

type FloatingElement = {
  label: string;
  x: string;
  y: string;
  size: string;
  duration: number;
  delay: number;
};

const elements: FloatingElement[] = [
  { label: "🚀", x: "5%", y: "14%", size: "2.2rem", duration: 4.8, delay: 0 },
  { label: "🧩", x: "91%", y: "18%", size: "1.9rem", duration: 4.2, delay: 0.6 },
  { label: "⭐", x: "17%", y: "72%", size: "1.55rem", duration: 3.8, delay: 1.1 },
  { label: "🪐", x: "84%", y: "70%", size: "2rem", duration: 5.2, delay: 0.4 },
  { label: "🤖", x: "8%", y: "52%", size: "1.9rem", duration: 4.5, delay: 1.5 },
  { label: "💡", x: "93%", y: "46%", size: "1.65rem", duration: 4.1, delay: 0.9 },
  { label: "🎨", x: "27%", y: "10%", size: "1.65rem", duration: 4.7, delay: 0.2 },
  { label: "🔬", x: "72%", y: "11%", size: "1.7rem", duration: 4.3, delay: 1.3 },
  { label: "🌱", x: "42%", y: "83%", size: "1.8rem", duration: 4.9, delay: 0.7 },
  { label: "✨", x: "58%", y: "19%", size: "1.45rem", duration: 3.6, delay: 1.8 },
];

export default function FloatingSchoolElements({ intensity = "normal" }: { intensity?: "light" | "normal" }) {
  const visibleElements = intensity === "light" ? elements.slice(0, 6) : elements;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {visibleElements.map((item, index) => (
        <motion.div
          key={`${item.label}-${index}`}
          className="absolute select-none drop-shadow-[0_10px_18px_rgba(4,30,66,0.18)]"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -6, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.label}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[-80px] top-[34%] h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#A3D5FF] to-white"
        animate={{ x: ["0vw", "115vw"], opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5.4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-60px] top-[64%] h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-[#FFB81C] to-white"
        animate={{ x: ["0vw", "115vw"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.9, repeat: Infinity, repeatDelay: 7.2, ease: "easeInOut", delay: 1.4 }}
      />
    </div>
  );
}
