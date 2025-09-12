import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const AnimatedButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: AnimatedButtonProps) => {
  const variants = {
    primary: "bg-gradient-brand text-primary-foreground shadow-glow",
    secondary: "bg-secondary text-secondary-foreground border border-border",
    outline:
      "border-gradient bg-transparent text-foreground hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "rounded-xl font-medium transition-all duration-300 relative overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: "var(--glow-shadow)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
