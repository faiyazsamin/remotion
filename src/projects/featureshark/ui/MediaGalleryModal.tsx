import { Interactive } from "remotion";
import { IconClose, IconHelpCircle, IconSearch, IconUpload } from "./icons";
import { BRAND_PURPLE, FONT_STACK, SITE_WIDTH, type PartProps } from "./tokens";

export const GALLERY_WIDTH = 1504;
export const GALLERY_HEIGHT = 872;
export const GALLERY_TOP = 106;
export const GALLERY_LEFT = (SITE_WIDTH - GALLERY_WIDTH) / 2;

const HEADER_HEIGHT = 78;
const BODY_PADDING = 24;
const SEARCH_HEIGHT = 52;
const TABS_HEIGHT = 44;
const TILE_SIZE = 347;
const TILE_GAP = 26;

const svgText = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const mediaCover = ({
  from,
  to,
  glow,
  kicker,
  title,
  detail,
}: {
  from: string;
  to: string;
  glow: string;
  kicker: string;
  title: string;
  detail: string;
}) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="680" viewBox="0 0 1200 680">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#07111f" flood-opacity=".28"/>
        </filter>
      </defs>
      <rect width="1200" height="680" rx="44" fill="url(#bg)"/>
      <circle cx="1020" cy="78" r="250" fill="${glow}" opacity=".32"/>
      <circle cx="180" cy="642" r="260" fill="#ffffff" opacity=".12"/>
      <g opacity=".16">
        <path d="M82 126h1036M82 226h1036M82 326h1036M82 426h1036M82 526h1036" stroke="#ffffff" stroke-width="2"/>
        <path d="M202 68v544M402 68v544M602 68v544M802 68v544M1002 68v544" stroke="#ffffff" stroke-width="2"/>
      </g>
      <g filter="url(#shadow)">
        <rect x="92" y="88" width="1016" height="504" rx="34" fill="#ffffff" opacity=".13"/>
        <rect x="126" y="122" width="948" height="436" rx="28" fill="#101320" opacity=".54"/>
        <rect x="160" y="158" width="220" height="42" rx="21" fill="#ffffff" opacity=".16"/>
        <text x="184" y="186" fill="#ffffff" opacity=".86" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3">${svgText(kicker.toUpperCase())}</text>
        <text x="160" y="294" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="800">${svgText(title)}</text>
        <text x="164" y="354" fill="#dfe7ff" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="600">${svgText(detail)}</text>
        <g transform="translate(160 430)">
          <rect width="210" height="48" rx="16" fill="#ffffff" opacity=".94"/>
          <text x="28" y="31" fill="#25223a" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800">Ready to ship</text>
        </g>
        <g transform="translate(770 176)" opacity=".9">
          <rect width="238" height="238" rx="42" fill="#ffffff" opacity=".12"/>
          <path d="M70 122l44 44 78-92" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M76 76h106M76 206h106" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity=".42"/>
        </g>
      </g>
    </svg>
  `;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") center / cover no-repeat`;
};

/**
 * Stand-ins for the workspace's uploaded media. Rendered as inline SVG covers
 * so the composition stays self-contained while still reading like real assets.
 */
export const MEDIA_PLACEHOLDERS = [
  mediaCover({
    from: "#f0703a",
    to: "#7f1d4d",
    glow: "#ffd36a",
    kicker: "Product update",
    title: "GitHub Integration",
    detail: "Connect repos, issues, and feedback",
  }),
  mediaCover({
    from: "#1b2a5e",
    to: "#111827",
    glow: "#62d7ff",
    kicker: "Help guide",
    title: "How to use GitHub",
    detail: "Step-by-step setup for your team",
  }),
];

/** Centre of one media tile, for a scene to pick it. */
export const mediaTileCentre = (index: number) => ({
  x:
    GALLERY_LEFT +
    BODY_PADDING +
    index * (TILE_SIZE + TILE_GAP) +
    TILE_SIZE / 2,
  y:
    GALLERY_TOP +
    HEADER_HEIGHT +
    BODY_PADDING +
    SEARCH_HEIGHT +
    16 +
    TABS_HEIGHT +
    20 +
    TILE_SIZE / 2,
});

/**
 * The media picker, opened from the release's featured-image slot. Its tiles are
 * the workspace's uploads; picking one closes the picker and fills the slot.
 */
export const MediaGalleryModal: React.FC<
  PartProps & {
    scrimStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
    tileStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, scrimStyle, cardStyle, tileStyle }) => (
  <Interactive.Div
    name="Media gallery"
    style={{
      position: "absolute",
      inset: 0,
      fontFamily: FONT_STACK,
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(52, 46, 92, 0.55)",
        ...scrimStyle,
      }}
    />

    <Interactive.Div
      name="Gallery card"
      style={{
        position: "absolute",
        left: GALLERY_LEFT,
        top: GALLERY_TOP,
        width: GALLERY_WIDTH,
        height: GALLERY_HEIGHT,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 30px 90px rgba(24, 20, 60, 0.3)",
        display: "flex",
        flexDirection: "column",
        ...cardStyle,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          height: HEADER_HEIGHT,
          borderBottom: "1px solid #eef0f6",
          display: "flex",
          alignItems: "center",
          padding: `0 ${BODY_PADDING}px 0 ${BODY_PADDING + 6}px`,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: "#1f232e" }}>
          Media Gallery
        </span>
        <span
          style={{ marginLeft: "auto", color: "#8b91a3", display: "flex" }}
        >
          <IconClose size={17} />
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: BODY_PADDING,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              flex: 1,
              height: SEARCH_HEIGHT,
              borderRadius: 11,
              border: `1.5px solid ${BRAND_PURPLE}`,
              display: "flex",
              alignItems: "center",
              gap: 13,
              padding: "0 18px",
              boxSizing: "border-box",
              fontSize: 17,
              color: "#8d93a3",
            }}
          >
            <span style={{ color: "#8d93a3", scale: 1.3, display: "flex" }}>
              <IconSearch />
            </span>
            Search media...
          </div>
          <span
            style={{
              height: SEARCH_HEIGHT,
              borderRadius: 11,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 11,
              padding: "0 20px",
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            <IconUpload size={19} />
            Upload
          </span>
          <span style={{ color: "#a9aebb", display: "flex" }}>
            <IconHelpCircle size={19} />
          </span>
        </div>

        <div
          style={{
            marginTop: 16,
            height: TABS_HEIGHT,
            borderRadius: 11,
            backgroundColor: "#f4f4f8",
            display: "flex",
            padding: 4,
            boxSizing: "border-box",
            fontSize: 17,
          }}
        >
          <span
            style={{
              flex: 1,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              color: "#20242f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px rgba(24, 28, 45, 0.08)",
            }}
          >
            Uploaded
          </span>
          <span
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
            }}
          >
            Attached
          </span>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: TILE_GAP }}>
          {MEDIA_PLACEHOLDERS.map((background, index) => (
            <div
              key={index}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                borderRadius: 12,
                background,
                ...tileStyle?.(index),
              }}
            />
          ))}
        </div>
      </div>
    </Interactive.Div>
  </Interactive.Div>
);
