import { z } from "zod";

/**
 * Server-only environment access. Imported only from Server Actions or server
 * modules. Returns a discriminated result so call sites can fail gracefully
 * when the mail keys aren't set.
 */

/**
 * Resend accepts a sender as either a bare address or a display-name form:
 *
 *   hi@yourdomain.com
 *   Portfolio <hi@yourdomain.com>
 *
 * A plain `.email()` check rejects the second, which is the form the docs (and
 * .env.local.example) tell you to use — so setting it correctly used to fail
 * validation and report the whole config as missing.
 */
const senderAddress = z.string().refine(
  (value) => {
    const match = value.match(/^\s*(?:[^<>]*<\s*([^<>\s]+)\s*>|([^<>\s]+))\s*$/);
    const address = match?.[1] ?? match?.[2];
    return Boolean(address) && z.email().safeParse(address).success;
  },
  { message: 'must be "you@domain.com" or "Name <you@domain.com>"' },
);

const schema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: senderAddress.optional(),
});

export type ServerEnv = z.infer<typeof schema>;

export type EnvResult =
  | { ok: true; env: ServerEnv }
  /** `missing` is unset vars; `invalid` is set-but-malformed. They need
      different advice, so they're reported separately. */
  | { ok: false; missing: string[]; invalid: string[] };

export function getServerEnv(): EnvResult {
  const raw = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };

  // Treat empty strings as unset — a key left blank in .env.local is "missing",
  // not "invalid", and should be reported that way.
  const normalised = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, v?.trim() ? v : undefined]),
  );

  const parsed = schema.safeParse(normalised);
  if (parsed.success) return { ok: true, env: parsed.data };

  const missing: string[] = [];
  const invalid: string[] = [];
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0]);
    const wasProvided = normalised[key] !== undefined;
    (wasProvided ? invalid : missing).push(key);
  }

  return { ok: false, missing: [...new Set(missing)], invalid: [...new Set(invalid)] };
}
