import { ArrowUpRight } from "lucide-react";

import { certifications, education } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

/** Education and certifications, kept in one compact section. */
export function Credentials() {
  return (
    <section
      id="credentials"
      className="scroll-mt-20 border-t border-line bg-inset"
    >
      <div className="shell py-(--spacing-section)">
        <SectionHeading
          index="05"
          label="Credentials"
          title="Studied and certified."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Education */}
          <div className="lg:col-span-5">
            <p className="t-label mb-5 text-faint">Education</p>

            {education.map((item, i) => (
              <Reveal key={item.qualification} delay={i * 0.05}>
                <div className="border-t border-line py-5 last:border-b">
                  <h3 className="t-h3">{item.qualification}</h3>
                  <p className="mt-1.5 text-sm text-bone-2">{item.institution}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="t-label text-faint">{item.period}</span>
                    {item.note && (
                      <>
                        <span className="text-faint">·</span>
                        <span className="t-label text-amber">{item.note}</span>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="t-label mb-5 text-faint">
              Certifications ({certifications.length})
            </p>

            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={Math.min(i * 0.04, 0.2)}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block border-t border-line py-4 last:border-b"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm text-bone transition-colors duration-400 group-hover:text-amber">
                      {cert.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-0.5 size-3 shrink-0 text-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="t-label text-faint">{cert.issuer}</span>
                    <span className="text-faint">·</span>
                    <span className="t-label text-faint">{cert.year}</span>
                    <span className="text-faint">·</span>
                    <span className="t-label text-[0.5625rem] text-muted">
                      {cert.skills.join(", ")}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
