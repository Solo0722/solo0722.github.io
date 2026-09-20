import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getNextWork, getWork, publishedWork } from "@/data";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ViewTransition } from "@/components/view-transition";

type Params = { params: Promise<{ slug: string }> };

/** Only published entries get a route — drafts are listed but not linked. */
export function generateStaticParams() {
  return publishedWork.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};

  return {
    title: work.shortTitle ?? work.title,
    description: work.summary,
    alternates: { canonical: `/project/${work.slug}` },
    openGraph: {
      title: `${work.title} — Case study`,
      description: work.summary,
      type: "article",
      ...(work.images.length
        ? { images: [{ url: work.images[0].src, alt: work.images[0].alt }] }
        : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const next = getNextWork(slug);
  const [hero, ...rest] = work.images;

  const meta = [
    { label: "Year", value: work.year },
    { label: "Type", value: work.category },
    { label: work.org ? "Built at" : "Role", value: work.org ?? work.role },
    { label: work.org ? "Role" : "Stack", value: work.org ? work.role : `${work.tech.length} technologies` },
  ];

  return (
    <article className="pt-24 md:pt-28">
      {/* ---- Masthead ---- */}
      <header className="shell">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-3 text-sm text-muted transition-colors duration-400 hover:text-bone"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-400 group-hover:-translate-x-1"
            strokeWidth={1.25}
          />
          <span className="t-label">All work</span>
        </Link>

        <ViewTransition name={`project-title-${work.slug}`}>
          <h1 className="t-display mt-6">{work.shortTitle ?? work.title}</h1>
        </ViewTransition>

        <p className="t-body measure mt-5">{work.summary}</p>

        <dl className="mt-9 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label} className="bg-bg px-4 py-3.5">
              <dt className="t-label mb-1.5 text-faint">{item.label}</dt>
              <dd className="text-sm text-bone">{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ---- Hero image (omitted entirely when there are no screenshots yet) ---- */}
      {hero && (
        <Reveal className="shell mt-9" y={24}>
          <figure className="relative aspect-16/10 w-full overflow-hidden bg-raised">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-contain"
              priority
            />
            <span
              aria-hidden
              className="absolute inset-0 ring-1 ring-bone/10 ring-inset"
            />
          </figure>
        </Reveal>
      )}

      {/* ---- Narrative ---- */}
      <div className="shell mt-14">
        {[
          { index: "01", label: "The problem", body: work.problem },
          { index: "02", label: "What I built", body: work.build },
          { index: "03", label: "The outcome", body: work.outcome },
        ].map((block, i) => (
          <Reveal key={block.index} delay={i * 0.05}>
            <section className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-8">
              <div className="flex items-baseline gap-3 md:col-span-4">
                <span className="t-label text-amber">{block.index}</span>
                <h2 className="t-h3">{block.label}</h2>
              </div>
              <p className="t-body measure md:col-span-7 md:col-start-6">
                {block.body}
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      {/* ---- Gallery — every screenshot after the hero ---- */}
      {rest.length > 0 && (
        <section className="shell mt-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="t-label shrink-0 text-faint">Gallery</span>
              <span className="h-px w-full bg-line" />
            </div>
          </Reveal>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {rest.map((img, i) => (
              <Reveal key={img.src} delay={Math.min(i * 0.05, 0.25)}>
                <figure>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-raised">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 ring-1 ring-bone/10 ring-inset"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="t-label mt-2.5 text-faint">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---- Highlights ---- */}
      {work.highlights.length > 0 && (
        <section className="shell mt-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="t-label shrink-0 text-faint">Highlights</span>
              <span className="h-px w-full bg-line" />
            </div>
          </Reveal>

          <div className="mt-5 grid gap-px border border-line bg-line md:grid-cols-3">
            {work.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.06}>
                <div className="h-full bg-bg p-5">
                  <span className="t-label text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-base">{h.label}</h3>
                  <p className="t-body mt-1.5 text-[0.8125rem]">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---- Stack + links ---- */}
      <section className="shell mt-14 grid gap-10 md:grid-cols-12 md:gap-10">
        {work.tech.length > 0 && (
          <Reveal className="md:col-span-6">
            <p className="t-label mb-4 text-faint">Built with</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {work.tech.map((t) => (
                <li
                  key={t}
                  className="t-label border border-line px-3.5 py-2.5 text-bone-2 transition-colors duration-400 hover:border-amber hover:text-amber"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="md:col-span-5 md:col-start-8" delay={0.08}>
          <p className="t-label mb-4 text-faint">Links</p>
          <div className="flex flex-col">
            {work.links.length > 0 ? (
              work.links.map((link) => (
                <ExternalRow
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  value={hostOf(link.href)}
                />
              ))
            ) : (
              <p className="text-sm text-muted">Not publicly available.</p>
            )}
          </div>
        </Reveal>
      </section>

      {/* ---- Next project ---- */}
      <section className="mt-16 border-t border-line">
        <Link href={`/project/${next.slug}`} data-cursor="Next" className="group block">
          <div className="shell py-10">
            <div className="flex items-center justify-between gap-6">
              <span className="t-label text-faint">Next project</span>
              <ArrowUpRight
                className="size-5 text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber"
                strokeWidth={1}
              />
            </div>
            <MaskText
              as="p"
              lines={[next.shortTitle ?? next.title]}
              className="t-h1 mt-5 transition-colors duration-400 group-hover:text-amber"
            />
            <p className="t-body mt-2 max-w-xl">{next.summary}</p>
          </div>
        </Link>
      </section>
    </article>
  );
}

function ExternalRow({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 border-t border-line py-3.5 last:border-b"
    >
      <span className="text-sm text-bone-2 transition-colors duration-400 group-hover:text-amber">
        {label}
      </span>
      <span className="flex items-center gap-2">
        <span className="t-label text-faint">{value}</span>
        <ArrowUpRight
          className="size-3.5 text-muted transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
          strokeWidth={1.5}
        />
      </span>
    </a>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Visit";
  }
}
