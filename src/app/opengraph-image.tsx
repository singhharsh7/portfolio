import { ImageResponse } from "next/og";

export const alt = "Harsh V Singh · Reporter turned brand & delivery leader";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf8",
          color: "#18150f",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2438cc",
            borderBottom: "1px solid #e6e2d9",
            paddingBottom: 20,
          }}
        >
          <span>Vol. IX · Est. 2017</span>
          <span style={{ color: "#8a857a" }}>Harsh V Singh</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -5,
            }}
          >
            <span>Harsh</span>
            <span
              style={{
                color: "#2438cc",
                margin: "0 0.24em",
                borderBottom: "8px solid #2438cc",
              }}
            >
              V
            </span>
            <span>Singh</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontStyle: "italic",
              color: "#57534b",
              marginTop: 28,
            }}
          >
            Get the facts right, then make people care.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#57534b",
            borderTop: "1px solid #e6e2d9",
            paddingTop: 20,
          }}
        >
          <span>Associate Director, Project Delivery · Rang Digitech</span>
          <span style={{ color: "#2438cc", fontSize: 20, letterSpacing: 3 }}>
            ON THE RECORD
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
