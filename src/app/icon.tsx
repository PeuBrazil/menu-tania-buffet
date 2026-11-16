import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #352119 0%, #4A332A 100%)",
          borderRadius: "16px",
          border: "3px solid #E6B35A",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#E6B35A",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              marginTop: -2,
            }}
          >
            T
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
