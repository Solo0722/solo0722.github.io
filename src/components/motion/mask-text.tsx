"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type MaskTextProps = {
  /** One entry per visual line. Lines animate in sequence. */
  lines: readonly string[];
  className?: string;
  /** Per-line stagger in seconds. */
  stagger?: number;
  delay?: number;
  /** Skip the viewport check — used by the hero, which is above the fold. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

/**
 * The signature move of the whole site: each line sits inside an
 * overflow-hidden box and slides up out of it, so the type appears to be
 * printed onto the page rather than faded in.
 */
export function MaskText({
  lines,
  className,
  stagger = 0.08,
  delay = 0,
  immediate = false,
  as: Tag = "div",
}: MaskTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const play = immediate || inView;

  return (
    <Tag ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            data-reveal
            className="block will-change-transform"
            /* Deterministic `initial` — see the note in Reveal. Branching on
               useReducedMotion() here would mismatch during hydration. */
            initial={{ y: "110%", opacity: 0 }}
            animate={play ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={
              reduce
                ? {
                    opacity: { duration: 0.4, delay: delay + i * stagger * 0.4 },
                    y: { duration: 0 },
                  }
                : {
                    duration: 0.85,
                    delay: delay + i * stagger,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
