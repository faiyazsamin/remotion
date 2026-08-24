import { Interactive } from "remotion";
import {
  FONT_STACK,
  WIDGET_HEIGHT,
  WIDGET_RIGHT,
  WIDGET_TOP,
  WIDGET_WIDTH,
  type PartProps,
} from "./tokens";

/**
 * The panel shell: the rounded box and nothing else. Views
 * (`FeedbackWidgetListView`, `FeedbackWidgetFormView`) stack inside it as
 * absolutely-positioned layers, so one can push over another without either
 * re-flowing the other.
 *
 * The panel grows from its bottom-right corner because that is where the toggle
 * that opens it lives — `transformOrigin` is set here so a scene only has to
 * drive `scale`.
 */
export const FeedbackWidget: React.FC<
  PartProps & { children?: React.ReactNode }
> = ({ style, children }) => (
  <Interactive.Div
    name="Feedback widget"
    style={{
      position: "absolute",
      right: WIDGET_RIGHT,
      top: WIDGET_TOP,
      width: WIDGET_WIDTH,
      height: WIDGET_HEIGHT,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: "#f7f8fa",
      fontFamily: FONT_STACK,
      boxShadow: "0 18px 60px rgba(24, 20, 60, 0.18)",
      transformOrigin: "100% 100%",
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);
