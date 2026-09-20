/// <reference types="react/canary" />

// `<ViewTransition>` ships in React's canary type channel, which @types/react
// does not load by default. Next.js aliases `react` to a bundled build that
// does export it at runtime (see experimental.viewTransition in next.config.ts),
// so this reference just brings TypeScript's view in line with reality.

export {};
