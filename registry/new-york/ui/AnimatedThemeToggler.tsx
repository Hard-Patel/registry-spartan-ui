import { cn } from "@/lib/utils";
import { LucideProps, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

type props = {
  className?: string;
  DarkIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  LightIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const AnimatedThemeToggle = ({
  className,
  DarkIcon = Sun,
  LightIcon = Moon,
}: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light") === "dark"
  );
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        "relative p-2 bg-secondary rounded-full overflow-hidden",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="inset-0 flex items-center justify-center"
          >
            <LightIcon className="size-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="inset-0 flex items-center justify-center"
          >
            <DarkIcon className="size-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
