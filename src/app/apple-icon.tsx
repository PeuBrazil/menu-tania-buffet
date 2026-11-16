import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "linear-gradient(135deg, #352119 0%, #4A332A 100%)",
          borderRadius: "40px",
          border: "6px solid #E6B35A",
        }}
      >
        <span
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: "#E6B35A",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          T
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#F5EFE6",
            letterSpacing: "0.2em",
            marginTop: 4,
          }}
        >
          BUFFET
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
