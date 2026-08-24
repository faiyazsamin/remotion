import { Interactive } from "remotion";
import type { PartProps } from "./tokens";

/** The default "Hello world!" post the WordPress theme ships with. */
export const AcmeSitePostCard: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Post card"
    style={{
      width: 540,
      backgroundColor: "#ffffff",
      padding: "40px 44px 44px",
      boxSizing: "border-box",
      boxShadow: "0 2px 22px rgba(20, 24, 40, 0.07)",
      ...style,
    }}
  >
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.09em",
        color: "#2f6fdb",
      }}
    >
      UNCATEGORIZED
    </div>

    <div
      style={{
        marginTop: 18,
        fontSize: 36,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: "#16181d",
      }}
    >
      Hello world!
    </div>

    <div style={{ marginTop: 20, fontSize: 15, color: "#4b5563" }}>
      By tanmay&nbsp;&nbsp;•&nbsp;&nbsp;July 16, 2025
    </div>

    <div
      style={{
        marginTop: 24,
        fontSize: 17,
        lineHeight: 1.62,
        color: "#2f333c",
      }}
    >
      Welcome to WordPress. This is your first post. Edit or delete it, then
      start writing!
    </div>

    <div
      style={{
        marginTop: 26,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.09em",
        color: "#16181d",
      }}
    >
      READ MORE
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 12 }}>
        <path
          d="M2 12H21M21 12L15 6M21 12L15 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </Interactive.Div>
);
