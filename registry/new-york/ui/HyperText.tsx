import { useCallback, useEffect, useState } from "react";

const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

// Utility to scramble text
function scrambleText(originalText: string, charset: string[]) {
  return originalText
    .split("")
    .map((char) =>
      char === " " ? " " : charset[Math.floor(Math.random() * charset.length)]
    )
    .join("");
}

interface HyperTextToggleProps {
  texts: string[];
  /** ⏱ Scramble frame interval (default: 60ms) */
  transitionDurationMs?: number;
  /** ⏸ Hold readable text before scrambling (default: 2500ms) */
  holdDurationMs?: number;
}

const HyperTextToggle = ({
  texts,
  transitionDurationMs = 100,
  holdDurationMs = 2500,
}: HyperTextToggleProps) => {
  const maxRoleLength = texts.reduce((acc, text) => {
    if (acc < text.length) {
      acc = text.length;
    }
    return acc;
  }, texts[0].length);

  const [displayText, setDisplayText] = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let scrambleCount = 0;
    let scrambleInterval: NodeJS.Timeout;
    let holdTimeout: NodeJS.Timeout;

    const startScramble = () => {
      scrambleCount = 0;
      scrambleInterval = setInterval(() => {
        scrambleCount++;
        if (scrambleCount <= 8) {
          setDisplayText(scrambleText(texts[currentIndex], charset));
        } else {
          clearInterval(scrambleInterval);
          const nextIndex = (currentIndex + 1) % texts.length;
          setCurrentIndex(nextIndex);
          setDisplayText(texts[nextIndex]);
          holdTimeout = setTimeout(startScramble, holdDurationMs);
        }
      }, transitionDurationMs);
    };

    holdTimeout = setTimeout(startScramble, holdDurationMs);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(holdTimeout);
    };
  }, [currentIndex, texts, transitionDurationMs, holdDurationMs]);

  const padToMaxLength = useCallback(
    (text: string) => {
      const diff = maxRoleLength - text.length;
      if (diff <= 0) return text;

      const padStart = Math.floor(diff / 2);
      const padEnd = diff - padStart;

      return " ".repeat(padStart) + text + " ".repeat(padEnd);
    },
    [maxRoleLength]
  );

  return (
    <p className="leading-8 text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
      {padToMaxLength(displayText)}
    </p>
  );
};

export { HyperTextToggle };
