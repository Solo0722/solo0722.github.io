import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { profile } from "@/data";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-20">
      <span className="t-label text-amber">Error 404</span>

      <h1 className="t-display mt-5">
        Nothing
        <br />
        <span className="text-muted">here.</span>
      </h1>

      <p className="t-body measure mt-5">
        That page doesn&apos;t exist — it may have been renamed or never
        existed at all. Head back to the start, or email me and I&apos;ll point
        you at whatever you were looking for.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 border border-line px-5 py-3 transition-colors duration-400 hover:border-amber"
        >
          <ArrowLeft
            className="size-4 text-muted transition-all duration-500 group-hover:-translate-x-1 group-hover:text-amber"
            strokeWidth={1.25}
          />
          <span className="t-label text-bone-2 transition-colors duration-500 group-hover:text-amber">
            Back home
          </span>
        </Link>

        <a
          href={`mailto:${profile.email}`}
          className="t-label inline-flex items-center border border-line px-5 py-3 text-bone-2 transition-colors duration-400 hover:border-amber hover:text-amber"
        >
          Email me
        </a>
      </div>
    </section>
  );
}
