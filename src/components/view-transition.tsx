import * as React from "react";

type ViewTransitionProps = {
  /** Matching names on two pages morph into each other during navigation. */
  name?: string;
  children: React.ReactNode;
};

/**
 * Thin wrapper over React's `<ViewTransition>`.
 *
 * The component is only present in the React build Next.js swaps in when
 * `experimental.viewTransition` is enabled, so we look it up at runtime and
 * fall back to rendering children untouched. That keeps the site working if
 * the flag is ever turned off, and keeps this usable from both server and
 * client components (no hooks, no directive).
 */
const Native = (
  React as unknown as {
    ViewTransition?: React.ComponentType<ViewTransitionProps>;
  }
).ViewTransition;

export function ViewTransition({ name, children }: ViewTransitionProps) {
  if (!Native) return <>{children}</>;
  return <Native name={name}>{children}</Native>;
}
