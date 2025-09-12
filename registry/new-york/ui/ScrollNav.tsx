import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type ScrollNavProps = {
  sections: Section[];
  headerOffset?: number; // configurable instead of magic number
};

export function ScrollNav({ sections, headerOffset = -72 }: ScrollNavProps) {
  const { scrollYProgress } = useScroll();
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);

  useEffect(() => {
    const computeOffsets = () => {
      const doc = document.documentElement;
      const scrollRange = Math.max(1, doc.scrollHeight - window.innerHeight);

      const offsets = sections.map((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return 0;

        const targetY =
          i === 0
            ? 0
            : el.getBoundingClientRect().top + window.scrollY + headerOffset;

        const clamped = Math.min(Math.max(targetY, 0), scrollRange);
        return clamped / scrollRange;
      });

      setSectionOffsets(offsets);
    };

    computeOffsets();
    window.addEventListener("resize", computeOffsets);
    return () => window.removeEventListener("resize", computeOffsets);
  }, [sections, headerOffset]);

  const handleScrollTo = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (el) {
      const y =
        index === 0
          ? 0
          : el.getBoundingClientRect().top + window.scrollY + headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-0 bottom-0 h-[calc(100vh-var(--header-height))] flex items-center justify-center z-50">
      <div className="relative h-full w-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="top-0 left-0 w-full bg-primary/50"
          style={{
            scaleY: scrollYProgress,
            height: "100%",
            transformOrigin: "0% 0%",
          }}
        />
      </div>

      {sectionOffsets.map((offset, i) => (
        <div
          key={sections[i].id}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${offset * 100}%` }}
        >
          <button
            onClick={() => handleScrollTo(sections[i].id, i)}
            className="group relative w-3 h-3 rounded-full bg-background border border-primary shadow hover:bg-primary transition"
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition">
              {sections[i].label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
