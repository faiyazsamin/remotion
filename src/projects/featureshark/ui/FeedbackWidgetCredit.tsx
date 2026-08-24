import { Img, Interactive, staticFile } from "remotion";
import { WIDGET_CREDIT_HEIGHT, type PartProps } from "./tokens";

/**
 * "Powered By FeatureShark". Each view places this itself: the list view puts it
 * directly above the tab bar, the form view sits it on the panel floor.
 */
export const FeedbackWidgetCredit: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Credit"
    style={{
      flexShrink: 0,
      height: WIDGET_CREDIT_HEIGHT,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      fontSize: 12.5,
      color: "#9ba1af",
      ...style,
    }}
  >
    <Img
      src={staticFile("featureshark/logo-square.svg")}
      style={{ width: 14, height: 14, opacity: 0.55 }}
    />
    <span>
      Powered By{" "}
      <span style={{ fontWeight: 700, color: "#6f7686" }}>FeatureShark</span>
    </span>
  </Interactive.Div>
);
