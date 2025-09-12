import cn from "clsx";
import { motion } from "motion/react";
import { ReactNode } from "react";

type AICardProps = {
  children: ReactNode;
  /** Gradient colors for border */
  gradient?: string[];
  /** Border radius */
  rounded?: string;
  /** Whether gradient should animate */
  animate?: boolean;
  /** Speed of animation in seconds */
  duration?: number;
  /** Extra class names for wrapper */
  className?: string;
};

export default function AICard({
  children,
  gradient = ["#ff00ff", "#00ffff", "#ff9900", "#ff00ff"],
  rounded = "",
  animate = false,
  duration = 6,
  className,
}: AICardProps) {
  return (
    <div className={cn("relative", `rounded-${rounded}`, className)}>
      <div className="absolute top-1/2 left-1/2-translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%]">
        <motion.div
          aria-hidden
          className={`absolute inset-0 rounded-${rounded} pointer-events-none scale-[1.02] filter blur-xl`}
          style={{
            background: `conic-gradient(${gradient.join(", ")})`,
            opacity: 0.2, // inner edge highest opacity
            willChange: "transform, filter",
          }}
        />
      </div>

      <div
        className={cn(
          "relative p-[1px] overflow-hidden",
          `rounded-${rounded}`,
          className
        )}
      >
        {/* Border layer */}
        {animate ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] aspect-[1/1]">
            <motion.div
              className="w-full h-full"
              style={{
                background: `conic-gradient(${gradient.join(", ")})`,
                willChange: "transform",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${gradient.join(", ")})`,
            }}
          />
        )}

        {/* Mask inner content with bg */}
        <div
          className={`relative bg-background rounded-${rounded} w-full h-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
