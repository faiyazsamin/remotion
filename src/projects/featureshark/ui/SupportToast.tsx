import { Interactive } from "remotion";
import { IconClock, IconClose, IconPerson } from "./icons";
import type { PartProps } from "./tokens";

/**
 * The support-chat greeting that pops out of the widget bubble. Positioned above
 * the bubble it comes from, so it reads as having opened from it.
 */
export const SupportToast: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Support toast"
    style={{
      position: "absolute",
      right: 38,
      bottom: 97,
      width: 408,
      borderRadius: 14,
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 34px rgba(24, 28, 45, 0.14)",
      padding: "17px 22px 19px",
      boxSizing: "border-box",
      // Grows out of its bottom-right corner, where the bubble sits.
      transformOrigin: "100% 100%",
      ...style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ color: "#5b6172", display: "flex" }}>
        <IconPerson size={16} />
      </span>
      <span style={{ fontSize: 16.5, fontWeight: 700, color: "#1f232e" }}>
        Support Team
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#8b91a3",
          fontSize: 15.5,
        }}
      >
        <IconClock size={15} />
        just now
      </span>
      <span
        style={{
          marginLeft: "auto",
          marginTop: -8,
          color: "#b9bec9",
          display: "flex",
        }}
      >
        <IconClose size={13} />
      </span>
    </div>

    <div style={{ marginTop: 12, fontSize: 17, color: "#2f333c" }}>
      Hi! How can we help you today?
    </div>
  </Interactive.Div>
);
