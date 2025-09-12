import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  duration?: number;    // Duration in ms between each character
  loop?: boolean;
  withCursor?: boolean; // Show blinking cursor
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  duration = 100,
  loop = false,
  className = "",
  withCursor = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex((prev) => prev + 1);
      }, duration);
    } else if (isDeleting && index >= 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex((prev) => prev - 1);
      }, duration);
    } else if (loop) {
      timeout = setTimeout(() => {
        setIsDeleting((prev) => !prev);
        if (!isDeleting) {
          setIndex(text.length - 1); // Start deleting
        } else {
          setIndex(0); // Start typing again
        }
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, duration, loop]);

  // Cursor blinking logic
  useEffect(() => {
    if (withCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [withCursor]);

  return (
    <div>
      <span
        className={className}
        style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      >
        {displayedText}
        {withCursor && showCursor ? "|" : " "}
      </span>
    </div>
  );
};
