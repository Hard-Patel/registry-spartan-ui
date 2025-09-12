import { cn } from "@/lib/utils";
import React, { ElementType, ReactNode, useEffect, useState } from "react";

export interface VideoTextProps {
  /** The video source URL */
  src: string;
  /** The text that will reveal the video */
  children: ReactNode;
  /** Extra Tailwind classes */
  className?: string;
  /** Font size for the masked text (default: 20vw) */
  fontSize?: string | number;
  /** Font weight (default: bold) */
  fontWeight?: string | number;
  /** Font family (default: sans-serif) */
  fontFamily?: string;
  /** Wrapper element type (default: div) */
  as?: ElementType;
}

export function VideoMaskedText({
  src,
  children,
  className = "",
  fontSize = 20,
  fontWeight = "bold",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const updateSvgMask = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;

      const newSvgMask = `
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <text x='50%' y='50%' 
            font-size='${responsiveFontSize}' 
            font-weight='${fontWeight}' 
            text-anchor='middle' 
            dominant-baseline='middle' 
            font-family='${fontFamily}'>
            ${content}
          </text>
        </svg>`;

      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, fontFamily]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(
    svgMask
  )}")`;

  return (
    <Component className={cn("relative w-full h-full", className)}>
      {/* Video masked by text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Accessible fallback text */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}
