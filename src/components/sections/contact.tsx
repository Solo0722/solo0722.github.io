"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";

import { profile, socials } from "@/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

export function Contact() {
  // GitHub Pages has no server, so the form drafts an email in the visitor's
  // mail app via a mailto: link instead of sending it from a server action.
  const [drafted, setDrafted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Mail clients expect CRLF line breaks inside mailto bodies.
    const body = `From: ${name} <${email}>\n\n${message}`.replace(/\n/g, "\r\n");

    window.location.href =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setDrafted(true);
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="bloom pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70vh]"
      />

      <div className="shell py-section">
        <SectionHeading index="06" label="Contact" title="Let's build something." />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Direct lines */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="t-body measure">
                Have a project, a role, or a rough idea that needs a second
                opinion? Send it over — I read everything and reply within a day
                or two.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-8">
              <p className="t-label mb-3 text-faint">Email</p>
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
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="t-label mb-3 text-faint">Elsewhere</p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <Magnetic key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="t-label inline-flex items-center border border-line px-4 py-2.5 text-bone-2 transition-colors duration-400 hover:border-amber hover:text-amber"
                    >
                      {s.label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <p className="flex items-center gap-2.5 border-t border-line pt-6 text-sm text-bone-2">
                <span className="size-1.5 rounded-full bg-amber" />
                {profile.availability} — {profile.location}
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {drafted ? (
                  <motion.div
                    key="drafted"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-80 flex-col items-start justify-center border border-line p-8"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full border border-amber">
                      <Mail className="size-3.5 text-amber" strokeWidth={1.5} />
                    </span>
                    <h3 className="t-h3 mt-5">Email draft opened.</h3>
                    <p className="t-body mt-2">
                      Your message is drafted in your email app. Press send there
                      to deliver it. If nothing opened, write to me directly at{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        className="border-b border-line text-bone-2 transition-colors duration-400 hover:border-amber hover:text-amber"
                      >
                        {profile.email}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setDrafted(false)}
                      className="t-label mt-6 border-b border-line pb-0.5 text-bone-2 transition-colors duration-400 hover:border-amber hover:text-amber"
                    >
                      Edit message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field
                        name="name"
                        label="Name"
                        placeholder="Ada Lovelace"
                        minLength={2}
                        maxLength={80}
                      />
                      <Field
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="ada@example.com"
                        maxLength={120}
                      />
                    </div>

                    <Field
                      name="subject"
                      label="Subject"
                      placeholder="A new project"
                      minLength={2}
                      maxLength={120}
                    />

                    <Field
                      name="message"
                      label="Message"
                      placeholder="Tell me what you're building…"
                      minLength={10}
                      maxLength={1500}
                      textarea
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <Magnetic>
                        <button
                          type="submit"
                          className="group relative inline-flex items-center gap-2.5 overflow-hidden border border-bone/25 px-6 py-3.5 transition-colors duration-400 hover:border-amber"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 origin-bottom scale-y-0 bg-amber transition-transform duration-500 ease-expo group-hover:scale-y-100"
                          />
                          <span className="t-label relative transition-colors duration-400 group-hover:text-bg">
                            Open email draft
                          </span>
                          <ArrowUpRight
                            className="relative size-3.5 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bg"
                            strokeWidth={1.25}
                          />
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  textarea?: boolean;
};

/**
 * Underlined field, no box. The rule under each input is the only chrome —
 * it turns amber on focus, which is the whole interaction. Validation is the
 * browser's built-in kind (required / minLength / maxLength / type="email"),
 * since there is no server to validate against.
 */
function Field({
  name,
  label,
  placeholder,
  type = "text",
  minLength,
  maxLength,
  textarea,
}: FieldProps) {
  const shared = cn(
    // `block` matters: as an inline-block, a textarea carries ~4px of descender
    // space below its border, which pushed the absolutely-positioned focus rule
    // clear of the border-b and rendered as two separate lines.
    "peer block w-full border-0 border-b bg-transparent pb-2.5 text-sm text-bone",
    "placeholder:text-faint focus:outline-none disabled:opacity-50",
    "transition-colors duration-400",
    "border-line focus:border-bone/40",
  );

  return (
    <div className="relative">
      <label htmlFor={name} className="t-label mb-2.5 block text-faint">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          required
          minLength={minLength}
          maxLength={maxLength}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required
          minLength={minLength}
          maxLength={maxLength}
          className={shared}
        />
      )}

      {/* Amber rule that scales in from the left on focus */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-600 ease-expo peer-focus:scale-x-100"
      />
    </div>
  );
}