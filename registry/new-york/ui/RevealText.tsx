/* Reveal Text Component */
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const CharacterReveal = ({ isAnimating = false, char = "", delay = 80 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isAnimating, delay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ease-out ${
        isVisible
          ? "transform translate-y-0 filter blur-0 opacity-100"
          : "transform translate-y-8 filter blur-md opacity-0"
      }`}
    >
      {char}
    </span>
  );
};

const TextReveal = ({
  text = ["How are you?"],
  duration = 80,
  textClassName = "text-4xl font-semibold",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 100);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  // Calculate total character count up to current position
  const getTotalCharacterDelay = (lineIndex: number, charIndex: number) => {
    let totalChars = 0;
    for (let i = 0; i < lineIndex; i++) {
      totalChars += text[i].length;
    }
    return (totalChars + charIndex) * duration;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        {text.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="mb-2 last:mb-0">
            <h1
              className={cn(textClassName, "leading-none")}
              style={{ whiteSpace: "pre" }}
            >
              {line.split("").map((char, charIndex) => (
                <span key={`line-${lineIndex}-char-${charIndex}`}>
                  <CharacterReveal
                    isAnimating={isAnimating}
                    char={char}
                    delay={getTotalCharacterDelay(lineIndex, charIndex)}
                  />
                </span>
              ))}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TextReveal };
