import cn from "clsx"; // optional, but handy. If you don't want this dependency, replace with simple string concat.

type AuroraType = "always" | "hover";

type Props = {
  text: string;
  /** "always" = animation runs continuously; "hover" = animation only on hover */
  type?: AuroraType;
  /**
   * Pass gradient stop classes (without the `bg-gradient-to-r` prefix).
   * Example: "from-red-500 via-yellow-400 to-pink-500"
   * If omitted, defaults to: "from-primary-foreground via-yellow-500 to-pink-500"
   */
  gradient?: string;
  className?: string;
};

const AuroraText = ({
  text,
  type = "always",
  gradient = "from-primary-foreground via-yellow-500 to-pink-500",
  className,
}: Props) => {
  // Build classes. We include bg-gradient-to-r here so parent only needs to pass stops.
  const gradientClass = `bg-gradient-to-r ${gradient}`;

  // If type is "hover" use the hover variant; otherwise animate always.
  // Tailwind supports `hover:animate-*`. If you prefer group-hover you can easily adapt.
  const animationClass =
    type === "hover" ? "hover:animate-aurora" : "animate-aurora";

  return (
    <span
      // keep bg-clip/text-transparent for the gradient text. Add webkit inline fallback for Safari.
      className={cn(
        "text-5xl font-bold bg-[length:200%_200%] bg-clip-text text-transparent",
        gradientClass,
        animationClass,
        className
      )}
    >
      {text}
    </span>
  );
};

export { AuroraText };
