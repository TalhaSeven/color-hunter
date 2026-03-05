import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0d0d0d 0%, #111018 50%, #0d0d0d 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "1.5px solid rgba(201,168,76,0.6)",
          background: "rgba(201,168,76,0.08)",
          fontSize: 42,
          marginBottom: 28,
        }}
      >
        🔍
      </div>

      {/* Badge */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: 6,
          color: "#c9a84c",
          textTransform: "uppercase",
          opacity: 0.8,
          marginBottom: 16,
        }}
      >
        Contemplative · Mindful
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          background: "linear-gradient(135deg, #e8c97a, #c9a84c, #a07830)",
          backgroundClip: "text",
          color: "transparent",
          letterSpacing: -1,
          marginBottom: 20,
        }}
      >
        Color Hunter
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 22,
          color: "rgba(240,235,224,0.55)",
          maxWidth: 600,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Discover your mood · Find your color · Reflect with a Divine Name
      </div>

      {/* Color dots row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 40,
        }}
      >
        {[
          "#00c853",
          "#00b0ff",
          "#f06292",
          "#ffd600",
          "#9e9e9e",
          "#81d4fa",
          "#8d6e63",
          "#5c6bc0",
        ].map((c) => (
          <div
            key={c}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: c,
              boxShadow: `0 0 12px ${c}88`,
            }}
          />
        ))}
      </div>
    </div>,
    { ...size },
  );
}
