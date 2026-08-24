import { Interactive } from "remotion";
import type { PartProps } from "./tokens";

/** Theme credit line at the bottom of the host site. */
export const AcmeSiteFooter: React.FC<PartProps> = ({ style }) => (
  <Interactive.Footer
    name="Site footer"
    style={{
      height: 96,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 17,
      color: "#2b2f38",
      ...style,
    }}
  >
    <span>
      © 2026 AcmeCorp - WordPress Theme by{" "}
      <span style={{ textDecoration: "underline" }}>Kadence WP</span>
    </span>
  </Interactive.Footer>
);
