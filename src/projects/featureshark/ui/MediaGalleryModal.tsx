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

/**
 * Stand-ins for the workspace's uploaded media. Rendered as gradients rather
 * than files so the composition stays self-contained — swap in real images by
 * dropping them in `public/` and pointing these at `staticFile()`.
 */
export const MEDIA_PLACEHOLDERS = [
  "linear-gradient(160deg, #f0703a 0%, #e0356b 45%, #8e1f4f 100%)",
  "linear-gradient(150deg, #1b2a5e 0%, #26356e 50%, #17224d 100%)",
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
