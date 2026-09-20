"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and on the hydrating render, `true` immediately after.
 *
 * This is the setState-free way to gate client-only rendering: React uses the
 * server snapshot for the hydration pass, so markup matches, then re-renders
 * with the client snapshot. A `useEffect(() => setMounted(true))` does the
 * same job but triggers a cascading render, which the compiler flags.
 */
export function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
