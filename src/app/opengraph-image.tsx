import { ImageResponse } from "next/og";
import { profile, proof } from "@/content/site";
import { palette } from "@/content/theme";

const c = palette.dark;
// El nombre en dos líneas: el apellido materno abajo.
const splitAt = profile.name.lastIndexOf(" ");
const nameLines = [profile.name.slice(0, splitAt), profile.name.slice(splitAt + 1)];

export const alt = `${profile.name} — ${profile.role.es}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// La preview reproduce el hero real del sitio — mismos colores, misma
// jerarquia, mismas cifras — para que el enlace compartido muestre lo que
// la persona va a encontrar al entrar, no una tarjeta generica.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: c.bg,
          padding: "64px 72px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 5,
              color: c.accent,
              fontWeight: 700,
            }}
          >
            {profile.role.es.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
            }}
          >
            {nameLines.map((line) => (
              <div
                key={line}
                style={{ display: "flex", fontSize: 76, fontWeight: 700, color: c.text, lineHeight: 1.06 }}
              >
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: c.muted,
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            {profile.tagline.es}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${c.border}`,
            paddingTop: 26,
          }}
        >
          {proof.map((item) => (
            <div
              key={item.label.es}
              style={{ display: "flex", flexDirection: "column", maxWidth: 230 }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  fontWeight: 700,
                  color: c.accent,
                }}
              >
                {item.value.es}
              </div>
              <div
                style={{ display: "flex", fontSize: 17, color: c.muted, marginTop: 4 }}
              >
                {item.label.es}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
