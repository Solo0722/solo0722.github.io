"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor: an amber dot that tracks exactly, inside a bone ring that
 * lags behind on a spring. Any element carrying `data-cursor="…"` swaps the
 * ring for a filled disc with that label — used on the work index so hovering
 * a project row reads "VIEW".
 *
 * Only mounts on fine pointers (mouse/trackpad). Touch devices and anyone who
 * has asked for reduced motion get the native cursor untouched.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  // Decide once whether this device should get a custom cursor at all.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Hide the native cursor everywhere except where a caret genuinely helps.
    const style = document.createElement("style");
    style.textContent = `
      body, body * { cursor: none !important; }
      input, textarea, select, [contenteditable="true"] { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      // Walk up from the target to find the nearest cursor-aware ancestor.
      const target = e.target as Element | null;
      const zone = target?.closest?.("[data-cursor]");
      if (zone) {
        setLabel(zone.getAttribute("data-cursor") || "");
      } else {
        const clickable = target?.closest?.("a, button, [role='button']");
        setLabel(clickable ? "" : null);
      }
    };

    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      style.remove();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hasLabel = Boolean(label);
  const isHovering = label !== null;
  const ringSize = hasLabel ? 84 : isHovering ? 52 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      {/* Trailing ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor: hasLabel ? "#e0a458" : "rgba(224,164,88,0)",
          borderColor: hasLabel ? "rgba(224,164,88,0)" : "rgba(237,232,224,0.35)",
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="t-label text-[9px] text-bg">{label}</span>
      </motion.div>

      {/* Exact-tracking dot — hidden once the ring turns into a label disc */}
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-amber"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hasLabel ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
