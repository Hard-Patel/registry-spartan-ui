import { useRef, useState } from "react";

export type ProgressiveHoverCardProps = {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
};

export const ProgressiveHoverCard = ({
  children,
  className = "",
  hoverColor = "bg-blue-500",
}: ProgressiveHoverCardProps) => {
  const [hoverState, setHoverState] = useState({
    isHovered: false,
    x: 0,
    y: 0,
    size: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: any) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate the maximum distance to cover entire component
    const maxX = Math.max(x, rect.width - x);
    const maxY = Math.max(y, rect.height - y);
    const maxSize = Math.sqrt(maxX * maxX + maxY * maxY) * 2;

    setHoverState({
      isHovered: true,
      x,
      y,
      size: maxSize,
    });
  };

  const handleMouseLeave = () => {
    setHoverState((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Progressive hover background */}
      <div
        className={`absolute top-0 left-0 rounded-full ${hoverColor} transition-all duration-500 ease-out`}
        style={{
          left: hoverState.x - hoverState.size / 2,
          top: hoverState.y - hoverState.size / 2,
          width: hoverState.size,
          height: hoverState.size,
          transform: hoverState.isHovered ? "scale(1)" : "scale(0)",
          opacity: hoverState.isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
