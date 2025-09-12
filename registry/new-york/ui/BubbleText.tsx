import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export const BubbleText = ({
  text = "The digital marketing agency",
  bubbleSize = 120,
  className = "",
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        ref={containerRef}
        className="relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Main text layer */}
        <div
          className={cn(
            className,
            `select-none leading-tight tracking-tight relative z-10`
          )}
        >
          {text}
        </div>

        {/* Bubble with smooth animation using framer-motion */}
        {isHovering && (
          <motion.div
            initial={{
              left: mousePosition.x,
              top: mousePosition.y,
              height: 0,
              width: 0,
            }}
            animate={{
              left: mousePosition.x - bubbleSize / 2,
              top: mousePosition.y - bubbleSize / 2,
              width: bubbleSize,
              height: bubbleSize,
            }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 100,
            }}
            className="absolute pointer-events-none rounded-full"
            style={{
              backgroundColor: "white",
              mixBlendMode: "difference",
              zIndex: 20,
            }}
          />
        )}
      </div>
    </div>
  );
};
