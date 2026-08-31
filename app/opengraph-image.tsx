import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded OG card. Colours are the literal Figma anchors: next/og renders in an
 * isolated Satori context that cannot read the site's CSS custom properties.
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
          alignItems: "center",
          justifyContent: "center",
          background: "#205929",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: 36,
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: "#8cda5a" }}>
          Play is the
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            padding: "10px 44px",
            borderRadius: 999,
            background: "#8cda5a",
            color: "#1b5e20",
            fontSize: 92,
            fontWeight: 700,
          }}
        >
          assessment
        </div>
        <div style={{ marginTop: 48, fontSize: 30, color: "#cfe8b8", textAlign: "center" }}>
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
