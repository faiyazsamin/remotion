import { Interactive } from "remotion";
import type { PartProps } from "./tokens";

export const SITE_NAV = [
  "Cart",
  "Checkout",
  "My account",
  "Sample Page",
  "Shop",
];

/** The host site's masthead: wordmark left, theme nav right. */
export const AcmeSiteHeader: React.FC<
  PartProps & { itemStyle?: (index: number) => React.CSSProperties }
> = ({ style, itemStyle }) => (
  <Interactive.Header
    name="Site header"
    style={{
      height: 96,
      flexShrink: 0,
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 72px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div
      style={{
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: "#16181d",
      }}
    >
      AcmeCorp
    </div>

    <nav style={{ display: "flex", alignItems: "center", gap: 34 }}>
      {SITE_NAV.map((item, index) => (
        <span
          key={item}
          style={{
            fontSize: 17,
            color: "#2b2f38",
            ...itemStyle?.(index),
          }}
        >
          {item}
        </span>
      ))}
    </nav>
  </Interactive.Header>
);
