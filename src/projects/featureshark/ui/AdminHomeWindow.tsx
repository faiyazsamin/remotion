import { Interactive } from "remotion";
import { ADMIN_CARD_RADIUS, scaled, type PartProps } from "./tokens";

/** The rounded white pane the page's content sits in, beside the rail. */
export const AdminHomeWindow: React.FC<
  PartProps & { children?: React.ReactNode }
> = ({ style, children }) => (
  <Interactive.Div
    name="App window"
    style={{
      flex: 1,
      minWidth: 0,
      borderRadius: ADMIN_CARD_RADIUS,
      backgroundColor: "#ffffff",
      display: "flex",
      overflow: "hidden",
      boxShadow: `0 ${scaled(1)}px 0 rgba(29, 39, 62, 0.08)`,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);
