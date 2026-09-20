import { ImageResponse } from "next/og";

import { profile } from "@/data";

export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, rendered in the same Editorial Noir palette as the site.
 * Kept to system fonts so it builds without shipping a font binary into the
 * edge bundle — the layout does the work, not the typeface.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080706",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(237,232,224,0.14)",
            paddingBottom: 28,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8a8279",
            fontFamily: "monospace",
          }}
        >
          <span>{profile.role}</span>
          <span>{profile.location}</span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 128,
              lineHeight: 0.92,
              color: "#ede8e0",
              letterSpacing: -4,
            }}
          >
            {profile.firstName}
          </span>
          <span
            style={{
              fontSize: 128,
              lineHeight: 0.92,
              color: "#e0a458",
              fontStyle: "italic",
              letterSpacing: -4,
            }}
          >
            {profile.lastName}
          </span>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(237,232,224,0.14)",
            paddingTop: 28,
            fontSize: 20,
            color: "#b8b0a6",
          }}
        >
          <span>Web · Mobile · Data</span>
          <span style={{ color: "#4a453f", fontFamily: "monospace" }}>
            Portfolio Vol. IV
          </span>
        </div>
      </div>
    ),
    size,
  );
}
