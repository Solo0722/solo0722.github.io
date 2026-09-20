/**
 * A fixed film-grain wash over the entire page.
 *
 * This is the single cheapest thing that makes a flat dark page read as
 * printed rather than rendered — it breaks up the large areas of near-black
 * and hides the banding that a pure #080706 field otherwise shows on cheap
 * panels. Inline SVG turbulence, so there's no network request.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-90 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
