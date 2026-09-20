"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowDown } from "lucide-react";

import { navLinks, profile, resumeUrl, socials } from "@/data";
import { cn } from "@/lib/utils";

const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Track the section in view. Only meaningful on the homepage.
  useEffect(() => {
    if (!isHome) return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock the page behind the mobile menu, and close it on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Anchor links only work from the homepage; prefix them elsewhere.
  const hrefFor = (hash: string) => (isHome ? hash : (`/${hash}` as const));

  // Section highlighting is meaningless off the homepage — derive rather than
  // clearing `active` from an effect.
  const activeId = isHome ? active : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-80 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !open
            ? "border-b border-line bg-bg/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="group relative z-10 flex items-baseline gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-xl leading-none tracking-tight md:text-2xl">
              {profile.firstName}
            </span>
            <span className="font-display text-xl leading-none tracking-tight text-muted transition-colors duration-500 group-hover:text-amber md:text-2xl">
              {profile.lastName}
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={link.href}
                  href={hrefFor(link.href)}
                  className="group relative flex items-baseline gap-1.5 py-2"
                >
                  <span
                    className={cn(
                      "t-label text-[9px] transition-colors duration-500",
                      isActive ? "text-amber" : "text-faint",
                    )}
                  >
                    {link.index}
                  </span>
                  <span
                    className={cn(
                      "text-sm tracking-tight transition-colors duration-500",
                      isActive ? "text-bone" : "text-bone-2 group-hover:text-bone",
                    )}
                  >
                    {link.label}
                  </span>
                  <span
                    className={cn(
                      "absolute right-0 -bottom-0.5 left-0 h-px origin-left bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="t-label hidden items-center gap-2 border border-bone/25 px-4 py-2.5 transition-colors duration-400 hover:border-amber hover:text-amber md:inline-flex"
            >
              CV
              <ArrowDown className="size-3" strokeWidth={1.5} />
            </a>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group relative z-10 flex items-center gap-3 lg:hidden"
            >
              <span className="t-label text-[10px] text-bone-2">
                {open ? "Close" : "Menu"}
              </span>
              <span className="flex h-3 w-6 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 flex flex-col justify-between bg-bg pt-28 pb-10 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="shell flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={hrefFor(link.href)}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 border-b border-line py-5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="t-label text-[10px] text-faint">{link.index}</span>
                  <span className="t-h3 transition-colors duration-300 group-hover:text-amber">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="shell flex flex-wrap items-center justify-between gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex flex-col gap-3">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="t-label inline-flex w-fit items-center gap-2 bg-bone px-5 py-3 text-bg"
                >
                  Download CV
                  <ArrowDown className="size-3" strokeWidth={1.5} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-bone-2 transition-colors hover:text-amber"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-label text-[10px] text-muted transition-colors hover:text-bone"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
