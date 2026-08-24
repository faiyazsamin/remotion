import { Interactive } from "remotion";
import { IconChat } from "./icons";
import type { PartProps } from "./tokens";

/**
 * What the panel body shows before any feedback exists. Reuses the admin rail's
 * `IconChat`, scaled way up and drained of colour.
 */
export const FeedbackWidgetEmptyState: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Empty state"
    style={{
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
      ...style,
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        color: "#d5d8e1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* IconChat renders at a fixed 15px, so scale it up from its own centre. */}
      <div style={{ scale: 3.4 }}>
        <IconChat />
      </div>
    </div>

    <div style={{ fontSize: 17, color: "#b7bcc8" }}>No feedback yet</div>
  </Interactive.Div>
);
