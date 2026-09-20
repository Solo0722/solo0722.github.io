import { skills } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-line bg-inset">
      <div className="shell py-(--spacing-section)">
        <SectionHeading index="02" label="Stack" title="What I reach for." />

        <div className="mt-10">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <div className="group grid gap-3 border-t border-line py-5 transition-colors duration-400 last:border-b hover:border-bone/25 md:grid-cols-12 md:gap-8">
                <h3 className="t-h3 transition-colors duration-400 group-hover:text-amber md:col-span-4">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 md:col-span-8 md:justify-end">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-bone-2 transition-colors duration-400 group-hover:text-bone"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
