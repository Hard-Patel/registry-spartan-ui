import { motion } from "motion/react";
import { useState } from "react";

type TextAnimationProps = {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontSize?: string;
  fontWeight?: string;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  ease?: [number, number, number, number];
};

export const FocusedText = ({
  children,
  className = "",
  textColor = "text-white",
  hoverTextColor = "",
  fontSize = "text-base",
  fontWeight = "font-medium",
  duration = 0.3,
  direction = "up",
  ease = [0.25, 0.1, 0.25, 1],
}: TextAnimationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const directions = {
    up: {
      initial: { y: "-100%" },
      exit: { y: "100%" },
    },
    down: {
      initial: { y: "100%" },
      exit: { y: "-100%" },
    },
    left: {
      initial: { x: "-100%" },
      exit: { x: "100%" },
    },
    right: {
      initial: { x: "100%" },
      exit: { x: "-100%" },
    },
  };

  const currentDirection = directions[direction] || directions.up;
  const finalTextColor = hoverTextColor || textColor;

  return (
    <div
      className={`relative inline-block overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.span
          className={`inline-block ${fontSize} ${fontWeight} ${textColor}`}
          initial={{ y: 0, x: 0 }}
          animate={
            isHovered
              ? {
                  y:
                    direction === "up"
                      ? "100%"
                      : direction === "down"
                      ? "-100%"
                      : 0,
                  x:
                    direction === "left"
                      ? "100%"
                      : direction === "right"
                      ? "-100%"
                      : 0,
                  opacity: 0.8,
                }
              : { y: 0, x: 0, opacity: 1 }
          }
          transition={{ duration, ease }}
        >
          {children}
        </motion.span>

        <motion.span
          className={`absolute top-0 left-0 inline-block ${fontSize} ${fontWeight} ${finalTextColor}`}
          initial={currentDirection.initial}
          animate={
            isHovered ? { y: 0, x: 0, opacity: 1 } : currentDirection.initial
          }
          transition={{ duration, ease }}
        >
          {children}
        </motion.span>
      </div>
    </div>
  );
};
