import { motion, useScroll } from "motion/react";
import { RefObject } from "react";

type Position = "top" | "right";

type ScrollProgressProps = {
  /** Ref of the scrollable container */
  targetRef?: RefObject<HTMLElement>;
  /** Optional: thickness of the progress bar */
  size?: number;
  /** Optional: className for styling */
  className?: string;
  /** Position of the bar */
  position?: Position;
};

const ScrollProgress = ({
  targetRef,
  size = 3,
  className,
  position = "top",
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll({
    container: targetRef,
  });

  return (
    <motion.div
      className={`bg-primary ${targetRef ? "" : "fixed"} ${className || ""}`}
      style={
        position === "top"
          ? {
              scaleX: scrollYProgress,
              position: "sticky",
              top: 0,
              left: 0,
              height: size,
              transformOrigin: "0% 0%",
              zIndex: 9999,
            }
          : {
              scaleY: scrollYProgress,
              position: "sticky",
              top: 0,
              left: "100%",
              width: size,
              height: "100%",
              transformOrigin: "0% 0%",
              zIndex: 9999,
            }
      }
    />
  );
};

export { ScrollProgress };
