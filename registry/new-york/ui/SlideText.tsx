import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// 🔹 Utility: Get longest string
const getLongestText = (texts: string[]) =>
  texts.reduce((a, b) => (a.length > b.length ? a : b), "");

interface SlideTextProps {
  texts: string[];
  delay?: number;
  loop?: boolean;
  direction?: "up" | "down"; // slide direction
  className?: string;
}

export const SlideText: React.FC<SlideTextProps> = ({
  texts,
  delay = 2000,
  loop = true,
  direction = "up",
  className,
}) => {
  const [index, setIndex] = useState(0);

  const longest = useMemo(() => getLongestText(texts), [texts]);

  useEffect(() => {
    if (!loop && index >= texts.length - 1) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, delay, texts.length, loop]);

  // 🔹 Motion variants for direction
  const variants = {
    initial: { y: direction === "up" ? "100%" : "-100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: direction === "up" ? "-100%" : "100%", opacity: 0 },
  };

  return (
    <div
      className={cn("overflow-hidden whitespace-nowrap truncate", className)}
      style={{
        minWidth: `${longest.length}ch`, // reserve width
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
