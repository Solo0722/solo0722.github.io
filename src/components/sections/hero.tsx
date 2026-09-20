import { ArrowDown, ArrowRight } from "lucide-react";

import { profile, resumeUrl } from "@/data";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * Above-the-fold, so this section's paint time is the page's LCP.
 *
 * Deliberately a server component with a CSS-only entrance: no Motion, no
 * hydration on the critical path. The previous Motion version held the intro
 * paragraph at opacity 0 until React hydrated, which cost ~1.9s of element
 * render delay. Only <Magnetic> is a client island, and it wraps the buttons
 * rather than the text.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <div
        aria-hidden
        className="bloom pointer-events-none absolute -top-1/4 left-1/2 -z-10 h-[70vh] w-[110vw] -translate-x-1/2"
      />

      <div className="shell">
        <p className="t-label anim-rise-in text-muted">
          {profile.role} — {profile.location}
        </p>

        <h1 className="t-display mt-6 max-w-4xl">
          {profile.statement.map((line, i) => (
            <span key={line} className="mask-line">
              <span
                className="anim-mask-rise block"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="t-body measure anim-rise-in mt-7"
          style={{ animationDelay: "0.12s" }}
        >
          {profile.intro}
        </p>

        <div
          className="anim-rise-in mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 border border-bone/25 px-6 py-3.5 transition-colors duration-400 hover:border-amber"
            >
              <span className="t-label transition-colors duration-400 group-hover:text-amber">
                Selected work
              </span>
              <ArrowRight
                className="size-3.5 transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-amber"
                strokeWidth={1.5}
              />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 bg-bone px-6 py-3.5 text-bg transition-colors duration-400 hover:bg-amber"
            >
              <span className="t-label">Download CV</span>
              <ArrowDown
                className="size-3.5 transition-transform duration-400 group-hover:translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </Magnetic>

          <a
            href={`mailto:${profile.email}`}
            className="t-label ml-1 border-b border-line pb-1 text-muted transition-colors duration-400 hover:border-amber hover:text-amber"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
