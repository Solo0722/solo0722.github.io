"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Plus } from "lucide-react";

import { experience, resumeUrl } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

export function Experience() {
  // The current role is open on arrival; it's the one people came to read.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="shell scroll-mt-20 py-(--spacing-section)">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading
          index="03"
          label="Experience"
          title="Where I've been working."
          className="flex-1"
        />
        <Magnetic className="shrink-0">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border border-bone/25 px-5 py-3 transition-colors duration-400 hover:border-amber"
          >
            <span className="t-label transition-colors duration-400 group-hover:text-amber">
              Full CV
            </span>
            <ArrowDown
              className="size-3.5 transition-all duration-400 group-hover:translate-y-0.5 group-hover:text-amber"
              strokeWidth={1.5}
            />
          </a>
        </Magnetic>
      </div>

      <div className="mt-10">
        {experience.map((role, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={`${role.company}-${role.period}`} delay={i * 0.04}>
              <div className="border-t border-line last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-1 items-baseline gap-2 py-5 text-left md:grid-cols-12 md:gap-6"
                >
                  <span
                    className={cn(
                      "t-label transition-colors duration-400 md:col-span-3",
                      isOpen ? "text-amber" : "text-faint group-hover:text-bone-2",
                    )}
                  >
                    {role.period}
                  </span>

                  <div className="md:col-span-6">
                    <h3
                      className={cn(
                        "t-h3 transition-colors duration-400",
                        isOpen ? "text-amber" : "group-hover:text-amber",
                      )}
                    >
                      {role.company}
                    </h3>
                    <p className="mt-0.5 text-sm text-bone-2">{role.role}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                    <span className="t-label text-right text-faint">
                      {role.arrangement}
                    </span>
                    <Plus
                      className={cn(
                        "size-3.5 shrink-0 text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "rotate-45 text-amber",
                      )}
                      strokeWidth={1.5}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
                        opacity: { duration: 0.3 },
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2.5 pb-6 md:ml-[25%] md:pl-6">
                        {role.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-amber/60" />
                            <span className="t-body measure">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
