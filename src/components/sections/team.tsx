import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { collaborations } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ViewTransition } from "@/components/view-transition";

/**
 * Projects built inside an organisation, with other people — kept separate
 * from the solo work so the distinction is obvious to anyone reading.
 *
 * Unpublished entries still render, greyed and unlinked, so a project that's
 * real but not yet written up doesn't simply vanish from the record.
 */
export function Team() {
  return (
    <section id="team" className="shell scroll-mt-20 py-(--spacing-section)">
      <SectionHeading
        label="Team Projects"
        title="Built with others."
      />

      <div className="mt-10">
        {collaborations.map((project, i) => {
          const row = (
            <div className="relative grid grid-cols-1 items-baseline gap-y-1.5 py-5 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-12 md:gap-6 group-hover:md:pl-4">
              <div className="md:col-span-7">
                <ViewTransition name={`project-title-${project.slug}`}>
                  <h3
                    className={
                      project.published
                        ? "t-h2 transition-colors duration-400 group-hover:text-amber"
                        : "t-h2 text-bone-2"
                    }
                  >
                    {project.shortTitle ?? project.title}
                  </h3>
                </ViewTransition>
                <p className="t-body mt-1 max-w-md">{project.summary}</p>
              </div>

              <span className="t-label text-faint md:col-span-3">
                {project.published
                  ? (project.org ?? project.category)
                  : "Details coming"}
              </span>
              <span className="t-label text-faint md:col-span-1">
                {project.year}
              </span>

              <span className="hidden justify-end md:col-span-1 md:flex">
                {project.published ? (
                  <ArrowUpRight
                    className="size-4 text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                    strokeWidth={1.25}
                  />
                ) : (
                  <span className="t-label text-[0.5625rem] whitespace-nowrap text-faint">
                    Soon
                  </span>
                )}
              </span>
            </div>
          );

          return (
            <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.2)}>
              {project.published ? (
                <Link
                  href={`/project/${project.slug}`}
                  data-cursor="View"
                  className="group relative block border-t border-line last:border-b"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-amber/6 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  {row}
                </Link>
              ) : (
                <div className="group relative block border-t border-line opacity-45 last:border-b">
                  {row}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
