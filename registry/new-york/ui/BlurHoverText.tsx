import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BlurHoverTextProps {
  children: React.ReactNode;
  /** How much blur to apply initially (in px) */
  blurRadius?: number;
  /** Extra Tailwind/utility classes */
  className?: string;
  /** Duration of blur transition (in seconds) */
  duration?: number;
}

export const BlurHoverText = ({
  children,
  blurRadius = 4,
  className = "",
  duration = 0.3,
}: BlurHoverTextProps) => {
  return (
    <motion.div
      className={cn(className, `text-5xl inline-block cursor-pointer`)}
      initial={{ filter: `blur(${blurRadius}px)` }}
      whileHover={{ filter: "blur(0px)" }}
      transition={{
        duration,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
