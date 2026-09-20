"use client";

import { useState, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ViewTransition } from "@/components/view-transition";

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Raw pointer position; the preview reads the springed version so it trails.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const py = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  function handleMove(e: ReactMouseEvent) {
    x.set(e.clientX);
    y.set(e.clientY);
  }

  const hoveredProject = hovered !== null ? projects[hovered] : null;
  // Only projects carrying a screenshot get a floating preview.
  const active = hoveredProject?.images.length ? hoveredProject : null;

  return (
    <section id="work" className="scroll-mt-20 border-t border-line bg-inset">
      <div className="shell py-(--spacing-section)">
        <SectionHeading index="04" label="Selected Work" title="Built and shipped." />

        <div className="mt-10" onMouseMove={handleMove}>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.03, 0.15)}>
              <Link
                href={`/project/${project.slug}`}
                data-cursor="View"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative block border-t border-line last:border-b"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-amber/6 to-transparent transition-transform duration-500 ease-expo group-hover:scale-x-100"
                />

                <div className="relative grid grid-cols-1 items-baseline gap-y-1.5 py-5 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:md:pl-4 md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-7">
                    <ViewTransition name={`project-title-${project.slug}`}>
                      <h3 className="t-h2 transition-colors duration-400 group-hover:text-amber">
                        {project.title}
                      </h3>
                    </ViewTransition>
                    <p className="t-body mt-1 max-w-md">{project.summary}</p>
                  </div>

                  <span className="t-label text-faint md:col-span-2">
                    {project.category}
                  </span>
                  <span className="t-label text-faint md:col-span-2">
                    {project.year}
                  </span>

                  <span className="hidden justify-end md:col-span-1 md:flex">
                    <ArrowUpRight
                      className="size-4 text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                      strokeWidth={1.25}
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Archive */}
        {/* <div className="mt-14">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="t-label shrink-0 text-faint">Also built</span>
              <span className="h-px w-full bg-line" />
            </div>
          </Reveal>

          <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((item, i) => {
              const Wrapper = item.href ? "a" : "div";
              return (
                <Reveal key={item.title} delay={Math.min(i * 0.04, 0.2)}>
                  <Wrapper
                    {...(item.href
                      ? { href: item.href, target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="group flex h-full flex-col justify-between gap-4 bg-inset p-5 transition-colors duration-400 hover:bg-raised"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-base transition-colors duration-400 group-hover:text-amber">
                          {item.title}
                        </h4>
                        {item.href && (
                          <ArrowUpRight
                            className="mt-0.5 size-3 shrink-0 text-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:text-amber"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <p className="t-body mt-1.5 text-[0.8125rem]">{item.blurb}</p>
                    </div>
                    <p className="t-label text-[0.5625rem] text-faint">
                      {item.tech.join(" · ")}
                    </p>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>
        </div> */}
      </div>

      {/* Floating preview that trails the cursor across the index list */}
      {!reduce && (
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.slug}
              aria-hidden
              className="pointer-events-none fixed top-0 left-0 z-60 hidden aspect-16/11 w-72 overflow-hidden bg-raised lg:block"
              style={{ x: px, y: py, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={active.images[0].src}
                alt=""
                fill
                sizes="18rem"
                className="object-cover"
              />
              <span className="absolute inset-0 ring-1 ring-bone/10 ring-inset" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
