import { motion } from "motion/react";
import { useRef, useState } from "react";

export const CursorAwareButton = ({
  children = <></>,
  defaultColor = "bg-white",
  hoverColor = "bg-yellow-400",
  textColor = "text-gray-900",
  hoverTextColor = "text-gray-900",
  borderColor = "border-gray-300",
  rounded = "rounded-full",
  size = "px-8 py-3",
  className = "",
  onClick = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use refs to store position immediately without state delays
  const cursorX = useRef(50);
  const cursorY = useRef(50);
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = (e: any) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Update refs immediately
      cursorX.current = x;
      cursorY.current = y;

      // Force re-render with new animation
      setAnimationKey((prev) => prev + 1);
      setIsHovered(true);
    } else {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${defaultColor} ${textColor} ${borderColor} ${rounded} ${size} ${className} border-2 font-medium transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background animation layer */}
      <motion.div
        key={animationKey}
        className={`absolute inset-0 ${hoverColor} ${rounded}`}
        initial={{
          clipPath: `circle(0% at ${cursorX.current}% ${cursorY.current}%)`,
          opacity: 0,
        }}
        animate={
          isHovered
            ? {
                clipPath: `circle(150% at ${cursorX.current}% ${cursorY.current}%)`,
                opacity: 1,
              }
            : {
                clipPath: `circle(0% at ${cursorX.current}% ${cursorY.current}%)`,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.1 },
        }}
      />

      {/* Text content */}
      <span
        className={`relative z-10 transition-colors duration-200 ${
          isHovered ? hoverTextColor : textColor
        }`}
      >
        {children}
      </span>
    </motion.button>
  );
};
