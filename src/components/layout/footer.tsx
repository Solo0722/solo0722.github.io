import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { navLinks, profile, socials } from "@/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className="t-label mb-4 text-faint">Get in touch</p>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-start gap-1.5"
          >
            <span className="t-h3 border-b border-line pb-0.5 transition-colors duration-400 group-hover:border-amber group-hover:text-amber">
              {profile.email}
            </span>
            <ArrowUpRight
              className="mt-1 size-3.5 shrink-0 text-muted transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
              strokeWidth={1.25}
            />
          </a>
        </div>

        <nav className="md:col-span-3">
          <p className="t-label mb-4 text-faint">Index</p>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  className="text-sm text-bone-2 transition-colors duration-300 hover:text-amber"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="t-label mb-4 text-faint">Elsewhere</p>
          <ul className="space-y-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-bone-2 transition-colors duration-300 hover:text-amber"
                >
                  {s.label}
                  <ArrowUpRight
                    className="size-3 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex items-center justify-between gap-4 border-t border-line py-5">
        <p className="t-label text-faint">
          © {year} {profile.name}
        </p>
        <p className="t-label text-faint">{profile.location}</p>
      </div>
    </footer>
  );
}
