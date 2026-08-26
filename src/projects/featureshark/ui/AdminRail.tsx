import { Img, Interactive, staticFile } from "remotion";
import {
  ADMIN_GUTTER,
  ADMIN_SCALE,
  scaled,
  type PartProps,
} from "./tokens";

const ACTIVE_FALLBACK = "#7a6df2";
const SLOT_SIZE = 30;
const SLOT_GAP = 8;

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((part) => part + part)
          .join("")
      : clean;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
};

const mixHex = (from: string, to: string, progress: number) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * progress);

  return `rgb(${mix(start.r, end.r)}, ${mix(start.g, end.g)}, ${mix(
    start.b,
    end.b,
  )})`;
};

const indicatorTop = (index: number) =>
  scaled(8) +
  scaled(29) +
  scaled(SLOT_GAP) +
  index * (scaled(SLOT_SIZE) + scaled(SLOT_GAP));

/**
 * One rail slot. `active` is the page you are on, and follows the product rail:
 * a solid rounded tile with a white glyph. `accent` is the page colour.
 */
const iconWrap = (
  active = false,
): React.CSSProperties => ({
  width: scaled(SLOT_SIZE),
  height: scaled(SLOT_SIZE),
  borderRadius: scaled(8),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: active ? "#ffffff" : "rgba(255, 255, 255, 0.74)",
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
    scaled(SLOT_GAP) +
    index * (scaled(SLOT_SIZE) + scaled(SLOT_GAP)) +
    scaled(SLOT_SIZE) / 2,
});

export type AdminRailProps = PartProps & {
  /** Rail glyphs in document order. */
  icons: React.ReactNode[];
  /** Which slot is the current page. */
  activeIndex?: number;
  /** Colour override for the active glyph, when a page tints its own. */
  activeAccent?: string;
  previousActiveIndex?: number;
  previousActiveAccent?: string;
  activeProgress?: number;
  activeIndicatorOpacity?: number;
  /** Pinned to the bottom, below the flexible gap. */
  footer?: React.ReactNode;
  showNewBadge?: boolean;
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
  previousActiveIndex,
  previousActiveAccent,
  activeProgress = 1,
  activeIndicatorOpacity = 1,
  footer,
  showNewBadge = true,
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
      position: "relative",
      ...style,
    }}
  >
    {activeIndex === undefined ? null : (
      <div
        style={{
          position: "absolute",
          left: (scaled(46) - scaled(SLOT_SIZE)) / 2,
          top:
            indicatorTop(previousActiveIndex ?? activeIndex) +
            (indicatorTop(activeIndex) -
              indicatorTop(previousActiveIndex ?? activeIndex)) *
              activeProgress,
          width: scaled(SLOT_SIZE),
          height: scaled(SLOT_SIZE),
          borderRadius: scaled(8),
          backgroundColor: mixHex(
            previousActiveAccent ?? activeAccent ?? ACTIVE_FALLBACK,
            activeAccent ?? ACTIVE_FALLBACK,
            activeProgress,
          ),
          opacity: activeIndicatorOpacity,
          boxShadow: `0 ${scaled(5)}px ${scaled(12)}px rgba(18, 14, 75, 0.18)`,
          zIndex: 0,
        }}
      />
    )}

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
        zIndex: 1,
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

    {icons.map((icon, index) => {
      const tileNearPrevious =
        previousActiveIndex !== undefined && activeProgress < 0.48;
      const highlighted =
        (tileNearPrevious && index === previousActiveIndex) ||
        (!tileNearPrevious && index === activeIndex);

      return (
        <div
          key={index}
          style={{
            position: "relative",
            zIndex: 1,
            ...iconWrap(highlighted),
            ...iconStyle?.(index),
          }}
        >
          <div style={{ scale: ADMIN_SCALE, display: "flex" }}>{icon}</div>
          {showNewBadge && index === icons.length - 1 ? (
            <div
              style={{
                position: "absolute",
                left: scaled(-4),
                top: scaled(-8),
                height: scaled(13),
                minWidth: scaled(26),
                padding: `0 ${scaled(4)}px`,
                borderRadius: scaled(8),
                backgroundColor: "#7f6df8",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: scaled(9),
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: 0,
                boxSizing: "border-box",
              }}
            >
              New
            </div>
          ) : null}
        </div>
      );
    })}

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
