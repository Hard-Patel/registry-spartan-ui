import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`relative p-6 rounded-2xl border 
        border-foreground/10 bg-foreground/5 
        backdrop-blur-lg shadow-lg 
        overflow-hidden ${className}`}
    >
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/5 rounded-2xl pointer-events-none" />

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
