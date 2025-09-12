import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
  delay?: number;
}

export const HighlightedText = ({
  children,
  className,
  highlightColor = "hsl(var(--primary))",
  delay = 0,
}: HighlightedTextProps) => {
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        className="absolute inset-0 -z-10 rounded-md"
        style={{ backgroundColor: highlightColor + "/20" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          delay,
          ease: "easeOut",
        }}
      />
      <span className="relative z-10 px-1">{children}</span>
    </span>
  );
};
