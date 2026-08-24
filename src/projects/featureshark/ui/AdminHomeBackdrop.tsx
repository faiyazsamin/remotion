import { Interactive } from "remotion";
import { ADMIN_GROUND, ADMIN_GUTTER, FONT_STACK } from "./tokens";

/** The purple page background that the rounded app window sits on. */
export const AdminHomeBackdrop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Interactive.Div
    name="Backdrop"
    style={{
      position: "absolute",
      inset: 0,
      // The same ground the Feedback board uses, so the two read as one product:
      // the rail sits directly on it and the pane floats beside it.
      background: ADMIN_GROUND,
      display: "flex",
      gap: ADMIN_GUTTER,
      padding: ADMIN_GUTTER,
      boxSizing: "border-box",
      fontFamily: FONT_STACK,
      color: "#1f2538",
    }}
  >
    {children}
  </Interactive.Div>
);
