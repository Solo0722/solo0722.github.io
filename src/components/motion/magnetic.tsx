"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element travels toward the cursor, 0–1. */
  strength?: number;
};

/**
 * Pulls its child a little way toward the cursor while hovered, then springs
 * back on exit. Applied to primary buttons and social links only — used too
 * widely it stops reading as deliberate.
 */
export function Magnetic({ children, className, strength = 0.32 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
