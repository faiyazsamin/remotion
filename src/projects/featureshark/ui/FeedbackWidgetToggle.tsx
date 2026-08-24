import { Interactive } from "remotion";
import { IconChevronDown } from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const TOGGLE_SIZE = 64;
export const TOGGLE_RIGHT = 37;
export const TOGGLE_BOTTOM = 23;

/** Centre of the toggle in frame coordinates — what the cursor tip aims at. */
export const toggleCentre = (frameWidth: number, frameHeight: number) => ({
  x: frameWidth - TOGGLE_RIGHT - TOGGLE_SIZE / 2,
  y: frameHeight - TOGGLE_BOTTOM - TOGGLE_SIZE / 2,
});

/**
 * The launcher pinned to the corner of the host site. The chevron points up
 * while the panel is closed and down once it is open, so `chevronStyle` is where
 * a scene rotates it on the click.
 */
export const FeedbackWidgetToggle: React.FC<
  PartProps & { chevronStyle?: React.CSSProperties }
> = ({ style, chevronStyle }) => (
  <Interactive.Div
    name="Widget toggle"
    style={{
      position: "absolute",
      right: TOGGLE_RIGHT,
      bottom: TOGGLE_BOTTOM,
      width: TOGGLE_SIZE,
      height: TOGGLE_SIZE,
      borderRadius: "50%",
      backgroundColor: BRAND_PURPLE,
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(70, 50, 190, 0.34)",
      ...style,
    }}
  >
    <div style={{ scale: 2.2, display: "flex", ...chevronStyle }}>
      <IconChevronDown />
    </div>
  </Interactive.Div>
);
