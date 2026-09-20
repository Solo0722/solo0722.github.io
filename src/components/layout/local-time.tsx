"use client";

import { useSyncExternalStore } from "react";

/**
 * A one-second tick shared by every subscriber.
 *
 * The snapshot is a counter rather than a formatted string: `getSnapshot` must
 * return a referentially stable value or React re-renders forever, and a fresh
 * string fails that test. Formatting happens during render instead.
 */
let tick = 0;
let interval: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  interval ??= setInterval(() => {
    tick += 1;
    listeners.forEach((l) => l());
  }, 1000);

  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  };
}

const getSnapshot = () => tick;
/** Sentinel: React uses this for SSR *and* the hydrating render, so markup matches. */
const getServerSnapshot = () => -1;

export function LocalTime({ timeZone }: { timeZone: string }) {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (t === -1) return <span className="tabular-nums">--:--:--</span>;

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());

  return <span className="tabular-nums">{time}</span>;
}
