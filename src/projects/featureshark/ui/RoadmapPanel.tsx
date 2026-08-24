import { Interactive } from "remotion";
import {
  IconChevronDown,
  IconClock,
  IconEllipsis,
  IconHelpCircle,
  IconPlusCircle,
  IconRoadmapBook,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const ROADMAP_PANEL_WIDTH = 324;

/** The roadmap this workspace has, and the scoring model it uses. */
export const ROADMAP_NAME = "Main Roadmap";
export const ROADMAP_MODEL = "RICE";

/**
 * The Roadmap page's left column: the list of roadmaps. Structurally the twin of
 * the feedback board's filter column — same width, same footer — so the two
 * pages read as the same app.
 */
export const RoadmapPanel: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Roadmap panel"
    style={{
      width: ROADMAP_PANEL_WIDTH,
      flexShrink: 0,
      backgroundColor: "#ffffff",
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div style={{ flex: 1, minHeight: 0, padding: "22px 24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: BRAND_PURPLE, display: "flex" }}>
          <IconRoadmapBook size={22} />
        </span>
        <span style={{ fontSize: 21, fontWeight: 700, color: "#1f232e" }}>
          Roadmap
        </span>
        <span style={{ color: "#b3b8c4", display: "flex" }}>
          <IconHelpCircle size={17} />
        </span>
        <div
          style={{
            marginLeft: "auto",
            height: 34,
            borderRadius: 9,
            backgroundColor: BRAND_PURPLE,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 13px",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          <IconPlusCircle size={17} />
          New
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.07em",
            color: "#8b91a3",
          }}
        >
          ROADMAPS
        </span>
        <span style={{ color: "#9aa0ad", scale: 1.3, display: "flex" }}>
          <IconChevronDown />
        </span>
      </div>

      {/* The one roadmap, and the one being viewed — so it reads selected. */}
      <div
        style={{
          marginTop: 16,
          borderRadius: 11,
          backgroundColor: "#f5f4fd",
          padding: "14px 14px 16px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontSize: 16.5, fontWeight: 600, color: BRAND_PURPLE }}
          >
            {ROADMAP_NAME}
          </span>
          <span
            style={{ marginLeft: "auto", color: "#a9aebb", display: "flex" }}
          >
            <IconEllipsis size={15} />
          </span>
        </div>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            height: 26,
            borderRadius: 7,
            backgroundColor: "#e9e7fa",
            color: "#5b4ad0",
            padding: "0 10px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.03em",
          }}
        >
          {ROADMAP_MODEL}
        </div>
      </div>
    </div>

    <div
      style={{
        flexShrink: 0,
        height: 52,
        borderTop: "1px solid #eef0f6",
        backgroundColor: "#fbfbfe",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 24px",
        fontSize: 14.5,
        fontWeight: 600,
        color: "#4d5464",
      }}
    >
      <span style={{ color: "#7b8194", display: "flex" }}>
        <IconClock size={16} />
      </span>
      Trial: 14 days remaining
    </div>
  </Interactive.Div>
);
