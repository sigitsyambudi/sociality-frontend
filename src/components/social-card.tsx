import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const SOCIAL_IMAGE_ALT =
  "Sociality frontend portfolio preview in a black and purple visual theme";

export function SocialCard() {
  return (
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 78% 18%, #5f26d8 0, #24113f 22%, #09070d 54%, #000 100%)",
        color: "#ffffff",
        display: "flex",
        fontFamily: "Arial, Helvetica, sans-serif",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "52px 58px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "18px" }}>
          <div
            style={{
              alignItems: "center",
              background: "#6936f2",
              borderRadius: "50%",
              display: "flex",
              fontSize: "34px",
              fontWeight: 800,
              height: "68px",
              justifyContent: "center",
              width: "68px",
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 800 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              color: "#b99cff",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Frontend portfolio preview
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "66px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              maxWidth: "900px",
            }}
          >
            A modern social experience, thoughtfully crafted.
          </div>
          <div
            style={{
              color: "#c4c0cc",
              display: "flex",
              fontSize: "22px",
              lineHeight: 1.4,
              maxWidth: "860px",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    </div>
  );
}
