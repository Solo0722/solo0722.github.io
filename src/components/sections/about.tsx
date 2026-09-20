import Image from "next/image";

import { profile } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="shell scroll-mt-20 py-(--spacing-section)">
      <SectionHeading index="01" label="About" title="Who you'd be working with." />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
        {/* Portrait */}
        <Reveal className="lg:col-span-4" y={24}>
          <figure className="group">
            <div className="relative aspect-4/5 overflow-hidden bg-raised">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
          </figure>
        </Reveal>

        {/* Prose */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-5">
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="t-body measure">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08} className="mt-9">
            <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="bg-bg px-4 py-3.5">
                  <dt className="t-label mb-1.5 text-faint">{fact.label}</dt>
                  <dd className="text-sm text-bone">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
