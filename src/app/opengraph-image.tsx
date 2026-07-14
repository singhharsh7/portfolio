import { ImageResponse } from "next/og";

export const alt = "Harsh V Singh — Reporter turned brand & delivery leader";
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
          background: "#16130e",
          color: "#ece3d2",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
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
            color: "#cda24d",
            borderBottom: "1px solid #352a1b",
            paddingBottom: 20,
          }}
        >
          <span>HVS · Collected Dispatches</span>
          <span style={{ color: "#9d927b" }}>Est. 2017</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            <span>Harsh</span>
            <span
              style={{
                color: "#e2c073",
                fontStyle: "italic",
                margin: "0 0.28em",
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
              color: "#e2c073",
              marginTop: 24,
            }}
          >
            Get the facts right — then make people care.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#c9bfa8",
            borderTop: "1px solid #352a1b",
            paddingTop: 20,
          }}
        >
          <span>Associate Director, Project Delivery · Rang Digitech</span>
          <span style={{ color: "#d0503a", fontSize: 20, letterSpacing: 3 }}>
            ON THE RECORD
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
