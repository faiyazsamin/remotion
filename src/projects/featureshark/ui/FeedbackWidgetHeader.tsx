import { Interactive } from "remotion";
import {
  IconChevronDown,
  IconClose,
  IconCollapse,
  IconSearch,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export type FeedbackWidgetHeaderProps = PartProps & {
  title: string;
  /** Show the stack's back control on the left. Pushed views have one. */
  back?: boolean;
  /** The list view carries a search field; pushed views do not. */
  search?: boolean;
  /** What the search field prompts for — the help view asks for articles. */
  searchPlaceholder?: string;
  searchStyle?: React.CSSProperties;
  /** Expanded views can be shrunk back down, so they carry a second control. */
  minimize?: boolean;
};

const controlStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 9,
  backgroundColor: "rgba(255, 255, 255, 0.18)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * The purple bar at the top of the panel. Shared by every view so the colour
 * never re-mounts between them — only its contents change.
 */
export const FeedbackWidgetHeader: React.FC<FeedbackWidgetHeaderProps> = ({
  style,
  title,
  back,
  search,
  searchPlaceholder = "Search feedback...",
  searchStyle,
  minimize,
}) => (
  <Interactive.Div
    name="Widget header"
    style={{
      flexShrink: 0,
      backgroundColor: BRAND_PURPLE,
      padding: search ? "18px 20px 20px" : "20px 20px 22px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div
      style={{
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {back ? (
        <div style={{ ...controlStyle, position: "absolute", left: 0 }}>
          {/* A down chevron turned a quarter turn — no separate glyph needed. */}
          <div style={{ scale: 1.5, rotate: "90deg", display: "flex" }}>
            <IconChevronDown />
          </div>
        </div>
      ) : null}

      <div style={{ fontSize: 19, fontWeight: 700, color: "#ffffff" }}>
        {title}
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {minimize ? (
          <div style={controlStyle}>
            <IconCollapse size={15} />
          </div>
        ) : null}
        <div style={controlStyle}>
          <IconClose size={15} />
        </div>
      </div>
    </div>

    {search ? (
      <div
        style={{
          marginTop: 16,
          height: 44,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          boxSizing: "border-box",
          color: "rgba(255, 255, 255, 0.78)",
          fontSize: 16,
          ...searchStyle,
        }}
      >
        <div style={{ scale: 1.25, display: "flex" }}>
          <IconSearch />
        </div>
        <span>{searchPlaceholder}</span>
      </div>
    ) : null}
  </Interactive.Div>
);
