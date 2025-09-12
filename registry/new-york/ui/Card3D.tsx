import { motion } from "motion/react";
import { MouseEvent, useRef, useState } from "react";

type T3DCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  glareEffect?: boolean;
  shadowEffect?: boolean;
};

export const Card3D = ({
  children,
  className = "",
  intensity = 15, // Tilt intensity in degrees
  scale = 1.05, // Scale on hover
  glareEffect = true,
  shadowEffect = true,
}: T3DCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: shadowEffect
            ? isHovered
              ? `0 20px 40px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.1)`
              : `0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)`
            : "none",
        }}
      >
        {children}

        {/* Glare effect overlay */}
        {glareEffect && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: `linear-gradient(${
                Math.atan2(rotateY, rotateX) * (180 / Math.PI) + 90
              }deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${
                isHovered ? 0.1 : 0
              }) 50%, rgba(255,255,255,0) 100%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
