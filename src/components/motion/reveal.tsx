"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  duration?: number;
};

/** Fade-and-rise on scroll. The workhorse — used for almost every block. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.25,
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn(className)}
      /* `initial` must not depend on `reduce`: useReducedMotion() resolves to
         null during SSR and to the real preference on the client, so branching
         here would emit two different inline styles and break hydration.
         The preference is honoured through the transition instead — at 1ms the
         travel is never perceived. */
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      /* Under reduced motion the translate snaps (duration 0) while the opacity
         still fades. The reader gets no vestibular movement, but the page is
         alive rather than frozen. */
      transition={
        reduce
          ? { opacity: { duration: 0.4 }, y: { duration: 0 } }
          : { duration, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * A horizontal hairline that draws itself out from the left as it enters view.
 * Used as the divider above every section title.
 */
export function RevealRule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className={cn("h-px w-full bg-line", className)}>
      <motion.div
        className="h-px w-full origin-left bg-bone/25"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: reduce ? 0.35 : 1.1,
          delay: reduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}
