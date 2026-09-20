import type { MetadataRoute } from "next";

import { publishedWork, SITE_URL } from "@/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // publishedWork, not `projects` — the latter misses every team project,
    // which is exactly the set of routes most worth indexing.
    ...publishedWork.map((work) => ({
      url: `${SITE_URL}/project/${work.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
