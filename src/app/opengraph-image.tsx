import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — Web3 Builder & Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0b0a08",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            color: "#e8b84b",
            textTransform: "uppercase",
          }}
        >
          Web3 Builder &amp; Developer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              color: "#f3f0e8",
              lineHeight: 1.05,
            }}
          >
            Alejandro Tintaya
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              color: "#f3f0e8",
              lineHeight: 1.05,
            }}
          >
            Montecinos
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#9c9385",
            borderTop: "2px solid #2a251e",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex" }}>La Paz, Bolivia</div>
          <div style={{ display: "flex" }}>latmontecinos.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
