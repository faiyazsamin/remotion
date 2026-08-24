import { Img, Interactive, staticFile } from "remotion";
import {
  ADMIN_GUTTER,
  ADMIN_SCALE,
  scaled,
  type PartProps,
} from "./tokens";

/**
 * One rail slot. `active` is the page you are on, which reads as a lighter
 * pill; `accent` overrides the glyph colour for pages that tint their own icon.
 */
const iconWrap = (
  active = false,
  accent?: string,
): React.CSSProperties => ({
  width: scaled(28),
  height: scaled(28),
  borderRadius: scaled(8),
  border: active
    ? `${scaled(1)}px solid rgba(255, 255, 255, 0.36)`
    : `${scaled(1)}px solid transparent`,
  backgroundColor: active ? "rgba(255, 255, 255, 0.18)" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: accent ?? (active ? "#ffffff" : "rgba(255, 255, 255, 0.74)"),
  boxSizing: "border-box",
});

/**
 * Centre of a rail slot in frame coordinates, walked down the rail's own box:
 * the ground's padding, the rail's top padding, the logo, then one slot and gap
 * per item above it.
 */
export const railSlotCentre = (index: number) => ({
  x: ADMIN_GUTTER + scaled(46) / 2,
  y:
    ADMIN_GUTTER +
    scaled(8) +
    scaled(29) +
    scaled(8) +
    index * (scaled(28) + scaled(8)) +
    scaled(28) / 2,
});

export type AdminRailProps = PartProps & {
  /** Rail glyphs in document order. */
  icons: React.ReactNode[];
  /** Which slot is the current page. */
  activeIndex?: number;
  /** Colour override for the active glyph, when a page tints its own. */
  activeAccent?: string;
  /** Pinned to the bottom, below the flexible gap. */
  footer?: React.ReactNode;
  logoStyle?: React.CSSProperties;
  iconStyle?: (index: number) => React.CSSProperties;
  footerStyle?: React.CSSProperties;
};

/**
 * The purple icon rail shared by every admin page. Pages differ only in which
 * glyphs they list, which slot is active, and whether anything is pinned to the
 * bottom — so those are props rather than a second copy of the rail.
 *
 * Glyphs come from the shared icon set, which renders at a fixed 15px for
 * capture space, so each is scaled from its own centre to rail size.
 */
export const AdminRail: React.FC<AdminRailProps> = ({
  style,
  icons,
  activeIndex,
  activeAccent,
  footer,
  logoStyle,
  iconStyle,
  footerStyle,
}) => (
  <Interactive.Aside
    name="Rail"
    style={{
      width: scaled(46),
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: scaled(8),
      boxSizing: "border-box",
      gap: scaled(8),
      ...style,
    }}
  >
    <Interactive.Div
      name="Logo"
      style={{
        width: scaled(29),
        height: scaled(29),
        borderRadius: scaled(8),
        backgroundColor: "rgba(255,255,255,0.2)",
        border: `${scaled(1)}px solid rgba(255,255,255,0.38)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...logoStyle,
      }}
    >
      <Img
        src={staticFile("featureshark/logo-square.svg")}
        style={{
          width: scaled(18),
          height: scaled(18),
          borderRadius: scaled(5),
        }}
      />
    </Interactive.Div>

    {icons.map((icon, index) => (
      <div
        key={index}
        style={{
          ...iconWrap(
            index === activeIndex,
            index === activeIndex ? activeAccent : undefined,
          ),
          ...iconStyle?.(index),
        }}
      >
        <div style={{ scale: ADMIN_SCALE, display: "flex" }}>{icon}</div>
      </div>
    ))}

    {footer ? (
      <div
        style={{
          marginTop: "auto",
          marginBottom: scaled(10),
          ...iconWrap(),
          ...footerStyle,
        }}
      >
        <div style={{ scale: ADMIN_SCALE, display: "flex" }}>{footer}</div>
      </div>
    ) : null}
  </Interactive.Aside>
);
